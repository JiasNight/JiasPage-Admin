<template>
  <n-menu
    ref="menuRef"
    v-model:value="openMenu"
    class="side-menu"
    :indent="18"
    :collapsed="currentProps.collapsed"
    :collapsed-width="50"
    :options="menusList"
    :collapsed-icon-size="20"
    :on-update:value="handleClickMenu"
  ></n-menu>
</template>

<script lang="ts" setup>
import type { MenuOption, MenuGroupOption, MenuInst } from 'naive-ui';
import useAppStore from '@/store/module/app';
import { useRouter, RouteRecordRaw } from 'vue-router';
import { ICON } from '@/enums/icon';
// import { renderIcon } from '@/utils/common';

const router = useRouter();
const appStore = useAppStore();

// 引入全局方法
const renderIcon = inject<any>('renderIcon');

const currentProps = defineProps({
  collapsed: {
    type: Boolean,
    default: false
  }
});

let menuRef = ref<MenuInst | null>(null);

let currentMenu = localStorage.getItem('activeTag');

// 展开的菜单key
let openMenu = $ref<string | null>(currentMenu);

// 响应式数据
let menusList: Array<MenuOption | MenuGroupOption> = [];

// 生成菜单
const generateMenuByRoute = (routerList: Array<any>) => {
  menusList = [];
  menusList.push({
    label: '首页',
    disabled: false,
    icon: renderIcon(ICON.F, 'mdi:home'),
    key: 'Index',
    type: 0,
    path: '/',
    show: true,
    description: '首页'
  });
  const recursionTree = (tree: Array<any>) => {
    let newTree: Array<any> = [];
    tree.forEach((item: any) => {
      let menu: MenuOption | MenuGroupOption = {
        label: () =>
          h(
            NTooltip,
            {
              trigger: 'hover',
              delay: 1000,
              placement: 'right'
            },
            {
              trigger: () => item.meta.title,
              default: () =>
                h(
                  'span',
                  {
                    style: {
                      fontSize: '12px'
                    }
                  },
                  item.meta.description === '' ? item.meta.title : item.meta.description
                )
            }
          ),
        disabled: item.meta.disabled === 0 ? true : false,
        icon: renderIcon(ICON.F, item.meta.icon),
        key: item.name,
        type: item.meta.menuType,
        path: item.path,
        show: item.meta.show === 0 ? true : false,
        cache: item.meta.cache === 0 ? true : false,
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
  let rM = recursionTree(routerList);
  menusList = menusList.concat(rM);
};

// 点击菜单
const handleClickMenu = (key: string, item: MenuOption | any) => {
  console.log(item);
  // 菜单类型，0目录，1菜单，2按钮，3外链
  if (item.type === 1) {
    openMenu = key;
    router.push({ name: key });
  } else if (item.type === 2) {
    // pass
  } else if (item.type === 3) {
    window.open(item.path, '_blank');
  }
};

// 创建之前
onBeforeMount(() => {
  // 当前用户登录的所有路由
  const currentStoreRoutes: Array<RouteRecordRaw> = appStore.getRoutes;
  // 根据路由生成侧边栏菜单
  generateMenuByRoute(toRaw(currentStoreRoutes));
});
</script>

<style lang="scss" scoped>
.side-menu {
  font-size: 1rem;
  &:deep(.n-menu-item-content) {
    &::before {
      right: 5px;
      left: 5px;
    }
    .n-menu-item-content__icon,
    .n-menu-item-content-header,
    .n-menu-item-content__arrow {
      color: $siderBarColor;
    }
    &.n-menu-item-content--selected {
      &::before {
        border-left: 5px solid #5b1ee9;
        background-color: $siderBarMenuSelected;
      }
    }
    &:hover {
      &::before {
        border-left: 5px solid #5b1ee9;
      }
    }
  }
}
</style>
