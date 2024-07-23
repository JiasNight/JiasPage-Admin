<template>
  <q-drawer
    class="bg-primary text-white"
    :width="siderCollapsed ? 50 : 230"
    elevated
    show-if-above
    side="left"
    bordered
  >
    <!-- 菜单 -->
    <CustomMenu
      v-model="activeMenu"
      :data="menusList"
      accordion
      :collapsed="siderCollapsed"
      @change="handleClickMenu"
    ></CustomMenu>
  </q-drawer>
</template>

<script lang="ts" setup>
import { useRouter, RouteRecordRaw } from 'vue-router';
import CustomMenu from './menu/index.vue';
import useAppStore from '@/store/module/app';

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

const appStore = useAppStore();
// 使用store
const router = useRouter();

const collapsedValue: ComputedRef<boolean> = computed(() => appStore.getCollapsedSider);

let siderCollapsed = $ref<boolean>(true);

let activeMenu = $ref<string | number>('');

// 监听
watch(
  () => collapsedValue,
  (nVal, oVal) => {
    siderCollapsed = nVal.value;
  },
  {
    immediate: true,
    deep: true
  }
);

let activeRouter: any = computed(() => {
  return appStore.getCurrentRoute;
});

watch(activeRouter, (nVal, oVal) => {
  activeMenu = nVal.name;
});

// 响应式菜单列表数据
let menusList: Array<IMenu> = $ref<Array<IMenu>>([]);

// 生成菜单
const generateMenuByRoute = (routerList: Array<RouteRecordRaw>) => {
  menusList = [];
  menusList.push({
    label: '仪表盘',
    disabled: false,
    icon: 'mdiViewDashboard',
    key: 'Index',
    type: 1,
    path: '/',
    show: true,
    cache: true,
    description: '仪表盘'
  });
  const recursionTree = (tree: Array<RouteRecordRaw>) => {
    let newTree: Array<IMenu> = [];
    tree.forEach((item: any) => {
      let menu: IMenu = {
        label: item.meta.title,
        disabled: item.meta.disabled === 0 ? true : false,
        icon: item.meta.icon ? item.meta.icon : 'mdiMenu',
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
const handleClickMenu = (item: any) => {
  let key = item.key;
  // 菜单类型，0目录，1菜单，2按钮，3外链
  if (item.type === 1) {
    activeMenu = key;
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
  const currentStoreRoutes: Array<RouteRecordRaw> = appStore.getRoutes;
  // console.log('当前用户登录的所有路由');
  // console.log(currentStoreRoutes);
  // 根据路由生成侧边栏菜单
  generateMenuByRoute(toRaw(currentStoreRoutes));
});
</script>

<style lang="scss" scoped>
// :deep(.sider-drawer) {
//   background-color: $primary;
//   color: $siderBarColor;
// }
</style>
