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
        <n-form-item-gi span="s:1 m:1 l:1" label="部门名称">
          <n-input v-model:value="queryFormData.deptName" clearable placeholder="请输入部门名称" />
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
      <n-button type="info" @click="handleAddDept">
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
      :data="deptTableData"
      :columns="deptTableHeader"
      :loading="tableIsLoading"
      :row-key="tableRowKey"
      :bordered="true"
      :single-line="false"
      :pagination="pagination"
      default-expand-all
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
        ref="deptFormRef"
        :model="deptFormData"
        :rules="deptFormRules"
        label-placement="left"
        label-width="auto"
        require-mark-placement="left"
      >
        <n-form-item label="上级部门" path="pid">
          <n-cascader
            v-model:value="deptFormData.pid"
            placeholder="请选择上级部门"
            expand-trigger="click"
            :options="deptTreeData"
            label-field="deptName"
            value-field="id"
            :show-path="true"
          />
        </n-form-item>
        <n-form-item label="部门名称" path="name">
          <n-input v-model:value="deptFormData.name" maxlength="20" placeholder="请输入部门名称" />
        </n-form-item>
        <n-form-item label="名称代码" path="code">
          <n-input v-model:value="deptFormData.code" maxlength="20" placeholder="请输入名称代码" />
        </n-form-item>
        <n-form-item label="部门描述" path="description">
          <n-input
            v-model:value="deptFormData.description"
            type="textarea"
            :autosize="{
              minRows: 2,
              maxRows: 3
            }"
            show-count
            maxlength="100"
            placeholder="请输入部门描述"
          />
        </n-form-item>
        <n-form-item label="排序" path="order">
          <n-input-number v-model:value="deptFormData.order" placeholder="请输入序号" />
        </n-form-item>
        <n-form-item label="是否启用" path="status">
          <n-switch v-model:value="deptFormData.status" :checked-value="0" :unchecked-value="1">
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
import { getDeptList, addDeptList, updateDept, deleteDept } from '@/api/system/deptManage';

interface IQueryForm {
  deptName: string | null;
  dataRange: Array<[string, string]> | null;
}

interface IDeptForm {
  id: string;
  pid: string;
  name: string;
  code: string;
  description: string;
  status: number;
  order: number;
  children?: IDeptForm[];
}

let tableIsLoading = $ref<boolean>(false);

let queryForm = $ref<FormInst | null>(null);

let queryFormData = $ref<IQueryForm>({
  deptName: null,
  dataRange: null
});

let showModal = $ref<boolean>(false);

let modelTitle = $ref<string>('');

let emptyDeptForm = {
  pid: '',
  id: '',
  name: '',
  code: '',
  description: '',
  status: '',
  order: 0
};

const deptFormRef = $ref<FormInst | null>(null);

let deptTreeData = $ref<Array<any>>([]);

let deptFormData = $ref<IDeptForm>(JSON.parse(JSON.stringify(emptyDeptForm)));

let deptFormRules = {
  pid: {
    required: true,
    trigger: ['blur', 'change'],
    message: '请选择上级部门'
  },
  name: {
    required: true,
    trigger: ['input', 'blur'],
    message: '请输入部门名称'
  },
  code: {
    required: true,
    trigger: ['input', 'blur'],
    message: '请输入部门代码'
  }
};

let deptTableData = $ref<IDeptForm[]>([]);

let deptTableHeader = $ref<DataTableColumns>([
  {
    title: '部门名称',
    key: 'name',
    align: 'center'
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
                  deptFormData = JSON.parse(JSON.stringify(emptyDeptForm));
                  deptFormData.pid = rowData.id;
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
                  deptFormData = copyRow;
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
                    negativeText: '不确定',
                    onPositiveClick: () => {
                      window.$message.success('确定');
                      handleDeleteDept(rowData.id);
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

let tableRowKey = (rowData: IDeptForm, i: number) => {
  return rowData.id;
};

// 确定按钮是否loading
let confirmLoading = $ref<boolean>(false);

// 部门目录名称递归
const getDeptTree = (deptList: Array<IDeptForm>) => {
  let deptTree: Array<any> = [
    {
      deptName: '部门根目录',
      id: '0',
      pid: '0',
      children: []
    }
  ];
  const recursionDept = (deptList: Array<IDeptForm>) => {
    const clonedTree: any = [];
    for (let node of deptList) {
      const clonedNode: any = {
        deptName: node.name,
        id: node.id,
        pid: node.pid
      };
      if (node.children && node.children.length > 0) {
        clonedNode.children = recursionDept(node.children);
      }
      clonedTree.push(clonedNode);
    }
    return clonedTree;
  };
  let result = recursionDept(deptList);
  deptTree[0].children = result;
  return deptTree;
};

// 重置查询内容
const resetQueryFormBtn = () => {
  queryFormData = {
    deptName: null,
    dataRange: null
  };
  if (queryForm) queryForm.restoreValidation();
};

// 获取部门数据
const getDeptData = (): void => {
  tableIsLoading = true;
  getDeptList()
    .then((res: IRes) => {
      if (res && res.code === 200) {
        deptTableData = res.data;
        deptTreeData = getDeptTree(deptTableData);
        tableIsLoading = false;
      }
    })
    .catch(() => {
      tableIsLoading = false;
    });
};

// 查询
const handleQueryTable = (): void => {
  getDeptData();
};

// 新增
const handleAddDept = (): void => {
  deptFormData = JSON.parse(JSON.stringify(emptyDeptForm));
  modelTitle = '新增';
  showModal = true;
};

// 导出
const handleDownload = (): void => {
  window.$message.warning('还未开发该功能！');
};

// 确定
const handleConfirm = (): void => {
  deptFormRef?.validate((errors) => {
    if (!errors) {
      console.log(deptFormData);
      confirmLoading = true;
      if (modelTitle === '新增') {
        addDeptList(deptFormData)
          .then((res) => {
            if (res && res.code === 200) {
              window.$message.success('新增部门成功');
              confirmLoading = false;
              showModal = false;
              handleQueryTable();
            }
          })
          .catch(() => {
            confirmLoading = false;
          });
      } else {
        updateDept(deptFormData)
          .then((res) => {
            if (res && res.code === 200) {
              window.$message.success('修改部门成功');
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
const handleDeleteDept = (mId: string): void => {
  deleteDept(mId)
    .then((res: IRes) => {
      if (res && res.code === 200) {
        window.$message.success('已删除部门！');
        handleQueryTable();
      }
    })
    .catch(() => {
      window.$message.warning('删除部门失败！');
    });
};

// 加载之前
onMounted(() => {
  getDeptData();
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
