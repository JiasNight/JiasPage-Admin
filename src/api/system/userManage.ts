import service from "@/utils/request";

// 获取用户列表
export const getUserList = (data: object) => {
  return service.request({
    url: "/adminApi/system/user/list",
    method: "post",
    data: data,
  });
};

// 新增用户
export const newAddUser = (data: object) => {
  return service.request({
    url: "/adminApi/system/user/add",
    method: "post",
    data: data,
  });
};

// 编辑用户
export const updateUser = (data: object) => {
  return service.request({
    url: "/adminApi/system/user/update",
    method: "post",
    data: data,
  });
};

// 删除用户
export const deleteUser = (uId: string) => {
  return service.request({
    url: "/adminApi/system/user/delete/" + uId,
    method: "get",
  });
};
