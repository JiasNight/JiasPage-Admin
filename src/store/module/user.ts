import { defineStore } from 'pinia';
import { userLogin, getUserInfo } from '@/api/login/index';
import { setToken, removeToken } from '@/utils/auth';
import { IUserInfo } from '@/interface/IAdmin';
import router from '@/router';
interface IUserState {
  token: string;
  userInfo: IUserInfo | any;
}

const useUserStore = defineStore({
  id: 'user', // id必填，且需要唯一
  state: (): IUserState => {
    return {
      token: '',
      userInfo: undefined
    };
  },
  actions: {
    // 用户登录
    async userLoginHandle(adminForm: object) {
      return await new Promise((resolve: any, reject: any) => {
        userLogin(adminForm).then((res) => {
          if (res && res.code === 200) {
            setToken(res.data.token, '1d');
            resolve();
          } else {
            removeToken();
            reject();
          }
        });
      });
    },
    updateName(token: string) {
      this.token = token;
    },
    // 获取当前用户信息
    getCurrentUserInfo() {
      return new Promise((resolve: any, reject: any) => {
        getUserInfo().then((res: any) => {
          if (res && res.code === 200) {
            this.userInfo = res.data;
            resolve();
          } else {
            this.userInfo = {};
            reject();
          }
        });
      });
    },
    // 退出系统
    logoutSystem() {
      removeToken();
      this.userInfo = undefined;
      router.push('/signIn');
    }
  }
});

export default useUserStore;
