<template>
  <v-navigation-drawer v-model="openMenu" app :width="menuWidth">
    <!-- <VLogo></VLogo> -->
    <v-toolbar flat>
      <v-list>
        <v-list-item>
          <v-list-item-avatar>
            <img src="../../assets/images/logo.png" />
          </v-list-item-avatar>
          <v-list-item-title>帖标题</v-list-item-title>
          <v-list-item-subtitle>管理员</v-list-item-subtitle>
        </v-list-item>
      </v-list>
    </v-toolbar>
    <v-spacer></v-spacer>
    <!-- 菜单 -->
    <menus></menus>
  </v-navigation-drawer>

  <v-app-bar app>
    <v-app-bar-nav-icon v-if="!openMenu" @click="openMenu = !openMenu"></v-app-bar-nav-icon>
    <v-app-bar-title tag="">PAGE</v-app-bar-title>
    <v-spacer></v-spacer>
    <v-progress-linear
      v-show="loading"
      :active="loading"
      :indeterminate="progress === null"
      :value="progress"
      absolute
      bottom
      color="green accent-3"
    >
    </v-progress-linear>
    <div class="text-center">
      <v-menu open-on-hover bottom offset-y>
        <template #activator="{ props }">
          <v-btn text v-bind="props" color="#444">
            app
            <v-icon class="ml-1">mdi-account</v-icon>
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
            <v-list-item @click="logout()">
              <v-list-item-title class="d-flex align-center">
                <v-icon class="mr-2">mdi-logout</v-icon>
                登出
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-sheet>
      </v-menu>
    </div>
  </v-app-bar>

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
import menus from './menu/index.vue';
import globalStore from '@/store/module/global';

const globalConfig = globalStore();

const loading: Ref<boolean> = computed({
  get: () => globalConfig.loading,
  set: (v: any) => globalConfig.setLoading(v)
});
const progress: ComputedRef<number | null> = computed(() => globalConfig.progress);
const snackbar: Ref<boolean> = ref(false);
const snackbarText: ComputedRef<string | null> = computed(() => globalConfig.message);

const openMenu = $ref<boolean>(true);
const menuWidth = openMenu ? '250' : '60';
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
