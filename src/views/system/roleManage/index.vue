<template>
  <div class="view-container q-pa-sm">
    <MyForm ref="queryFormRef" v-model="queryFormData" label-width="80px" layout="horizontal">
      <MyFormItem label="角色名称">
        <q-input v-model="queryFormData.name" class="w-200" outlined dense clearable placeholder="请输入角色名称">
        </q-input>
      </MyFormItem>
      <MyFormItem label="角色代码">
        <q-input v-model="queryFormData.code" class="w-200" outlined dense clearable placeholder="请输入角色代码">
        </q-input>
      </MyFormItem>
      <MyFormItem label="创建时间">
        <q-input v-model="queryFormData.createDate" class="w-200" outlined dense clearable placeholder="请选择日期">
          <template #append>
            <q-icon :name="mdiCalendar" class="cursor-pointer">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-date v-model="queryFormData.createDate" minimal mask="YYYY-MM-DD">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="确定" color="primary" />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </MyFormItem>
      <MyFormItem>
        <div class="row items-center q-gutter-x-sm">
          <q-btn label="查询" color="primary" :icon="mdiMagnify" @click="handleQueryTableBtn" />
          <q-btn label="重置" color="info" :icon="mdiRestore" @click="resetQueryFormBtn" />
        </div>
      </MyFormItem>
    </MyForm>

    <div class="row items-center q-my-md q-gutter-x-sm">
      <q-btn color="accent" :icon="mdiPlus" label="新增" @click="handleAddRole"> </q-btn>
      <q-btn color="info" :icon="mdiDownload" label="导出" @click="handleDownload"> </q-btn>
    </div>
    <q-table
      :loading="tableIsLoading"
      :rows="roleTableData"
      :columns="roleTableHeaderColumns"
      row-key="roleId"
      separator="horizontal"
      flat
      bordered
      :pagination="pageInfo"
      :rows-per-page-options="[10, 20, 50, 100]"
    >
      <template #loading>
        <q-inner-loading showing color="primary" />
      </template>
      <template #body-cell-ops="props">
        <q-td :props="props">
          <template v-if="props.row.code !== 'admin'">
            <q-btn flat dense color="primary" :icon="mdiPlaylistEdit" label="编辑" @click="handleEditRole(props.row)" />
            <q-btn flat dense color="negative" :icon="mdiDelete" label="删除" @click="handleDeleteRole(props.row)" />
            <q-btn flat dense color="info" :icon="mdiArrowRight" label="更多">
              <q-popup-proxy>
                <q-list dense bordered>
                  <q-item
                    v-for="(item, i) in roleRowMoreList"
                    :key="i"
                    v-close-popup
                    v-ripple
                    clickable
                    @click="handleClickRoleMore(item.key)"
                  >
                    <q-item-section avatar>
                      <q-icon color="primary" :name="item.icon" />
                    </q-item-section>
                    <q-item-section no-wrap>{{ item.label }}</q-item-section>
                  </q-item>
                </q-list>
              </q-popup-proxy>
            </q-btn>
          </template>
        </q-td>
      </template>
    </q-table>
    <!-- 新增和编辑内容框 -->
    <q-dialog v-model="showDialog" persistent>
      <q-card bordered class="w-md">
        <q-card-section class="row items-center">
          <div class="text-h6">{{ dialogTitle }}</div>
          <q-space />
          <q-btn v-close-popup :icon="mdiClose" flat round dense />
        </q-card-section>
        <q-card-section class="row items-center">
          <MyForm ref="roleFormRef" v-model="roleFormData" label-width="80px">
            <MyFormItem label="角色名称" required>
              <q-input
                v-model="roleFormData.name"
                class="w-full"
                maxlength="20"
                outlined
                dense
                clearable
                lazy-rules
                :rules="roleFormRules.name"
                hint=""
                placeholder="请输入角色名称"
              >
              </q-input>
            </MyFormItem>
            <MyFormItem label="角色代码" required>
              <q-input
                v-model="roleFormData.code"
                class="w-full"
                maxlength="20"
                outlined
                dense
                clearable
                lazy-rules
                :rules="roleFormRules.code"
                hint=""
                placeholder="请输入角色代码"
              >
              </q-input>
            </MyFormItem>
            <MyFormItem label="角色描述">
              <q-input
                v-model="roleFormData.description"
                class="w-full"
                type="textarea"
                maxlength="50"
                outlined
                dense
                clearable
                lazy-rules
                hint=""
                placeholder="请输入角色描述"
              >
              </q-input>
            </MyFormItem>
          </MyForm>
        </q-card-section>
        <q-separator />
        <q-card-actions align="right" class="q-ma-sm">
          <q-btn v-close-popup label="取 消" :icon="mdiClose" color="warning" @click="showDialog = false" />
          <q-btn label="确 定" color="primary" :icon="mdiCheck" :loading="confirmLoading" @click="handleSubmitForm" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- 角色权限分配 -->
    <RoleWithAuth :show="showRoleWithAuthDialog" @close="showRoleWithAuthDialog = false"></RoleWithAuth>
  </div>
