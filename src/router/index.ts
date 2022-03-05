import type { App } from 'vue';
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Layout from '@/layout/index.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Index",
    component: Layout,
  }
];

const router = createRouter({
  history: createWebHistory(), // History 路由
  // history: createWebHashHistory(), // Hash 路由
  // base: process.env.BASE_URL,
  routes: [...routes]
});

// router.beforeEach((to, from, next) => {
//   window.$loadingBar.start();
//   const isLogin = localStorage.TOKEN ? true : false;
//   if (to.path == '/login') {
//     next();
//   } else {
//     isLogin ? next() : next('/login');
//   }
// });

// router.afterEach(() => {
//   window.$loadingBar.finish();
// });

export default router;
