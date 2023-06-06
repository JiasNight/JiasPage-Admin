<template>
  <router-view v-slot="{ Component, route }">
    <Suspense>
      <template #default>
        <KeepAlive>
          <Transition name="fade" mode="out-in">
            <div v-if="Component">
              <component :is="Component" :key="route.fullPath" />
            </div>
          </Transition>
        </KeepAlive>
      </template>
      <template #fallback> 正在加载... </template>
    </Suspense>
  </router-view>
</template>

<script lang="ts" setup>
import router from '@/router';
import useAppStore from '@/store/module/app';
import { RouteLocationNormalizedLoaded } from 'vue-router';

// let currentRoute: RouteLocationNormalizedLoaded | undefined = $ref<RouteLocationNormalizedLoaded>();

watch(
  () => router.currentRoute.value,
  (newRoute, oldRoute) => {
    console.log('路由', newRoute.path);
    // currentRoute = newValue || undefined;
    useAppStore().setCurrentRoute(newRoute);
  },
  { immediate: true }
);
</script>

<style lang="scss" scoped>
// 定义进入开始和离开结束的透明度为0
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-leave-to {
  transform: translateX(10px);
}
.fade-enter-to {
  transform: translateX(-10px);
}
// 定义进入结束和离开开始的透明度为
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
.fade-leave-active,
.fade-enter-active {
  transition: all 0.5s ease-out;
}
</style>
