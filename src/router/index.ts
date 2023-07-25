import { createRouter, createWebHistory, createWebHashHistory, RouteRecordRaw } from 'vue-router';

import Layout from '@/layout/index.vue';

// 引入模块路由
// import baseRouters from './modules/base';

// 公共路由
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
        component: () => import('@/views/index.vue')
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
    path: '/:catchAll(.*)', // 自动匹配不识别的path 404
    redirect: '/404'
  }
  // {
  //   path: '/system',
  //   name: 'SystemManage',
  //   meta: {
  //     title: '系统管理'
  //   },
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'menuManage',
  //       name: 'MenuManage',
  //       meta: {
  //         title: '菜单管理'
  //       },
  //       component: () => import('@/views/system/menuManage/index.vue')
  //     },
  //     {
  //       path: 'userManage',
  //       name: 'UserManage',
  //       meta: {
  //         title: '菜单管理'
  //       },
  //       component: () => import('@/views/system/userManage/index.vue')
  //     }
  //   ]
  // }
];

export const customRoutes: Array<RouteRecordRaw> = [
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
      }
    ]
  },
  {
    path: '/article',
    name: 'ArticleManage',
    meta: {
      title: '文章管理'
    },
    component: Layout,
    children: [
      {
        path: 'releaseArticle',
        name: 'ReleaseArticle',
        meta: {
          title: '发布文章'
        },
        component: () => import('@/views/article/index.vue')
      }
    ]
  },
  {
    path: '/system',
    name: 'SystemManage',
    meta: {
      title: '系统管理'
    },
    component: Layout,
    children: [
      {
        path: 'userManage',
        name: 'UserManage',
        meta: {
          title: '用户管理'
        },
        component: () => import('@/views/system/userManage/index.vue')
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(), // History 路由，无#号
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

export default router;
