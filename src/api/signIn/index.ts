import service from '@/utils/request';
import getEnvApi from '@/utils/envApi';

// 获取验证码
export const getValidateCode = () => {
  return service.request({
    url: 'authApi/user/validateCode',
    method: 'get'
  });
};

// 用户登录
export const userSignIn = (userSignInForm: object) => {
  return service.request({
    url: 'authApi/user/signIn',
    method: 'post',
    data: userSignInForm
  });
};

// 获取用户信息
export const getUserInfo = (token: string) => {
  return service.request({
    url: 'authApi/user/getInfo',
    method: 'get',
    params: { token: token }
  });
};
