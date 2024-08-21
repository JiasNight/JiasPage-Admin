<template>
  <!-- 修改用户密码 -->
  <!-- <n-modal
    v-model:show="showModifyPasswordDialog"
    class="container-card"
    preset="card"
    title="修改密码"
    :auto-focus="false"
    :style="{ width: '37.5rem' }"
    :on-update:show="handleModalShow"
  >
    <n-grid :y-gap="10" :cols="1">
      <n-grid-item>
        <span class>原始密码：</span>
        <n-input v-model:value="initPassword" type="password" show-password-on="click" placeholder="请输入初始密码" />
      </n-grid-item>
      <n-grid-item>
        <span>新密码：</span>
        <n-input
          v-model:value="newPassword"
          type="password"
          show-password-on="click"
          placeholder="请输入新密码"
          :on-blur="handleCheckPassword"
        />
      </n-grid-item>
      <n-grid-item>
        <span>确认新密码：</span>
        <n-input
          v-model:value="confirmNewPassword"
          type="password"
          show-password-on="click"
          placeholder="请确认新密码"
          :on-blur="handleCheckPassword"
        />
      </n-grid-item>
      <n-grid-item v-if="errorAlert.show">
        <n-alert :type="errorAlert.type" closable> {{ errorAlert.content }} </n-alert>
      </n-grid-item>
    </n-grid>
    <template #footer>
      <n-space justify="end">
        <n-button type="default" @click="handleCancel">取 消</n-button>
        <n-button type="primary" :loading="confirmLoading" @click="handleConfirm">确 定</n-button>
      </n-space>
    </template>
  </n-modal> -->
  <q-dialog v-model="showModifyPasswordDialog" persistent>
    <q-card bordered>
      <q-card-section class="row items-center">
        <div class="text-h6">修改密码</div>
        <q-space />
        <q-btn v-close-popup :icon="mdiClose" flat round dense @click="handleCancel" />
      </q-card-section>
      <q-card-section class="row items-center">
        <MyForm ref="modifyFormRef" v-model="modifyFormData">
          <MyFormItem>
            <q-input
              v-model="modifyFormData.initPassword"
              class="w-md"
              :type="initPasswordType"
              outlined
              dense
              clearable
              lazy-rules
              :rules="modifyFormRules.initPassword"
              hint=""
              placeholder="请输入初始密码"
            >
              <template #append>
                <q-icon
                  v-if="initPasswordType === 'password'"
                  class="c-p"
                  :name="mdiEye"
                  @click="initPasswordType = 'text'"
                />
                <q-icon
                  v-if="initPasswordType === 'text'"
                  class="c-p"
                  :name="mdiEyeOff"
                  @click="initPasswordType = 'password'"
                />
              </template>
            </q-input>
          </MyFormItem>
          <MyFormItem>
            <q-input
              v-model="modifyFormData.newPassword"
              class="w-md"
              :type="newPasswordType"
              outlined
              dense
              clearable
              lazy-rules
              :rules="modifyFormRules.newPassword"
              hint=""
              placeholder="请输入用请输入新密码户密码"
            >
              <template #append>
                <q-icon
                  v-if="newPasswordType === 'password'"
                  class="c-p"
                  :name="mdiEye"
                  @click="newPasswordType = 'text'"
                />
                <q-icon
                  v-if="newPasswordType === 'text'"
                  class="c-p"
                  :name="mdiEyeOff"
                  @click="newPasswordType = 'password'"
                />
              </template>
            </q-input>
          </MyFormItem>
          <MyFormItem>
            <q-input
              v-model="modifyFormData.confirmNewPassword"
              class="w-md"
              :type="confirmNewPasswordType"
              outlined
              dense
              clearable
              lazy-rules
              :rules="modifyFormRules.confirmNewPassword"
              hint=""
              placeholder="请确认新密码"
            >
              <template #append>
                <q-icon
                  v-if="confirmNewPasswordType === 'password'"
                  class="c-p"
                  :name="mdiEye"
                  @click="confirmNewPasswordType = 'text'"
                />
                <q-icon
                  v-if="confirmNewPasswordType === 'text'"
                  class="c-p"
                  :name="mdiEyeOff"
                  @click="confirmNewPasswordType = 'password'"
                />
              </template>
            </q-input>
          </MyFormItem>
        </MyForm>
      </q-card-section>
      <q-separator />
      <q-card-actions align="right" class="q-ma-sm">
        <q-btn label="取 消" color="warning" @click="handleCancel" />
        <q-btn label="确 定" color="primary" @click="handleConfirm" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts" setup>
import { mdiClose, mdiEye, mdiEyeOff } from '@quasar/extras/mdi-v6';
import { QInputType } from 'quasar';

let props = defineProps({
  show: {
    type: Boolean,
    default: false
  }
});

let emit = defineEmits(['close']);

let modifyFormRef = $ref<any>(null);

let confirmLoading = $ref<boolean>(false);

let initPasswordType = $ref<QInputType>('password');
let newPasswordType = $ref<QInputType>('password');
let confirmNewPasswordType = $ref<QInputType>('password');

let modifyFormData = reactive({
  initPassword: '',
  newPassword: '',
  confirmNewPassword: ''
});

let modifyFormRules = {
  initPassword: [(val: string) => (val && val.length > 0) || '请输入初始密码'],
  newPassword: [(val: string) => (val && val.length > 0) || '请输入新密码'],
  confirmNewPassword: [(val: string) => (val && val.length > 0) || '请确认新密码']
};

let errorAlert = reactive({
  show: false,
  type: '',
  content: ''
});

let showModifyPasswordDialog = computed(() => {
  return props.show;
});

watch(showModifyPasswordDialog, (nVal, oVal) => {
  if (nVal) {
    modifyFormData.initPassword = '';
    modifyFormData.newPassword = '';
    modifyFormData.confirmNewPassword = '';
  }
});

// 检查密码设置
const handleCheckPassword = (): void => {
  let newPasswordIsOk = false;
  let reg = new RegExp(/^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).{6,20}$/);
  if (!reg.test(modifyFormData.newPassword)) {
    errorAlert.show = true;
    errorAlert.type = 'error';
    errorAlert.content =
      '密码中必须包含至少一个数字、小写字母、大写字母、一个特殊字符，不能包含空格，密码长度在6到20个字符之间';
  } else {
    errorAlert.show = false;
    newPasswordIsOk = true;
  }
  if (modifyFormData.confirmNewPassword && newPasswordIsOk) {
    if (modifyFormData.newPassword.replaceAll(' ', '') !== modifyFormData.confirmNewPassword.replaceAll(' ', '')) {
      errorAlert.show = true;
      errorAlert.type = 'warning';
      errorAlert.content = '两次密码输入不一致，请检查！';
    } else {
      errorAlert.show = false;
    }
  }
};

const handleConfirm = (): void => {
  console.log(modifyFormRef);
  modifyFormRef.validate().then((valid: boolean) => {
    if (valid) {
      // 校验通过
      confirmLoading = true;
      setTimeout(() => {
        window.$message.success('确定');
        confirmLoading = false;
        emit('close');
      }, 1000);
    } else {
      // 校验不通过
    }
  });
};

const handleModalShow = (val: boolean) => {
  if (!val) emit('close');
};

const handleCancel = (): void => {
  emit('close');
};
</script>
