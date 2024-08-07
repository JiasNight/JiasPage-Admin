<template>
  <div class="view-container row justify-between">
    <div class="col-xs-12 col-sm-6 col-md-2 col-lg-2 col-xl-3">
      <LeftTree
        :data="deptTreeData"
        :loading="deptTreeLoading"
        node-key="id"
        label-key="name"
        @refresh="refreshTreeBtn"
        @selected="handleClickTree"
      ></LeftTree>
    </div>
    <div class="col-xs-12 col-sm-6 col-md-10 col-lg-10 col-xl-9 q-pl-md">
      <q-card class="q-pa-md" flat bordered>
        <q-form class="row items-center q-gutter-md">
          <div class="row items-center q-gutter-xs">
            <span class="text-size-base">用户名</span>
            <q-input v-model="queryFormData.username" class="w-200" outlined dense clearable placeholder="请输入用户名">
            </q-input>
          </div>
          <div class="row items-center q-gutter-xs">
            <span class="text-size-base">用户昵称</span>
            <q-input v-model="queryFormData.nickName" class="w-200" outlined dense clearable placeholder="请输入用户名">
            </q-input>
          </div>
          <div class="row items-center q-gutter-xs">
            <span class="text-size-base">手机号码</span>
            <q-input
              v-model="queryFormData.phoneNumber"
              class="w-200"
              outlined
              dense
              clearable
              placeholder="请输入用户名"
            >
            </q-input>
          </div>
          <div class="row items-center q-gutter-xs">
            <span class="text-size-base">角色</span>
            <q-select
              v-model="queryFormData.userRole"
              class="w-200"
              :options="roleOptions"
              outlined
              dense
              placeholder="请选择用户名"
            />
          </div>
          <div class="row items-center q-gutter-xs">
            <span class="text-size-base">创建日期</span>
            <q-input
              v-model="queryFormData.createDate"
              class="w-200"
              outlined
              dense
              mask="date"
              placeholder="请选择日期"
            >
              <template #append>
                <q-icon :name="mdiCalendar" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-date v-model="queryFormData.dateRange" minimal mask="YYYY-MM-DD">
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="确定" color="primary" />
                        <q-btn v-close-popup label="关闭" color="info" flat />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>

          <div class="row items-center q-gutter-xs">
            <q-btn label="查 询" color="primary" :icon="mdiMagnify" @click="queryTableDataBtn" />
            <q-btn label="重 置" color="info" :icon="mdiRestore" @click="resetQueryFormBtn" />
          </div>
        </q-form>
      </q-card>

      <q-table
        class="q-mt-md"
        :loading="tableIsLoading"
        :rows="userTableData"
        :columns="userTableHeaderColumns"
        row-key="userId"
        separator="horizontal"
        flat
        bordered
        :pagination="pageInfo"
        :rows-per-page-options="[10, 20, 50, 100]"
        @request="queryTableDataBtn"
      >
        <template #loading>
          <q-inner-loading showing color="primary" />
        </template>
        <template #body-cell-userAvatar="props">
          <q-td :props="props">
            <!-- <span>{{ props.value }}</span> -->
            <q-avatar square>
              <img src="https://picsum.photos/200" />
            </q-avatar>
          </q-td>
        </template>
        <template #body-cell-ops="props">
          <q-td :props="props">
            <q-btn push flat dense color="accent" :icon="mdiPlus" label="新增"> </q-btn>
            <q-btn flat dense color="primary" :icon="mdiPlaylistEdit" label="编辑" />
            <q-btn flat dense color="info" :icon="mdiArrowRight" label="更多" />
          </q-td>
        </template>
      </q-table>
    </div>
    <!-- 用户角色权限弹框 -->
    <UserRoles :show="showUserRoleModal" @close="showUserRoleModal = false"></UserRoles>
    <!-- 修改用户密码 -->
    <ModifyPassword :show="showModifyPasswordModal" @close="showModifyPasswordModal = false"></ModifyPassword>
  </div>
</template>

