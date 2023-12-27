<template>
  <div class="view-container">
    <n-form ref="queryForm" :model="queryFormData" inline label-placement="left" label-width="auto">
      <n-grid cols="2 s:3 m:4 l:5 xl:6 2xl:7" :x-gap="20" responsive="screen">
        <n-form-item-gi span="0 m:1 l:2" label="用户名">
          <n-input v-model:value="queryFormData.userName" clearable placeholder="请输入用户名" />
        </n-form-item-gi>
        <n-form-item-gi span="0 m:1 l:2" label="登录账户">
          <n-input v-model:value="queryFormData.userAccount" clearable placeholder="请输入登录账户" />
        </n-form-item-gi>
        <n-form-item-gi span="0 m:1 l:2" label="手机">
          <n-input v-model:value="queryFormData.userPhone" clearable placeholder="请输入手机" />
        </n-form-item-gi>
        <n-form-item-gi span="0 m:1 l:2" label="角色">
          <n-select
            v-model:value="queryFormData.userRole"
            placeholder="请选择角色名称"
            :options="roleOptions"
            multiple
            clearable
          />
        </n-form-item-gi>
        <n-form-item-gi span="0 m:1 l:2" label="创建时间">
          <n-date-picker v-model:value="queryFormData.dataRange" type="daterange" value-format="yyyy-MM-dd" clearable />
        </n-form-item-gi>
        <n-form-item-gi span="1">
          <n-button attr-type="reset" @click="resetQueryFormBtn">
            <template #icon>
              <n-icon>
                <icon-mdi:autorenew></icon-mdi:autorenew>
              </n-icon>
            </template>
            重 置
          </n-button>
        </n-form-item-gi>
        <n-form-item-gi span="1">
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
    <!-- 表格 -->
    <n-data-table
      :data="menuTableData"
      :columns="menuTableHeader"
      :loading="tableIsLoading"
      :row-key="tableRowKey"
      :bordered="true"
      :single-line="false"
    />
    <!-- 新增和编辑内容框 -->
    <n-modal v-model:show="showModal">
      <n-card :title="modelTitle" :bordered="false" style="width: 37.5rem">
        <template #header-extra>
          <icon-mdi:close></icon-mdi:close>
        </template>
        <n-form
          ref="formRef"
          :model="menuFormData"
          label-placement="left"
          label-width="auto"
          require-mark-placement="right-hanging"
        >
          <n-form-item label="父级栏目" path="pid">
            <n-cascader
              v-model:value="menuFormData.pid"
              placeholder="请选择"
              expand-trigger="click"
              :options="menuTableData"
              label-field="title"
              value-field="id"
              :show-path="false"
            />
          </n-form-item>
          <n-form-item label="栏目名称" path="name">
            <n-input v-model:value="menuFormData.name" maxlength="20" placeholder="请输入名称" />
          </n-form-item>
          <n-form-item label="栏目名称" path="name">
            <n-input v-model:value="menuFormData.meta.title" maxlength="20" placeholder="请输入" />
          </n-form-item>
          <n-form-item label="栏目图标" path="name">
            <n-select v-model:value="menuFormData.meta.icon" placeholder="请选择" :options="menuTableData" />
          </n-form-item>
          <n-form-item label="栏目类型" path="menuType">
            <n-radio-group v-model:value="menuFormData.meta.menuType" name="menuType">
              <n-radio :value="1"> 目录 </n-radio>
              <n-radio :value="2"> 菜单 </n-radio>
            </n-radio-group>
          </n-form-item>
          <n-form-item label="路由地址" path="path">
            <n-input v-model:value="menuFormData.path" maxlength="20" placeholder="请输入" />
          </n-form-item>
          <n-form-item v-if="menuFormData.meta.menuType === 2" label="组件路径" path="component">
            <n-input v-model:value="menuFormData.component" maxlength="20" placeholder="请输入" />
          </n-form-item>
          <n-form-item label="是否缓存" path="cache">
            <n-switch v-model:value="menuFormData.meta.cache">
              <template #checked> 是 </template>
              <template #unchecked> 否 </template>
            </n-switch>
          </n-form-item>
          <n-form-item label="是否禁用" path="disabled">
            <n-switch v-model:value="menuFormData.meta.disabled">
              <template #checked> 是 </template>
              <template #unchecked> 否 </template>
            </n-switch>
          </n-form-item>
          <n-form-item label="是否显示" path="show">
            <n-switch v-model:value="menuFormData.meta.show">
              <template #checked> 是 </template>
              <template #unchecked> 否 </template>
            </n-switch>
          </n-form-item>
        </n-form>
        <n-space>
          <n-button type="primary" @click="handleConfirm">确 定</n-button>
          <n-button type="default" @click="showModal = false">取 消</n-button>
        </n-space>
      </n-card>
    </n-modal>
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

interface IMenuForm extends IMenuTable {
  pid: string;
  id: string;
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

let showModal = $ref<boolean>(false);

let modelTitle = $ref<string>('');

let menuFormData = $ref<IMenuForm>({
  pid: '',
  id: '',
  path: '',
  name: '',
  meta: {
    title: '',
    icon: '',
    show: false,
    disabled: false,
    cache: false,
    menuType: 0,
    description: ''
  },
  component: ''
});

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
    render(rowData, rowIndex) {
      return h('span', [
        h(
          NButton,
          {
            text: true,
            size: 'small',
            color: '#2376b7',
            onClick: (e) => {
              menuFormData = JSON.parse(JSON.stringify(rowData));
              modelTitle = '新增';
              showModal = true;
            }
          },
          {
            icon: () => h(NIcon, { size: 20, component: renderIcon('mdi:playlist-plus') }),
            default: () => h('span', '新增')
          }
        ),
        h(
          NButton,
          {
            text: true,
            size: 'small',
            color: '#00cec9',
            onClick: (e: any) => {
              // console.log(e);
              // console.log(row);
            }
          },
          {
            icon: () => h(NIcon, { size: 20, component: renderIcon('mdi:text-box-edit-outline') }),
            default: () => h('span', '修改')
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

const handleQueryTable = (): void => {
  getMenuData();
};

// 确定
const handleConfirm = (): void => {

}
</script>

<style lang="scss" scoped></style>
