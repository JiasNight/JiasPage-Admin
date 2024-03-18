<template>
  <div class="header-container">
    <!-- logo -->
    <Logo class="container-logo"></Logo>

    <div class="container-wrap">
      <div class="wrap-breadcrumb">
        <n-button text @click="handleToggleSider">
          <n-icon size="20">
            <icon-mdi:format-list-bulleted></icon-mdi:format-list-bulleted>
          </n-icon>
        </n-button>
        <!-- 面包屑 -->
        <Breadcrumbs></Breadcrumbs>
      </div>
      <div class="header-right">
        <!-- 搜索框 -->
        <n-input class="right-search" placeholder="输入搜索">
          <template #prefix>
            <icon-mdi:magnify></icon-mdi:magnify>
          </template>
        </n-input>
        <!-- <n-button circle :bordered="false">
        <template #icon>
          <n-icon size="30">
            <icon-mdi:magnify></icon-mdi:magnify>
          </n-icon>
        </template>
      </n-button> -->
        <n-tooltip placement="bottom" trigger="hover">
          <template #trigger>
            <n-badge class="right-todo" :value="todoNumVal">
              <n-icon size="30">
                <icon-mdi:list-box-outline></icon-mdi:list-box-outline>
              </n-icon>
            </n-badge>
          </template>
          <span> 你有{{ todoNumVal }}条消息待处理！</span>
        </n-tooltip>
        <!-- 锁屏 -->
        <n-tooltip placement="top-start" trigger="hover">
          <template #trigger>
            <n-icon class="right-todo" size="30">
              <icon-mdi:lock></icon-mdi:lock>
            </n-icon>
          </template>
          <span>锁屏</span>
        </n-tooltip>
        <n-tooltip placement="top-start" trigger="hover">
          <template #trigger>
            <span class="right-user"> {{ appUserInfo?.userNickName }} </span>
          </template>
          <span> 欢迎您，{{ appUserInfo?.userNickName }} </span>
        </n-tooltip>
        <n-dropdown trigger="click" :options="dropdownOptions" :show-arrow="true" @select="handleSelectDropdown">
          <img class="right-avatar" src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg" alt="用户头像" />
        </n-dropdown>
      </div>
    </div>
    <!-- 样式设置 -->
    <ConfigStyle :drawer-show="themeDrawerShow" @close="themeDrawerShow = false"></ConfigStyle>
  </div>
</template>

<script lang="ts" setup>
import { ICON } from '@/enums/icon';
import { renderIcon } from '@/utils/common';
import { IUserInfo } from '@/interface/common';
import useUserStore from '@/store/module/user';
import useAppStore from '@/store/module/app';
import { useRouter } from 'vue-router';
import Logo from '@/layout/component/logo/index.vue';
import Breadcrumbs from '@/layout/component/header/breadcrumbs.vue';
import ConfigStyle from '@/layout/component/configStyle/index.vue';

const router = useRouter();

let userStore = useUserStore();
let appStore = useAppStore();

// 定义响应式数据
let todoNumVal = $ref<number>(10);

let themeDrawerShow = $ref<boolean>(false);

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
