<template>
  <v-list>
    <NavMenu :data="menusList"></NavMenu>
  </v-list>
</template>

<script lang="ts" setup>
import { $ref } from 'vue/macros';

interface IMenu {
  id: string;
  pid: string;
  name: string;
  icon: string;
  path: string;
  show: boolean;
  description: string;
  children?: IMenu[]; // ?号表示传值可选
}

const menusList = $ref<Array<IMenu>>([
  {
    id: '1',
    pid: '0',
    name: '菜单1',
    icon: 'mdi-account-multiple-outline',
    path: '/login',
    show: true,
    description: '这是一个菜单',
    children: [
      {
        id: '12',
        pid: '1',
        name: '菜单1-2',
        icon: 'mdi-plus-outline',
        path: '/login',
        show: true,
        description: '这是一个菜单1-2'
      },
      {
        id: '11',
        pid: '1',
        name: '菜单1-1',
        icon: 'mdi-plus-outline',
        path: '/login',
        show: true,
        description: '这是一个菜单1-1',
        children: [
          {
            id: '111',
            pid: '11',
            name: '菜单1-1-1',
            icon: 'mdi-plus-outline',
            path: '/',
            show: true,
            description: '这是一个菜单1-1'
          },
          {
            id: '112',
            pid: '11',
            name: '菜单1-1-2',
            icon: 'mdi-plus-outline',
            path: '/',
            show: true,
            description: '这是一个菜单1-2'
          }
        ]
      },
      {
        id: '12',
        pid: '1',
        name: '菜单1-2',
        icon: 'mdi-plus-outline',
        path: '/login',
        show: true,
        description: '这是一个菜单1-2'
      }
    ]
  },
  {
    id: '2',
    pid: '0',
    name: '菜单2',
    icon: 'mdi-account-multiple-outline',
    path: '',
    show: true,
    description: '这是一个菜单',
    children: [
      {
        id: '21',
        pid: '1',
        name: '菜单2-1',
        icon: 'mdi-plus-outline',
        path: '',
        show: true,
        description: '这是一个菜单2-1',
        children: [
          {
            id: '211',
            pid: '11',
            name: '菜单2-1-1',
            icon: 'mdi-plus-outline',
            path: '/',
            show: true,
            description: '这是一个菜单1-1'
          }
        ]
      },
      {
        id: '22',
        pid: '1',
        name: '菜单2-2',
        icon: 'mdi-plus-outline',
        path: '/login',
        show: true,
        description: '这是一个菜单1-2'
      }
    ]
  }
]);
</script>

<style lang="scss" scoped>
.menu-label {
  color: #fff !important;
}
</style>
