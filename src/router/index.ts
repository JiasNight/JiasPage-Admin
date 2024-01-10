import { createRouter, createWebHistory, createWebHashHistory, RouteRecordRaw, Router } from 'vue-router';

// 布局
const Layout = () => import('@/layout/index.vue');

// 静态路由
export const commonRoutes: Array<RouteRecordRaw> = [
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
        component: () => import('@/views/dashboard/index.vue')
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
  },
  {
    path: '/signUp',
    name: 'SignUp',
    meta: {
      title: '注册'
    },
    component: () => import('@/views/signUp/index.vue')
  },
  {
    path: '/personalCenter',
    name: 'PersonalCenter',
    meta: {
      title: '个人中心'
    },
    component: () => import('@/views/personalCenter/index.vue')
  },
  {
    path: '/404',
    name: '404',
    meta: {
      title: '404'
    },
    component: () => import('@/views/abnormal/404.vue')
  },
  {
    path: '/500',
    name: '500',
    meta: {
      title: '500'
    },
    component: () => import('@/views/abnormal/500.vue')
  },
  {
    path: '/:catchAll(.*)', // 自动匹配不识别的path 404
    redirect: '/404'
  }
];

const router: Router = createRouter({
  history: createWebHistory(), // History 路由，无#号
  // history: createWebHashHistory(), // Hash 路由
  routes: commonRoutes,
  scrollBehavior() {
    return {
      el: '#app',
      top: 0,
      behavior: 'smooth'
    };
  }
});

// 路由权限设置
// setupPermission(router);

export default router;
