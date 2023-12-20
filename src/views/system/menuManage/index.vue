<template>
  <div class="view-container">
    <n-grid cols="10" :x-gap="20" item-responsive>
      <n-grid-item span="400:2 600:4 800:6">
        <n-form ref="queryForm" :model="queryFormData" inline label-placement="left" label-width="auto">
          <n-grid :cols="24" responsive="screen">
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
                    <icon-mdi:autorenew></icon-mdi:autorenew>
                  </n-icon>
                </template>
                重 置
              </n-button>
            </n-form-item-gi>
            <n-form-item-gi :span="2">
              <n-button attr-type="submit" type="primary" @click="handleQueryTable">
                <template #icon>
                  <n-icon>
                    <icon-mdi:magnify></icon-mdi:magnify>
                  </n-icon>
                </template>
                查 询
              </n-button>
            </n-form-item-gi>
          </n-grid>
        </n-form>
      </n-grid-item>
    </n-grid>
    <!-- 表格 -->
    <n-data-table
      :data="menuTableData"
      :columns="menuTableHeader"
      :loading="tableIsLoading"
      :row-key="tableRowKey"
      :bordered="true"
      :single-line="false"
    />
  </div>
</template>

<script lang="ts" setup>
import { Ref, ComputedRef, h, Component } from 'vue';
import { TreeOption, FormInst, DataTableColumns, NButton, NIcon } from 'naive-ui';
import { Icon } from '@iconify/vue';
import { renderIcon, resetForm } from '@/utils/common';
import { IRes } from '@/interface/common';
import useUserStore from '@/store/module/user';
import { getMenuList } from '@/api/system/menuManage';

interface IUserForm {
  userName: string | null;
  userAccount: string | null;
  userPhone: string | null;
  userRole: string | null;
  dataRange: Array<[string, string]> | null;
}

interface IMenuTable {
  path: string;
  name: string;
  meta: {
    title: string;
    icon: string;
    show: boolean;
    disabled: boolean;
    cache: boolean;
    menuType: number;
    description: string;
  };
  component: string;
  children?: IMenuTable[];
}

let tableIsLoading = $ref<boolean>(false);

let queryForm = $ref<FormInst | null>(null);

let queryFormData = $ref<IUserForm>({
  userName: null,
  userAccount: null,
  userPhone: null,
  userRole: null,
  dataRange: null
});

let menuTableData = $ref<IMenuTable[]>([]);

let tableRowKey = (rowData: IMenuTable, i: number) => {
  return i;
};

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
    title: '菜单名称',
    key: 'meta',
    align: 'center',
    render(row: any) {
      return row.meta.title;
    }
  },
  { title: '创建者', key: 'createBy', align: 'center' },
  { title: '创建时间', key: 'createTime', align: 'center' },
  {
    title: '操作',
    key: 'ops',
    align: 'center',
    width: '200',
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
            icon: () => h(NIcon, { size: 20, component: renderIcon('mdi:dots-horizontal') }),
            default: () => h('span', '更多')
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
            icon: () => h(NIcon, { size: 20, component: renderIcon('mdi:delete') }),
            default: () => h('span', '删除')
          }
        )
      ]);
    }
  }
]);

// 加载之前
onMounted(() => {
  getMenuData();
});

// 获取菜单数据
const getMenuData = () => {
  const data = {
    token: useUserStore().token
  };
  getMenuList(data).then((res: IRes) => {
    if (res && res.code === 200) {
      menuTableData = res.data;
    }
  });
};

const handleQueryTable = () => {
  getMenuData();
};
</script>

<style lang="scss" scoped></style>
