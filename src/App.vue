<template>
  <div>
    <RouterView></RouterView>
  </div>
  <!-- <transition v-if="screenIsLock" name="slide-up">
    <LockScreen />
  </transition> -->
  <q-slide-transition v-if="screenIsLock">
    <LockScreen />
  </q-slide-transition>
</template>

<script lang="ts" setup>
import { ComputedRef } from "vue";
import useAppStore from "@/store/module/app";
import LockScreen from "@/components/LockScreen/index.vue";

const appStore = useAppStore();

// 计算属性
const screenIsLock: ComputedRef<boolean> = computed(() => appStore.getLockScreen);

// 监听
watch(screenIsLock, (nVal, oVal) => {
  if (nVal) {
    console.log("锁屏");
  }
});
</script>

<style>
#app {
  width: 100%;
  height: 100vh;
  background-color: aliceblue;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-family: SourceHanSans;
}
</style>
