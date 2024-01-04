<template>
  <!-- 修改用户密码 -->
  <n-modal
    v-model:show="showModifyPasswordModal"
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
        <n-input
          v-model:value="initPassword"
          type="password"
          show-password-on="click"
          placeholder="请输入初始密码"
          :on-blur="handleInitPassword"
        />
      </n-grid-item>
      <n-grid-item>
        <span>新密码：</span>
        <n-input
          v-model:value="newPassword"
          type="password"
          show-password-on="click"
          placeholder="请输入新密码"
          :on-blur="handleNewPassword"
        />
      </n-grid-item>
      <n-grid-item>
        <span>确认新密码：</span>
        <n-input
          v-model:value="confirmNewPassword"
          type="password"
          show-password-on="click"
          placeholder="请确认新密码"
          :on-blur="handleConfirmNewPassword"
        />
      </n-grid-item>
      <n-grid-item v-if="errorAlert.show">
        <n-alert :type="errorAlert.type" closable> {{ errorAlert.content }} </n-alert>
      </n-grid-item>
    </n-grid>
    <template #footer>
      <n-space justify="end">
        <n-button type="primary" :loading="confirmLoading" @click="handleConfirm">确 定</n-button>
        <n-button type="default" @click="handleCancel">取 消</n-button>
      </n-space>
    </template>
  </n-modal>
</template>

<script lang="ts" setup>
let props = defineProps({
  show: {
    type: Boolean,
    default: false
  }
});

let emit = defineEmits(['close']);

let confirmLoading = $ref<boolean>(false);
let initPassword = $ref<string>('');
let newPassword = $ref<string>('');
let confirmNewPassword = $ref<string>('');
let errorAlert = reactive({
  show: false,
  type: '',
  content: ''
});

let showModifyPasswordModal = computed(() => {
  return props.show;
});

watch(showModifyPasswordModal, (nVal, oVal) => {
  if (nVal) {
    initPassword = '';
    newPassword = '';
    confirmNewPassword = '';
  }
});

// 检查初始密码
const handleInitPassword = (): void => {};

// 检查新密码
const handleNewPassword = (): void => {
  let reg = new RegExp(/^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).{6,20}$/);
  if (!reg.test(newPassword)) {
    errorAlert.show = true;
    errorAlert.type = 'error';
    errorAlert.content =
      '密码中必须包含至少一个数字、小写字母、大写字母、一个特殊字符，不能包含空格，密码长度在6到20个字符之间';
  } else {
    errorAlert.show = false;
  }
};

// 确认密码两次一致
const handleConfirmNewPassword = (): void => {
  let reg = new RegExp(/^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).{6,20}$/);
  if (newPassword.replaceAll(' ', '') !== confirmNewPassword.replaceAll(' ', '')) {
    errorAlert.show = true;
    errorAlert.type = 'warning';
    errorAlert.content = '两次密码输入不一致，请检查！';
  } else {
    errorAlert.show = false;
  }
};

const handleConfirm = (): void => {
  if (errorAlert.show) return;
  confirmLoading = true;
  setTimeout(() => {
    window.$message.success('确定');
    confirmLoading = false;
    emit('close');
  }, 1000);
};

const handleModalShow = (val: boolean) => {
  if (!val) emit('close');
};

const handleCancel = (): void => {
  emit('close');
};
</script>

<style lang="scss" scoped></style>
