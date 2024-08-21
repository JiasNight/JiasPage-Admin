<template>
  <!-- 修改用户密码 -->
  <!-- <n-modal
    v-model:show="showUserRoleDialog"
    class="container-card"
    preset="card"
    title="分配角色"
    :auto-focus="false"
    :style="{ width: '37.5rem' }"
    :on-update:show="handleModalShow"
  >
    角色
    <template #footer>
      <n-space justify="end">
        <n-button type="default" @click="handleCancel">取 消</n-button>
        <n-button type="primary" :loading="confirmBtnLoading" @click="handleConfirm">确 定</n-button>
      </n-space>
    </template>
  </n-modal> -->
  <q-dialog v-model="showUserRoleDialog" persistent>
    <q-card bordered style="width: 37.5rem">
      <q-card-section class="row items-center">
        <div class="text-h6">分配角色</div>
        <q-space />
        <q-btn v-close-popup :icon="mdiClose" flat round dense @click="handleCancel" />
      </q-card-section>
      <q-card-section class="row items-center"> 分配角色 </q-card-section>
      <q-separator />
      <q-card-actions align="right" class="q-ma-sm">
        <q-btn label="取 消" color="warning" @click="handleCancel" />
        <q-btn label="确 定" color="primary" :loading="confirmBtnLoading" @click="handleConfirm" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts" setup>
import { mdiClose } from '@quasar/extras/mdi-v6';

let props = defineProps({
  show: {
    type: Boolean,
    default: false
  }
});

let emit = defineEmits(['close']);

let showUserRoleDialog = computed(() => {
  return props.show;
});

let confirmBtnLoading = $ref<boolean>(false);

const handleConfirm = (): void => {
  confirmBtnLoading = true;
  setTimeout(() => {
    Notify.create({
      type: 'positive',
      position: 'top-right',
      message: '分配成功！'
    });
    confirmBtnLoading = false;
    emit('close');
  }, 1000);
};

const handleCancel = (): void => {
  emit('close');
};
</script>

<style lang="scss" scoped></style>
