<template>
  <MyMenu :data="menusList"></MyMenu>
</template>

<script lang="ts" setup>
import type { MenuOption, MenuGroupOption, MenuInst } from 'naive-ui';
import appStore from '@/store/module/app';
import { useRouter, RouteRecordRaw } from 'vue-router';
import { mdiMenu, mdiViewDashboard } from '@quasar/extras/mdi-v6';
import MyMenu from './component/MyMenu.vue';

// 使用store
const router = useRouter();
const useAppStore = appStore();

interface IMenu {
  label: string;
  key: string;
  icon: string;
  color?: string;
  type: number;
  path: string;
  show: boolean;
  disabled: boolean;
  cache: boolean;
  description?: string;
  children?: IMenu[];
}

const collapsedValue: ComputedRef<boolean> = computed(() => useAppStore.getCollapsedSider);
// 引入全局方法
const renderIcon = inject<any>('renderIcon');

// 定义props
const currentProps = defineProps({
  collapsed: {
    type: Boolean,
    default: false
  }
});

// 菜单ref
let menuRef = $ref<MenuInst | null>(null);

let defaultExpandedKeys = $ref<string[]>();

// 展开的菜单key
let openMenu = $ref<string | null>(null);

let activeRouter: any = computed(() => {
  return useAppStore.getCurrentRoute;
});

watch(activeRouter, (nVal, oVal) => {
  openMenu = nVal.name;
  nextTick(() => {
    menuRef?.showOption(nVal.name);
  });
});

// 响应式菜单列表数据
let menusList: Array<any> = [];

// 生成菜单
const generateMenuByRoute = (routerList: Array<RouteRecordRaw>) => {
  menusList = [];
  menusList.push({
    label: '仪表盘',
    disabled: false,
    icon: mdiViewDashboard,
    key: 'Index',
    type: 1,
    path: '/',
    show: true,
    description: '仪表盘'
  });
  const recursionTree = (tree: Array<RouteRecordRaw>) => {
    let newTree: Array<IMenu> = [];
    tree.forEach((item: any) => {
      let menu: IMenu = {
        label: item.meta.title,
        disabled: item.meta.disabled === 0 ? true : false,
        icon: mdiMenu,
        key: item.name,
        type: item.meta.type,
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

// 检测路由对应的组件有无
const getComponent = (sRouter: any, rName: string) => {
  let isComponent = false;
  let matchedList = sRouter.matched;
  const loopMatched = (mList: Array<any>) => {
    mList.forEach((item: any) => {
      if (item.name === rName) {
        if (item.components) {
          isComponent = true;
        }
      }
      if (item.children && item.children.length > 0) {
        loopMatched(item.children);
      }
    });
  };
  loopMatched(matchedList);
  return isComponent;
};

// 点击菜单
const handleClickMenu = (key: string, item: MenuOption | any) => {
  // 菜单类型，0目录，1菜单，2按钮，3外链
  if (item.type === 1) {
    openMenu = key;
    let standRouter = router.resolve({ name: key });
    let isHaveComponent = getComponent(standRouter, key);
    if (isHaveComponent) {
      router.push({ name: key });
    } else {
      router.push({ path: '/notFound' });
    }
  } else if (item.type === 2) {
    // pass
  } else if (item.type === 3) {
    window.open(item.path, '_blank');
  }
};

// 创建之前
onBeforeMount(() => {
  // 当前用户登录的所有路由
  const currentStoreRoutes: Array<RouteRecordRaw> = useAppStore.getRoutes;
  // console.log('当前用户登录的所有路由');
  // console.log(currentStoreRoutes);
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
