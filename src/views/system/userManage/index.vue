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
            <q-input v-model="queryFormData.nickname" class="w-200" outlined dense clearable placeholder="请输入用户名">
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
            <span class="text-size-base">创建日期</span>
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
          </div>

          <div class="row items-center q-gutter-x-sm q-gutter-y-xs">
            <q-btn label="查 询" color="primary" :icon="mdiMagnify" @click="queryTableDataBtn" />
            <q-btn label="重 置" color="info" :icon="mdiRestore" @click="resetQueryFormBtn" />
          </div>
        </q-form>
      </q-card>

      <div class="row items-center q-my-md q-gutter-x-sm">
        <q-btn color="accent" :icon="mdiPlus" label="新增" @click="handleAddUser"> </q-btn>
        <q-btn color="info" :icon="mdiDownload" label="导 出"> </q-btn>
      </div>

      <q-table
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
        <template #body-cell-avatar="props">
          <q-td :props="props">
            <!-- <q-avatar square>
              <img src="https://picsum.photos/200" />
            </q-avatar> -->
            <MyImage src="https://picsum.photos/200"></MyImage>
          </q-td>
        </template>
        <template #body-cell-ops="props">
          <q-td :props="props">
            <q-btn flat dense color="primary" :icon="mdiPlaylistEdit" label="编辑" />
            <q-btn flat dense color="info" :icon="mdiArrowRight" label="更多" />
          </q-td>
        </template>
      </q-table>
    </div>
    <!-- 新增和编辑弹框 -->
    <q-dialog v-model="userInfoDialog" persistent>
      <q-card bordered style="width: 700px; max-width: 80vw">
        <q-card-section class="row items-center">
          <div class="text-h6">{{ userInfoDialogTitle }}</div>
          <q-space />
          <q-btn v-close-popup :icon="mdiClose" flat round dense />
        </q-card-section>
        <q-card-section class="row items-center">
          <MyForm ref="userFormRef" v-model="userFormData" label-width="80px" layout="horizontal">
            <MyFormItem label="用户账号" required>
              <q-input
                v-model="userFormData.username"
                class="w-200"
                outlined
                dense
                clearable
                lazy-rules
                :rules="userFormRules.username"
                hint=""
                placeholder="请输入用户账号"
              >
              </q-input>
            </MyFormItem>
            <MyFormItem label="用户密码" required>
              <q-input
                v-model="userFormData.password"
                class="w-200"
                type="password"
                outlined
                dense
                clearable
                lazy-rules
                :rules="userFormRules.password"
                hint=""
                placeholder="请输入用户密码"
              >
              </q-input>
            </MyFormItem>
            <MyFormItem label="用户昵称" required>
              <q-input
                v-model="userFormData.nickname"
                class="w-200"
                outlined
                dense
                clearable
                lazy-rules
                :rules="userFormRules.nickname"
                hint=""
                placeholder="请输入用户昵称"
              >
              </q-input>
            </MyFormItem>
            <MyFormItem label="手机号码" required>
              <q-input
                v-model="userFormData.phone"
                class="w-200"
                type="tel"
                outlined
                dense
                clearable
                lazy-rules
                :rules="userFormRules.phone"
                hint=""
                placeholder="请输入手机号码"
              >
              </q-input>
            </MyFormItem>
            <MyFormItem label="电子邮箱" required>
              <q-input
                v-model="userFormData.email"
                class="w-200"
                type="email"
                outlined
                dense
                clearable
                lazy-rules
                :rules="userFormRules.email"
                hint=""
                placeholder="请输入电子邮箱"
              >
              </q-input>
            </MyFormItem>
            <MyFormItem label="性别">
              <q-select
                v-model="userFormData.gender"
                class="w-200"
                transition-show="scale"
                transition-hide="scale"
                :options="genderOptions"
                hint=""
                emit-value
                outlined
                dense
                options-dense
                placeholder="请选择用户名"
              />
            </MyFormItem>
            <MyFormItem label="出生日期">
              <q-input
                v-model="userFormData.birthday"
                class="w-200"
                outlined
                dense
                clearable
                placeholder="请选择出生日期"
                hint=""
              >
                <template #append>
                  <q-icon :name="mdiCalendar" class="c-p">
                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                      <q-date v-model="userFormData.birthday" minimal mask="YYYY-MM-DD">
                        <div class="row items-center justify-end">
                          <q-btn v-close-popup label="确定" color="primary" />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </MyFormItem>
            <MyFormItem label="状态">
              <q-toggle v-model="userFormData.status" class="w-200" color="info" :true-value="1" :false-value="0" />
            </MyFormItem>
            <MyFormItem label="备注" alone-row>
              <q-input
                v-model="userFormData.remarks"
                class="w-200"
                type="textarea"
                outlined
                dense
                clearable
                hint=""
                placeholder="请输入备注"
              >
              </q-input>
            </MyFormItem>
          </MyForm>
        </q-card-section>
        <q-separator />
        <q-card-actions align="right" class="q-ma-sm">
          <q-btn flat label="重 置" color="primary" @click="handleResetForm" />
          <q-btn v-close-popup flat label="取 消" color="primary" />
          <q-btn label="确 定" color="primary" @click="handleSubmitForm" />
        </q-card-actions>
      </q-card>
    </q-dialog>
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
import { getUserList, newAddUser } from '@/api/system/userManage';
import { getDeptList } from '@/api/system/deptManage';
import UserRoles from './components/UserRoles.vue';
import ModifyPassword from './components/ModifyPassword.vue';
import MyForm from '@/components/MyForm/MyForm.vue';
import MyFormItem from '@/components/MyForm/MyFormItem.vue';
import MyImage from '@/components/MyImage/MyImage.vue';
import {
  mdiArrowRight,
  mdiAsterisk,
  mdiCalendar,
  mdiClose,
  mdiDownload,
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
  nickname: string | null;
  phoneNumber: string | null;
  createDate: string;
}

