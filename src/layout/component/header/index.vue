<template>
  <q-header class="text-white" :style="{ height: headerHeight, backgroundColor: headerBgColor }">
    <q-toolbar>
      <Logo class="container-logo"></Logo>
      <q-btn dense flat round :icon="mdiMenu" @click="handleToggleSider" />
      <Breadcrumbs v-if="breadcrumbsShow"></Breadcrumbs>
      <q-space />
      <q-input v-model="searchValue" dark standout rounded dense>
        <template #append>
          <q-icon v-if="searchValue === ''" :name="mdiMagnify" />
          <q-icon v-else class="c-p" :name="mdiClose" @click="searchValue = ''" />
        </template>
      </q-input>
      <q-btn flat dense color="info" round :icon="mdiMonitorLock" @click="handleLockScreen">
        <q-tooltip> 点击进行锁屏 </q-tooltip>
      </q-btn>
      <q-btn
        flat
        dense
        color="info"
        round
        :icon="$q.fullscreen.isActive ? mdiFullscreenExit : mdiFullscreen"
        @click="handleFullScreen"
      >
        <q-tooltip> {{ $q.fullscreen.isActive ? "退出全屏" : "点击全屏" }} </q-tooltip>
      </q-btn>
      <q-btn flat dense color="negative" round :icon="mdiEmail">
        <q-badge color="red" floating>4</q-badge>
        <q-tooltip> 你有4条消息待处理！ </q-tooltip>
      </q-btn>
      <q-chip class="chip-labels" :icon="mdiAccount" outline clickable text-color="white">
        <div class="ellipsis">
          欢迎您，{{ appUserInfo?.nickName }}
          <q-tooltip>欢迎您，{{ appUserInfo?.nickName }}</q-tooltip>
        </div>
      </q-chip>
      <q-btn-dropdown flat color="info" ripple push no-caps>
        <template #label>
          <q-avatar flat>
            <img src="../../../assets/images/profile.png" />
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
import {
  mdiMenu,
  mdiAccount,
  mdiDraw,
  mdiLogout,
  mdiEmail,
  mdiMagnify,
  mdiClose,
  mdiMonitorLock,
  mdiFullscreen,
  mdiFullscreenExit,
} from "@quasar/extras/mdi-v6";
import { IUserInfo } from "@/interface/common";
import useUserStore from "@/store/module/user";
import useAppStore from "@/store/module/app";
import useThemeStore from "@/store/module/theme";
import { useRouter } from "vue-router";
import Logo from "@/layout/component/logo/index.vue";
import Breadcrumbs from "@/layout/component/header/breadcrumbs.vue";
import { useQuasar } from "quasar";

const router = useRouter();

let userStore = useUserStore();
let appStore = useAppStore();
let themeStore = useThemeStore();

const $q = useQuasar();

let emit = defineEmits(["toggleTheme"]);

// 定义响应式数据
let todoNumVal = $ref<number>(10);

let themeDrawerShow = $ref<boolean>(false);

let searchValue = $ref<string>("");

// 计算属性
let appUserInfo: ComputedRef<IUserInfo> = computed(() => userStore.getUserInfo);
let headerBgColor: ComputedRef<string> = computed(() => themeStore.getHeaderBgColor);
const headerHeight: ComputedRef<number> = computed(() => themeStore.getHeaderHeight);
const breadcrumbsShow: ComputedRef<boolean> = computed(() => themeStore.getBreadcrumbsShow);

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
    emit("toggleTheme");
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

// 锁屏
const handleLockScreen = (): void => {
  appStore.setLockScreen(true);
};

// 全屏
const handleFullScreen = (): void => {
  $q.fullscreen.toggle();
  console.log($q);
};
</script>

<style lang="scss" scoped>
:deep(.chip-labels) {
  max-width: 9.375rem;
  border: none;
}
</style>
