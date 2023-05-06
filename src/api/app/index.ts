import service from '@/utils/request';

// 动态获取路由表
export const getDynamicRoutes = (user?: object) => {
  return service.axios({
    url: '/api/system/routes',
    method: 'post',
    data: user
  });
};

