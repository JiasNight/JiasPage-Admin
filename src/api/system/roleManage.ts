import service from '@/utils/request';

// 获取角色列表
export const getRoleList = (data: object) => {
  return service.request({
    url: '/adminApi/system/role/list',
    method: 'post',
    data: data
  });
};

// 新增角色列表
export const addRoleList = (data: object) => {
  return service.request({
    url: '/adminApi/system/role/add',
    method: 'post',
    data: data
  });
};

// 修改角色
export const updateRole = (data: object) => {
  return service.request({
    url: '/adminApi/system/role/update',
    method: 'post',
    data: data
  });
};

// 删除角色
export const deleteRole = (mId: string) => {
  return service.request({
    url: '/adminApi/system/role/delete/' + mId,
    method: 'get'
  });
};
