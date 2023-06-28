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
import useAppStore from '@/store/module/app';
import { renderIcon } from '@/utils/common';
import { RouteRecordRaw } from 'vue-router';

const currentProps = defineProps({
  collapsed: {
    type: Boolean,
    default: false
  }
});

// 响应式数据
let menusList = $ref<MenuOption[]>([]);

// 创建之前
onBeforeMount(() => {
  // 当前用户登录的所有路由
  const currentStoreRoutes: Array<RouteRecordRaw> = useAppStore().getRoutes;
  // console.log(JSON.parse(JSON.stringify(currentStoreRoutes)));
  // 根据路由生成侧边栏菜单
  generateMenuByRoute(toRaw(currentStoreRoutes));
});

// 生成菜单
const generateMenuByRoute = (routerList: Array<any>) => {
  menusList = [];
  const recursionTree = (tree: Array<any>) => {
    let newTree: Array<any> = [];
    tree.forEach((item: any) => {
      let menu: MenuOption = {
        pid: '1',
        label: item.meta.title,
        disabled: item.meta.disabled,
        icon: renderIcon(item.meta.icon),
        key: item.name,
        path: item.path,
        show: item.meta.show,
        description: item.meta.description
      };
      if (item.children && item.children.length > 0) {
        menu.children = recursionTree(item.children);
        newTree.push(menu);
      } else {
        newTree.push(menu);
      }
    });
    return newTree;
  };
  menusList = recursionTree(routerList);
};

// 点击菜单
const handleClickMenu = (key: string, item: MenuOption | any) => {
  if (item.path === router.currentRoute.value.path) {
    useAppStore().reloadPage();
  } else {
    router.push({ name: key });
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
        border-left: 4px solid #5b1ee9;
      }
    }
  }
}
</style>
