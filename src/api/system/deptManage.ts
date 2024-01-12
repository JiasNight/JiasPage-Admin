import service from '@/utils/request';

// 获取部门列表
export const getDeptList = (data: object) => {
  return service.request({
    url: '/api/system/dept/list',
    method: 'post',
    data: data
  });
};

// 新增部门列表
export const addDeptList = (data: object) => {
  return service.request({
    url: '/api/system/dept/add',
    method: 'post',
    data: data
  });
};

// 修改部门
export const updateDept = (data: object) => {
  return service.request({
    url: '/api/system/dept/update',
    method: 'post',
    data: data
  });
};

// 删除部门
export const deleteDept = (mId: string) => {
  return service.request({
    url: '/api/system/dept/delete/' + mId,
    method: 'get'
  });
};
