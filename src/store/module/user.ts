import { defineStore } from 'pinia';
import { userLogin } from '@/api/login/index';
import router, { commonRoutes } from '@/router/index';
import { RouteRecordRaw } from 'vue-router';

type IUserInfo = {
  id: string;
  token: string;
};

const useUserStore = defineStore({
  id: 'user', // id必填，且需要唯一
  state: (): IUserInfo => {
    return {
      id: '',
      token: ''
    };
  },
  actions: {
    userLoginHandle(adminForm: object) {
      userLogin(adminForm).then((res) => {
        console.log(res + '登录成功');
      });
    },
    updateName(token: string) {
      this.token = token;
    },
    // 获取路由
    async getUserRouter() {
      console.log(commonRoutes);
      return new Promise((resolve, reject) => {
        const routerList = generateRouter(commonRoutes);
        resolve(routerList);
      });
    }
  }
});

function generateRouter(routers: Array<RouteRecordRaw>) {
  routers.forEach((route: RouteRecordRaw) => {
    router.addRoute(route);
  });
}

export default useUserStore;
