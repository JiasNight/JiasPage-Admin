<template>
  <n-menu
    ref="menuRef"
    v-model:value="openMenu"
    class="side-menu"
    :indent="18"
    :collapsed="collapsedValue"
    :collapsed-width="50"
    :options="menusList"
    :collapsed-icon-size="20"
    default-expand-all
    :default-expanded-keys="defaultExpandedKeys"
    :on-update:value="handleClickMenu"
  ></n-menu>
</template>

<script lang="ts" setup>
import type { MenuOption, MenuGroupOption, MenuInst } from 'naive-ui';
import appStore from '@/store/module/app';
import { useRouter, RouteRecordRaw } from 'vue-router';
import { ICON } from '@/enums/icon';

// 使用store
const router = useRouter();
const useAppStore = appStore();

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
let menusList: Array<MenuOption | MenuGroupOption> = [];

// 生成菜单
const generateMenuByRoute = (routerList: Array<any>) => {
  menusList = [];
  menusList.push({
    label: '仪表盘',
    disabled: false,
    icon: renderIcon(ICON.F, 'mdi:home', { size: 16 }),
    key: 'Index',
    type: 0,
    path: '/',
    show: true,
    description: '仪表盘'
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
        icon: renderIcon(ICON.F, item.meta.icon, { size: 16 }),
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
