<template>
  <div class="view-container">
    <n-grid cols="1 600:2 800:6 1000:8" :x-gap="10">
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
              label-field="name"
              children-field="children"
              block-line
              default-expand-all
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
                      <icon-mdi:autorenew></icon-mdi:autorenew>
                    </n-icon>
                  </template>
                  重 置
                </n-button>
                <n-button attr-type="submit" type="primary" @click="queryTableDataBtn">
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
        <!-- 新增 -->
        <n-space class="right-space" justify="end">
          <n-button type="primary" @click="handleAddUser">
            <template #icon>
              <icon-mdi:plus></icon-mdi:plus>
            </template>
            新 增
          </n-button>
          <n-button type="primary">
            <template #icon>
              <icon-mdi:cloud-download-outline></icon-mdi:cloud-download-outline>
            </template>
            导 出
          </n-button>
        </n-space>
        <!-- 表格 -->
        <n-data-table
          :columns="userTableHeaderColumns"
          :data="userTableData"
          :row-key="tableRowKey"
          :row-class-name="rowClassName"
          :bordered="true"
          :single-line="false"
          :loading="tableIsLoading"
          :pagination="tablePagination"
        >
        </n-data-table>
      </n-grid-item>
    </n-grid>
    <!-- 新增和修改用户信息弹框 -->
    <n-modal
      v-model:show="showUserModal"
      class="container-card"
      preset="card"
      :title="userModelTitle"
      :auto-focus="false"
      :style="{ width: '37.5rem' }"
    >
      <n-form
        ref="userFormRef"
        :model="userFormData"
        :rules="userFormRules"
        label-placement="left"
        label-width="auto"
        require-mark-placement="left"
      >
        <n-grid :cols="24" :x-gap="20">
          <n-form-item-gi :span="12" label="用户账号" path="userName">
            <n-input v-model:value="userFormData.userName" maxlength="20" placeholder="请输入菜单名称" />
          </n-form-item-gi>
          <n-form-item-gi :span="12" label="用户密码" path="userPassword">
            <n-input
              v-model:value="userFormData.userPassword"
              type="password"
              maxlength="20"
              placeholder="请输入用户密码"
            />
          </n-form-item-gi>
          <n-form-item-gi :span="12" label="用户昵称" path="userNick">
            <n-input v-model:value="userFormData.userNick" maxlength="20" placeholder="请输入名称代码" />
          </n-form-item-gi>
          <n-form-item-gi :span="12" label="所属部门" path="userDept">
            <n-cascader
              v-model:value="userFormData.userDept"
              placeholder="请选择部门"
              :options="deptTreeData"
              :show-path="true"
            />
          </n-form-item-gi>
          <n-form-item-gi :span="12" label="用户性别" path="userGender">
            <n-radio-group v-model:value="userFormData.userGender" name="genderType">
              <n-radio :value="0" label="女"> </n-radio>
              <n-radio :value="1" label="男"> </n-radio>
            </n-radio-group>
          </n-form-item-gi>
          <n-form-item-gi :span="12" label="出身日期" path="userBirthday">
            <n-date-picker
              v-model:formatted-value="userFormData.userBirthday"
              type="date"
              format="yyyy年-MM月-dd日"
              value-format="yyyy-MM-dd"
            />
          </n-form-item-gi>
          <n-form-item-gi :span="12" label="用户手机" path="userPhone">
            <n-input v-model:value="userFormData.userPhone" maxlength="11" placeholder="请输入用户手机" />
          </n-form-item-gi>
          <n-form-item-gi :span="12" label="电子邮箱" path="userEmail">
            <n-input v-model:value="userFormData.userEmail" type="email" maxlength="50" placeholder="请输入电子邮箱" />
          </n-form-item-gi>
          <n-form-item-gi :span="12" label="所在城市" path="userCity">
            <n-input v-model:value="userFormData.userCity" maxlength="50" placeholder="请输入所在城市" />
          </n-form-item-gi>
          <n-form-item-gi :span="12" label="状态" path="userStatus">
            <n-switch v-model:value="userFormData.userStatus" :checked-value="0" :unchecked-value="1">
              <template #checked> 启用 </template>
              <template #unchecked> 关闭 </template>
            </n-switch>
          </n-form-item-gi>
          <n-form-item-gi :span="12" label="备注" path="userMarks">
            <n-input
              v-model:value="userFormData.userMarks"
              type="textarea"
              :autosize="{
                minRows: 2,
                maxRows: 3
              }"
              show-count
              maxlength="100"
              placeholder="请输入备注"
            />
          </n-form-item-gi>
        </n-grid>
      </n-form>
      <template #footer>
        <n-space justify="end">
          <n-button type="primary" :loading="confirmLoading" @click="handleConfirm">确 定</n-button>
          <n-button type="default" @click="showUserModal = false">取 消</n-button>
        </n-space>
      </template>
    </n-modal>
    <!-- 用户角色权限弹框 -->
    <UserRoles :show="showUserRoleModal" @close="showUserRoleModal = false"></UserRoles>
    <!-- 修改用户密码 -->
    <ModifyPassword :show="showModifyPasswordModal" @close="showModifyPasswordModal = false"></ModifyPassword>
  </div>
