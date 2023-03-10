import service from '@/utils/request';

// 获取AesKey
export const getAesKey = () => {
  return service.axios({
    url: '/api/system/aesKey',
    method: 'get'
  });
};

// 获取验证码
export const getValidateCode = () => {
  return service.axios({
    url: '/api/user/validateCode',
    method: 'get'
  });
};

// 用户登录
export const userLogin = async (userLoginForm: object) => {
  return await service.axios({
    url: '/api/user/login',
    method: 'post',
    data: userLoginForm
  });
};
