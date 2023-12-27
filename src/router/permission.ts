import useAppStore from '@/store/module/app';
import useUserStore from '@/store/module/user';
import { createDiscreteApi } from 'naive-ui';
import { getToken } from '../utils/auth';

const { loadingBar } = createDiscreteApi(['loadingBar']);
// 路由白名单
const whiteList: Array<String> = ['/signIn'];

export const setupPermission = (router: any) => {
  let load = 0;
  router.beforeEach(async (to: any, from: any) => {
    loadingBar.start();
    const appStore = useAppStore();
    const userStore = useUserStore();
    const isLogin: boolean | string | null = getToken();
    console.log(appStore.routes);

    // 判断是否登录
    if (isLogin) {
      if (to.name === 'SignIn') {
        loadingBar.finish();
        // return { path: '/' };
      } else {
        // 如果没有路由信息，则通过当前用户获取路由表
        if (appStore.routes.length === 0 || load === 0) {
          const getUser = userStore.getCurrentUserInfo();
          getUser
            .then(() => {
              load++;
              appStore.generateRoutes().then(async () => {
                return { to, replace: true };
              });
            })
            .catch(() => {
              return { path: '/signIn' };
            });
        } else {
          return to;
        }
      }
    } else {
      console.log('走这里了');
      // 没有token的情况下，判断是否白名单页面
      // if (whiteList.indexOf(to.path) !== -1) {
      //   return to;
      // } else {
      //   return { path: '/signIn' };
      // }
    }
  });
  router.afterEach(() => {
    loadingBar.finish();
  });
};
