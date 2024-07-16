<template>
  <div>
    <q-drawer v-model="siderCollapsed" :width="230" elevated show-if-above side="left" bordered>
      <!-- 菜单 -->
      <Menus></Menus>
    </q-drawer>
  </div>
</template>

<script lang="ts" setup>
import Menus from './menu/index.vue';
import useAppStore from '@/store/module/app';

const appStore = useAppStore();

const collapsedValue: ComputedRef<boolean> = computed(() => appStore.getCollapsedSider);

let siderCollapsed = $ref<boolean>(true);

// 监听
watch(collapsedValue, (nVal, oVal) => {
  siderCollapsed = nVal;
});
</script>
