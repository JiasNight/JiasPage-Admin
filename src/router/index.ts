import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import Layout from '@/views/layout/index.vue';

const commonRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: Layout,
    redirect: 'index',
    children: [
      {
        path: 'index',
        name: 'Index',
        meta: {
          title: '首页'
        },
        component: () => import('@/views/index.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: '登录'
    },
    component: () => import('@/views/login/index.vue')
  }
];

const router = createRouter({
  history: createWebHistory(), // History 路由
  // history: createWebHashHistory(), // Hash 路由
  routes: [...commonRoutes]
});

router.beforeEach((to, from, next) => {
  // window.$loadingBar.start();
  const isLogin = localStorage.TOKEN ? true : false;
  if (to.path === '/login') {
    next();
  } else {
    isLogin ? next() : next('/login');
  }
});

router.afterEach(() => {
  // window.$loadingBar.finish();
});

export default router;
