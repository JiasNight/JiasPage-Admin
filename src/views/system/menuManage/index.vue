<template>
  <div class="view-container">
    <n-grid cols="5" :x-gap="15" item-responsive>
      <n-grid-item span="1">
        <n-card>
          <n-input v-model:value="treePattern" placeholder="搜索" />
          <n-tree :pattern="treePattern" :data="treeData" block-line :node-props="handleClickNode" />
        </n-card>
      </n-grid-item>
      <n-grid-item span="400:1 600:2 800:4">
        <n-form ref="queryForm" :model="queryFormData" inline label-placement="left" label-width="auto">
          <n-grid :cols="24" responsive="screen" :x-gap="20">
            <n-form-item-gi :span="6" label="用户名">
              <n-input v-model:value="queryFormData.userName" clearable placeholder="请输入用户名" />
            </n-form-item-gi>
            <n-form-item-gi :span="6" label="登录账户">
              <n-input v-model:value="queryFormData.userAccount" clearable placeholder="请输入登录账户" />
            </n-form-item-gi>
            <n-form-item-gi :span="6" label="手机">
              <n-input v-model:value="queryFormData.userPhone" clearable placeholder="请输入手机" />
            </n-form-item-gi>
            <n-form-item-gi :span="6" label="角色">
              <n-select
                v-model:value="queryFormData.userRole"
                placeholder="请选择角色名称"
                :options="roleOptions"
                multiple
                clearable
              />
            </n-form-item-gi>
            <n-form-item-gi :span="6" label="创建时间">
              <n-date-picker
                v-model:value="queryFormData.dataRange"
                type="daterange"
                value-format="yyyy-MM-dd"
                clearable
              />
            </n-form-item-gi>
            <n-form-item-gi :span="2">
              <n-button attr-type="reset" @click="resetQueryFormBtn">
                <template #icon>
                  <n-icon>
                    <AutorenewRound />
                  </n-icon>
                </template>
                重 置
              </n-button>
            </n-form-item-gi>
            <n-form-item-gi :span="2">
              <n-button attr-type="submit" type="primary">
                <template #icon>
                  <n-icon>
                    <SearchRound />
                  </n-icon>
                </template>
                查 询
              </n-button>
            </n-form-item-gi>
          </n-grid>
        </n-form>
        <!-- 表格 -->
        <n-data-table :loading="tableIsLoading" :data="menuTableData" :columns="menuTableHeader" :bordered="true" />
      </n-grid-item>
    </n-grid>
  </div>
</template>

<script lang="ts" setup>
import { Ref, ComputedRef } from 'vue';
import { TreeOption, FormInst, DataTableColumns, NButton, NIcon } from 'naive-ui';
import { SearchRound, AutorenewRound, Battery50Round, AcUnitRound } from '@vicons/material';

let treePattern = $ref<string>('');
let tableIsLoading = $ref<boolean>(false);
let treeData = $ref<TreeOption[]>([
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

// 树点击
const handleClickNode = ({ option }: { option: TreeOption }) => {
  return {
    onClick() {
      console.log('[Click] ' + option.label);
      tableIsLoading = true;
      setTimeout(() => {
        tableIsLoading = false;
      }, 600);
    }
  };
};

let queryForm = $ref<FormInst | null>(null);

interface userForm {
  userName: string | null;
  userAccount: string | null;
  userPhone: string | null;
  userRole: string | null;
  dataRange: Array<[string, string]> | null;
}

let queryFormData = $ref<userForm>({
  userName: null,
  userAccount: null,
  userPhone: null,
  userRole: null,
  dataRange: null
});

// 重置查询内容
const resetQueryFormBtn = () => {
  if (queryForm) queryForm.restoreValidation();
};

let roleOptions = $ref<Array<object>>([
  { label: '角1', value: 'role1' },
  { label: '角2', value: 'role3' }
]);

let menuTableHeader = $ref<DataTableColumns>([
  {
    title: '序号',
    key: 'index',
    align: 'center',
    render(row, index) {
      return index + 1;
    }
  },
  { title: '菜单名称', key: 'userName', align: 'center' },
  { title: '菜单名称', key: 'userAccount', align: 'center' },
  { title: '角色', key: 'userRole', align: 'center' },
  { title: '创建时间', key: 'createTime', align: 'center' },
  {
    title: '操作',
    key: 'ops',
    align: 'center',
    render(row) {
      return h(
        NButton,
        {
          text: true,
          size: 'small',
          onClick: (e: any) => {
            console.log(e);
            console.log(row);
          }
        },
        {
          icon: () => h(NIcon, { size: 20, component: AcUnitRound }),
          default: '操作'
        }
      );
    }
  }
]);

type IUserTable = {
  userName: string;
  userAccount: string;
  userRole: string;
  createTime: string;
};

let menuTableData = $ref<IUserTable[]>([
  { userName: 'admin', userAccount: 'admin', userRole: '超级管理员', createTime: '2023-03-30 12:23:30' }
]);
</script>

<style lang="scss" scoped></style>
