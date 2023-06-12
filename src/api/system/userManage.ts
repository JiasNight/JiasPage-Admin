import service from '@/utils/request';

// 获取机构树
export const getDeptTree = (data: object) => {
  return service.request({
    url: '/api/system/getDept',
    method: 'post',
    data: data
  });
};

// 获取用户列表
export const getUserList = (data: object) => {
  return service.request({
    url: '/api/system/getUsers',
    method: 'post',
    data: data
  });
};
