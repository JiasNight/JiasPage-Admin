<template>
  <n-menu
    class="side-menu"
    accordion
    :indent="18"
    :collapsed="currentProps.collapsed"
    :collapsed-width="50"
    :collapsed-icon-size="20"
    :options="menusList"
  ></n-menu>
</template>

<script lang="ts" setup>
import { Component } from 'vue';
import { $ref } from 'vue/macros';
import type { MenuOption } from 'naive-ui';
import { MenuFilled, SettingsRound } from '@vicons/material';

function renderIcon(icon?: Component) {
  if (!icon) icon = MenuFilled;
  return () => h(NIcon, null, { default: () => h(icon as Component) });
}

const currentProps = defineProps({
  collapsed: {
    type: Boolean,
    default: false
  }
});

const menusList = $ref<MenuOption[]>([
  {
    id: '1',
    pid: '0',
    label: '系统设置',
    icon: renderIcon(SettingsRound),
    disabled: false,
    key: 'sys',
    show: true,
    description: '这是一个菜单',
    children: [
      {
        id: '12',
        pid: '1',
        label: '用户管理',
        disabled: false,
        icon: renderIcon(),
        key: '/userManage',
        show: true,
        description: '这是一个菜单1-2'
      },
      {
        id: '11',
        pid: '1',
        label: '权限设置',
        disabled: false,
        icon: renderIcon(),
        key: 'role',
        show: true,
        description: '这是一个菜单1-1'
      },
      {
        id: '12',
        pid: '1',
        label: '菜单1-2',
        disabled: false,
        icon: renderIcon(),
        key: '/333',
        show: true,
        description: '这是一个菜单1-2'
      }
    ]
  },
  {
    id: '2',
    pid: '0',
    label: '目录2',
    disabled: false,
    icon: renderIcon(),
    key: '211',
    show: true,
    description: '这是一个菜单',
    children: [
      {
        id: '21',
        pid: '1',
        label: '这是菜单2-1',
        disabled: false,
        icon: renderIcon(),
        key: '212',
        show: true,
        description: '这是一个菜单2-1',
        children: [
          {
            id: '211',
            pid: '11',
            label: '反对法烦烦烦方法菜单2-1-1',
            disabled: false,
            icon: renderIcon(),
            key: '/4444',
            show: true,
            description: '这是一个菜单1-1'
          }
        ]
      },
      {
        id: '22',
        pid: '1',
        label: '菜单2-2',
        disabled: false,
        icon: renderIcon(),
        key: '/login2',
        show: true,
        description: '这是一个菜单1-2'
      }
    ]
  },
  {
    id: '2',
    pid: '0',
    label: '菜单3',
    disabled: false,
    icon: renderIcon(),
    key: '8888',
    show: true,
    description: '这是一个菜单'
  }
]);
</script>

<style lang="scss" scoped>
.side-menu {
  &:deep(.n-menu-item-content) {
    &::before {
      right: 5px;
      left: 5px;
    }
    &.n-menu-item-content--selected,
    &:hover {
      &::before {
        border-left: 4px solid #2ecc71;
      }
    }
  }
}
</style>