</template>

<script lang="ts" setup>
import {
  mdiAccountLock,
  mdiAlert,
  mdiArrowRight,
  mdiAsterisk,
  mdiCalendar,
  mdiCheck,
  mdiCheckCircle,
  mdiClose,
  mdiCloseCircle,
  mdiDelete,
  mdiDownload,
  mdiLockReset,
  mdiMagnify,
  mdiPencil,
  mdiPlaylistEdit,
  mdiPlus,
  mdiRestore,
  mdiShieldAccount,
} from "@quasar/extras/mdi-v6";
import { QPagination, QTableColumn, QTreeNode, useQuasar } from "quasar";
import { IRes } from "@/interface/common";
import useUserStore from "@/store/module/user";
import { getRoleList, addRoleList, updateRole, deleteRole } from "@/api/system/roleManage";
import { resetForm } from "@/utils/common";
import RoleWithAuth from "@/views/system/roleManage/components/RoleWithAuth.vue";

interface IQueryForm {
  name: string | null;
  code: string | null;
  createDate: string | null;
}

interface IRoleForm {
  id: string;
  pid: string;
  name: string;
  code: string;
  description: string;
  status: number;
  order: number;
  children?: IRoleForm[];
}

interface IRoleTable {
  index?: number;
  id: string;
  name: string;
  code: string;
  description: string;
  status: number;
  order: number;
  children?: IRoleForm[];
}

let tableIsLoading = $ref<boolean>(false);

let queryForm = $ref<IQueryForm | null>(null);

let queryFormData = $ref<IQueryForm>({
  name: null,
  code: null,
  createDate: null,
});

let showDialog = $ref<boolean>(false);

let showRoleWithAuthDialog = $ref<boolean>(false);

let dialogTitle = $ref<string>("");

let useDialogType = $ref<string>("add");

let emptyRoleForm = {
  pid: "",
  id: "",
  name: "",
  code: "",
  description: "",
  status: "",
  order: 0,
};

const roleFormRef = $ref<any>(null);

let roleFormData = $ref<IRoleForm>(JSON.parse(JSON.stringify(emptyRoleForm)));

let roleFormRules = {
  name: [(val: string) => (val && val.length > 0) || "请输入角色名称"],
  code: [(val: string) => (val && val.length > 0) || "请输入角色代码"],
};

let roleTableData = $ref<IRoleForm[]>([]);

let roleTableHeaderColumns = reactive<QTableColumn[]>([
  {
    label: "序号",
    name: "index",
    field: "index",
    align: "center",
    headerClasses: "cus-table-th",
    classes: "cus-table-td",
  },
  {
    label: "角色名称",
    name: "name",
    field: "name",
    align: "center",
    headerClasses: "cus-table-th",
    classes: "cus-table-td",
  },
  {
    label: "角色代码",
    name: "code",
    field: "code",
    align: "center",
    headerClasses: "cus-table-th",
    classes: "cus-table-td",
  },
  {
    label: "创建时间",
    name: "createTime",
    field: "createTime",
    sortable: true,
    align: "center",
    headerClasses: "cus-table-th",
    classes: "cus-table-td",
  },
  {
    label: "创建人",
    name: "createBy",
    field: "createBy",
    align: "center",
    headerClasses: "cus-table-th",
    classes: "cus-table-td",
  },
  {
    label: "修改时间",
    name: "updateTime",
    field: "updateTime",
    sortable: true,
    align: "center",
    headerClasses: "cus-table-th",
    classes: "cus-table-td",
  },
  {
    label: "修改人",
    name: "updateBy",
    field: "updateBy",
    align: "center",
    headerClasses: "cus-table-th",
    classes: "cus-table-td",
  },
  {
    label: "操作",
    name: "ops",
    field: "ops",
    align: "center",
    headerClasses: "cus-table-th",
    classes: "cus-table-td",
  },
]);

