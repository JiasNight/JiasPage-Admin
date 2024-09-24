<template>
  <div class="view-container">
    <n-form
      ref="queryForm"
      class="container-form"
      :model="queryFormData"
      inline
      label-placement="left"
      label-width="auto"
    >
      <n-grid cols="1 s:2 m:3 l:4 xl:5 2xl:6" :x-gap="20" responsive="screen">
        <n-form-item-gi span="s:1 m:1 l:1" label="笔记名称">
          <n-input v-model:value="queryFormData.noteName" clearable placeholder="请输入笔记名称" />
        </n-form-item-gi>
        <n-form-item-gi span="s:1 m:1 l:1" label="分类">
          <n-select
            v-model:value="queryFormData.type"
            :options="noteTypeOptions"
            clearable
            placeholder="请选择分类"
          ></n-select>
        </n-form-item-gi>
        <n-form-item-gi span="s:1 m:1 l:1" label="标签">
          <n-select
            v-model:value="queryFormData.tags"
            :options="noteTagOptions"
            clearable
            placeholder="请选择标签"
          ></n-select>
        </n-form-item-gi>
        <n-form-item-gi span="1" label="创建时间">
          <n-date-picker v-model:value="queryFormData.dataRange" type="daterange" value-format="yyyy-MM-dd" clearable />
        </n-form-item-gi>
        <n-form-item-gi span="2">
          <n-space>
            <n-button attr-type="reset" @click="resetQueryFormBtn">
              <template #icon>
                <n-icon>
                  <icon-mdi:refresh></icon-mdi:refresh>
                </n-icon>
              </template>
              重 置
            </n-button>
            <n-button attr-type="submit" type="primary" @click="handleQueryTable">
              <template #icon>
                <n-icon>
                  <icon-mdi:magnify></icon-mdi:magnify>
                </n-icon>
              </template>
              查 询
            </n-button>
          </n-space>
        </n-form-item-gi>
      </n-grid>
    </n-form>

    <n-space class="container-space" justify="end">
      <n-button type="info" @click="handleAddNote">
        <template #icon>
          <n-icon>
            <icon-mdi:plus></icon-mdi:plus>
          </n-icon>
        </template>
        新 增
      </n-button>
      <n-button type="warning" @click="handleDownload">
        <template #icon>
          <n-icon>
            <icon-mdi:download></icon-mdi:download>
          </n-icon>
        </template>
        导 出
      </n-button>
    </n-space>
    <!-- 表格 -->
    <n-data-table
      :data="noteTableData"
      :columns="noteTableHeader"
      :loading="tableIsLoading"
      :row-key="tableRowKey"
      :bordered="true"
      :single-line="false"
      :default-expand-all="true"
      :pagination="pagination"
    />
    <!-- 新增和编辑内容框 -->
    <n-modal
      v-model:show="showEditNoteModal"
      class="container-card"
      preset="card"
      :title="modelTitle"
      :auto-focus="false"
      :style="{ width: '60%' }"
    >
      <n-form
        ref="noteFormRef"
        :model="noteFormData"
        :rules="noteFormRules"
        label-placement="left"
        label-width="auto"
        require-mark-placement="left"
      >
        <n-form-item label="名称" path="name">
          <n-input v-model:value="noteFormData.name" maxlength="20" placeholder="请输入笔记名称" />
        </n-form-item>
        <!-- <n-form-item label="代码" path="code">
          <n-input v-model:value="noteFormData.code" maxlength="20" placeholder="请输入笔记代码" />
        </n-form-item> -->
        <n-form-item label="模块" path="module">
          <n-select
            v-model:value="queryFormData.module"
            :options="noteModuleOptions"
            clearable
            placeholder="请选择分类"
          ></n-select>
        </n-form-item>
        <n-form-item label="分类" path="type">
          <n-select
            v-model:value="queryFormData.type"
            :options="noteTypeOptions"
            clearable
            placeholder="请选择分类"
          ></n-select>
        </n-form-item>
        <n-form-item label="标签" path="tags">
          <n-select
            v-model:value="queryFormData.tags"
            :options="noteTagOptions"
            clearable
            placeholder="请选择标签"
          ></n-select>
        </n-form-item>
        <n-form-item label="描述" path="description">
          <n-input
            v-model:value="noteFormData.description"
            type="textarea"
            :autosize="{
              minRows: 2,
              maxRows: 3,
            }"
            show-count
            maxlength="100"
            placeholder="请输入笔记描述"
          />
        </n-form-item>
        <n-form-item label="封面图片" path="cover">
          <n-upload
            ref="uploadRef"
            action="#"
            :default-file-list="previewFileList"
            :default-upload="true"
            accept=".jpg,.png"
            list-type="image-card"
            :max="1"
            :custom-request="handleCustomUpload"
            @before-upload="handleBeforeUpload"
            @change="handleChangeUpload"
          />
        </n-form-item>
        <n-form-item label="启用" path="status">
          <n-switch v-model:value="noteFormData.status" :checked-value="0" :unchecked-value="1">
            <template #checked> 是 </template>
            <template #unchecked> 否 </template>
          </n-switch>
        </n-form-item>
        <n-form-item path="status">
          <MdEditor v-model="noteFormData.mdContent" @on-save="saveMdTextBtn"></MdEditor>
        </n-form-item>
      </n-form>
      <template #footer>
        <n-space justify="end">
          <n-button type="primary" :loading="confirmLoading" @click="handleConfirm">确 定</n-button>
          <n-button type="default" @click="showEditNoteModal = false">取 消</n-button>
        </n-space>
      </template>
    </n-modal>
  </div>
