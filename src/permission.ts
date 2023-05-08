import router from '@/router/';
import useAppStore from '@/store/module/app';
import useUserStore from '@/store/module/user';
import { createDiscreteApi } from 'naive-ui';
import { getToken } from './utils/auth';

const { loadingBar } = createDiscreteApi(['loadingBar']);

// 路由白名单
const whiteList = ['/signIn'];

router.beforeEach((to, from, next) => {
  loadingBar.start();
  const isLogin: boolean = getToken() ? true : false;
  if (isLogin) {
    const token = getToken();
    if (to.path === '/login') {
      next({ path: '/' });
      loadingBar.finish();
    } else {
      useUserStore()
        .getCurrentUserInfo()
        .then(() => {
          useAppStore()
            .generateRoutes()
            .then(() => {
              console.log(to);
            });
        });
      // getDynamicRoutes({ token }).then((res: any) => {
      //   // useAppStore().addRoutes(res.data, router);
      //   console.log(res.data);
      //   router.addRoute(res.data);
      //   console.log(router.getRoutes());
      //   // next({ ...to, replace: true });
      // });
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next(`/signIn?redirect=${to.fullPath}`);
    }
  }
});

router.afterEach(() => {
  loadingBar.finish();
});
