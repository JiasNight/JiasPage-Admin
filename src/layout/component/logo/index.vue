<template>
  <div class="logo-wrapper" @click="$router.push('/index')">
    <img class="logo-img" src="@/assets/images/logo.png" alt="logo" />
    <span v-if="!collapsedValue" class="logo-text">PAGE</span>
    <!-- <span class="logo-text">PAGE</span> -->
  </div>
</template>

<script lang="ts" setup>
import useAppStore from '@/store/module/app';

const appStore = useAppStore();

const collapsedValue: ComputedRef<boolean> = computed(() => appStore.getCollapsedSider);
</script>

<style lang="scss" scoped>
.logo-wrapper {
  width: $siderBarWidth;
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