</template>

<script lang="ts" setup>
import { ICON } from "@/enums/icon";
import { Ref, ComputedRef, h, Component } from "vue";
import {
  TreeOption,
  FormInst,
  DataTableColumns,
  NButton,
  NIcon,
  NTag,
  UploadInst,
  UploadFileInfo,
  UploadCustomRequestOptions,
} from "naive-ui";
import { MdEditor } from "md-editor-v3";
import "md-editor-v3/lib/style.css";
import { renderIcon, resetForm, getRandomColor } from "@/utils/common";
import { IRes } from "@/interface/common";
import useUserStore from "@/store/module/user";
import { getNoteList, addNoteList, updateNote, deleteNote } from "@/api/noteManage/myNote";

interface IQueryForm {
  name: string | null;
  module: string | null;
  type: string | null;
  tags: string | null;
  dataRange: Array<[string, string]> | null;
}

interface INoteForm {
  id: string;
  name: string;
  type: string | undefined;
  tags: Array<string>;
  module: string | undefined;
  description: string;
  status: number;
  mdContent: string;
}

let uploadRef = $ref<UploadInst | null>(null);

let previewFileList = $ref<UploadFileInfo[]>([
  {
    id: "vue",
    name: "我是vue.png",
    status: "finished",
    url: "https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg",
  },
]);

let tableIsLoading = $ref<boolean>(false);

let queryForm = $ref<FormInst | null>(null);

let queryFormData = $ref<IQueryForm>({
  name: null,
  module: null,
  type: null,
  tags: null,
  dataRange: null,
});

let showEditNoteModal = $ref<boolean>(false);

let noteModuleOptions = $ref<Array<object>>([]);

let noteTypeOptions = $ref<Array<object>>([]);

let noteTagOptions = $ref<Array<object>>([]);

let modelTitle = $ref<string>("");

let emptyNoteForm = {
  pid: "",
  id: "",
  name: "",
  code: "",
  description: "",
  status: "",
  type: null,
  tags: [],
  module: null,
  mdContent: "",
};

const noteFormRef = $ref<FormInst | null>(null);

