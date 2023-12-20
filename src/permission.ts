import router from '@/router/';
import useAppStore from '@/store/module/app';
import useUserStore from '@/store/module/user';
import { createDiscreteApi } from 'naive-ui';
import { getToken } from './utils/auth';

const { loadingBar } = createDiscreteApi(['loadingBar']);
// 路由白名单
const whiteList: Array<String> = ['/signIn'];

let load = 0;
router.beforeEach((to, from, next) => {
  loadingBar.start();
  const appStore = useAppStore();
  const userStore = useUserStore();
  const isLogin: boolean | string | null = getToken();
  // 判断是否登录
  if (isLogin) {
    if (to.path === '/signIn') {
      next({ path: '/' });
      loadingBar.finish();
    } else {
      // 如果没有路由信息，则通过当前用户获取路由表
      if (appStore.routes.length === 0 || load === 0) {
        const getUser = userStore.getCurrentUserInfo();
        getUser
          .then(() => {
            load++;
            appStore.generateRoutes().then(async () => {
              await next({ ...to, replace: true });
            });
          })
          .catch(() => {
            next('/signIn');
          });
      } else {
        next();
      }
    }
  } else {
    // 没有token的情况下，判断是否白名单页面
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next('/signIn');
    }
  }
});

router.afterEach(() => {
  loadingBar.finish();
});
