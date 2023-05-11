<template>
  <n-menu
    class="side-menu"
    accordion
    :indent="18"
    :collapsed="currentProps.collapsed"
    :collapsed-width="50"
    :collapsed-icon-size="20"
    :options="menusList"
    :on-update:value="handleClickMenu"
  ></n-menu>
</template>

<script lang="ts" setup>
import type { MenuOption } from 'naive-ui';
import router from '@/router';
import { SettingsRound, PersonRound, ArticleRound, MenuRound } from '@vicons/material';
import useAppStore from '@/store/module/app';
import { renderIcon } from '@/utils/common';
import { RouteRecordRaw } from 'vue-router';

const currentRoute = router.currentRoute;

const currentProps = defineProps({
  collapsed: {
    type: Boolean,
    default: false
  }
});

// 响应式数据
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
        id: '12',
        pid: '1',
        label: '菜单管理',
        disabled: false,
        icon: renderIcon(MenuRound),
        key: 'menuManage',
        path: '/system/menuManage',
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
      }
    ]
  }
]);

// 监听当前路由
watch(currentRoute, async () => {
  await nextTick();
});

// 创建之前
onBeforeMount(() => {
  generateMenuByRoute(router.getRoutes());
});

// 生成菜单
const generateMenuByRoute = (routerList: any) => {
  console.log(routerList);
  routerList.forEach((item: RouteRecordRaw) => {
    console.log(item);
    if (item.children && item.children.length > 0) {
      generateMenuByRoute(item.children);
    }
  });
};

// 点击菜单
const handleClickMenu = (key: string, item: MenuOption | any) => {
  if (item.path === currentRoute.value.path) {
    console.log('ddd');
    useAppStore().reloadPage();
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
