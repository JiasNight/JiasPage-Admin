<template>
  <div class="logo-wrap" @click="$router.push('/index')">
    <img class="logo-img" src="@/assets/images/logo.png" alt="logo" />
    <span v-show="!props.collapsed" class="logo-text">PAGE</span>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  collapsed: {
    // 侧边栏菜单是否收起
    type: Boolean,
    default: true
  }
});
</script>

<style lang="scss" scoped>
.logo-wrap {
  display: flex;
  align-items: center;
  .logo-img {
    height: $topHeaderHeight;
  }
  .logo-text {
    font-size: 1.875rem;
    font-weight: 600;
    color: #f3ecff;
    line-height: $topHeaderHeight;
  }
}
</style>
