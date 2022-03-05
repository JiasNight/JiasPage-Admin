<template>
  <div class="logo-container">
    <img src="../../../assets/images/logo.png" alt="" :class="{ 'mr-2': !collapsed }" />
    <h2 v-show="!props.collapsed" class="title">Admin</h2>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';

const props = defineProps({
  collapsed: Boolean
})

console.log(props.collapsed)
</script>

<style lang="scss" scoped>
.logo-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 64px;
  line-height: 64px;
  overflow: hidden;
  white-space: nowrap;
  img {
    width: auto;
    height: 32px;
  }
  .title {
    margin-bottom: 0;
  }
}
</style>