</template>

<script lang="ts" setup>
import { ICON } from '@/enums/icon';
import { Ref, ComputedRef, h, Component } from 'vue';
import { TreeOption, FormInst, DataTableColumns, NButton, NIcon, useDialog, useMessage } from 'naive-ui';
import { resetForm } from '@/utils/common';
import { IRes } from '@/interface/common';
import useUserStore from '@/store/module/user';
import { getUserList } from '@/api/system/userManage';
import { getDeptList } from '@/api/system/deptManage';
import UserRoles from './components/UserRoles.vue';
import ModifyPassword from './components/ModifyPassword.vue';

interface IQueryForm {
  userName: string | null;
  userAccount: string | null;
  userPhone: string | null;
  userRole: Array<string> | null;
  dataRange: Array<[string, string]> | null;
}

type IUserTable = {
  userId: string;
  userName: string;
  userAccount: string;
  userRole: string;
  userAvatar: string;
  createTime: string;
};

interface IUserForms {
  userId: string;
  userName: string;
  userPassword: string;
  userNick: string;
  userEmail: string;
  userPhone: number;
  userGender: number;
  userBirthday: any | null;
  userCity: string;
  userDept: string;
  userAvatar: string;
  userStatus: number;
  userMarks: string;
}

let emptyUserForm = {
  userId: '',
  userName: '',
  userPassword: '',
  userNick: '',
  userDept: '',
  userEmail: '',
  userPhone: '',
  userGender: '',
  userBirthday: null,
  userCity: '',
  userAvatar: '',
  userStatus: 0,
  userMarks: ''
};

// 引入全局方法
const renderIcon: any = inject('renderIcon');

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

let tableRowKey = (rowData: IUserTable) => {
  return rowData.userId;
};

let queryForm = $ref<FormInst | null>(null);

