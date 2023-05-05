import { defineStore } from 'pinia';
import { userLogin } from '@/api/login/index';

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
    }
  }
});

export default useUserStore;
