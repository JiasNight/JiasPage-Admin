import service from '@/utils/request';

// 获取用户列表
export const getUserList = (data: object) => {
  return service.request({
    url: '/adminApi/system/user/list',
    method: 'post',
    data: data
  });
};
