<template>
  <q-header bordered class="bg-primary text-white">
    <q-toolbar>
      <Logo class="container-logo"></Logo>
      <q-btn dense flat round :icon="mdiMenu" @click="handleToggleSider" />
      <Breadcrumbs></Breadcrumbs>
      <q-space />
      <q-input v-model="searchValue" dark standout rounded dense>
        <template #append>
          <q-icon v-if="searchValue === ''" :name="mdiMagnify" />
          <q-icon v-else class="c-p" :name="mdiClose" @click="searchValue = ''" />
        </template>
      </q-input>
      <q-btn flat dense color="purple" round :icon="mdiEmail">
        <q-badge color="red" floating>4</q-badge>
        <q-tooltip anchor="top middle" self="center middle"> 你有4条消息待处理！ </q-tooltip>
      </q-btn>
      <span> 欢迎您，{{ appUserInfo?.nickName }}</span>
      <q-btn-dropdown flat color="info" ripple push no-caps>
        <template #label>
          <q-avatar flat>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo.svg" />
          </q-avatar>
        </template>

        <q-list class="q-pa-xs" bordered dense>
          <template v-for="(item, i) in dropdownOptions" :key="i">
            <q-item v-close-popup v-ripple clickable @click="handleSelectDropdown(item.key)">
              <q-item-section avatar>
                <q-icon :name="item.icon" :color="item.color"></q-icon>
              </q-item-section>
              <q-item-section no-wrap>
                <q-item-label> {{ item.label }} </q-item-label>
              </q-item-section>
            </q-item>
            <q-separator v-if="i === dropdownOptions.length - 2" />
          </template>
        </q-list>
      </q-btn-dropdown>
    </q-toolbar>
  </q-header>
</template>

<script lang="ts" setup>
import { mdiMenu, mdiAccount, mdiDraw, mdiLogout, mdiEmail, mdiMagnify, mdiClose } from "@quasar/extras/mdi-v6";
import { IUserInfo } from "@/interface/common";
import useUserStore from "@/store/module/user";
import useAppStore from "@/store/module/app";
import { useRouter } from "vue-router";
import Logo from "@/layout/component/logo/index.vue";
import Breadcrumbs from "@/layout/component/header/breadcrumbs.vue";
import { useQuasar } from "quasar";

const router = useRouter();

let userStore = useUserStore();
let appStore = useAppStore();

const $q = useQuasar();

// 定义响应式数据
let todoNumVal = $ref<number>(10);

let themeDrawerShow = $ref<boolean>(false);

let searchValue = $ref<string>("");

let appUserInfo = computed(() => userStore.getUserInfo);

// 用户下拉菜单选项
const dropdownOptions = [
  {
    label: "用户信息",
    key: "userInfo",
    icon: mdiAccount,
    color: "primary",
  },
  {
    label: "主题模式",
    key: "theme",
    icon: mdiDraw,
    color: "primary",
  },
  {
    label: "退出登录",
    key: "logout",
    icon: mdiLogout,
    color: "negative",
  },
];

// 处理下拉菜单按钮点击
const handleSelectDropdown = (key: string) => {
  if (key === "userInfo") {
    router.push("/personalCenter");
  } else if (key === "theme") {
    themeDrawerShow = true;
  } else if (key === "logout") {
    console.log($q);
    $q.dialog({
      title: "系统提示",
      message: "是否确认退出登录？",
      cancel: true,
      persistent: true,
      color: "negative",
    }).onOk(() => {
      userStore.logoutSystem().then(() => {
        router.push("/signIn");
      });
    });
  }
};

// 切换菜单栏是否折叠
const handleToggleSider = (): void => {
  let isCollapsed = appStore.getCollapsedSider;
  appStore.setCollapsedSider(!isCollapsed);
};
</script>

<style lang="scss" scoped>
.header-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.625rem;
  height: 100%;
  min-height: 3.125rem;
  max-height: 6.25rem;
  background: $topHeaderBgColor;
  color: $topHeaderTextColor;
  box-shadow: 0 0.2125rem 0.1125rem #d6d9da;
  .container-logo {
    max-width: $siderBarWidth;
    height: 100%;
  }
  .container-wrap {
    width: calc(100% - $siderBarWidth);
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 0.625rem;
    .wrap-breadcrumb {
      display: flex;
      flex-direction: row;
      justify-content: start;
      align-items: center;
    }
    .header-right {
      display: flex;
      flex-direction: row;
      justify-content: start;
      align-items: center;
      .right-search {
        display: inline-block;
      }
      .right-todo {
        margin-left: 1rem;
        cursor: pointer;
      }
      .right-user {
        overflow: hidden;
        margin: 0 1rem;
        width: 9.375rem;
        font-size: 1rem;
        font-weight: bolder;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .right-avatar {
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 50%;
        cursor: pointer;
      }
    }
  }
}
</style>
