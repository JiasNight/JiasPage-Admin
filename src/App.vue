<template>
  <v-app :theme="theme">
    <router-view></router-view>
  </v-app>
</template>

<script lang="ts" setup>
import appStore from '@/store/module/app';

const appConfig = appStore();
const theme: ComputedRef<string> = computed(() => (appConfig.getTheme ? 'dark' : 'light'));
</script>

<style>
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100%;
  height: 100vh;
}
</style>
