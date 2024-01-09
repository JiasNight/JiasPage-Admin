import { defineStore } from 'pinia';
import { createDiscreteApi } from 'naive-ui';
import { RouteLocationNormalizedLoaded, RouteRecordRaw } from 'vue-router';
import { getDynamicRoutes } from '@/api/app';
import { getToken } from '@/utils/auth';
import Layout from '@/layout/index.vue';
import useTagStore from '@/store/module/tag';
import useUserStore from '@/store/module/user';
import router from '@/router';

const { loadingBar } = createDiscreteApi(['loadingBar']);

const modules = import.meta.glob('../../views/**/*.vue');

type IAppState = {
  theme: boolean;
  language: string;
  reloadViews: boolean;
  routes: Array<RouteRecordRaw>;
  currentRoute: object;
};

const useAppStore = defineStore({
  id: 'app', // id必填，且需要唯一
  state: (): IAppState => ({
    // theme: window.matchMedia('(prefers-color-scheme: dark)').matches,
    theme: false,
    language: (window.navigator.languages && window.navigator.languages[0]) || window.navigator.language,
    reloadViews: false,
    // 路由表
    routes: [] as Array<RouteRecordRaw>,
    currentRoute: {}
  }),
  getters: {
    getTheme: (state) => state.theme,
    getLanguage: (state) => state.language,
    getReloadViews(state): boolean {
      return state.reloadViews;
    },
    // 获取所有路由信息
    getRoutes(state): [] | Array<RouteRecordRaw> {
      return state.routes;
    },
    // 获取当前路由信息
    getCurrentRoute(state): object | undefined {
      return state.currentRoute;
    }
  },
  actions: {
    // 重新加载页面
    reloadPage() {
      loadingBar.start();
      this.reloadViews = true;
      nextTick(() => {
        this.reloadViews = false;
        loadingBar.finish();
      });
      setTimeout(() => {
        document.documentElement.scrollTo({ left: 0, top: 0 });
      }, 100);
    },
    // 模式切换
    setTheme() {
      this.theme = !this.theme;
    },
    // 语言切换
    setLanguage(language: string) {
      this.language = language;
      localStorage.setItem('language', language);
    },
    // 设置当前路由内容
    setCurrentRoute(route: RouteLocationNormalizedLoaded) {
      this.currentRoute = route;
      useTagStore().setActiveTag(route);
    },
    // 设置路由
    setRouters(routes: Array<any>) {
      // const rList = JSON.parse(localStorage.getItem('routerList'));
      if (routes && routes.length > 0) {
        routes.forEach((route) => {
          const rName = route.name;
          if (!router.hasRoute(rName)) {
            this.routes.push(route);
            router.addRoute(route);
          }
        });
      }
    },
    // 添加动态路由，并同步到状态管理器中
    addRoutes(data: Array<RouteRecordRaw>) {
      const routerArray: any = recursionRouter(data);
      console.log(routerArray);
      this.setRouters(routerArray);
      console.log('5.生成路由之后');
      // console.log('5.1.生成路由之后' + JSON.stringify(router.getRoutes()));
    },
    // 生成路由
    async generateRoutes() {
      // 获取当前用户信息
      const userInfo = await useUserStore().getCurrentUserInfo();
      console.log('3.获取到当前用户信息');
      // 通过当前用户的角色获取到菜单列表并且生成菜单路由
      await getDynamicRoutes({ token: getToken() })
        .then((res: any) => {
          if (res && res.code === 200) {
            const rList = res.data;
            console.log(rList);
            console.log('4.获取到路由');
            // 存储路由信息
            localStorage.setItem('routerList', JSON.stringify(rList));
            // 添加到路由里面
            this.addRoutes(rList);
          }
        })
        .catch(() => {});
    }
  }
});

function loadView(view: any) {
  let res;
  for (const path in modules) {
    const dir = path.split('views')[1].split('.vue')[0];
    if (dir === view) {
      res = () => modules[path]();
    }
  }
  return res;
}

// 递归循环从后端获取到的路由添加布局
function recursionRouter(routeList: Array<any>) {
  const newRouter = null;
  routeList.forEach((item: any) => {
    const routes = JSON.parse(JSON.stringify(item));
    if (item.component && item.component !== '') {
      item.component = loadView(item.component);
    } else {
      item.component = Layout;
    }
    if (item.children && item.children.length > 0) {
      routes.children = recursionRouter(item.children);
    }
    return routes;
  });
  return newRouter;
}

export default useAppStore;
