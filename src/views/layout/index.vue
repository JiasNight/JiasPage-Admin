<template>
  <n-layout has-sider>
    <n-layout-sider
      collapse-mode="transform"
      :collapsed-width="120"
      :width="240"
      show-trigger="bar"
      content-style="padding: 24px;"
      bordered
    >
      <n-h2>海淀桥</n-h2>
    </n-layout-sider>
    <n-layout-content content-style="padding: 24px;"> 平山道 </n-layout-content>
  </n-layout>
</template>

<script lang="ts" setup>
// import { $ref } from 'vue/macros';
// import VLogo from './logo/index.vue';
import { Ref, ComputedRef } from 'vue';
import Menus from './menu/index.vue';
import Tags from './tags/index.vue';
import globalStore from '@/store/module/global';
import appStore from '@/store/module/app';

const useAppStore = appStore();

const useGlobalStore = globalStore();

// const loading: Ref<boolean> = computed({
//   get: () => useGlobalStore.loading,
//   set: (v: any) => {
//     useGlobalStore.setLoading(v);
//     return true;
//   }
// });
const progress: ComputedRef<number | null> = computed(() => useGlobalStore.progress);
const snackbarText: ComputedRef<string | null> = computed(() => useGlobalStore.message);

const openMenu = $ref<boolean>(true);
let drawerWidth = $ref<number>(230);

const breadcrumbList = [
  {
    text: 'Dashboard',
    disabled: false,
    href: 'breadcrumbs_dashboard'
  },
  {
    text: 'Link 1',
    disabled: false,
    href: 'breadcrumbs_link_1'
  },
  {
    text: 'Link 2',
    disabled: true,
    href: 'breadcrumbs_link_2'
  }
];

// 切换当前主题
const changeCurrentThemeBtn = (): void => {
  useAppStore.setTheme();
};

// 退出登录
const signOutBtn = (): void => {
  alert('退出成功！');
};
</script>

<style lang="scss" scoped>
.nav-logo {
  display: flex;
  flex: 1;
  cursor: pointer;
  .nav-logo-img {
    width: 100px;
  }
  .nav-logo-title {
    font-size: 20px;
    font-weight: bolder;
  }
}
.top-bar-chips {
  display: flex;
  flex: 1;
}
</style>
