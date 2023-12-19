<template>
  <div class="main-container">
    <router-view v-slot="{ Component, route }">
      <Suspense>
        <template #default>
          <Transition name="fade" mode="out-in">
            <div v-if="!route.meta.cache">
              <component v-if="!route.meta.cache" :is="Component" :key="route.fullPath" />
            </div>
            <KeepAlive v-else>
              <div>
                <component :is="Component" :key="route.fullPath" />
              </div>
            </KeepAlive>
          </Transition>
        </template>
        <template #fallback> 正在加载... </template>
      </Suspense>
    </router-view>
  </div>
</template>

<script lang="ts" setup>
import router from '@/router';
import useAppStore from '@/store/module/app';
import { RouteLocationNormalizedLoaded } from 'vue-router';

// let currentRoute: RouteLocationNormalizedLoaded | undefined = $ref<RouteLocationNormalizedLoaded>();
const appStore = useAppStore();

watch(
  () => router.currentRoute.value,
  (newRoute, oldRoute) => {
    appStore.setCurrentRoute(newRoute);
  },
  { immediate: true }
);
</script>

<style lang="scss" scoped>
.main-container {
  padding: 0.625rem;
  height: 100vh;
  background-color: #f0fbff;
}

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
