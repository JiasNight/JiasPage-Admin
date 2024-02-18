import useAppStore from '@/store/module/app';
import useUserStore from '@/store/module/user';
import { createDiscreteApi } from 'naive-ui';
import { Router, RouteLocationNormalizedLoaded, RouteRecordRaw } from 'vue-router';
import { getToken } from '../utils/auth';

const { loadingBar } = createDiscreteApi(['loadingBar']);
// 路由白名单
const whiteList: Array<String> = ['/signIn'];

export const setupPermission = (router: Router) => {
  router.beforeEach(async (to: RouteLocationNormalizedLoaded, from: RouteLocationNormalizedLoaded) => {
    loadingBar.start();
    const appStore = useAppStore();
    const isSignIn: boolean | string | null = getToken();

    // 安全认证校验获取
    appStore.getCurrentPublicKey();

    // 判断是否登录
    if (isSignIn) {
      if (to.path === '/signIn') {
        loadingBar.finish();
        return { path: '/' };
      } else {
        const currentRoutes: Array<RouteRecordRaw> = appStore.getRoutes;
        const routesLength = toRaw(currentRoutes);
        // 如果没有路由信息，则通过当前用户获取路由表
        if (routesLength.length === 0) {
          appStore.generateRoutes().then(() => {
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
    loadingBar.finish();
  });
};
