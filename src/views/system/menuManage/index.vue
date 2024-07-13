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
        <n-form-item-gi span="s:1 m:1 l:1" label="菜单名称">
          <n-input v-model:value="queryFormData.userName" clearable placeholder="请输入用户名" />
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
      <n-button type="info" @click="handleAddMenu">
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
      :data="menuTableData"
      :columns="menuTableHeader"
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
        ref="menuFormRef"
        :model="menuFormData"
        :rules="menuFormRules"
        label-placement="left"
        label-width="auto"
        require-mark-placement="left"
      >
        <n-form-item label="父级菜单" path="pid">
          <n-cascader
            v-model:value="menuFormData.pid"
            placeholder="请选择父级菜单"
            expand-trigger="click"
            :options="menuTreeData"
            label-field="menuName"
            value-field="id"
            :show-path="true"
          />
        </n-form-item>
        <n-form-item label="菜单名称" path="meta.title">
          <n-input v-model:value="menuFormData.meta.title" maxlength="20" placeholder="请输入菜单名称" />
        </n-form-item>
        <n-form-item label="名称代码" path="name">
          <n-input v-model:value="menuFormData.name" maxlength="20" placeholder="请输入名称代码" />
        </n-form-item>
        <n-form-item label="名称描述" path="meta.description">
          <n-input
            v-model:value="menuFormData.meta.description"
            type="textarea"
            :autosize="{
              minRows: 2,
              maxRows: 3
            }"
            show-count
            maxlength="100"
            placeholder="请输入名称描述"
          />
        </n-form-item>
        <n-form-item label="菜单类型" path="">
          <n-radio-group v-model:value="menuFormData.meta.type" name="type" :on-update:value="handleChangeRadio">
            <n-radio :value="0" label="目录"> </n-radio>
            <n-radio :value="1" label="菜单"> </n-radio>
            <n-radio :value="2" label="按钮"> </n-radio>
            <n-radio :value="3" label="外链"> </n-radio>
          </n-radio-group>
        </n-form-item>
        <n-form-item path="path">
          <template #label>
            路由地址
            <n-tooltip placement="top-start" trigger="hover">
              <template #trigger>
                <n-icon>
                  <icon-mdi:help-circle></icon-mdi:help-circle>
                </n-icon>
              </template>
              访问地址
            </n-tooltip>
          </template>
          <n-input v-model:value="menuFormData.path" maxlength="50" placeholder="请输入路由地址" />
        </n-form-item>
        <n-form-item :path="menuFormData.meta.type === 1 ? 'component' : ''">
          <template #label>
            组件路径
            <n-tooltip placement="top-start" trigger="hover">
              <template #trigger>
                <n-icon>
                  <icon-mdi:help-circle></icon-mdi:help-circle>
                </n-icon>
              </template>
              组件的路径，默认都在views文件下，例：/article/index
            </n-tooltip>
          </template>
          <n-input
            v-model:value="menuFormData.component"
            :disabled="menuFormData.meta.type !== 1"
            maxlength="100"
            placeholder="请输入组件路径"
          />
        </n-form-item>
        <n-form-item label="菜单图标" path="meta.icon">
          <n-input v-model:value="menuFormData.meta.icon" maxlength="20" placeholder="请输入图标" />
          <!-- <n-select v-model:value="menuFormData.meta.icon" placeholder="请选择图标" :options="menuTableData" /> -->
        </n-form-item>
        <n-form-item label="是否缓存" path="meta.cache">
          <n-switch v-model:value="menuFormData.meta.cache" :checked-value="0" :unchecked-value="1">
            <template #checked> 是 </template>
            <template #unchecked> 否 </template>
          </n-switch>
        </n-form-item>
        <n-form-item label="是否禁用" path="meta.disabled">
          <n-switch v-model:value="menuFormData.meta.disabled" :checked-value="0" :unchecked-value="1">
            <template #checked> 是 </template>
            <template #unchecked> 否 </template>
          </n-switch>
        </n-form-item>
        <n-form-item label="是否显示" path="meta.show">
          <n-switch v-model:value="menuFormData.meta.show" :checked-value="0" :unchecked-value="1">
            <template #checked> 是 </template>
            <template #unchecked> 否 </template>
          </n-switch>
        </n-form-item>
        <n-form-item label="菜单排序" path="order">
          <n-input-number v-model:value="menuFormData.order" placeholder="请输入序号" />
        </n-form-item>
      </n-form>
      <template #footer>
        <n-space justify="end">
          <n-button type="primary" :loading="confirmLoading" @click="handleConfirm">确 定</n-button>
          <n-button type="default" @click="showModal = false">取 消</n-button>
        </n-space>
      </template>
    </n-modal>
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
import { getMenuList, addMenuList, updateMenu, deleteMenu } from '@/api/system/menuManage';

interface IUserForm {
  userName: string | null;
  dataRange: Array<[string, string]> | null;
}

interface IMenuForm {
  id: string;
  pid: string;
  path: string;
  name: string;
  meta: {
    title: string;
    icon: string;
    show: number;
    disabled: number;
    cache: number;
    type: number;
    description: string;
  };
  component: string;
  order: number;
  children?: IMenuForm[];
}

let tableIsLoading = $ref<boolean>(false);

let queryForm = $ref<FormInst | null>(null);

let queryFormData = $ref<IUserForm>({
  userName: null,
  dataRange: null
});

let showModal = $ref<boolean>(false);

let modelTitle = $ref<string>('');

let emptyMenuForm = {
  pid: '',
  id: '',
  path: '',
  name: '',
  meta: {
    title: '',
    icon: '',
    show: 0,
    disabled: 1,
    cache: 1,
    type: 0,
    description: ''
  },
  component: '',
  order: 0
};

