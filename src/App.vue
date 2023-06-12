<template>
  <NConfigProvider :theme="currentTheme" :locale="currentLanguage" :date-locale="currentDateLocale">
    <AppProvider>
      <RouterView></RouterView>
    </AppProvider>
  </NConfigProvider>
  <transition v-if="isLock" name="slide-up">
    <LockScreen />
  </transition>
</template>

<script lang="ts" setup>
import { ComputedRef } from 'vue';
import { darkTheme, dateZhCN, zhCN } from 'naive-ui';
import type { GlobalTheme, NLocale, NDateLocale } from 'naive-ui';
import useAppStore from '@/store/module/app';
import useGlobalStore from '@/store/module/global';
import AppProvider from '@/components/AppProvider/index.vue';

let currentTheme: ComputedRef<GlobalTheme | null> = computed(() => (useAppStore().getTheme ? darkTheme : null));
let currentLanguage: ComputedRef<NLocale | null> = computed(() => (useAppStore().getLanguage ? zhCN : null));
let currentDateLocale: ComputedRef<NDateLocale | null> = computed(() => dateZhCN);

const isLock = computed(() => useGlobalStore().getIsLock);
// let
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
