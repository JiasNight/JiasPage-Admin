<template>
  <q-dialog v-model="showModifyPasswordDialog" persistent>
    <q-card bordered style="width: 500px">
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
        <q-btn label="确 定" color="primary" :loading="confirmBtnLoading" @click="handleConfirm" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts" setup>
import { mdiClose, mdiEye, mdiEyeOff } from "@quasar/extras/mdi-v6";
import { QInputType } from "quasar";

let props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
});

let emit = defineEmits(["close"]);

let modifyFormRef = $ref<any>(null);

let confirmBtnLoading = $ref<boolean>(false);

let initPasswordType = $ref<QInputType>("password");
let newPasswordType = $ref<QInputType>("password");
let confirmNewPasswordType = $ref<QInputType>("password");

let modifyFormData = reactive({
  initPassword: "",
  newPassword: "",
  confirmNewPassword: "",
});

let modifyFormRules = {
  initPassword: [(val: string) => (val && val.length > 0) || "请输入初始密码"],
  newPassword: [
    (val: string) => (val && val.length > 0) || "请输入新密码",
    (val: string) => val.length >= 6 || "密码不能少于6位",
    (val: string) => val.length <= 20 || "密码不能超过20位",
    (val: string) => {
      let reg = new RegExp(/^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).{6,20}$/);
      return reg.test(val) || "密码必须包含数字、大小写字母、特殊字符";
    },
  ],
  confirmNewPassword: [
    (val: string) => (val && val.length > 0) || "请确认新密码",
    (val: string) => val === modifyFormData.newPassword || "两次密码输入不一致",
  ],
};

let showModifyPasswordDialog = computed(() => {
  return props.show;
});

watch(showModifyPasswordDialog, (nVal, oVal) => {
  if (nVal) {
    modifyFormData.initPassword = "";
    modifyFormData.newPassword = "";
    modifyFormData.confirmNewPassword = "";
  }
});

const handleConfirm = (): void => {
  console.log(modifyFormRef);
  modifyFormRef.validate().then((valid: boolean) => {
    if (valid) {
      // 校验通过
      confirmBtnLoading = true;
      setTimeout(() => {
        Notify.create({
          type: "positive",
          position: "top-right",
          message: "密码修改成功！",
        });
        confirmBtnLoading = false;
        emit("close");
      }, 1000);
    } else {
      // 校验不通过
    }
  });
};

const handleCancel = (): void => {
  emit("close");
};
</script>