let pageInfo = reactive({
  page: 1,
  rowsPerPage: 10,
  rowsNumber: 1,
});

let roleRowMoreList = [
  {
    label: "角色权限",
    key: "roleWithAuth",
    icon: mdiAccountLock,
  },
  {
    label: "分配用户",
    key: "roleWithUser",
    icon: mdiShieldAccount,
  },
];

let tableRowKey = (rowData: IRoleForm, i: number) => {
  return rowData.id;
};

// 确定按钮是否loading
let confirmLoading = $ref<boolean>(false);

// 重置查询内容
const resetQueryFormBtn = () => {
  queryFormData = resetForm(queryFormData);
};

// 获取角色数据
const getRoleTableData = (): void => {
  const data = {
    query: {
      ...queryFormData,
    },
    pageSize: pageInfo.rowsPerPage,
    pageNum: pageInfo.page,
  };
  tableIsLoading = true;
  getRoleList(data)
    .then((res: IRes) => {
      if (res && res.code === 200) {
        roleTableData = res.data.records;
        roleTableData.forEach((item: IRoleTable, index: number) => {
          item.index = index + 1;
        });
        tableIsLoading = false;
      }
    })
    .catch(() => {
      tableIsLoading = false;
    });
};

// 查询
const handleQueryTableBtn = (): void => {
  getRoleTableData();
};

// 新增
const handleAddRole = (): void => {
  roleFormData = JSON.parse(JSON.stringify(emptyRoleForm));
  dialogTitle = "新增";
  useDialogType = "add";
  showDialog = true;
};

// 导出
const handleDownload = (): void => {
  Notify.create({
    type: "warning",
    message: "还未开发该功能！",
    icon: mdiAlert,
  });
};

// 编辑
const handleEditRole = (row: any): void => {
  dialogTitle = "编辑";
  useDialogType = "edit";
  showDialog = true;
  roleFormData = JSON.parse(JSON.stringify(row));
};

// 删除
const handleDeleteRole = (row: any): void => {
  Dialog.create({
    title: "系统提示!",
    message: "是否确定删除该角色?",
    ok: {
      push: false,
      icon: mdiCheck,
    },
    cancel: {
      push: false,
      color: "warning",
      icon: mdiClose,
    },
    persistent: true,
  })
    .onOk(() => {
      // console.log('>>>> OK')
      deleteRole(row.id)
        .then((res: IRes) => {
          if (res && res.code === 200) {
            Notify.create({
              type: "positive",
              message: "已删除角色",
              icon: mdiCheckCircle,
            });
            getRoleTableData();
          }
        })
        .catch(() => {
          Notify.create({
            type: "negative",
            message: "删除角色失败！",
          });
        });
    })
    .onCancel(() => {
      // console.log(">>>> Cancel");
    });
};

// 确定
const handleSubmitForm = (): void => {
  roleFormRef.validate().then((valid: boolean) => {
    if (valid) {
      const copyRoleFormData = JSON.parse(JSON.stringify(roleFormData));
      if (useDialogType === "add") {
        addRoleList(copyRoleFormData)
          .then((res: IRes) => {
            if (res && res.code === 200) {
              showDialog = false;
              Notify.create({
                type: "positive",
                message: "新增成功！",
              });
              getRoleTableData();
            }
          })
          .catch(() => {
            showDialog = false;
          });
      } else {
        updateRole(copyRoleFormData)
          .then((res: IRes) => {
            if (res && res.code === 200) {
              showDialog = false;
              Notify.create({
                type: "positive",
                message: "修改成功！",
              });
              getRoleTableData();
            }
          })
          .catch(() => {
            showDialog = false;
          });
      }
    } else {
      // 校验不通过
    }
  });
};

const handleClickRoleMore = (key: string) => {
  console.log(key);
  if (key === "roleWithAuth") showRoleWithAuthDialog = true;
  // if (key === "roleWithUser") showModifyPasswordDialog = true;
  // if (key === 'accountFreeze') showUserRoleDialog = true;
};

// 加载之前
onMounted(() => {
  getRoleTableData();
});
</script>

<style lang="scss" scoped>
.view-container {
  .container-space {
    margin-bottom: 0.625rem;
  }
}
</style>
