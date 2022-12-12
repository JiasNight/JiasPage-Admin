<template>
  <template v-for="(item, index) in currentProps.data" :key="index">
    <!-- 目录 -->
    <v-list-group v-if="item.type === 1">
      <template #activator="{ props }">
        <v-list-item v-bind="props" :prepend-icon="item.icon" :title="item.name"></v-list-item>
      </template>
      <NavMenu v-if="'children' in item" :data="item.children"></NavMenu>
    </v-list-group>
    <!-- 菜单 -->
    <v-list-item v-else :title="item.name" :value="item.name" :to="item.path"></v-list-item>
  </template>
</template>

<script lang="ts" setup>
import NavMenu from '@/components/NavMenu/index.vue';
interface IMenu {
  id: string;
  pid: string;
  type: number;
  name: string;
  icon: string;
  path: string;
  show: boolean;
  description: string;
  children?: IMenu[];
}

const currentProps = defineProps({
  data: {
    type: Array<IMenu>,
    default: () => []
  }
});
</script>
