<template>
  <n-layout class="screen-layout" has-sider>
    <n-layout-sider
      class="layout-sider"
      collapse-mode="width"
      :collapsed="siderCollapsed"
      :collapsed-width="50"
      :width="220"
      show-trigger="bar"
      bordered
      :native-scrollbar="false"
      @collapse="siderCollapsed = true"
      @expand="siderCollapsed = false"
    >
      <!-- logo -->
      <Logo :collapsed="siderCollapsed"></Logo>
      <!-- 菜单 -->
      <Menus :collapsed="siderCollapsed"></Menus>
    </n-layout-sider>
    <n-layout>
      <n-layout-header bordered>
        <Header></Header>
      </n-layout-header>

      <!-- 标签页 -->
      <PageTags></PageTags>
      <!-- <n-scrollbar x-scrollable>
      </n-scrollbar> -->
      <n-layout-content class="layout-content">
        <ViewMain></ViewMain>
        <!-- <router-view></router-view> -->
      </n-layout-content>
      <n-back-top :right="100" />
    </n-layout>
  </n-layout>
</template>

<script lang="ts" setup>
import { Ref, ComputedRef } from 'vue';
import Logo from './component/logo/index.vue';
import Menus from './component/menu/index.vue';
import Header from './component/header/index.vue';
import PageTags from './component/tags/index.vue';
import ViewMain from './component/main/index.vue';
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

// const changeSiderCollapsed = (collapsed: boolean): void => {
//   console.log(collapsed);
// };
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
.screen-layout {
  .layout-sider {
    position: relative;
    min-height: 100vh;
    box-shadow: 2px 0 8px 0 rgb(29 35 41 / 5%);
    transition: all 0.2s ease-in-out;
    background-color: '#061427';
  }
  .layout-content {
    padding: .625rem;
  }
}
</style>
