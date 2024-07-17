<template>
  <template v-for="(item, i) in menuList" :key="i">
    <!-- <q-expansion-item
      v-if="item.show"
      default-opened
      :group="item.key"
      :header-inset-level="item.level"
      :content-inset-level="item.level === 0 ? 0 : item.level - 1"
      :icon="mdiMenu"
      :hide-expand-icon="item.type !== 0"
      :disable="item.disabled"
      :label-lines="1"
      expand-icon-class="text-white"
    >
      <template #header>
        <div class="item-section">
          <q-icon class="q-mr-xs" :name="mdiMenu" :color="item.color" size="sm" />
          <span class="section-label">{{ item.label }}</span>
        </div>
      </template>
      <template #default>
        <MenuTree v-if="item.children" :data="item.children"></MenuTree>
      </template>
    </q-expansion-item> -->
    <div class="list-expansion">
      <div
        class="expansion-item"
        :class="{ 'expansion-active': currentActiveMenu.name === item.key }"
        @click="handleClick(item)"
      >
        <div class="item-section" :style="{ marginLeft: item.level * 1.5 + 'rem' }">
          <q-icon class="q-mr-xs" :name="mdiMenu" :color="item.color" size="sm" />
          <span class="section-label">{{ item.label }}</span>
        </div>
        <q-icon
          v-if="item.type === 0"
          class="q-mr-xs"
          :name="item.expand ? mdiMenuDown : mdiMenuUp"
          :color="item.color"
          size="sm"
        />
      </div>
      <slot name="default">
        <MenuTree v-if="item.expand" :data="item.children"></MenuTree>
      </slot>
    </div>
  </template>
</template>

<script lang="ts" setup>
import 'animate.css';
import { mdiMenu, mdiMenuDown, mdiMenuUp } from '@quasar/extras/mdi-v6';
import useAppStore from '@/store/module/app';

interface IMenu {
  label: string;
  key: string;
  icon: string;
  color: string;
  type: number;
  path: string;
  show: boolean;
  disabled: boolean;
  cache: boolean;
  level: number;
  expand: boolean;
  description?: string;
  children?: IMenu[];
}

const router = useRouter();

const appStore = useAppStore();

const props = defineProps({
  data: {
    type: Array<IMenu>,
    default: () => []
  }
});

let menuList: any = $ref<any[]>([]);

let menuData: any = computed(() => props.data);

let currentActiveMenu: any = computed(() => appStore.getCurrentRoute);

// 监听
watch(
  () => menuData,
  (nVal, oVal) => {
    menuList = toRaw(nVal.value);
  },
  {
    immediate: true,
    deep: true // 开启深度监听
  }
);

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

// 展开收起
const getExpandMenu = (key: string) => {
  const findExpand = (list: IMenu[]) => {
    list.forEach((item: any) => {
      if (item.key === key) {
        item.expand = !item.expand;
      }
      if (item.children && item.children.length > 0) {
        findExpand(item.children);
      }
    });
  };
  findExpand(menuList);
};

const handleClick = (item: IMenu) => {
  let key = item.key;
  // 菜单类型，0目录，1菜单，2按钮，3外链
  if (item.type === 0) {
    // pass
    getExpandMenu(key);
  } else if (item.type === 1) {
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
</script>

<style lang="scss" scoped>
.list-expansion {
  .expansion-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 3rem;
    padding: 0 10px;
    cursor: pointer;
    &:hover {
      background-color: aqua;
      color: #57606f;
      border-top-left-radius: 0.1875rem;
      border-bottom-left-radius: 0.1875rem;
      position: relative;
      &::before {
        content: '';
        width: 8px;
        height: 100%;
        background-color: $accent;
        position: absolute;
        left: 0;
        transition: 0.5s;
        border-top-left-radius: 0.1875rem;
        border-bottom-left-radius: 0.1875rem;
      }
    }
    .item-section {
      display: flex;
      flex-direction: row;
      align-items: center;
      // justify-content: space-between;
      width: calc(100% - 1.8rem);
      .section-label {
        font-family: '微软雅黑';
        font-weight: 600;
        text-wrap: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
  .expansion-active {
    position: relative;
    background-color: aqua;
    color: #57606f;
    border-top-left-radius: 0.1875rem;
    border-bottom-left-radius: 0.1875rem;
    transition: background-color 1.5s;
    &::before {
      content: '';
      width: 8px;
      height: 100%;
      background-color: $accent;
      position: absolute;
      left: 0;
      transition: 0.5s;
      border-top-left-radius: 0.1875rem;
      border-bottom-left-radius: 0.1875rem;
    }
  }
}
</style>
