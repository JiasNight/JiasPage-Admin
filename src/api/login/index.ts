import service from '@/utils/request';

// 获取AesKey
export const getAesKey = () => {
  return service.request({
    url: '/api/system/aesKey',
    method: 'get'
  });
};

// 获取验证码
export const getValidateCode = () => {
  return service.request({
    url: '/api/user/validateCode',
    method: 'get'
  });
};

// 用户登录
export const userLogin = async (userLoginForm: object) => {
  return await service.request({
    url: '/api/user/login',
    method: 'post',
    data: userLoginForm
  });
};

// 获取用户信息
export const getUserInfo = () => {
  return service.request({
    url: '/api/user/info',
    method: 'get'
  });
};
