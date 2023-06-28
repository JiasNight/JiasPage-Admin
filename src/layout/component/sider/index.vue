<template>
  <div>
    <!-- logo -->
    <Logo :collapsed="props.collapsed"></Logo>
    <!-- 菜单 -->
    <Menus :collapsed="props.collapsed"></Menus>
  </div>
</template>

<script lang="ts" setup>
import Logo from './logo/index.vue';
import Menus from './menu/index.vue';
const props = defineProps({
  collapsed: {
    // 侧边栏菜单是否收起
    type: Boolean,
    default: true
  }
});
</script>

<style lang="scss" scoped></style>
