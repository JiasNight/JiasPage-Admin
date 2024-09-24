<template>
  <q-layout view="hHh lpR fFf">
    <Header :collapsed="collapsedValue"></Header>

    <Sider></Sider>

    <q-page-container>
      <PageTags></PageTags>
      <!-- 主要内容 -->
      <ViewMain></ViewMain>
      <!-- 主题配置按钮 -->
      <q-page-sticky position="top-right" :offset="themeBtnOffset">
        <q-btn ref="themeBtnRef" round :icon="mdiCog" color="accent" @click="triggerRightDrawer" />
      </q-page-sticky>
    </q-page-container>

    <q-drawer v-model="themeDrawerOpen" side="right" :width="250" :mini-width="200" overlay behavior="mobile" elevated>
      <ThemeStyle></ThemeStyle>
    </q-drawer>
  </q-layout>
</template>

<script lang="ts" setup>
import { Ref, ComputedRef } from "vue";
import Sider from "./component/sider/index.vue";
import Header from "./component/header/index.vue";
import PageTags from "./component/tags/index.vue";
import ViewMain from "./component/main/index.vue";
import ThemeStyle from "@/layout/component/themeStyle/index.vue";
import useGlobalStore from "@/store/module/theme";
import useAppStore from "@/store/module/app";
import { mdiCog } from "@quasar/extras/mdi-v6";
import { morph } from "quasar";

const appStore = useAppStore();

const globalStore = useGlobalStore();

let siderCollapsed = $ref<boolean>(false);

const openMenu = $ref<boolean>(true);
let drawerWidth = $ref<number>(230);

let themeDrawerOpen = $ref<boolean>(false);

let themeBtnRef = $ref<Element>();

let themeBtnOffset = reactive<Array<number>>([2, 200]);

// 计算属性
const collapsedValue: ComputedRef<boolean> = computed(() => appStore.getCollapsedSider);

// 监听
watch(collapsedValue, (nVal, oVal) => {
  siderCollapsed = nVal;
});

watch($$(themeDrawerOpen), (nVal, oVal) => {
  if (!nVal) {
    themeBtnOffset = [0, 200];
  }
});

// 触发主题配置抽屉
const triggerRightDrawer = (): void => {
  themeDrawerOpen = !themeDrawerOpen;
  if (!themeDrawerOpen) {
    themeBtnOffset = [0, 200];
  } else {
    themeBtnOffset = [252, 200];
  }
  let dom = themeBtnRef as any;
  morph({
    from: dom.$el,
    duration: 30,
    tween: true,
    tweenFromOpacity: 0.8,
    tweenToOpacity: 0.4,
  });
};

// 切换当前主题
const changeCurrentThemeBtn = (): void => {
  appStore.setTheme();
};

// 退出登录
const signOutBtn = (): void => {
  alert("退出成功！");
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
