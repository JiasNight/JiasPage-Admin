<template>
  <router-view v-slot="{ Component, route }">
    <Transition name="fade" mode="out-in">
      <KeepAlive>
        <Suspense>
          <!-- 主要内容 -->
          <template #default>
            <component :is="Component" :key="route.fullPath" />
          </template>
          <!-- 加载状态 -->
          <template #fallback> 正在加载... </template>
        </Suspense>
      </KeepAlive>
    </Transition>
  </router-view>
</template>

<script lang="ts" setup>
import router from '@/router';
import useAppStore from '@/store/module/app';
import { RouteLocationNormalizedLoaded } from 'vue-router';

// let currentRoute: RouteLocationNormalizedLoaded | undefined = $ref<RouteLocationNormalizedLoaded>();

watch(
  () => router.currentRoute.value,
  (newValue, oldValue) => {
    console.log('watch', newValue.path);
    // currentRoute = newValue || undefined;
    useAppStore().setCurrentRoute(newValue);
  },
  { immediate: true }
);

</script>

<style lang="scss" scoped>
.fade-enter-from,
.fade-leave-to {
  /*定义进入开始和离开结束的透明度为0*/
  opacity: 0;
}
.fade-leave-to {
  transform: translateX(20px);
}
.fade-enter-to {
  transform: translateX(-20px);
}
.fade-enter-to,
.fade-leave-from {
  /*定义进入结束和离开开始的透明度为1*/
  opacity: 1;
}
.fade-leave-active,.fade-enter-active {
  transition: all 0.5s ease-out;
}
</style>
