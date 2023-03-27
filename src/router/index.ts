import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import Layout from '@/views/layout/index.vue';

// import { progressStart, progressEnd } from '@/utils/nporgress';
// 引入模块路由
// import baseRouters from './modules/base';

const commonRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: Layout,
    redirect: '/index',
    children: [
      {
        path: '/index',
        name: 'Index',
        meta: {
          title: '首页'
        },
        component: () => import('@/views/index.vue')
      },
      {
        path: '/system',
        name: 'System',
        meta: {
          title: '系统管理'
        },
        children: [
          {
            path: '/userManage',
            name: 'UserManage',
            meta: {
              title: '用户管理'
            },
            component: () => import('@/views/system/userManage/index.vue')
          }
        ]
      }
    ]
  },
  {
    path: '/signIn',
    name: 'SignIn',
    meta: {
      title: '登录'
    },
    component: () => import('@/views/signIn/index.vue')
  }
];

const router = createRouter({
  history: createWebHistory(), // History 路由
  // history: createWebHashHistory(), // Hash 路由
  routes: [...commonRoutes],
  scrollBehavior() {
    return {
      el: '#app',
      top: 0,
      behavior: 'smooth'
    };
  }
});

router.beforeEach((to, from, next) => {
  // progressStart();
  const isLogin = sessionStorage.getItem('token') ? true : false;
  if (to.path === '/signIn') {
    next();
  } else {
    isLogin ? next() : next('/signIn');
  }
});

router.afterEach(() => {
  // progressEnd();
});

export default router;
