<template>
  <div>
    <RouterView></RouterView>
  </div>
  <transition
    appear
    enter-active-class="animated animate__fadeInDown"
    leave-active-class="animated animate__fadeOutUpBig"
  >
    <LockScreen v-if="screenIsLock" />
  </transition>
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
  font-family: SourceHanSans;
  background-color: aliceblue;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
