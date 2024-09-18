<template>
  <div class="view-container q-pa-sm">
    <MyForm ref="queryFormRef" v-model="queryFormData" label-width="80px" layout="horizontal">
      <MyFormItem label="角色名称">
        <q-input v-model="queryFormData.roleName" class="w-200" outlined dense clearable placeholder="请输入角色名称">
        </q-input>
      </MyFormItem>
      <MyFormItem label="角色代码">
        <q-input v-model="queryFormData.roleCode" class="w-200" outlined dense clearable placeholder="请输入角色代码">
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
        <div class="row items-center q-gutter-x-sm q-gutter-y-xs">
          <q-btn label="查 询" color="primary" :icon="mdiMagnify" @click="handleQueryTableBtn" />
          <q-btn label="重 置" color="info" :icon="mdiRestore" @click="resetQueryFormBtn" />
        </div>
      </MyFormItem>
    </MyForm>

    <div class="row items-center q-my-md q-gutter-x-sm">
      <q-btn color="accent" :icon="mdiPlus" label="新增" @click="handleAddRole"> </q-btn>
      <q-btn color="info" :icon="mdiDownload" label="导出" @click="handleDownload"> </q-btn>
    </div>
    <!-- 表格 -->
    <!-- <n-data-table
      :data="roleTableData"
      :columns="roleTableHeader"
      :loading="tableIsLoading"
      :row-key="tableRowKey"
      :bordered="true"
      :single-line="false"
      :default-expand-all="true"
      :pagination="pagination"
    /> -->
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
        </q-td>
      </template>
    </q-table>
    <!-- 新增和编辑内容框 -->
    <q-dialog v-model="showModal" persistent>
      <q-card bordered class="w-md">
        <q-card-section class="row items-center">
          <div class="text-h6">{{ modelTitle }}</div>
          <q-space />
          <q-btn v-close-popup :icon="mdiClose" flat round dense />
        </q-card-section>
        <q-card-section class="row items-center">
          <MyForm ref="roleFormRef" v-model="roleFormData" label-width="80px" layout="horizontal">
            <MyFormItem label="角色名称" required>
              <q-input
                v-model="roleFormData.name"
                class="w-200"
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
                class="w-200"
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
            <MyFormItem label="角色描述" required>
              <q-input
                v-model="roleFormData.description"
                class="w-200"
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
          <q-btn v-close-popup label="取 消" color="warning" />
          <q-btn label="确 定" color="primary" :loading="confirmLoading" @click="handleSubmitForm" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- 角色权限分配 -->
    <RoleWithAuth :show="showRoleWithAuthModal" @close="showRoleWithAuthModal = false"></RoleWithAuth>
  </div>
</template>

<script lang="ts" setup>
import { ICON } from '@/enums/icon';
import {
  mdiAccountLock,
  mdiArrowRight,
  mdiAsterisk,
  mdiCalendar,
  mdiClose,
  mdiDelete,
  mdiDownload,
  mdiLockReset,
  mdiMagnify,
  mdiPencil,
  mdiPlaylistEdit,
  mdiPlus,
  mdiRestore,
  mdiShieldAccount
} from '@quasar/extras/mdi-v6';
import { QPagination, QTableColumn, QTreeNode } from 'quasar';
import { Ref, ComputedRef, h, Component } from 'vue';
import { TreeOption, FormInst, DataTableColumns, NButton, NIcon } from 'naive-ui';
import { Icon } from '@iconify/vue';
import { renderIcon, resetForm } from '@/utils/common';
import { IRes } from '@/interface/common';
import useUserStore from '@/store/module/user';
import { getRoleList, addRoleList, updateRole, deleteRole } from '@/api/system/roleManage';
import RoleWithAuth from '@/views/system/roleManage/components/RoleWithAuth.vue';
import { Md5 } from 'ts-md5';
import { aesUtil } from '@/utils/common/security';

