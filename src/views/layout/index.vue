<template>
  <v-navigation-drawer v-model="openMenu" app color="#c8d6e5" :width="menuWidth">
    <!-- <VLogo></VLogo> -->
    <!-- <VMenu></VMenu> -->
    <v-toolbar-items>
      <v-list>
        <v-list-item v-for="(item, index) in menusList" :key="index" :value="index">
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-toolbar-items>
  </v-navigation-drawer>

  <v-app-bar app> app-bar </v-app-bar>

  <!-- Sizes your content based upon application components -->
  <v-main>
    <v-card style="height: 35px; margin: 10px 0; line-height: 35px">
      <v-breadcrumbs :items="breadcrumbList">
        <template #text="{ item }">
          {{ item.text.toUpperCase() }}
        </template>
      </v-breadcrumbs>
    </v-card>
    <!-- Provides the application the proper gutter -->
    <v-container fluid>
      路由内容
      <!-- If using vue-router -->
      <router-view></router-view>
    </v-container>
  </v-main>

  <v-footer app> 底部内容 </v-footer>
</template>

<script lang="ts" setup>
import { $ref } from 'vue/macros';
// import VLogo from './logo/index.vue';
// import VMenu from './menu/index.vue';

const openMenu = $ref<boolean>(true);
const menuWidth = openMenu ? '200' : '60';
const breadcrumbList = [
  {
    text: 'Dashboard',
    disabled: false,
    href: 'breadcrumbs_dashboard'
  },
  {
    text: 'Link 1',
    disabled: false,
    href: 'breadcrumbs_link_1'
  },
  {
    text: 'Link 2',
    disabled: true,
    href: 'breadcrumbs_link_2'
  }
];

const menusList = [{ title: 'Click Me' }, { title: 'Click Me' }, { title: 'Click Me' }, { title: 'Click Me 2' }];
</script>

<style lang="scss" scoped>
.app-container {
  width: 100vw;
  height: 100%;
  .container-layout {
    height: 100%;
    .layout-sider {
      min-height: 100vh;
      background: linear-gradient(0deg, #abdcff, #2396e9);
      transition: all 0.2s ease-in-out;
    }
  }
  .layout-body {
    height: 100%;
    .body-header {
      height: 200px;
    }
  }
}
</style>
