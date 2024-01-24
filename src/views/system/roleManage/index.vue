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
        <n-form-item-gi span="s:1 m:1 l:1" label="角色名称">
          <n-input v-model:value="queryFormData.roleName" clearable placeholder="请输入角色名称" />
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
      <n-button type="info" @click="handleAddRole">
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
      :data="roleTableData"
      :columns="roleTableHeader"
      :loading="tableIsLoading"
      :row-key="tableRowKey"
      :bordered="true"
      :single-line="false"
      :default-expand-all="true"
      :pagination="pagination"
    />
    <!-- 新增和编辑内容框 -->
    <n-modal
      v-model:show="showModal"
      class="container-card"
      preset="card"
      :title="modelTitle"
      :auto-focus="false"
      :style="{ width: '37.5rem' }"
    >
      <n-form
        ref="roleFormRef"
        :model="roleFormData"
        :rules="roleFormRules"
        label-placement="left"
        label-width="auto"
        require-mark-placement="left"
      >
        <n-form-item label="角色名称" path="name">
          <n-input v-model:value="roleFormData.name" maxlength="20" placeholder="请输入角色名称" />
        </n-form-item>
        <n-form-item label="角色代码" path="code">
          <n-input v-model:value="roleFormData.code" maxlength="20" placeholder="请输入角色代码" />
        </n-form-item>
        <n-form-item label="角色描述" path="description">
          <n-input
            v-model:value="roleFormData.description"
            type="textarea"
            :autosize="{
              minRows: 2,
              maxRows: 3
            }"
            show-count
            maxlength="100"
            placeholder="请输入角色描述"
          />
        </n-form-item>
        <n-form-item label="排序" path="order">
          <n-input-number v-model:value="roleFormData.order" placeholder="请输入序号" />
        </n-form-item>
        <n-form-item label="是否启用" path="status">
          <n-switch v-model:value="roleFormData.status" :checked-value="0" :unchecked-value="1">
            <template #checked> 是 </template>
            <template #unchecked> 否 </template>
          </n-switch>
        </n-form-item>
      </n-form>
      <template #footer>
        <n-space justify="end">
          <n-button type="primary" :loading="confirmLoading" @click="handleConfirm">确 定</n-button>
          <n-button type="default" @click="showModal = false">取 消</n-button>
        </n-space>
      </template>
    </n-modal>
    <!-- 角色权限分配 -->
    <RoleWithAuth :show="showRoleWithAuthModal" @close="showRoleWithAuthModal = false"></RoleWithAuth>
  </div>
</template>

<script lang="ts" setup>
import { ICON } from '@/enums/icon';
import { Ref, ComputedRef, h, Component } from 'vue';
import { TreeOption, FormInst, DataTableColumns, NButton, NIcon } from 'naive-ui';
import { Icon } from '@iconify/vue';
import { renderIcon, resetForm } from '@/utils/common';
import { IRes } from '@/interface/common';
import useUserStore from '@/store/module/user';
import { getRoleList, addRoleList, updateRole, deleteRole } from '@/api/system/roleManage';
import RoleWithAuth from '@/views/system/roleManage/components/RoleWithAuth.vue';

