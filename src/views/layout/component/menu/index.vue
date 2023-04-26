<template>
  <n-menu
    class="side-menu"
    accordion
    :indent="18"
    :collapsed="currentProps.collapsed"
    :collapsed-width="50"
    :collapsed-icon-size="20"
    :options="menusList"
    :on-update:value="clickMenuHandler"
  ></n-menu>
</template>

<script lang="ts" setup>
import { Component } from 'vue';
import { $ref } from 'vue/macros';
import type { MenuOption } from 'naive-ui';
import { MenuFilled, SettingsRound, PersonRound, ArticleRound } from '@vicons/material';
import useAppStore from '@/store/module/app';

const router = useRouter();
const appStore = useAppStore();
const currentRoute = useRoute();

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

watch(currentRoute, async () => {
  await nextTick();
});

const menusList = $ref<MenuOption[]>([
  {
    id: '1',
    pid: '0',
    label: '文章管理',
    icon: renderIcon(ArticleRound),
    disabled: false,
    key: 'article',
    path: '/article',
    show: true,
    description: '这是一个菜单',
    children: [
      {
        id: '12',
        pid: '1',
        label: '文章发布',
        disabled: false,
        icon: renderIcon(PersonRound),
        key: 'releaseArticle',
        path: '/article/releaseArticle',
        show: true,
        description: '这是一个菜单1-2'
      }
    ]
  },
  {
    id: '99',
    pid: '0',
    label: '系统管理',
    icon: renderIcon(SettingsRound),
    disabled: false,
    key: 'system',
    path: '/system',
    show: true,
    description: '这是一个菜单',
    children: [
      {
        id: '12',
        pid: '1',
        label: '用户管理',
        disabled: false,
        icon: renderIcon(PersonRound),
        key: 'userManage',
        path: '/system/userManage',
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
        path: '/system/userManage',
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
        path: '/system/userManage',
        show: true,
        description: '这是一个菜单1-2'
      }
    ]
  }
]);

// 点击菜单
const clickMenuHandler = (key: string, item: MenuOption | any) => {
  console.log(item.path);
  if (item.path === currentRoute.path) {
    appStore.reloadPage();
  } else {
    router.push(item.path);
  }
};
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
