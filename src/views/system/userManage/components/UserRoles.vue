<template>
  <!-- 修改用户密码 -->
  <n-modal
    v-model:show="showUserRoleModal"
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

let showUserRoleModal = computed(() => {
  return props.show;
});

let confirmLoading = $ref<boolean>(false);

const handleConfirm = (): void => {
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
