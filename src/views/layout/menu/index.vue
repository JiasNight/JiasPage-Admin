<template>
  <v-list>
    <NavMenu :nav-menus="menusList"></NavMenu>
  </v-list>
</template>

<script lang="ts" setup>
import NavMenu from '@/components/NavMenu/index.vue';
import { $ref } from 'vue/macros';

interface IMenu {
  id: string;
  pid: string;
  type: number;
  name: string;
  level: number;
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
    type: 1,
    name: '系统设置',
    icon: 'mdi-folder-lock',
    level: 1,
    path: '',
    show: true,
    description: '这是一个菜单',
    children: [
      {
        id: '12',
        pid: '1',
        type: 2,
        name: '用户管理',
        level: 2,
        icon: 'mdi-plus-outline',
        path: '/login',
        show: true,
        description: '这是一个菜单1-2'
      },
      {
        id: '11',
        pid: '1',
        type: 1,
        name: '权限设置',
        level: 2,
        icon: 'mdi-plus-outline',
        path: '',
        show: true,
        description: '这是一个菜单1-1',
        children: [
          {
            id: '111',
            pid: '11',
            type: 2,
            name: '用户权限',
            level: 3,
            icon: 'mdi-plus-outline',
            path: '/',
            show: true,
            description: '这是一个菜单1-1'
          },
          {
            id: '112',
            pid: '11',
            type: 2,
            name: '菜单权限',
            level: 3,
            icon: 'mdi-plus-outline',
            path: '/',
            show: true,
            description: '这是一个菜单1-2'
          },
          {
            id: '112',
            pid: '11',
            type: 1,
            name: '角色管理',
            level: 3,
            icon: 'mdi-plus-outline',
            path: '/',
            show: true,
            description: '这是一个菜单1-2',
            children: [
              {
                id: '112',
                pid: '11',
                type: 2,
                name: '角色设置',
                level: 4,
                icon: 'mdi-plus-outline',
                path: '/',
                show: true,
                description: '这是一个菜单1-2'
              },
              {
                id: '112',
                pid: '11',
                type: 2,
                name: '角色权限',
                level: 4,
                icon: 'mdi-plus-outline',
                path: '/',
                show: true,
                description: '这是一个菜单1-2'
              }
            ]
          }
        ]
      },
      {
        id: '12',
        pid: '1',
        type: 2,
        name: '菜单1-2',
        level: 2,
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
    type: 1,
    name: '目录2',
    level: 1,
    icon: 'mdi-account-multiple-outline',
    path: '',
    show: true,
    description: '这是一个菜单',
    children: [
      {
        id: '21',
        pid: '1',
        type: 1,
        name: '这是菜单2-1',
        level: 2,
        icon: 'mdi-plus-outline',
        path: '',
        show: true,
        description: '这是一个菜单2-1',
        children: [
          {
            id: '211',
            pid: '11',
            type: 2,
            name: '反对法烦烦烦方法菜单2-1-1',
            level: 3,
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
        type: 2,
        name: '菜单2-2',
        level: 2,
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
    type: 1,
    name: '菜单3',
    level: 1,
    icon: 'mdi-account-multiple-outline',
    path: '',
    show: true,
    description: '这是一个菜单'
  }
]);
</script>

<style lang="scss" scoped>
.menu-label {
  color: #fff !important;
}
</style>
