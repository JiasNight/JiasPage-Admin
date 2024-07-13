<template>
  <div class="main-container">
    <router-view v-slot="{ Component, route }">
      <template v-if="Component">
        <Transition name="fade" mode="out-in">
          <KeepAlive :include="cachedTags" :max="10">
            <div v-if="!isReload" :key="route.path">
              <component :is="Component" />
            </div>
          </KeepAlive>
        </Transition>
        <!-- <Suspense>
          <template #default>
            
          </template>
          <template #fallback>
            <n-space vertical>
              <n-spin>
                <template #description> 稍等正在加载... </template>
              </n-spin>
            </n-space>
          </template>
        </Suspense> -->
      </template>
    </router-view>
  </div>
</template>

<script lang="ts" setup>
import useAppStore from '@/store/module/app';
import useTagStore from '@/store/module/tag';
import { useRouter } from 'vue-router';

const router = useRouter();
const appStore = useAppStore();
const tagStore = useTagStore();

watch(
  () => router.currentRoute.value,
  (newRoute, oldRoute) => {
    appStore.setCurrentRoute(newRoute);
  },
  { immediate: true }
);

const cachedTags = computed(() => {
  return tagStore.getCachedTags;
});

const isReload = computed(() => {
  return appStore.getReloadViews;
});
</script>

<style lang="scss" scoped>
.main-container {
  min-height: calc(100vh - 6.875rem);
  padding: 0.625rem;
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
  transition:
    opacity 0.25s,
    transform 0.3s;
}
.fade-enter-from {
  opacity: 0;
  transform: translateX(50%);
}
.fade-leave-to {
  opacity: 0;
  transform: translateX(-10%);
}
</style>
