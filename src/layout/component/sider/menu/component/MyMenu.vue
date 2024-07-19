<template>
  <NavMenu :data="menuList"></NavMenu>
</template>

<script lang="ts" setup>
import 'animate.css';
import { mdiMenu, mdiMenuDown, mdiMenuUp } from '@quasar/extras/mdi-v6';
import useAppStore from '@/store/module/app';
import NavMenu from './NavMenu.vue';

interface IMenu {
  label: string;
  key: string;
  icon?: string;
  color?: string;
  type?: number;
  path?: string;
  show?: boolean;
  disabled?: boolean;
  cache?: boolean;
  level?: number;
  expand?: boolean;
  description?: string;
  children?: IMenu[];
}

const props = defineProps({
  data: {
    type: Array<IMenu>,
    default: () => []
  }
});

let menuList = $ref<IMenu[]>([]);

// 构建树形菜单需要的属性
const buildMenuTree = (list: Array<IMenu>) => {
  // let resultMenuTree: Array<IMenu> = [];
  const loopItem = (mList: Array<IMenu>, level: number) => {
    mList.forEach((item: IMenu) => {
      item['expand'] = true;
      item['level'] = level;
      if (item.children && item.children.length > 0) {
        loopItem(item.children, level + 1);
      }
    });
  };
  loopItem(list, 0);
  menuList = list;
};

// 监听
watch(
  () => props.data,
  (nVal, oVal) => {
    buildMenuTree(nVal);
  },
  {
    immediate: true,
    deep: true // 开启深度监听
  }
);

// 创建之前
onBeforeMount(() => {
  // buildMenuTree(props.data);
});
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
