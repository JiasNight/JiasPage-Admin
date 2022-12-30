<template>
  <v-navigation-drawer v-model="openMenu" app :width="drawerWidth" color="#001428">
    <!-- <VLogo></VLogo> -->
    <v-toolbar flat color="#3c6382">
      <v-toolbar-title class="nav-logo">
        <img class="nav-logo-img" src="../../assets/images/logo.png" />
        <span class="nav-logo-title">Hello</span>
      </v-toolbar-title>
    </v-toolbar>
    <v-spacer></v-spacer>
    <!-- 菜单 -->
    <Menus></Menus>
  </v-navigation-drawer>

  <v-app-bar app flat :elevation="5">
    <v-app-bar-nav-icon @click="drawerWidth = drawerWidth === 50 ? 230 : 50"></v-app-bar-nav-icon>
    <!-- <v-app-bar-title tag="">PAGE</v-app-bar-title> -->
    <v-breadcrumbs :items="breadcrumbList">
      <template #text="{ item }">
        {{ item.text.toUpperCase() }}
      </template>
    </v-breadcrumbs>
    <!-- 在v-spacer上面的标签将会在导航栏左侧 在v-spacer下面的标签将会在导航栏右侧 -->
    <v-spacer></v-spacer>
    <!-- <v-progress-linear
      v-show="loading"
      :active="loading"
      :indeterminate="progress === null"
      :value="progress"
      absolute
      bottom
      color="green accent-3"
    >
    </v-progress-linear> -->
    <template #append>
      <v-btn icon="mdi-heart"></v-btn>
      <v-btn icon="mdi-magnify"></v-btn>
      <v-btn icon="mdi-dots-vertical"></v-btn>
      <v-tooltip location="bottom">
        <template #activator="{ props }">
          <v-btn v-bind="props" variant="plain" icon="mdi-theme-light-dark" @click="changeCurrentThemeBtn"></v-btn>
        </template>
        <span> 切换主题 </span>
      </v-tooltip>
      <v-menu open-on-hover bottom offset-y>
        <template #activator="{ props }">
          <v-btn text v-bind="props">
            admin
            <v-icon icon="mdi-account"></v-icon>
          </v-btn>
        </template>
        <v-sheet class="overflow-hidden">
          <v-list dense expand nav>
            <v-list-item to="/user/home">
              <v-list-item-title class="d-flex align-center">
                <v-icon class="mr-2">mdi-account</v-icon>
                用户首页
              </v-list-item-title>
            </v-list-item>
            <v-list-item @click="signOutBtn">
              <v-list-item-title class="d-flex align-center">
                <v-icon class="mr-2">mdi-logout</v-icon>
                登出
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-sheet>
      </v-menu>
    </template>
  </v-app-bar>

  <!-- Sizes your content based upon application components -->
  <v-main>
    <v-card class="top-bar-chips">
      <!-- 标签页组件 -->
      <Tags></Tags>
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
// import { $ref } from 'vue/macros';
// import VLogo from './logo/index.vue';
import { Ref, ComputedRef } from 'vue';
import Menus from './menu/index.vue';
import Tags from './tags/index.vue';
import globalStore from '@/store/module/global';
import useAppStore from '@/store/module/app';

const appStore = useAppStore();

const globalConfig = globalStore();

// const loading: Ref<boolean> = computed({
//   get: () => globalConfig.loading,
//   set: (v: any) => {
//     globalConfig.setLoading(v);
//     return true;
//   }
// });
const progress: ComputedRef<number | null> = computed(() => globalConfig.progress);
const snackbar: Ref<boolean> = ref(false);
const snackbarText: ComputedRef<string | null> = computed(() => globalConfig.message);

const openMenu = $ref<boolean>(true);
let drawerWidth = $ref<number>(230);

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

// 切换当前主题
const changeCurrentThemeBtn = (): void => {
  appStore.setTheme();
};

// 退出登录
const signOutBtn = (): void => {
  alert('退出成功！');
};
</script>

<style lang="scss" scoped>
.nav-logo {
  display: flex;
  flex: 1;
  cursor: pointer;
  .nav-logo-img {
    width: 100px;
  }
  .nav-logo-title {
    font-size: 20px;
    font-weight: bolder;
  }
}
.top-bar-chips {
  display: flex;
  flex: 1;
}
</style>
