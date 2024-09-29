<template>
  <q-layout :view="viewLayout">
    <Header v-if="headerShow" :collapsed="collapsedValue"></Header>

    <Sider></Sider>

    <q-page-container>
      <TagsPage v-if="tagPageShow"></TagsPage>
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
import TagsPage from "./component/tags/index.vue";
import ViewMain from "./component/main/index.vue";
import ThemeStyle from "@/layout/component/themeStyle/index.vue";
import useAppStore from "@/store/module/app";
import useThemeStore from "@/store/module/theme";
import { mdiCog } from "@quasar/extras/mdi-v6";
import { morph } from "quasar";

const appStore = useAppStore();
const themeStore = useThemeStore();

let siderCollapsed = $ref<boolean>(false);
let themeDrawerOpen = $ref<boolean>(false);
let themeBtnRef = $ref<Element>();
let themeBtnOffset = reactive<Array<number>>([2, 200]);
let viewLayout = $ref<string>("hHh lpR lFr");

// 计算属性
const collapsedValue: ComputedRef<boolean> = computed(() => appStore.getCollapsedSider);
const siderHasHeader: ComputedRef<boolean> = computed(() => themeStore.getSiderHasHeader);
const siderPosition: ComputedRef<string> = computed(() => themeStore.getSiderPosition);
const headerShow: ComputedRef<boolean> = computed(() => themeStore.getHeaderShow);
const tagPageShow: ComputedRef<boolean> = computed(() => themeStore.getTagPageShow);

// 监听
watch(collapsedValue, (nVal, oVal) => {
  siderCollapsed = nVal;
});

watch(siderHasHeader, (nVal, oVal) => {
  if (nVal && siderPosition.value === "left") {
    viewLayout = "lHh lpR lFr";
  } else if (nVal && siderPosition.value === "right") {
    viewLayout = "lHr lpR lFr";
  } else if (!nVal && siderPosition.value === "left") {
    viewLayout = "hHh lpR lFr";
  } else if (!nVal && siderPosition.value === "right") {
    viewLayout = "hHh lpR lFr";
  }
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

// 退出登录
const signOutBtn = (): void => {
  alert("退出成功！");
};
</script>