interface IQueryForm {
  roleName: string | null;
  dataRange: Array<[string, string]> | null;
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

let tableIsLoading = $ref<boolean>(false);

let queryForm = $ref<FormInst | null>(null);

let queryFormData = $ref<IQueryForm>({
  roleName: null,
  dataRange: null
});

let showModal = $ref<boolean>(false);

let showRoleWithAuthModal = $ref<boolean>(false);

let modelTitle = $ref<string>('');

let emptyRoleForm = {
  pid: '',
  id: '',
  name: '',
  code: '',
  description: '',
  status: '',
  order: 0
};

const roleFormRef = $ref<FormInst | null>(null);

let roleFormData = $ref<IRoleForm>(JSON.parse(JSON.stringify(emptyRoleForm)));

let roleFormRules = {
  name: {
    required: true,
    trigger: ['input', 'blur'],
    message: '请输入角色名称'
  },
  code: {
    required: true,
    trigger: ['input', 'blur'],
    message: '请输入角色代码'
  }
};

let roleTableData = $ref<IRoleForm[]>([]);

let roleTableHeader = $ref<DataTableColumns>([
  {
    title: '序号',
    key: '',
    align: 'center',
    width: '60',
    render: (row, index) => {
      return index + 1;
    }
  },
  {
    title: '角色名称',
    key: 'name',
    align: 'center'
  },
  {
    title: '角色代码',
    key: 'code',
    align: 'center'
  },
  { title: '创建者', key: 'createBy', align: 'center' },
  { title: '创建时间', key: 'createTime', align: 'center', width: '200' },
  {
    title: '操作',
    key: 'ops',
    align: 'center',
    width: '200',
    render: (rowData: any, rowIndex) => {
      return h(
        NSpace,
        { justify: 'center' },
        {
          default: () => [
            h(
              NButton,
              {
                text: true,
                type: 'primary',
                onClick: (e: any) => {
                  let copyRow = JSON.parse(JSON.stringify(rowData));
                  roleFormData = copyRow;
                  modelTitle = '修改';
                  showModal = true;
                }
              },
              {
                icon: () => h(NIcon, { size: 20, component: renderIcon(ICON.O, 'mdi:text-box-edit-outline') }),
                default: () => h('span', '修改')
              }
            ),
            h(
              NButton,
              {
                text: true,
                type: 'primary',
                onClick: (e) => {
                  roleFormData = JSON.parse(JSON.stringify(emptyRoleForm));
                  showRoleWithAuthModal = true;
                }
              },
              {
                icon: () => h(NIcon, { size: 20, component: renderIcon(ICON.O, 'mdi:account-key') }),
                default: () => h('span', '权限')
              }
            ),
            h(
              NButton,
              {
                text: true,
                type: 'error',
                onClick: (e: any) => {
                  window.$dialog.warning({
                    title: '警告',
                    content: '你是否确定进行删除？',
                    positiveText: '确定',
                    negativeText: '不确定',
                    onPositiveClick: () => {
                      window.$message.success('确定');
                      handleDeleteRole(rowData.id);
                    },
                    onNegativeClick: () => {
                      window.$message.error('不确定');
                    }
                  });
                }
              },
              {
                icon: () => h(NIcon, { size: 20, component: renderIcon(ICON.O, 'mdi:delete') }),
                default: () => h('span', '删除')
              }
            )
          ]
        }
      );
    }
  }
]);

let pageInfo = {
  pageSize: 10,
  pageNum: 1,
  total: 0
};

let pagination = reactive<object>({
  'show-size-picker': true,
  'show-quick-jumper': true,
  pageSizes: [10, 20, 30, 40],
  pageSize: pageInfo.pageSize,
  page: pageInfo.pageNum,
  itemCount: pageInfo.total
});

let tableRowKey = (rowData: IRoleForm, i: number) => {
  return rowData.id;
};

// 确定按钮是否loading
let confirmLoading = $ref<boolean>(false);

// 重置查询内容
const resetQueryFormBtn = () => {
  queryFormData = {
    roleName: null,
    dataRange: null
  };
  if (queryForm) queryForm.restoreValidation();
};

// 获取角色数据
const getRoleData = (): void => {
  const data = {
    token: useUserStore().token
  };
  tableIsLoading = true;
  getRoleList(data)
    .then((res: IRes) => {
      if (res && res.code === 200) {
        roleTableData = res.data;
        tableIsLoading = false;
      }
    })
    .catch(() => {
      tableIsLoading = false;
    });
};

// 查询
const handleQueryTable = (): void => {
  getRoleData();
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

// 确定
const handleConfirm = (): void => {
  roleFormRef?.validate((errors) => {
    if (!errors) {
      console.log(roleFormData);
      confirmLoading = true;
      if (modelTitle === '新增') {
        addRoleList(roleFormData)
          .then((res) => {
            if (res && res.code === 200) {
              window.$message.success('新增角色成功');
              confirmLoading = false;
              showModal = false;
              handleQueryTable();
            }
          })
          .catch(() => {
            confirmLoading = false;
          });
      } else {
        updateRole(roleFormData)
          .then((res) => {
            if (res && res.code === 200) {
              window.$message.success('修改角色成功');
              confirmLoading = false;
              showModal = false;
              handleQueryTable();
            }
          })
          .catch(() => {
            confirmLoading = false;
          });
      }
    } else {
      window.$message.error('表单必填项请填写！');
    }
  });
};

// 删除
const handleDeleteRole = (mId: string): void => {
  deleteRole(mId)
    .then((res: IRes) => {
      if (res && res.code === 200) {
        window.$message.success('已删除角色！');
        handleQueryTable();
      }
    })
    .catch(() => {
      window.$message.warning('删除角色失败！');
    });
};

// 加载之前
onMounted(() => {
  getRoleData();
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
