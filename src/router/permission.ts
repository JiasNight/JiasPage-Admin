import useAppStore from '@/store/module/app';
import useUserStore from '@/store/module/user';
import { Router, RouteLocationNormalizedLoaded, RouteRecordRaw } from 'vue-router';
import { getToken } from '../utils/auth';
import { LoadingBar } from 'quasar';

// 路由白名单
const whiteList: Array<String> = ['/signIn', '/signUp'];

export const setupPermission = (router: Router) => {
  router.beforeEach(async (to: RouteLocationNormalizedLoaded, from: RouteLocationNormalizedLoaded) => {
    LoadingBar.start();
    const appStore = useAppStore();
    const isSignIn: boolean | string | null = getToken();

    // 判断是否需要对请求和响应加解密
    const isEncrypt: boolean | null = localStorage.getItem('safe') === 'true';

    if (isEncrypt) {
      // 安全认证校验获取
      appStore.getCurrentPublicKey();
    }
    // 判断是否登录
    if (isSignIn) {
      if (to.path === '/signIn') {
        LoadingBar.stop();
        return { path: '/' };
      } else {
        const currentRoutes: Array<RouteRecordRaw> = await appStore.getRoutes;
        const routesLength = toRaw(currentRoutes);
        // 如果没有路由信息，则通过当前用户获取路由表
        if (routesLength.length === 0) {
          await appStore.generateRoutes().then(() => {
            return { ...to, replace: true };
          });
        } else {
          return;
        }
      }
    } else {
      // 没有token的情况下，判断是否白名单页面
      if (whiteList.indexOf(to.path) !== -1) {
        return;
      } else {
        return { path: '/signIn' };
      }
    }
  });

  router.afterEach(() => {
    LoadingBar.stop();
  });
};
