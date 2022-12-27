<template>
  <div class="nav-content">
    <div v-for="(menu, index) in currentProps.navMenus" :key="index" class="content-menu">
      <!-- 菜单 -->
      <div class="menu-item">
        <div class="item-left">
          <v-icon :icon="menu.icon"></v-icon>
          <span class="item-name">{{ menu.name }}</span>
        </div>
        <v-icon v-if="menu.children" icon="mdi-chevron-up"></v-icon>
      </div>
      <!-- 目录 -->
      <div v-if="menu.children" class="menu-subitem">
        <NavMenu v-if="menu.children" :nav-menus="menu.children"></NavMenu>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import NavMenu from '@/components/NavMenu/index.vue';
import SubMenu from '@/components/NavMenu/submenu.vue';
interface IMenu {
  id: string;
  pid: string;
  type: number;
  name: string;
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
.menu-item {
  :deep(.v-list-item__content) {
    position: relative;
    left: 0;
  }
}

.nav-content {
  width: 100%;
  .content-menu {
    .menu-item {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-self: center;
      padding: 10px 0;
      width: 100%;
      cursor: pointer;
      color: #f3eaf7;
      .item-left {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-self: center;
        margin-left: 10px;
        .item-name {
          margin-left: 10px;
        }
      }
      &:hover {
        background-color: #7f8c8d6e;
      }
    }
    .menu-subitem {
      padding-left: 30px;
    }
  }
}
</style>
