import { defineStore } from 'pinia';
import { useRouter, RouteLocationNormalizedLoaded, RouteRecordRaw } from 'vue-router';
import router from '@/router';
import { getDynamicRoutes } from '@/api/app';
import { getToken } from '@/utils/auth';
import Layout from '@/layout/index.vue';

const modules = import.meta.glob('../../views/**/*.vue');

// const router = useRouter();

type IAppState = {
  theme: boolean;
  language: string;
  pageLoading: boolean;
  pageKeys: object;
  routes: Array<RouteRecordRaw>;
  currentRoute: object;
  pageTags: Array<object>
};

const useAppStore = defineStore({
  id: 'app', // id必填，且需要唯一
  state: (): IAppState => ({
    // theme: window.matchMedia('(prefers-color-scheme: dark)').matches,
    theme: false,
    language: (window.navigator.languages && window.navigator.languages[0]) || window.navigator.language,
    pageLoading: false,
    pageKeys: {},
    // 路由表
    routes: [] as Array<RouteRecordRaw>,
    currentRoute: {},
    pageTags: []
  }),
  getters: {
    getTheme(state): boolean {
      return state.theme;
    },
    getLanguage(state): string {
      return state.language;
    },
    // 获取所有路由信息
    getRoutes(state): [] | Array<RouteRecordRaw> {
      return state.routes;
    },
    // 获取当前路由信息
    getCurrentRoute(state): object | undefined {
      return state.currentRoute;
    },
    // 获取当前路由信息
    getPageTags(state): [] | Array<any> {
      return state.pageTags;
    }
  },
  actions: {
    // 重新加载页面
    async reloadPage() {
      // $loadingBar.start();
      this.pageLoading = false;
      await nextTick();
      this.pageLoading = true;

      setTimeout(() => {
        document.documentElement.scrollTo({ left: 0, top: 0 });
        // $loadingBar.finish();
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
      console.log(route);
      this.setPageTags(route);
    },
    // 添加动态路由，并同步到状态管理器中
    addRoutes(data: Array<RouteRecordRaw>) {
      recursionRouter(data);
      data.forEach(item => {
        router.addRoute(item);
        this.routes.push(item);
      });
      // console.log(router.getRoutes());
    },
    // 生成路由
    generateRoutes() {
      return new Promise((resolve: any, reject: any) => {
        getDynamicRoutes({ token: getToken() })
          .then((res: any) => {
            if (res && res.code === 200) {
              this.addRoutes(res.data);
              resolve();
            }
          })
          .catch(() => {
            reject();
          });
      });
    },
    // 标签页变动
    setPageTags(tag: any) {
      if (this.pageTags.length === 0) {
        this.pageTags.push(tag);
      } else {
        for (let i = 0; i < this.pageTags.length; i++) {
          const item: any = this.pageTags[i];
          if (item.path === tag.path) {
            continue;
          } else {
            this.pageTags.push(tag);
          }
        }
      }
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

function recursionRouter(routeList: Array<any>) {
  routeList.forEach((item: any) => {
    if (item.component && item.component !== '') {
      item.component = loadView(item.component);
    } else {
      item.component = Layout;
    }
    if (item.children && item.children.length > 0) {
      recursionRouter(item.children);
    }
  });
}


export default useAppStore;
