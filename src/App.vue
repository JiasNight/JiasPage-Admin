<template>
  <AppConfigProvider>
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </AppConfigProvider>
</template>

<script lang="ts" setup>
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
