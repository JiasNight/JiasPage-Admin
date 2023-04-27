import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import router from '@/router/';
import useUserStore from '@/store/module/user';
import { createDiscreteApi } from 'naive-ui';

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
      useUserStore()
      .getUserRouter()
      .then((res) => {
        console.log(res);
      });
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next(`/login?redirect=${to.fullPath}`);
    }
  }
});

router.afterEach(() => {
  loadingBar.finish();
});
