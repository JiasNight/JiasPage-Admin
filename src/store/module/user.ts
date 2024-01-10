import { defineStore } from 'pinia';
import { userSignIn, getUserInfo } from '@/api/signIn/index';
import { setToken, removeToken } from '@/utils/auth';
import { IResponse, IUserInfo } from '@/interface/common';
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
  getters: {
    getUserInfo(state): IUserInfo {
      return state.userInfo;
    }
  },
  actions: {
    // 用户登录
    userSignInHandle(adminForm: any) {
      return new Promise((resolve: any, reject: any) => {
        const fd = new FormData();
        fd.append('userName', adminForm.userName);
        fd.append('password', adminForm.password);
        userSignIn(fd).then((res: IResponse) => {
          if (res && res.code === 200) {
            setToken(res.data.token);
            resolve();
          } else {
            removeToken();
            reject();
          }
        });
      });
    },
    // 获取当前用户信息
    getCurrentUserInfo() {
      return new Promise((resolve: any, reject: any) => {
        getUserInfo().then((res: any) => {
          if (res && res.code === 200) {
            this.userInfo = res.data;
            resolve(this.userInfo);
          } else {
            this.userInfo = {};
            reject(this.userInfo);
          }
        });
      });
    },
    // 退出系统
    logoutSystem() {
      removeToken();
      this.userInfo = undefined;
      localStorage.clear();
      router.push('/signIn');
    }
  }
});

export default useUserStore;
