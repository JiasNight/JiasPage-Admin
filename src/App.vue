<template>
  <NConfigProvider
    :theme-overrides="themeOverrides"
    :theme="currentTheme"
    :locale="currentLanguage"
    :date-locale="currentDateLocale"
  >
    <AppProvider>
      <RouterView></RouterView>
    </AppProvider>
  </NConfigProvider>
  <!-- <transition v-if="isLock" name="slide-up">
    <LockScreen />
  </transition> -->
</template>

<script lang="ts" setup>
import { ComputedRef } from 'vue';
import { GlobalThemeOverrides, darkTheme, dateZhCN, zhCN } from 'naive-ui';
import type { GlobalTheme, NLocale, NDateLocale } from 'naive-ui';
import useAppStore from '@/store/module/app';
import useGlobalStore from '@/store/module/global';
import AppProvider from '@/components/AppProvider/index.vue';
import { naiveThemeOverrides } from '@/style/theme/naiveTheme.json';

const appStore = useAppStore();
const globalStore = useGlobalStore();

// 自定义的样式
const themeOverrides: GlobalThemeOverrides = naiveThemeOverrides;

let currentTheme: ComputedRef<GlobalTheme | null> = computed(() => (appStore.getTheme ? darkTheme : null));
let currentLanguage: ComputedRef<NLocale | null> = computed(() => (appStore.getLanguage ? zhCN : null));
let currentDateLocale: ComputedRef<NDateLocale | null> = computed(() => dateZhCN);

const isLock = computed(() => globalStore.getIsLock);
</script>

<style>
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100vh;
}
</style>