let queryFormData = $ref<IQueryForm>({
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

let showUserModal = $ref<boolean>(false);

let userFormRef = $ref<FormInst | null>(null);

let userModelTitle = $ref<string>('');

let userFormData = $ref<IUserForms>(JSON.parse(JSON.stringify(emptyUserForm)));

let userFormRules = {
  userName: {
    required: true,
    trigger: 'blur',
    message: '请输入用户账户'
  },
  userPassword: {
    required: true,
    trigger: 'blur',
    message: '请输入用户密码'
  }
};

let confirmLoading = $ref<boolean>(false);

let tableIsLoading = $ref<boolean | null>(false);

let showUserRoleModal = $ref<boolean>(false);

let showModifyPasswordModal = $ref<boolean>(false);

let userTableHeaderColumns = $ref<DataTableColumns>([
  {
    title: '序号',
    key: 'index',
    align: 'center',
    titleAlign: 'center',
    width: '60',
    render: (row, index) => {
      return index + 1;
    }
  },
  { title: '用户账号', key: 'userName', align: 'center' },
  { title: '用户昵称', key: 'userNick', align: 'center' },
  {
    title: '头像',
    key: 'userAvatar',
    align: 'center',
    render: (row) => {
      return h('n-space', [
        h(NImage, {
          src: 'https://picsum.photos/id/1/100/100',
          width: 50,
          lazy: true,
          'show-toolbar-tooltip': true
        })
      ]);
    }
  },
  {
    title: '角色',
    key: 'userRole',
    align: 'center',
    render: (row, index) => {
      if (row.userRole === '0') return '角色1';
      else return '角色2';
    }
  },
  { title: '创建时间', key: 'createTime', align: 'center' },
  {
    title: '操作',
    key: 'ops',
    align: 'center',
    width: '250',
    render: (row) => {
      return h(
        NSpace,
        { justify: 'center', align: 'center' },
        {
          default: () => [
            h(
              NButton,
              {
                text: true,
                type: 'primary',
                onClick: (e: any) => {
                  userFormData = JSON.parse(JSON.stringify(row));
                  userModelTitle = '编辑用户';
                  showUserModal = true;
                }
              },
              {
                icon: () => h(NIcon, { size: 20, component: renderIcon(ICON.O, 'mdi:playlist-edit') }),
                default: () => h('span', '编辑')
              }
            ),
            h(
              NDropdown,
              {
                options: [
                  {
                    label: '角色权限',
                    key: 'userRole',
                    icon: renderIcon(ICON.F, 'mdi:account-multiple-check')
                  },
                  {
                    label: '修改密码',
                    key: 'modifyPassword',
                    icon: renderIcon(ICON.F, 'mdi:account-key')
                  },
                  {
                    label: '重置密码',
                    key: 'resetPassword',
                    icon: renderIcon(ICON.F, 'mdi:lock-reset')
                  }
                ],
                onSelect: (key: string): void => {
                  if (key === 'userRole') {
                    showUserRoleModal = true;
                  } else if (key === 'modifyPassword') {
                    showModifyPasswordModal = true;
                  } else if (key === 'resetPassword') {
                    handleResetPassword();
                  }
                }
              },
              {
                default: () =>
                  h(
                    NButton,
                    {
                      text: true,
                      type: 'primary'
                    },
                    {
                      icon: () => h(NIcon, { size: 20, component: renderIcon(ICON.O, 'mdi:chevron-triple-right') }),
                      default: () => h('span', '更多')
                    }
                  )
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

let rowClassName = (row: IUserTable) => {
  if (row.userAvatar) {
    return 'row-avatar';
  }
};

let userTableData: Array<IUserTable[]> = [];

let tablePagination = $ref<object>({
  page: 1,
  pageCount: 1,
  pageSize: 10,
  prefix({ itemCount }: any) {
    return `Total is ${itemCount}.`;
  }
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
  getDeptList(data).then((res: IRes) => {
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
  tableIsLoading = true;
  getUserList(data)
    .then((res: IRes) => {
      if (res && res.code === 200) {
        let reData = res.data;
        userTableData = reData;
      }
      tableIsLoading = false;
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

// 加载之前
onMounted(() => {
  getDeptData();
  getUserTable();
});

// 新增用户
const handleAddUser = (): void => {
  userFormData = JSON.parse(JSON.stringify(emptyUserForm));
  showUserModal = true;
  userModelTitle = '新增用户';
};

// 确定新增和修改按钮
const handleConfirm = (): void => {
  userFormRef?.validate((errors) => {
    if (!errors) {
      console.log(userFormData);
    } else {
      window.$message.error('表单必填项请填写！');
    }
  });
};

// 重置密码
const handleResetPassword = () => {
  const d = window.$dialog.warning({
    title: '密码重置',
    content: '您正在重置用户的密码，是否确认？',
    negativeText: '取消',
    positiveText: '确认',
    onPositiveClick: () => {
      d.loading = true;
      return new Promise((resolve) => {
        setTimeout(() => {
          window.$notification.success({
            content: '密码重置成功！',
            meta: 'ab*73223k',
            duration: 2500,
            keepAliveOnHover: true
          });
          resolve(true);
        }, 2000);
      });
    }
  });
};
</script>

<style lang="scss" scoped>
.view-container {
  .grid-left {
    min-width: 12.5rem;
  }
  .grid-right {
    min-width: 12.5rem;
    .right-space {
      margin-bottom: 0.625rem;
    }
  }
}
</style>
