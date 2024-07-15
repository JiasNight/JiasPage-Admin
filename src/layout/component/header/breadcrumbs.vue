<template>
  <!-- 面包屑 -->
  <!-- <n-breadcrumb class="header-breadcrumb">
    <n-breadcrumb-item>
      <n-icon size="20">
        <icon-mdi:home></icon-mdi:home>
      </n-icon>
      首页
    </n-breadcrumb-item>
    <n-breadcrumb-item v-for="(item, i) in breadcrumbList" :key="i">
      <n-space align="center">
        <n-icon :component="renderIcon(ICON.O, item.meta.icon, { size: 20 })" style="bottom: 2px"> </n-icon>
        {{ item.meta.title }}
      </n-space>
    </n-breadcrumb-item>
  </n-breadcrumb> -->
  <q-breadcrumbs>
    <q-breadcrumbs-el label="首页" :icon="mdiHome" />
    <q-breadcrumbs-el v-for="(item, i) in breadcrumbList" :key="i" :label="item.meta.title" :icon="item.meta.icon">
    </q-breadcrumbs-el>
  </q-breadcrumbs>
</template>

<script lang="ts" setup>
import { mdiHome } from '@quasar/extras/mdi-v6';
import { ICON } from '@/enums/icon';
import { renderIcon } from '@/utils/common';
import useAppStore from '@/store/module/app';
import { useRouter } from 'vue-router';

const router = useRouter();

let appStore = useAppStore();

let breadcrumbList = $ref<any>([]);

let allRoutes = computed(() => appStore.getRoutes);
let currentRoute = computed(() => appStore.getCurrentRoute);

watch(currentRoute, (nVal, oVal) => {
  let routePath = getRoutePath(nVal, allRoutes.value);
  breadcrumbList = routePath;
});

// 找出当前路由的面包屑路径
const getRoutePath = (cRoute: any, routes: Array<any>) => {
  let result: Array<any> = [];
  let traverse = (cRoute: any, path: Array<any>, routes: Array<any>) => {
    if (routes.length === 0) {
      return;
    }
    for (let item of routes) {
      path.push(item);
      if (item.name === cRoute.name) {
        result = JSON.parse(JSON.stringify(path));
        return;
      }
      const children = Array.isArray(item.children) ? item.children : [];
      traverse(cRoute, path, children); // 遍历
      path.pop(); // 回溯
    }
  };
  traverse(cRoute, [], routes);
  return result;
};
</script>

<style lang="scss" scoped>
.header-breadcrumb {
  color: $topHeaderTextColor !important;
}
</style>
