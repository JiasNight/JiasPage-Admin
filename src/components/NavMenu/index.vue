<template>
  <div class="nav-wrapper">
    <div v-for="(menu, index) in currentProps.navMenus" :key="index" class="wrapper-menu">
      <!-- 菜单 -->
      <div class="menu-item">
        <div class="item-left" :style="{ 'padding-left': (menu.level - 1) * 30 + 'px' }">
          <v-icon :icon="menu.icon"></v-icon>
          <span class="item-name" :title="menu.name">{{ menu.name }}</span>
        </div>
        <v-icon v-if="menu.children" icon="mdi-chevron-up"></v-icon>
      </div>
      <NavMenu v-if="menu.children" :nav-menus="menu.children"></NavMenu>
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
.menu-item {
  :deep(.v-list-item__content) {
    position: relative;
    left: 0;
  }
}

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
      color: #f3eaf7;
      .item-left {
        display: flex;
        flex-direction: row;
        justify-content: start;
        align-self: center;
        margin-left: 10px;
        width: 85%;
        .item-name {
          overflow: hidden; //超出的文本隐藏
          margin-left: 10px;
          width: 100%;
          text-overflow: ellipsis; //溢出用省略号显示
          white-space: nowrap; // 默认不换行；
        }
      }
      &:hover {
        background-color: #7f8c8d6e;
      }
    }
  }
  .menu-subitem {
    padding-left: 30px;
  }
}
</style>
