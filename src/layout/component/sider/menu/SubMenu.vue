<template>
  <div v-for="(item, i) in menuData" :key="i" class="list-menu">
    <div class="menu-item" :class="{ 'menu-active': item.active }" @click.stop="handleClick(item)">
      <div class="item-section" :style="{ marginLeft: item.level * 1.5 + 'rem' }">
        <q-icon class="q-mr-xs" size="sm">
          <MdiIcon :icon="item.icon"></MdiIcon>
        </q-icon>
        <span v-if="!props.collapsed" class="section-label">
          {{ item.label }}
          <q-tooltip anchor="top middle" self="center middle"> {{ item.label }} </q-tooltip>
        </span>
      </div>
      <transition duration-100>
        <q-icon
          v-if="!props.collapsed && item.children && item.children.length > 0"
          class="q-mr-xs"
          :name="item.expand ? mdiMenuDown : mdiMenuUp"
          size="sm"
        />
      </transition>
    </div>
    <transition name="submenu">
      <div v-if="!props.collapsed && item.expand" class="sub-menu">
        <SubMenu
          v-if="item.children && item.children.length > 0"
          :data="item.children"
          :accordion="props.accordion"
          :collapsed="props.collapsed"
        ></SubMenu>
      </div>
    </transition>
  </div>
</template>

<script lang="ts" setup name="SubMenu">
import 'animate.css';
import { mdiMenuDown, mdiMenuUp } from '@quasar/extras/mdi-v6';
import useAppStore from '@/store/module/app';
import MdiIcon from '@/components/MdiIcon/MdiIcon.vue';

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
  active?: boolean;
  description?: string;
  children?: IMenu[];
}

const router = useRouter();

const appStore = useAppStore();

const handleToggle = inject<any>('toggle');

const props = defineProps({
  data: {
    type: Array<IMenu>,
    default: () => []
  },
  // 是否收缩
  collapsed: {
    type: Boolean,
    default: false
  },
  // 是否开启手风琴
  accordion: {
    type: Boolean,
    default: false
  }
});

let menuData: ComputedRef<IMenu[]> = computed(() => props.data);

let currentActiveMenuKey = $ref('');

const handleClick = (item: any) => {
  let key = item.key;
  currentActiveMenuKey = key;
  handleToggle(item);
};
</script>

<style lang="scss" scoped>
$active-radius: 0.3125rem;
.list-menu {
  .menu-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 3rem;
    padding: 0 10px;
    cursor: pointer;
    &:hover {
      background-color: $accent;
      color: #fff;
      border-top-left-radius: $active-radius;
      border-bottom-left-radius: $active-radius;
      position: relative;
      &::before {
        content: '';
        width: 8px;
        height: 100%;
        background-color: $negative;
        position: absolute;
        left: 0;
        top: 0;
        transition: 0.5s;
        border-top-left-radius: $active-radius;
        border-bottom-left-radius: $active-radius;
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
  .menu-active {
    position: relative;
    background-color: $info;
    color: #fff;
    border-radius: 0.25rem;
    transition: background-color 1.5s;
  }
  .submenu-enter-active,
  .submenu-leave-active {
    transition: all 0.3s ease-in-out;
    overflow: hidden;
  }
  .submenu-enter-from,
  .submenu-leave-to {
    height: 0;
    padding-top: 0;
    padding-bottom: 0;
    margin-top: 0;
    margin-bottom: 0;
  }
}
</style>
