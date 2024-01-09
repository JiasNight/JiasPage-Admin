import service from '@/utils/request';

// 获取public下的JSON文件数据
export const getJSON = (path: string) => {
  return service.request({
    url: path,
    method: 'get'
  });
};

// 动态获取路由表
export const getDynamicRoutes = (user?: object) => {
  return service.request({
    url: '/api/system/routes',
    method: 'post',
    data: user
  });
};

