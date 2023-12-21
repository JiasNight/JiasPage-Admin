<template>
  <div class="main-container">
    <router-view v-slot="{ Component, route }">
      <template v-if="Component">
        <Suspense>
          <template #default>
            <Transition name="fade" mode="out-in">
              <KeepAlive :include="cachedTags" :max="10">
                <component :is="Component" :key="route.name" />
              </KeepAlive>
            </Transition>
          </template>
          <template #fallback>
            <n-space vertical>
              <n-spin>
                <template #description> 稍等正在加载... </template>
              </n-spin>
            </n-space>
          </template>
        </Suspense>
        <!-- <Transition name="fade" mode="out-in">
          <KeepAlive :include="cachedTags" :max="10">
            <component :is="Component" />
          </KeepAlive>
        </Transition> -->
      </template>
    </router-view>
  </div>
</template>

<script lang="ts" setup>
import useAppStore from '@/store/module/app';
import useTagStore from '@/store/module/tag';
import { useRouter, RouteLocationNormalizedLoaded } from 'vue-router';

// let currentRoute: RouteLocationNormalizedLoaded | undefined = $ref<RouteLocationNormalizedLoaded>();
const router = useRouter();
const appStore = useAppStore();
const tagStore = useTagStore();

watch(
  () => router.currentRoute.value,
  (newRoute, oldRoute) => {
    console.log(newRoute);
    appStore.setCurrentRoute(newRoute);
    console.log(tagStore.getCachedTags);
  },
  { immediate: true }
);

const cachedTags = computed(() => {
  return tagStore.getCachedTags;
});

onMounted(() => {
  console.log(cachedTags);
});
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
  transition:
    opacity 0.25s,
    transform 0.3s;
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
