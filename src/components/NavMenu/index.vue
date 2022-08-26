<template>
  <v-list-group v-for="(item, index) in currentProps.data" :key="index" :value="item">
    <template #activator="{ props }">
      <v-list-item v-bind="props" :prepend-icon="item.icon" :title="item.name"> </v-list-item>
    </template>

    <template v-if="'children' in item">
      <v-list-item v-for="(menu, i) in item.children" :key="i" :prepend-icon="menu.icon" :title="menu.name">
      </v-list-item>
    </template>

    <!-- <NavMenu v-if="'children' in item" :data="item.children"></NavMenu> -->
    <!-- <v-list-group value="Admin">
        <template #activator="{ props }">
          <v-list-item v-bind="props" title="Admin"></v-list-item>
        </template>

        <v-list-item title="title"></v-list-item>
      </v-list-group> -->
  </v-list-group>
</template>

<script lang="ts" setup>
interface IMenu {
  id: string;
  pid: string;
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