const menuFormRef = $ref<FormInst | null>(null);

let menuTreeData = $ref<Array<any>>([]);

let menuFormData = $ref<IMenuForm>(JSON.parse(JSON.stringify(emptyMenuForm)));

let menuFormRules = {
  pid: {
    required: true,
    trigger: ['blur', 'change'],
    message: '请选择父级菜单'
  },
  name: {
    required: true,
    trigger: ['input', 'blur'],
    message: '请输入菜单名称'
  },
  path: {
    required: true,
    trigger: ['input', 'blur'],
    message: '请输入路由地址'
  },
  component: {
    required: true,
    trigger: ['input', 'blur'],
    message: '请输入组件路径'
  },
  meta: {
    title: {
      required: true,
      trigger: ['input', 'blur'],
      message: '请输入菜单名称'
    },
    type: {
      required: true,
      trigger: ['blur', 'change'],
      message: '请选择菜单类型'
    }
  }
};

let roleOptions = $ref<Array<object>>([
  { label: '角1', value: 'role1' },
  { label: '角2', value: 'role3' }
]);

let menuTableData = $ref<IMenuForm[]>([]);

let menuTableHeader = $ref<DataTableColumns>([
  {
    title: '菜单名称',
    key: 'meta',
    align: 'center',
    render: (row: any) => {
      return row.meta.title;
    }
  },
  { title: '创建者', key: 'createBy', align: 'center' },
  { title: '创建时间', key: 'createTime', align: 'center', width: '200' },
  {
    title: '操作',
    key: 'ops',
    align: 'center',
    width: '250',
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
                onClick: (e) => {
                  menuFormData = JSON.parse(JSON.stringify(emptyMenuForm));
                  menuFormData.pid = rowData.id;
                  modelTitle = '新增';
                  showModal = true;
                }
              },
              {
                icon: () => h(NIcon, { size: 20, component: renderIcon(ICON.O, 'mdi:playlist-plus') }),
                default: () => h('span', '新增')
              }
            ),
            h(
              NButton,
              {
                text: true,
                type: 'primary',
                onClick: (e: any) => {
                  let copyRow = JSON.parse(JSON.stringify(rowData));
                  delete copyRow.children;
                  menuFormData = copyRow;
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
                type: 'error',
                onClick: (e: any) => {
                  window.$dialog.warning({
                    title: '警告',
                    content: '你是否确定进行删除？',
                    positiveText: '确定',
                    negativeText: '取消',
                    onPositiveClick: () => {
                      handleDeleteMenu(rowData.id);
                    },
                    onNegativeClick: () => {
                      // window.$message.error('不确定');
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

let tableRowKey = (rowData: IMenuForm) => {
  return rowData.id;
};

// 确定按钮是否loading
let confirmLoading = $ref<boolean>(false);

// 加载之前
onMounted(() => {
  getMenuData();
});

// 菜单目录名称递归
const getMenuTree = (menuList: Array<IMenuForm>) => {
  let menuTree: Array<any> = [
    {
      menuName: '系统根目录',
      id: '0',
      pid: '0',
      children: []
    }
  ];
  const recursionMenu = (menuList: Array<IMenuForm>) => {
    const clonedTree: any = [];
    for (let node of menuList) {
      const clonedNode: any = {
        menuName: node.meta.title,
        id: node.id,
        pid: node.path
      };
      if (node.children && node.children.length > 0) {
        clonedNode.children = recursionMenu(node.children);
      }
      clonedTree.push(clonedNode);
    }
    return clonedTree;
  };
  let result = recursionMenu(menuList);
  menuTree[0].children = result;
  return menuTree;
};

// 重置查询内容
const resetQueryFormBtn = () => {
  queryFormData = {
    userName: null,
    dataRange: null
  };
  if (queryForm) queryForm.restoreValidation();
};

// 获取菜单数据
const getMenuData = (): void => {
  const data = {
    token: useUserStore().token
  };
  tableIsLoading = true;
  getMenuList(data)
    .then((res: IRes) => {
      if (res && res.code === 200) {
        menuTableData = res.data;
        menuTreeData = getMenuTree(menuTableData);
        // menuTableData = menuTreeData;
        console.log(menuTableData);
        tableIsLoading = false;
      }
    })
    .catch(() => {
      tableIsLoading = false;
    });
};

// 查询
const handleQueryTable = (): void => {
  getMenuData();
};

// 新增
const handleAddMenu = (): void => {
  menuFormData = JSON.parse(JSON.stringify(emptyMenuForm));
  modelTitle = '新增';
  showModal = true;
};

// 导出
const handleDownload = (): void => {
  window.$message.warning('还未开发该功能！');
};

// 单选框选择
const handleChangeRadio = (val: number) => {
  menuFormData.meta.type = val;
};

// 确定
const handleConfirm = (): void => {
  menuFormRef?.validate((errors) => {
    if (!errors) {
      console.log(menuFormData);
      confirmLoading = true;
      if (modelTitle === '新增') {
        addMenuList(menuFormData)
          .then((res) => {
            if (res && res.code === 200) {
              window.$message.success('新增菜单成功');
              confirmLoading = false;
              showModal = false;
              handleQueryTable();
            }
          })
          .catch(() => {
            confirmLoading = false;
          });
      } else {
        updateMenu(menuFormData)
          .then((res) => {
            if (res && res.code === 200) {
              window.$message.success('修改菜单成功');
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
const handleDeleteMenu = (mId: string): void => {
  deleteMenu(mId)
    .then((res: IRes) => {
      if (res && res.code === 200) {
        window.$message.success('已删除菜单！');
        handleQueryTable();
      }
    })
    .catch(() => {
      window.$message.warning('删除菜单失败！');
    });
};
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
