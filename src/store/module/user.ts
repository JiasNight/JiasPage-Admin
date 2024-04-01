import { defineStore } from 'pinia';
import { userSignIn, getUserInfo } from '@/api/signIn/index';
import { setToken, removeToken } from '@/utils/auth';
import { IRes, IUserInfo } from '@/interface/common';
import { aesUtil, rsaUtil } from '@/utils/common/security';
import router from '@/router';
import { getToken } from '@/utils/auth';

interface IUserState {
  token: string;
  userInfo: IUserInfo | null;
}

const useUserStore = defineStore({
  id: 'user', // id必填，且需要唯一
  state: (): IUserState => {
    return {
      token: '',
      userInfo: null
    };
  },
  getters: {
    getUserInfo(state): IUserInfo | null {
      return state.userInfo;
    }
  },
  actions: {
    // 用户登录
    userSignInHandler(adminForm: any) {
      return new Promise((resolve: any, reject: any) => {
        const copyAdminForm = JSON.parse(JSON.stringify(adminForm));
        copyAdminForm.password = aesUtil.encrypt(copyAdminForm.password);
        userSignIn(copyAdminForm).then((res: IRes) => {
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
    async getCurrentUserInfo() {
      return new Promise((resolve: any, reject: any) => {
        const token = getToken();
        getUserInfo(token).then((res: IRes) => {
          if (res && res.code === 200) {
            this.userInfo = res.data;
            resolve(this.userInfo);
          } else {
            this.userInfo = null;
            reject(this.userInfo);
          }
        });
      });
    },
    // 退出系统
    logoutSystem() {
      removeToken();
      this.userInfo = null;
      localStorage.clear();
      router.push('/signIn');
    }
  },
  // 所有数据持久化
  // persist: true
  persist: {
    // 存储storage的键名称，默认用当前store的id
    key: 'userInfo',
    // 修改存储，默认为localStorage，可修改为sessionStorage
    storage: localStorage,
    // 指定 state 中哪些数据需要被持久化,[] 表示不持久化任何状态，undefined 或 null 表示持久化整个 state。
    paths: ['userInfo']
  }
});

export default useUserStore;
