import service from "@/utils/request";

// 获取笔记列表
export const getNoteList = (data: object) => {
  return service.request({
    url: "/api/note/list",
    method: "post",
    data: data,
  });
};

// 新增笔记列表
export const addNoteList = (data: object) => {
  return service.request({
    url: "/api/note/add",
    method: "post",
    data: data,
  });
};

// 修改笔记
export const updateNote = (data: object) => {
  return service.request({
    url: "/api/note/update",
    method: "post",
    data: data,
  });
};

// 删除笔记
export const deleteNote = (mId: string) => {
  return service.request({
    url: "/api/note/delete/" + mId,
    method: "get",
  });
};
