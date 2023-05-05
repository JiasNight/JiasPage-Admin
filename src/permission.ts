import { useRouter } from 'vue-router';
import router from '@/router/';
import useAppStore from '@/store/module/app';
import { createDiscreteApi } from 'naive-ui';
import { getDynamicRoutes } from '@/api/app';

const { loadingBar } = createDiscreteApi(['loadingBar']);

// 路由白名单
const whiteList = ['/signIn'];

router.beforeEach((to, from, next) => {
  loadingBar.start();
  const isLogin: boolean = sessionStorage.getItem('token') ? true : false;
  if (isLogin) {
    if (to.path === '/login') {
      next({ path: '/' });
      loadingBar.finish();
    } else {
      console.log(isLogin);
      getDynamicRoutes().then((res: any) => {
        console.log(res);
        useAppStore().addRoutes(res.data, useRouter());
        console.log(useRouter().getRoutes());
      });
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
