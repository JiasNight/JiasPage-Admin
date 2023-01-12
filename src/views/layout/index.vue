<template>
  <n-layout has-sider>
    <n-layout-sider
      class="layout-sider"
      collapse-mode="width"
      :collapsed="siderCollapsed"
      :collapsed-width="50"
      :width="240"
      show-trigger="bar"
      bordered
      :native-scrollbar="false"
      @collapse="siderCollapsed = true"
      @expand="siderCollapsed = false"
    >
      <n-h2>海淀桥</n-h2>
      <Menus :collapsed="siderCollapsed"></Menus>
    </n-layout-sider>
    <n-layout>
      <n-layout-header bordered>
        <Header></Header>
      </n-layout-header>

      <n-layout-content class="layout-content">
        <div class="layout-content-main">
          <!-- 标签页 -->
          <PageTags></PageTags>
          <div class="main-view">主要内容</div>
        </div>
      </n-layout-content>
      <n-back-top :right="100" />
    </n-layout>
  </n-layout>
</template>

<script lang="ts" setup>
// import { $ref } from 'vue/macros';
// import VLogo from './logo/index.vue';
import { Ref, ComputedRef } from 'vue';
import Menus from './component/menu/index.vue';
import Header from './component/header/index.vue';
import PageTags from './component/tags/index.vue';
import { MenuFilled, HomeFilled } from '@vicons/material';
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

let siderCollapsed = $ref<boolean>(false);

const changeSiderCollapsed = (collapsed: boolean): void => {
  console.log(collapsed);
};
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
.layout-sider {
  position: relative;
  z-index: 13;
  min-height: 100vh;
  box-shadow: 2px 0 8px 0 rgb(29 35 41 / 5%);
  transition: all 0.2s ease-in-out;
}
.n-layout-header {
  padding: 10px;
}
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
</style>
