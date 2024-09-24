import service from "@/utils/request";

// 获取机构树
export const getDeptList = () => {
  return service.request({
    url: "/adminApi/system/dept/list",
    method: "get",
  });
};

// 新增部门列表
export const addDeptList = (data: object) => {
  return service.request({
    url: "/adminApi/system/dept/add",
    method: "post",
    data: data,
  });
};

// 修改部门
export const updateDept = (data: object) => {
  return service.request({
    url: "/adminApi/system/dept/update",
    method: "post",
    data: data,
  });
};

// 删除部门
export const deleteDept = (dId: string) => {
  return service.request({
    url: "/adminApi/system/dept/delete/" + dId,
    method: "get",
  });
};
