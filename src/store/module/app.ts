import { defineStore } from 'pinia';
import { RouteRecordRaw } from 'vue-router';
import router from '@/router';
import { getDynamicRoutes } from '@/api/app';
import { getToken } from '@/utils/auth';

const modules = import.meta.glob('../../views/**/*.vue');

type IAppState = {
  theme: boolean;
  language: string;
  pageLoading: boolean;
  pageKeys: object;
  routes: Array<RouteRecordRaw>;
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
    routes: [] as Array<RouteRecordRaw>
  }),
  getters: {
    getTheme(state): boolean {
      return state.theme;
    },
    getLanguage(state): string {
      return state.language;
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
    // 添加动态路由，并同步到状态管理器中
    addRoutes(data: Array<any>, router: any) {
      data.forEach((m) => {
        this.routes.push({
          path: m.path,
          name: m.name,
          // 错误示例：components:()=>import(`../views/Pages/${m.component}`)
          // 正确示例如下：
          component: modules[`../../views/${m.component}`]
        });
      });

      console.log(this.routes);
      this.routes.forEach((m) => router.addRoute(m));
      // commonRoutes.forEach((m) => router.addRoute(m));
    },
    // 生成路由
    generateRoutes() {
      return new Promise((resolve: any, reject: any) => {
        getDynamicRoutes({ token: getToken() })
          .then((res: any) => {
            if (res && res.code === 200) {
              // router.addRoute(res.data);
              this.addRoutes(res.data, router);
              console.log(router.getRoutes());
              resolve();
            }
          })
          .catch(() => {
            reject();
          });
      });
    }
  }
});

function generateRouter(routers: Array<RouteRecordRaw>) {
  routers.forEach((route: RouteRecordRaw) => {
    router.addRoute(route);
  });
}

// 遍历后台传来的路由字符串，转换为组件对象
export function filterAsyncRouter(asyncRouterMap: any, lastRouter = false, type = false) {
  // filter() 创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素
  return asyncRouterMap.filter((route: any) => {
    if (route.component) {
      route.component = loadView(route.component);
    }
    if (route.children != null && route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children, route, type);
    } else {
      delete route['children'];
      delete route['redirect'];
    }
    return true;
  });
}

export const loadView = (view: any) => {
  let res;
  for (const path in modules) {
    const dir = path.split('view')[1].split('.vue')[0];
    if (dir === view) {
      res = () => modules[path]();
    }
  }
  return res;
};

export default useAppStore;
