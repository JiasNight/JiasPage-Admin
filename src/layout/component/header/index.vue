<template>
  <q-header bordered class="bg-primary text-white">
    <q-toolbar>
      <Logo class="container-logo"></Logo>
      <q-btn dense flat round :icon="mdiMenu" @click="handleToggleSider" />
      <Breadcrumbs></Breadcrumbs>
      <q-space />
      <q-input v-model="searchValue" flat dark borderless rounded outlined>
        <template #append>
          <q-icon :name="mdiMagnify"></q-icon>
        </template>
      </q-input>
      <q-btn flat dense color="purple" round :icon="mdiEmail">
        <q-badge color="red" floating>4</q-badge>
      </q-btn>
      <q-avatar flat>
        <img src="https://cdn.quasar.dev/logo-v2/svg/logo.svg" />
        <q-menu auto-close>
          <q-list>
            <q-item v-close-popup clickable>
              <q-item-section>
                <q-icon :name="mdiAccount"></q-icon>
                个人信息
              </q-item-section>
            </q-item>
            <q-item v-close-popup clickable>
              <q-item-section>
                <q-icon :name="mdiSettingsHelper"></q-icon>
                主题模式
              </q-item-section>
            </q-item>
            <q-separator />
            <q-item v-close-popup clickable>
              <q-item-section>
                <q-icon :name="mdiLogout"></q-icon>
                退出系统
              </q-item-section>
            </q-item>
            <q-separator />
          </q-list>
        </q-menu> 
      </q-avatar>
    </q-toolbar>
  </q-header>
</template>

<script lang="ts" setup>
import { mdiMenu, mdiAccount, mdiSettingsHelper, mdiLogout, mdiEmail, mdiMagnify } from '@quasar/extras/mdi-v6';
import { ICON } from '@/enums/icon';
import { renderIcon } from '@/utils/common';
import { IUserInfo } from '@/interface/common';
import useUserStore from '@/store/module/user';
import useAppStore from '@/store/module/app';
import { useRouter } from 'vue-router';
import Logo from '@/layout/component/logo/index.vue';
import Breadcrumbs from '@/layout/component/header/breadcrumbs.vue';
import ThemeStyle from '@/layout/component/themeStyle/index.vue';

const router = useRouter();

let userStore = useUserStore();
let appStore = useAppStore();

// 定义响应式数据
let todoNumVal = $ref<number>(10);

let themeDrawerShow = $ref<boolean>(false);

let searchValue = $ref<string>('');

let appUserInfo = computed(() => userStore.getUserInfo);

// 用户下拉菜单选项
const dropdownOptions = [
  {
    label: '用户信息',
    key: 'userInfo',
    icon: renderIcon(ICON.F, 'mdi:account-box')
  },
  {
    label: '主题模式',
    key: 'theme',
    icon: renderIcon(ICON.F, 'mdi:palette')
  },
  {
    label: '退出登录',
    key: 'logout',
    icon: renderIcon(ICON.F, 'mdi:logout')
  }
];

// 处理下拉菜单按钮点击
const handleSelectDropdown = (key: string) => {
  if (key === 'userInfo') {
    router.push('/personalCenter');
  } else if (key === 'theme') {
    themeDrawerShow = true;
  } else if (key === 'logout') {
    userStore.logoutSystem();
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
