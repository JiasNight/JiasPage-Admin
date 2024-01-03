import service from '@/utils/request';

// 获取菜单列表
export const getMenuList = (data: object) => {
  return service.request({
    url: '/api/system/menu/list',
    method: 'post',
    data: data
  });
};

// 新增菜单列表
export const addMenuList = (data: object) => {
  return service.request({
    url: '/api/system/menu/add',
    method: 'post',
    data: data
  });
};

// 修改菜单
export const updateMenu = (data: object) => {
  return service.request({
    url: '/api/system/menu/update',
    method: 'post',
    data: data
  });
};

// 删除菜单
export const deleteMenu = (mId: string) => {
  return service.request({
    url: '/api/system/menu/delete/' + mId,
    method: 'get'
  });
};

