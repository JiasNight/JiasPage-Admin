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

