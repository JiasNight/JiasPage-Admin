<template>
  <div class="view-container">
    角色管理
    <n-input v-model:value="value" type="text" placeholder="基本的 Input" />
  </div>
</template>

<script lang="ts" setup>
let value = $ref('');
</script>

<style lang="scss" scoped>
.view-container {
}
</style>