let noteFormData = $ref<INoteForm>(JSON.parse(JSON.stringify(emptyNoteForm)));

let noteFormRules = {
  name: {
    required: true,
    trigger: ["input", "blur"],
    message: "请输入笔记名称",
  },
  module: {
    required: true,
    trigger: ["change", "blur"],
    message: "请选择所属模块",
  },
  type: {
    required: true,
    trigger: ["change", "blur"],
    message: "请选择分类",
  },
  mdContent: {
    required: true,
    trigger: ["input", "blur"],
    message: "请输入内容",
  },
};

let noteTableData = $ref<INoteForm[]>([]);

let noteTableHeader = $ref<DataTableColumns>([
  {
    title: "序号",
    key: "",
    align: "center",
    width: "60",
    render: (row, index) => {
      return index + 1;
    },
  },
  {
    title: "笔记名称",
    key: "name",
    align: "center",
  },
  {
    title: "笔记代码",
    key: "code",
    align: "center",
  },
  { title: "分类", key: "type", align: "center" },
  {
    title: "标签",
    key: "tags",
    align: "center",
    render: (rowData: any, rowIndex: number) => {
      return h(
        NTag,
        {
          size: "small",
          bordered: false,
          round: true,
          color: {
            color: getRandomColor(),
            textColor: "#fff",
          },
        },
        {
          default: () => h("span", "标签"),
        }
      );
    },
  },
  { title: "创建者", key: "createBy", align: "center" },
  { title: "创建时间", key: "createTime", align: "center", width: "200" },
  {
    title: "操作",
    key: "ops",
    align: "center",
    width: "200",
    render: (rowData: any, rowIndex: number) => {
      return h(
        NSpace,
        { justify: "center" },
        {
          default: () => [
            h(
              NButton,
              {
                text: true,
                type: "primary",
                onClick: (e) => {
                  noteFormData = JSON.parse(JSON.stringify(emptyNoteForm));
                },
              },
              {
                icon: () => h(NIcon, { size: 20, component: renderIcon(ICON.O, "mdi:print-preview") }),
                default: () => h("span", "预览"),
              }
            ),
            h(
              NButton,
              {
                text: true,
                type: "primary",
                onClick: (e: any) => {
                  let copyRow = JSON.parse(JSON.stringify(rowData));
                  noteFormData = copyRow;
                  modelTitle = "编辑";
                  showEditNoteModal = true;
                },
              },
              {
                icon: () => h(NIcon, { size: 20, component: renderIcon(ICON.O, "mdi:text-box-edit-outline") }),
                default: () => h("span", "编辑"),
              }
            ),
            h(
              NButton,
              {
                text: true,
                type: "error",
                onClick: (e: any) => {
                  window.$dialog.warning({
                    title: "警告",
                    content: "你是否确定进行删除？",
                    positiveText: "确定",
                    negativeText: "不确定",
                    onPositiveClick: () => {
                      window.$message.success("确定");
                      handleDeleteNote(rowData.id);
                    },
                    onNegativeClick: () => {
                      window.$message.error("不确定");
                    },
                  });
                },
              },
              {
                icon: () => h(NIcon, { size: 20, component: renderIcon(ICON.O, "mdi:delete") }),
                default: () => h("span", "删除"),
              }
            ),
          ],
        }
      );
    },
  },
]);

let pageInfo = {
  pageSize: 10,
  pageNum: 1,
  total: 0,
};

let pagination = reactive<object>({
  "show-size-picker": true,
  "show-quick-jumper": true,
  pageSizes: [10, 20, 30, 40],
  pageSize: pageInfo.pageSize,
  page: pageInfo.pageNum,
  itemCount: pageInfo.total,
});

let tableRowKey = (rowData: INoteForm, i: number) => {
  return rowData.id;
};

// 确定按钮是否loading
let confirmLoading = $ref<boolean>(false);

