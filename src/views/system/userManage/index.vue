<template>
  <div class="view-container">
    <n-grid cols="1 600:2 800:6 1000:8" :x-gap="15" :y-gap="15">
      <n-grid-item class="grid-left" span="1 600:1 800:2 1000:2">
        <n-card>
          <n-space justify="end" item-style="margin-bottom: 0.625rem">
            <n-tooltip trigger="hover">
              <template #trigger>
                <n-button strong secondary circle type="info" size="small" @click="refreshTreeBtn">
                  <template #icon>
                    <n-icon>
                      <icon-mdi:refresh></icon-mdi:refresh>
                    </n-icon>
                  </template>
                </n-button>
              </template>
              <span>刷新</span>
            </n-tooltip>
          </n-space>
          <n-input v-model:value="deptTreePattern" placeholder="搜索" />
          <template v-if="deptTreeLoading">
            <div class="flex items-center justify-center py-4">
              <n-spin size="medium" />
            </div>
          </template>
          <template v-else>
            <n-tree
              :pattern="deptTreePattern"
              :data="deptTreeData"
              key-field="id"
              block-line
              @update:selected-keys="handleClickTree"
            />
          </template>
        </n-card>
      </n-grid-item>
      <n-grid-item class="grid-right" span="1 600:1 800:4 1000:6">
        <n-form ref="queryForm" :model="queryFormData" inline label-placement="left" label-width="auto">
          <n-grid cols="6" responsive="screen" :x-gap="20">
            <n-form-item-gi span="2" label="用户名">
              <n-input v-model:value="queryFormData.userName" clearable placeholder="请输入用户名" />
            </n-form-item-gi>
            <n-form-item-gi span="2" label="登录账户">
              <n-input v-model:value="queryFormData.userAccount" clearable placeholder="请输入登录账户" />
            </n-form-item-gi>
            <n-form-item-gi span="2" label="手机">
              <n-input v-model:value="queryFormData.userPhone" clearable placeholder="请输入手机" />
            </n-form-item-gi>
            <n-form-item-gi span="2" label="角色">
              <n-select
                v-model:value="queryFormData.userRole"
                placeholder="请选择角色名称"
                :options="roleOptions"
                multiple
                clearable
              />
            </n-form-item-gi>
            <n-form-item-gi span="2" label="创建时间">
              <n-date-picker
                v-model:value="queryFormData.dataRange"
                type="daterange"
                value-format="yyyy-MM-dd"
                clearable
              />
            </n-form-item-gi>
            <n-form-item-gi span="2">
              <n-space>
                <n-button attr-type="reset" @click="resetQueryFormBtn">
                  <template #icon>
                    <n-icon>
                      <icon-material-symbols:autorenew></icon-material-symbols:autorenew>
                    </n-icon>
                  </template>
                  重 置
                </n-button>
                <n-button attr-type="submit" type="primary" @click="queryTableDataBtn">
                  <template #icon>
                    <n-icon>
                      <icon-material-symbols:search></icon-material-symbols:search>
                    </n-icon>
                  </template>
                  查 询
                </n-button>
              </n-space>
            </n-form-item-gi>
          </n-grid>
        </n-form>
        <!-- 表格 -->
        <n-data-table
          :columns="userTableHeader"
          :data="userTableData"
          :loading="tableIsLoading"
          :bordered="true"
          :pagination="tablePagination"
        />
      </n-grid-item>
    </n-grid>
  </div>
</template>

<script lang="ts" setup>
import { Ref, ComputedRef, h, Component } from 'vue';
import { TreeOption, FormInst, DataTableColumns, NButton, NIcon, useDialog, useMessage } from 'naive-ui';
import { SearchRound, AutorenewRound, Battery50Round, AcUnitRound } from '@vicons/material';
import { renderIcon, resetForm } from '@/utils/common';
import { IRes } from '@/interface/common';
import useUserStore from '@/store/module/user';
import { Icon } from '@iconify/vue';
import { getDeptTree, getUserList } from '@/api/system/userManage';

interface IUserForm {
  userName: string | null;
  userAccount: string | null;
  userPhone: string | null;
  userRole: Array<string> | null;
  dataRange: Array<[string, string]> | null;
}

type IUserTable = {
  userName: string;
  userAccount: string;
  userRole: string;
  createTime: string;
};

