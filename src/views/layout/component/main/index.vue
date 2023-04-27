<template>
  <!-- <router-view v-slot="{ Component, route }">
    <KeepAlive :include="keepAliveList">
      <component :is="Component" v-if="appStore.pageLoading" :key="appStore.pageKeys[route.name] || route.fullPath" />
    </KeepAlive>
  </router-view> -->
  <div>
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <keep-alive>
          <suspense>
            <template #default>
              <component :is="Component" :key="componentKey" />
            </template>
            <template #fallback> Loading... </template>
          </suspense>
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<script lang="ts" setup>
import useAppStore from '@/store/module/app';
import { useRouter } from 'vue-router';
const appStore = useAppStore();
const router = useRouter();

const componentKey = $ref<number>(0);

watch(
  () => router.currentRoute.value.path,
  (newValue, oldValue) => {
    console.log('watch', newValue);
  },
  { immediate: true }
);
</script>
