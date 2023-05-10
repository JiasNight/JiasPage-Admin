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
    if (to.path === '/login') {
      next({ path: '/' });
      loadingBar.finish();
    } else {
      if (useAppStore().routes.length === 0) {
        useUserStore()
          .getCurrentUserInfo()
          .then(() => {
            useAppStore()
              .generateRoutes()
              .then(() => {
                next();
              });
          });
      } else {
        next();
      }
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
