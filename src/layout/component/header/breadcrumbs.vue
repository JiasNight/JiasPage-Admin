<template>
  <!-- 面包屑 -->
  <q-breadcrumbs active-color="info">
    <q-breadcrumbs-el label="首页" :icon="mdiHome" />
    <q-breadcrumbs-el v-for="(item, i) in breadcrumbList" :key="i">
      <q-icon size="xs">
        <MdiIcon :icon="item.meta.icon"></MdiIcon>
      </q-icon>
      <span>{{ item.meta.title }}</span>
    </q-breadcrumbs-el>
  </q-breadcrumbs>
</template>

<script lang="ts" setup>
import { mdiHome } from "@quasar/extras/mdi-v6";
import useAppStore from "@/store/module/app";
import { useRouter } from "vue-router";
import MdiIcon from "@/components/MdiIcon/MdiIcon.vue";
import { RouteRecordRaw } from "vue-router";

const router = useRouter();

let appStore = useAppStore();

let breadcrumbList = $ref<any>([]);

let allRoutes: ComputedRef<Array<RouteRecordRaw>> = computed(() => appStore.getRoutes);
let currentRoute: ComputedRef<any> = computed(() => appStore.getCurrentRoute);

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

// 挂载
onMounted(() => {
  breadcrumbList = getRoutePath(currentRoute.value, allRoutes.value);
});
</script>
