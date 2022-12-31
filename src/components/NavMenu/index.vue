<template>
  <div class="nav-wrapper">
    <div v-for="(menu, index) in currentProps.navMenus" :key="index" class="wrapper-menu">
      <!-- 菜单 -->
      <div class="menu-item">
        <div class="item-left" :style="{ 'padding-left': (menu.level - 1) * 30 + 'px' }">
          <n-icon :icon="menu.icon"></n-icon>
          <span class="item-name" :title="menu.name">{{ menu.name }}</span>
        </div>
        <n-icon v-if="menu.children">
          <KeyboardArrowDownFilled></KeyboardArrowDownFilled>
        </n-icon>
      </div>
      <NavMenu v-if="menu.children" :nav-menus="menu.children" class="menu-subitem"></NavMenu>
    </div>
  </div>
</template>

<script lang="ts" setup>
import NavMenu from '@/components/NavMenu/index.vue';
import { KeyboardArrowDownFilled } from '@vicons/material';
interface IMenu {
  id: string;
  pid: string;
  type: number;
  name: string;
  level: number;
  icon: string;
  path: string;
  show: boolean;
  description: string;
  children?: IMenu[];
}

const currentProps = defineProps({
  navMenus: {
    type: Array<IMenu>,
    default: () => []
  }
});
</script>
3

<style lang="scss" scoped>
.nav-wrapper {
  width: 100%;
  .wrapper-menu {
    width: 100%;
    .menu-item {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-self: center;
      padding: 10px 0;
      width: 100%;
      cursor: pointer;
      .item-left {
        display: flex;
        flex-direction: row;
        justify-content: start;
        align-self: center;
        margin-left: 10px;
        width: 85%;
        .item-name {
          overflow: hidden;
          margin-left: 5px;
          width: 90%;
          text-align: left;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      &:hover {
        background-color: #7f8c8d6e;
      }
    }
    .menu-subitem {
      // background-color: rgba(59, 61, 61, 0.431);
    }
  }
}
</style>