let deptTreeLoading = $ref<boolean>(false);

let currentSelectedTreeKey: any = null;

let deptTreePattern = $ref<string>('');

let deptTreeData = $ref<TreeOption[]>([
  {
    label: '部门1',
    key: '0',
    children: [
      {
        label: '部门1.1',
        key: '0-0'
      },
      {
        label: '部门1.2',
        key: '0-1'
      }
    ]
  }
]);

let queryForm = $ref<FormInst | null>(null);

let queryFormData = $ref<IUserForm>({
  userName: null,
  userAccount: null,
  userPhone: null,
  userRole: null,
  dataRange: null
});

let roleOptions = $ref<Array<object>>([
  { label: '角1', value: 'role1' },
  { label: '角2', value: 'role3' }
]);

let tableIsLoading = $ref<boolean>(false);

let userTableHeader = $ref<DataTableColumns>([
  {
    title: '序号',
    key: 'index',
    align: 'center',
    render(row, index) {
      return index + 1;
    }
  },
  { title: '用户名', key: 'userName', align: 'center' },
  { title: '登录账户', key: 'userAccount', align: 'center' },
  { title: '角色', key: 'userRole', align: 'center' },
  { title: '创建时间', key: 'createTime', align: 'center' },
  {
    title: '操作',
    key: 'ops',
    align: 'center',
    render(row) {
      return h('span', [
        h(
          NButton,
          {
            text: true,
            size: 'small',
            onClick: (e: any) => {
              // console.log(e);
              // console.log(row);
            }
          },
          {
            icon: () =>
              h(NIcon, { size: 20, component: () => h(Icon as Component, { icon: 'mdi:chevron-triple-right' }) }),
            default: '操作'
          }
        ),
        h(
          NButton,
          {
            text: true,
            size: 'small',
            color: 'red',
            style: {
              margin: '0 .3rem'
            },
            onClick: (e: any) => {
              window.$dialog.warning({
                title: '警告',
                content: '你是否确定进行删除？',
                positiveText: '确定',
                negativeText: '不确定',
                onPositiveClick: () => {
                  console.log(row);
                  window.$message.success('确定');
                },
                onNegativeClick: () => {
                  window.$message.error('不确定');
                }
              });
            }
          },
          {
            icon: () =>
              h(NIcon, {
                size: 20,
                component: () => h(Icon as Component, { icon: 'mdi:delete' })
              }),
            default: () => h('span', '删除')
          }
        )
      ]);
    }
  }
]);

let userTableData: Array<IUserTable[]> = [];

let tablePagination = $ref<object>({
  page: 1,
  pageCount: 1,
  pageSize: 10,
  prefix({ itemCount }: any) {
    return `Total is ${itemCount}.`;
  }
});

// 加载之前
onMounted(() => {
  getDeptData();
});

// 刷新树
const refreshTreeBtn = () => {
  deptTreeLoading = true;
  setTimeout(() => {
    deptTreeLoading = false;
  }, 1000);
};

// 获取部门树
const getDeptData = () => {
  const data = {
    token: useUserStore().token
  };
  getDeptTree(data).then((res: IRes) => {
    if (res && res.code === 200) {
      deptTreeData = res.data;
    }
  });
};

// 点击树
const handleClickTree = (keys: Array<any>) => {
  currentSelectedTreeKey = keys[0];
  getUserTable();
};

// 查询用户列表
const getUserTable = () => {
  const data = {
    ...queryFormData,
    deptId: currentSelectedTreeKey,
    ...tablePagination
  };
  // tableIsLoading = true;
  getUserList(data)
    .then((res: IRes) => {
      if (res && res.code === 200) {
        let reData = res.data;
        userTableData = reData;
      }
      // tableIsLoading = false;
    })
    .catch(() => {
      tableIsLoading = false;
    });
};

// 重置查询内容
const resetQueryFormBtn = () => {
  queryFormData = resetForm(queryForm, queryFormData);
};

// 查询按钮
const queryTableDataBtn = () => {
  getUserTable();
};
</script>

<style lang="scss" scoped>
.view-container {
  .grid-left {
    min-width: 12.5rem;
  }
  .grid-right {
    padding: 0.625rem;
    min-width: 12.5rem;
  }
}
</style>
