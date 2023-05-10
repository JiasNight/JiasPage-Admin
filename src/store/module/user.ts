import { defineStore } from 'pinia';
import { userLogin, getUserInfo } from '@/api/login/index';
import { setToken, removeToken } from '@/utils/auth';
import router from '@/router';

type IUserInfo = {
  token: string;
  userInfo: object;
};

const useUserStore = defineStore({
  id: 'user', // id必填，且需要唯一
  state: (): IUserInfo => {
    return {
      token: '',
      userInfo: {}
    };
  },
  actions: {
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
    }
  }
});

export default useUserStore;
