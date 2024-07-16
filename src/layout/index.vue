<template>
  <!-- <n-layout class="screen-layout" position="absolute">
    <n-layout-header class="layout-header" bordered>
      <Header :collapsed="collapsedValue"></Header>
    </n-layout-header>
    <n-layout class="layout-body" has-sider position="absolute">
      <n-layout-sider
        class="body-sider"
        collapse-mode="width"
        :collapsed="collapsedValue"
        :collapsed-width="50"
        :width="220"
        show-trigger="bar"
        bordered
        :native-scrollbar="false"
        @collapse="appStore.setCollapsedSider(true)"
        @expand="appStore.setCollapsedSider(false)"
      >
        <Sider :collapsed="collapsedValue"></Sider>
      </n-layout-sider>
      <n-layout-content class="body-content">
        <PageTags></PageTags>
        <ViewMain></ViewMain>
        <n-back-top :right="100" />
      </n-layout-content>
    </n-layout>
  </n-layout> -->
  <q-layout view="hHh lpR fFf">
    <Header :collapsed="collapsedValue"></Header>

    <Sider></Sider>

    <q-page-container>
      <!-- 主要内容 -->
      <ViewMain></ViewMain>
      <!-- 主题配置按钮 -->
      <q-page-sticky position="top-right" :offset="themeBtnOffset">
        <q-btn
          ref="themeBtnRef"
          unelevated
          padding="10px"
          :icon="mdiCog"
          color="info"
          square
          @show="1"
          @click="triggerRightDrawer"
        />
      </q-page-sticky>
    </q-page-container>

    <ThemeStyle :open="themeDrawerOpen"></ThemeStyle>
  </q-layout>
</template>

<script lang="ts" setup>
import { Ref, ComputedRef } from 'vue';
import Sider from './component/sider/index.vue';
import Header from './component/header/index.vue';
import PageTags from './component/tags/index.vue';
import ViewMain from './component/main/index.vue';
import ThemeStyle from '@/layout/component/themeStyle/index.vue';
import useGlobalStore from '@/store/module/global';
import useAppStore from '@/store/module/app';
import { mdiCog } from '@quasar/extras/mdi-v6';
import { morph } from 'quasar';

const appStore = useAppStore();

const globalStore = useGlobalStore();

let siderCollapsed = $ref<boolean>(false);

const openMenu = $ref<boolean>(true);
let drawerWidth = $ref<number>(230);

let themeDrawerOpen = $ref<boolean>(false);

let themeBtnRef = $ref<Element>();

let themeBtnOffset = $ref<Array<number>>([0, 0]);

// 计算属性
const progress: ComputedRef<number | null> = computed(() => globalStore.progress);
const snackbarText: ComputedRef<string | null> = computed(() => globalStore.message);
const collapsedValue: ComputedRef<boolean> = computed(() => appStore.getCollapsedSider);

// 监听
watch(collapsedValue, (nVal, oVal) => {
  siderCollapsed = nVal;
});

// 触发主题配置抽屉
const triggerRightDrawer = (): void => {
  console.log('触发主题配置抽屉');
  themeDrawerOpen = !themeDrawerOpen;
  if (!themeDrawerOpen) {
    themeBtnOffset = [0, 100];
  } else {
    themeBtnOffset = [255, 100];
  }
  console.log(themeBtnRef);
  let dom = themeBtnRef as any;
  morph({
    from: dom.$el,
    duration: 30,
    tween: true,
    tweenFromOpacity: 0.8,
    tweenToOpacity: 0.4
  });
};

// 切换当前主题
const changeCurrentThemeBtn = (): void => {
  appStore.setTheme();
};

// 退出登录
const signOutBtn = (): void => {
  alert('退出成功！');
};
</script>

<style lang="scss" scoped>
.screen-layout {
  .layout-header {
    height: $topHeaderHeight;
  }
  .layout-body {
    top: $topHeaderHeight;
    .body-sider {
      background: $siderBarBgColor;
      box-shadow: 2px 0 8px 0 rgb(29 35 41 / 5%);
      transition: all 0.2s ease-in-out;
    }
    .body-content {
    }
  }
}
</style>
