import service from "@/utils/request";

// 保存markdown文档
export const markdownSave = (mdData: object) => {
  return service.request({
    url: "page/md/markdownSave",
    method: "post",
    data: mdData,
  });
};

// 获取markdown
export const markdownById = (mdId: string) => {
  return service.request({
    url: "page/md/markdownById",
    method: "get",
    params: { mdId: mdId },
  });
};
