import { defineStore } from 'pinia';
import { createDiscreteApi } from 'naive-ui';
import { RouteLocationNormalizedLoaded, RouteRecordRaw } from 'vue-router';
import { getDynamicRoutes } from '@/api/app';
import { getToken } from '@/utils/auth';
import { getPublicKey } from '@/api/app/index';
import { IRes } from '@/interface/common';
import Layout from '@/layout/index.vue';
import useTagStore from '@/store/module/tag';
import useUserStore from '@/store/module/user';
import router from '@/router';

const { loadingBar } = createDiscreteApi(['loadingBar']);

const modules = import.meta.glob('../../views/**/*.vue');

type IAppState = {
  theme: boolean;
  language: string;
  collapsedSider: boolean;
  reloadViews: boolean;
  routes: Array<RouteRecordRaw>;
  currentRoute: object;
  breadcrumbs: Array<RouteRecordRaw>;
};

const useAppStore = defineStore({
  id: 'app', // id必填，且需要唯一
  state: (): IAppState => ({
    // theme: window.matchMedia('(prefers-color-scheme: dark)').matches,
    theme: false,
    language: (window.navigator.languages && window.navigator.languages[0]) || window.navigator.language,
    // 菜单栏是否折叠
    collapsedSider: false,
    reloadViews: false,
    // 路由表
    routes: [] as Array<RouteRecordRaw>,
    // 当前页面的路由
    currentRoute: {},
    // 面包屑数据
    breadcrumbs: [] as Array<RouteRecordRaw>
  }),
  getters: {
    getTheme: (state) => state.theme,
    getLanguage: (state) => state.language,
    getCollapsedSider: (state) => state.collapsedSider,
    getReloadViews(state): boolean {
      return state.reloadViews;
    },
    // 获取所有路由信息
    getRoutes(state): Array<RouteRecordRaw> {
      return state.routes;
    },
    // 获取当前路由信息
    getCurrentRoute(state): object | undefined {
      return state.currentRoute;
    },
    // 获取面包屑数据
    getBreadcrumbs(state): Array<RouteRecordRaw> {
      return state.breadcrumbs;
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
    // 设置菜单栏折叠
    setCollapsedSider(collapsed: boolean) {
      this.collapsedSider = collapsed;
    },
    // 设置当前路由内容
    setCurrentRoute(route: RouteLocationNormalizedLoaded) {
      this.currentRoute = route;
      useTagStore().setActiveTag(route);
    },
    // 设置路由
    setRoutes(routeList: Array<any>) {
      if (routeList && routeList.length > 0) {
        routeList.forEach((route) => {
          const rName = route.name;
          if (!router.hasRoute(rName)) {
            this.routes.push(route);
            router.addRoute(route);
          }
        });
      }
    },
    // 添加动态路由，并同步到状态管理器中data: Array<RouteRecordRaw>
    addRoutes() {
      const rList: any = JSON.parse(localStorage.getItem('routeList') as any);
      if (rList) {
        recursionRouter(rList);
        this.setRoutes(rList);
      }
    },
    // 生成路由
    async generateRoutes() {
      // 获取当前用户信息
      await useUserStore().getCurrentUserInfo();
      // 通过当前用户的角色获取到菜单列表并且生成菜单路由
      await getDynamicRoutes()
        .then((res: IRes) => {
          if (res && res.code === 200) {
            const rList = res.data;
            // 存储路由信息
            localStorage.setItem('routeList', JSON.stringify(rList));
            // 添加到路由里面
            this.addRoutes();
          }
        })
        .catch(() => {});
    },
    // 获取加密公钥
    getCurrentPublicKey() {
      const sessionPKey = localStorage.getItem('pKey');
      if (!sessionPKey) {
        getPublicKey()
          .then((res: IRes) => {
            if (res && res.code === 200) {
              const pKey = res.data.pKey;
              localStorage.setItem('pKey', pKey);
            }
          })
          .catch(() => {});
      }
    }
  },
  // 所有数据持久化
  // persist: true
  persist: {
    // 存储storage的键名称，默认用当前store的id
    key: 'activeRouter',
    // 修改存储，默认为localStorage，可修改为sessionStorage
    storage: localStorage,
    // 指定 state 中哪些数据需要被持久化,[] 表示不持久化任何状态，undefined 或 null 表示持久化整个 state。
    paths: ['currentRoute']
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
