export default [
  {
    path: '/',
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