<script lang="ts" setup>
import { ICON } from '@/enums/icon';
import { Ref, ComputedRef, h, Component } from 'vue';
import { resetForm } from '@/utils/common';
import { IRes } from '@/interface/common';
import useUserStore from '@/store/module/user';
import { getUserList } from '@/api/system/userManage';
import { getDeptList } from '@/api/system/deptManage';
import UserRoles from './components/UserRoles.vue';
import ModifyPassword from './components/ModifyPassword.vue';
import {
  mdiArrowRight,
  mdiCalendar,
  mdiMagnify,
  mdiPencil,
  mdiPlaylistEdit,
  mdiPlus,
  mdiRestore
} from '@quasar/extras/mdi-v6';
import LeftTree from '@/components/LeftTree/index.vue';
import { QPagination, QTableColumn, QTreeNode } from 'quasar';

interface IQueryForm {
  username: string | null;
  nickName: string | null;
  phoneNumber: string | null;
  userRole: Array<string> | null;
  createDate: string;
  dateRange: string;
}

type IUserTable = {
  index?: number;
  userId: string;
  username: string;
  userAccount: string;
  userRole: string;
  userAvatar: string;
  createTime: string;
};

interface IUserForms {
  userId: string;
  username: string;
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
  username: '',
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

let deptTreeData = $ref<QTreeNode[]>([]);

let tableRowKey = (rowData: IUserTable) => {
  return rowData.userId;
};

let queryFormData = $ref<IQueryForm>({
  username: null,
  nickName: null,
  phoneNumber: null,
  userRole: null,
  createDate: '',
  dateRange: ''
});

let roleOptions = $ref<Array<object>>([
  { label: '角1', value: 'role1' },
  { label: '角2', value: 'role3' }
]);

let showUserModal = $ref<boolean>(false);

let userFormRef = $ref<null>(null);

let userModelTitle = $ref<string>('');

let userFormData = $ref<IUserForms>(JSON.parse(JSON.stringify(emptyUserForm)));

let userFormRules = {
  username: {
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

let pageInfo = $ref({
  page: 1,
  rowsPerPage: 3,
  rowsNumber: 1
});

let confirmLoading = $ref<boolean>(false);

let tableIsLoading = $ref<boolean>(false);

let showUserRoleModal = $ref<boolean>(false);

let showModifyPasswordModal = $ref<boolean>(false);

let userTableHeaderColumns = $ref<QTableColumn[]>([
  {
    label: '序号',
    name: 'index',
    field: 'index',
    align: 'center',
    headerClasses: 'cus-table-th',
    classes: 'cus-table-td'
  },
  {
    label: '用户账号',
    name: 'username',
    field: 'username',
    align: 'center',
    headerClasses: 'cus-table-th',
    classes: 'cus-table-td'
  },
  {
    label: '用户昵称',
    name: 'userNick',
    field: 'userNick',
    align: 'center',
    headerClasses: 'cus-table-th',
    classes: 'cus-table-td'
  },
  {
    label: '头像',
    name: 'userAvatar',
    field: 'userAvatar',
    format: (val) => `${val}`,
    align: 'center',
    headerClasses: 'cus-table-th',
    classes: 'cus-table-td'
  },
  {
    label: '手机号',
    name: 'userPhone',
    field: 'userPhone',
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
    label: '操作',
    name: 'ops',
    field: 'ops',
    align: 'center',
    headerClasses: 'cus-table-th',
    classes: 'cus-table-td'
  }
]);

let rowClassName = (row: IUserTable) => {
  if (row.userAvatar) {
    return 'row-avatar';
  }
};

let userTableData: Array<IUserTable[]> = [];

// 刷新树
const refreshTreeBtn = () => {
  getDeptData();
};

// 获取部门树
const getDeptData = () => {
  deptTreeLoading = true;
  getDeptList()
    .then((res: IRes) => {
      if (res && res.code === 200) {
        deptTreeData = res.data;
        deptTreeLoading = false;
      }
    })
    .catch(() => {
      deptTreeLoading = false;
    });
};

// 点击树
const handleClickTree = (key: String) => {
  currentSelectedTreeKey = key;
  getUserTable();
};

// 查询用户列表
const getUserTable = () => {
  const data = {
    ...queryFormData,
    deptId: currentSelectedTreeKey,
    pageSize: pageInfo.rowsPerPage,
    pageNum: pageInfo.page
  };
  tableIsLoading = true;
  getUserList(data)
    .then((res: IRes) => {
      if (res && res.code === 200) {
        let reData = res.data;
        let tableData = reData.records;
        tableData.forEach((item: IUserTable, index: number) => {
          item.index = index + 1;
        });
        userTableData = tableData;
        pageInfo.rowsNumber = reData.total;
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
}
</style>
