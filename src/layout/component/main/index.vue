<template>
  <router-view v-slot="{ Component, route }">
    <Suspense>
      <template #default>
        <Transition name="fade" mode="out-in">
          <KeepAlive v-if="route.meta.cache">
            <component :is="Component" :key="route.fullPath" />
          </KeepAlive>
          <component :is="Component" v-else :key="route.fullPath" />
        </Transition>
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
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s, transform 0.3s;
}
.fade-enter-from {
  opacity: 0;
  transform: translateY(-10%);
}
.fade-leave-to {
  opacity: 0;
  transform: translateY(10%);
}
</style>
