<template>
  <!-- <router-view v-slot="{ Component, route }">
    <KeepAlive :include="keepAliveList">
      <component :is="Component" v-if="appStore.pageLoading" :key="appStore.pageKeys[route.name] || route.fullPath" />
    </KeepAlive>
  </router-view> -->
  <router-view v-slot="{ Component, route }">
    <transition :name="route.meta.transition || 'fade'" mode="out-in">
      <keep-alive>
        <suspense>
          <template #default>
            <component :is="Component" :key="route.meta.name ? route.path : undefined" />
          </template>
          <template #fallback> Loading... </template>
        </suspense>
      </keep-alive>
    </transition>
  </router-view>
</template>

<script lang="ts" setup>
import useAppStore from '@/store/module/app';
import { useRouter } from 'vue-router';
const appStore = useAppStore();
const router = useRouter();

watch(router, () => {
  console.log(router);
});

const allRoutes = router.getRoutes();
const keepAliveList = computed(() => {
  console.log(allRoutes.filter((route) => route.meta?.keepAlive).map((route) => route.name));
  return allRoutes.filter((route) => route.meta?.keepAlive).map((route) => route.name);
});
</script>