type IUserTable = {
  index?: number;
  userId: string;
  username: string;
  nickname: string;
  gender: number;
  email: string;
  avatar: string;
  remarks: string;
  createBy: string;
  createTime: string;
};

interface IUserForms {
  userId: string;
  username: string;
  password: string;
  nickname: string;
  email: string;
  phone: number;
  gender: number;
  birthday: any | null;
  city: string;
  dept: string;
  avatar: string;
  status: number;
  remarks: string;
}

let emptyUserForm = {
  userId: '',
  username: '',
  password: '',
  nickname: '',
  email: '',
  phone: '',
  gender: 0,
  birthday: '',
  city: '',
  dept: '',
  avatar: '',
  status: 0,
  remarks: ''
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
  nickname: null,
  phoneNumber: null,
  createDate: ''
});

let genderOptions = $ref<Array<object>>([
  { label: '男', value: 0 },
  { label: '女', value: 1 }
]);

let userInfoDialog = $ref<boolean>(false);

let userFormRef = $ref<any>(null);

let userInfoDialogTitle = $ref<string>('');

let userFormData = $ref<IUserForms>(JSON.parse(JSON.stringify(emptyUserForm)));

let userFormRules = {
  username: [(val: string) => (val && val.length > 0) || '请输入用户账号'],
  password: [(val: string) => (val && val.length > 0) || '请输入用户密码'],
  nickname: [(val: string) => (val && val.length > 0) || '请输入用户昵称'],
  phone: [(val: string) => (val && val.length > 0) || '请输入手机号码'],
  email: [
    (val: string) => (val && val.length > 0) || '',
    (val: string, rules: any) => rules.email(val) || '请输入正确的邮箱地址'
  ]
};

let pageInfo = $ref({
  page: 1,
  rowsPerPage: 10,
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
    name: 'nickname',
    field: 'nickname',
    align: 'center',
    headerClasses: 'cus-table-th',
    classes: 'cus-table-td'
  },
  {
    label: '头像',
    name: 'avatar',
    field: 'avatar',
    format: (val) => `${val}`,
    align: 'center',
    headerClasses: 'cus-table-th',
    classes: 'cus-table-td'
  },
  {
    label: '手机号',
    name: 'phone',
    field: 'phone',
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

let rowClassName = (row: IUserTable) => {
  if (row.avatar) {
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
  queryFormData = resetForm(queryFormData);
};

// 查询按钮
const queryTableDataBtn = () => {
  getUserTable();
};

// 新增用户
const handleAddUser = (): void => {
  userFormData = JSON.parse(JSON.stringify(emptyUserForm));
  userInfoDialogTitle = '新增用户';
  userInfoDialog = true;
  nextTick(() => {
    userFormRef.resetValidation();
    userFormRef.reset();
  });
};

// 确定新增和修改按钮
const handleSubmitForm = (): void => {
  userFormRef.validate().then((valid: boolean) => {
    if (valid) {
      //
      console.log(userFormData);
      newAddUser(userFormData).then((res: IRes) => {
        if (res && res.code === 200) {
          userInfoDialog = false;
          getUserTable();
        }
      });
    } else {
      // 校验不通过
    }
  });
};

const handleResetForm = (): void => {
  userFormRef.reset();
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

// 加载之前
onMounted(() => {
  getDeptData();
  getUserTable();
});
</script>

<style lang="scss" scoped>
.view-container {
}
</style>
