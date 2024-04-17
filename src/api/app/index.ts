import service from '@/utils/request';

// 获取public下的JSON文件数据
export const getJSON = (path: string) => {
  return service.request({
    url: path,
    method: 'get'
  });
};

// 获取后端形成的加密公钥
export const getPublicKey = () => {
  return service.request({
    url: '/authApi/security/pKey',
    method: 'get'
  });
};

// 动态获取路由表
export const getDynamicRoutes = () => {
  return service.request({
    url: '/adminApi/system/routes',
    method: 'get'
  });
};