// 重置查询内容
const resetQueryFormBtn = () => {
  queryFormData = {
    noteName: null,
    type: null,
    tags: null,
    dataRange: null,
  };
  if (queryForm) queryForm.restoreValidation();
};

// 获取笔记数据
const getNoteData = (): void => {
  const data = {
    token: useUserStore().token,
  };
  tableIsLoading = true;
  getNoteList(data)
    .then((res: IRes) => {
      if (res && res.code === 200) {
        noteTableData = res.data;
        tableIsLoading = false;
      }
    })
    .catch(() => {
      tableIsLoading = false;
    });
};

// 查询
const handleQueryTable = (): void => {
  getNoteData();
};

// 新增
const handleAddNote = (): void => {
  noteFormData = JSON.parse(JSON.stringify(emptyNoteForm));
  modelTitle = "新增";
  showEditNoteModal = true;
};

// 导出
const handleDownload = (): void => {
  window.$message.warning("还未开发该功能！");
};

// 确定
const handleConfirm = (): void => {
  noteFormRef?.validate((errors) => {
    if (!errors) {
      console.log(noteFormData);
      confirmLoading = true;
      if (modelTitle === "新增") {
        addNoteList(noteFormData)
          .then((res) => {
            if (res && res.code === 200) {
              window.$message.success("新增笔记成功");
              confirmLoading = false;
              showEditNoteModal = false;
              handleQueryTable();
            }
          })
          .catch(() => {
            confirmLoading = false;
          });
      } else {
        updateNote(noteFormData)
          .then((res) => {
            if (res && res.code === 200) {
              window.$message.success("修改笔记成功");
              confirmLoading = false;
              showEditNoteModal = false;
              handleQueryTable();
            }
          })
          .catch(() => {
            confirmLoading = false;
          });
      }
    } else {
      window.$message.error("表单必填项请填写！");
    }
  });
};

// 删除
const handleDeleteNote = (mId: string): void => {
  deleteNote(mId)
    .then((res: IRes) => {
      if (res && res.code === 200) {
        window.$message.success("已删除笔记！");
        handleQueryTable();
      }
    })
    .catch(() => {
      window.$message.warning("删除笔记失败！");
    });
};

// 限制上传的图片
const handleBeforeUpload = (data: { file: UploadFileInfo; fileList: UploadFileInfo[] }) => {
  let uFile = data.file.file;
  const fileName = uFile!.name as string;
  // 允许上传的文件格式列表
  let acceptList = ["jpg", "png"];
  // 根据文件名获取文件的后缀名
  let fileType = fileName.split(".").pop()?.toLowerCase() as string;
  // 判断文件格式是否符合要求
  if (acceptList.indexOf(fileType) === -1) {
    window.$message.error("只能上传 jpg/png 格式的文件 !");
    return false;
  }
  // 判断文件大小是否符合要求
  if (uFile!.size / 1024 / 1024 > 1) {
    window.$message.error("上传文件大小不能超过 1M !");
    return false;
  }
};

// 图片改变
const handleChangeUpload = (options: { file: UploadFileInfo; fileList: Array<UploadFileInfo>; event?: Event }) => {
  // let uFile = options.file.file;
  // console.log(uFile?.size);
};

// 封面图片自定义上传
const handleCustomUpload = (options: UploadCustomRequestOptions) => {
  const { file, data, headers, withCredentials, action, onFinish, onError, onProgress } = options;
  const formData = new FormData();
  if (data) {
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key as keyof UploadCustomRequestOptions["data"]]);
    });
  }
  formData.append("file", file.file as File);
  console.log(formData);
};

// 笔记内容
const saveMdTextBtn = (e: string) => {
  console.log(e);
};

// 加载之前
onMounted(() => {
  getNoteData();
});
</script>

<style lang="scss" scoped>
.view-container {
  .container-form {
  }
  .container-space {
    margin-bottom: 0.625rem;
  }
}
</style>