interface IQueryForm {
  roleName: string | null;
  roleCode: string | null;
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

let queryForm = $ref<FormInst | null>(null);

let queryFormData = $ref<IQueryForm>({
  roleName: null,
  roleCode: null,
  createDate: null
});

let showModal = $ref<boolean>(false);

let showRoleWithAuthModal = $ref<boolean>(false);

let modelTitle = $ref<string>('');

let useDialogType = $ref<string>('add');

let emptyRoleForm = {
  pid: '',
  id: '',
  name: '',
  code: '',
  description: '',
  status: '',
  order: 0
};

const roleFormRef = $ref<any>(null);

let roleFormData = $ref<IRoleForm>(JSON.parse(JSON.stringify(emptyRoleForm)));

let roleFormRules = {
  name: [(val: string) => (val && val.length > 0) || '请输入角色名称'],
  code: [(val: string) => (val && val.length > 0) || '请输入角色代码']
};

let roleTableData = $ref<IRoleForm[]>([]);

let roleTableHeaderColumns = $ref<QTableColumn[]>([
  {
    label: '序号',
    name: 'index',
    field: 'index',
    align: 'center',
    headerClasses: 'cus-table-th',
    classes: 'cus-table-td'
  },
  {
    label: '角色名称',
    name: 'name',
    field: 'name',
    align: 'center',
    headerClasses: 'cus-table-th',
    classes: 'cus-table-td'
  },
  {
    label: '角色代码',
    name: 'code',
    field: 'code',
    align: 'center',
    headerClasses: 'cus-table-th',
    classes: 'cus-table-td'
  },
  {
    label: '创建时间',
    name: 'createTime',
    field: 'createTime',
    sortable: true,
    align: 'center',
    headerClasses: 'cus-table-th',
    classes: 'cus-table-td'
  },
  {
    label: '创建人',
    name: 'createBy',
    field: 'createBy',
    align: 'center',
    headerClasses: 'cus-table-th',
    classes: 'cus-table-td'
  },
  {
    label: '操作',
    name: 'ops',
    field: 'ops',
    align: 'center',
    headerClasses: 'cus-table-th',
    classes: 'cus-table-td'
  }
]);

let pageInfo = $ref({
  page: 1,
  rowsPerPage: 10,
  rowsNumber: 1
});

let roleRowMoreList = [
  {
    label: '数据权限',
    key: 'accountFreeze',
    icon: mdiAccountLock
  },
  {
    label: '分配用户',
    key: 'rolePermission',
    icon: mdiShieldAccount
  }
];

let tableRowKey = (rowData: IRoleForm, i: number) => {
  return rowData.id;
};

// 确定按钮是否loading
let confirmLoading = $ref<boolean>(false);

// 重置查询内容
const resetQueryFormBtn = () => {
  queryFormData = {
    roleName: null,
    roleCode: null,
    createDate: null
  };
  if (queryForm) queryForm.restoreValidation();
};

// 获取角色数据
const getRoleTableData = (): void => {
  const data = {
    query: {
      ...queryFormData
    },
    pageSize: pageInfo.rowsPerPage,
    pageNum: pageInfo.page
  };
  tableIsLoading = true;
  getRoleList(data)
    .then((res: IRes) => {
      if (res && res.code === 200) {
        roleTableData = res.data;
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
  modelTitle = '新增';
  showModal = true;
};

// 导出
const handleDownload = (): void => {
  window.$message.warning('还未开发该功能！');
};

const handleEditRole = (row: any): void => {
  window.$message.warning('还未开发该功能！');
};

// 删除
const handleDeleteRole = (rId: string): void => {
  deleteRole(rId)
    .then((res: IRes) => {
      if (res && res.code === 200) {
        window.$message.success('已删除角色！');
        getRoleTableData();
      }
    })
    .catch(() => {
      window.$message.warning('删除角色失败！');
    });
};

// 确定
const handleSubmitForm = (): void => {
  roleFormRef.validate().then((valid: boolean) => {
    if (valid) {
      const copyRoleFormData = JSON.parse(JSON.stringify(roleFormData));
      if (useDialogType === 'add') {
        addRoleList(copyRoleFormData)
          .then((res: IRes) => {
            if (res && res.code === 200) {
              showModal = false;
              Notify.create({
                type: 'positive',
                position: 'top-right',
                message: '新增成功！'
              });
              getRoleTableData();
            }
          })
          .catch(() => {
            showModal = false;
          });
      } else {
        updateRole(copyRoleFormData)
          .then((res: IRes) => {
            if (res && res.code === 200) {
              showModal = false;
              Notify.create({
                type: 'positive',
                position: 'top-right',
                message: '修改成功！'
              });
              getRoleTableData();
            }
          })
          .catch(() => {
            showModal = false;
          });
      }
    } else {
      // 校验不通过
    }
  });
};

const handleClickRoleMore = (key: string) => {
  console.log(key);
  if (key === 'resetPassword') showModifyPasswordDialog = true;
  if (key === 'rolePermission') showUserRoleDialog = true;
  // if (key === 'accountFreeze') showUserRoleDialog = true;
};

// 加载之前
onMounted(() => {
  getRoleTableData();
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
