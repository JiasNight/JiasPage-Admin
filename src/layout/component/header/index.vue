<template>
  <div class="content-header">
    <div class="header-left">
      <n-button text style="font-size: 24px">
        <n-icon>
          <icon-mdi:format-list-bulleted></icon-mdi:format-list-bulleted>
        </n-icon>
      </n-button>
      <!-- 面包屑 -->
      <n-breadcrumb>
        <n-breadcrumb-item>
          <n-icon size="20">
            <icon-mdi:home></icon-mdi:home>
          </n-icon>
          首页
        </n-breadcrumb-item>
      </n-breadcrumb>
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
          <span class="right-user"> {{ currentUserInfo.userNick }} </span>
        </template>
        <span> 欢迎您，{{ currentUserInfo.userNick }} </span>
      </n-tooltip>
      <n-dropdown trigger="click" :options="dropdownOptions" :show-arrow="true" @select="handleSelectDropdown">
        <img class="right-avatar" src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg" alt="用户头像" />
      </n-dropdown>
    </div>
    <!-- 样式设置 -->
    <ConfigStyle :drawer-show="themeDrawerShow" @close="themeDrawerShow = false"></ConfigStyle>
  </div>
</template>

<script lang="ts" setup>
import { ICON } from '@/enums/icon';
import { renderIcon } from '@/utils/common';
import useUserStore from '@/store/module/user';
import { useRouter } from 'vue-router';
import ConfigStyle from '@/layout/component/configStyle/index.vue';

const router = useRouter();

let userStore = useUserStore();

// 定义响应式数据
let todoNumVal = $ref<number>(10);
let currentUserInfo = {
  userName: '',
  userNick: ''
};
let themeDrawerShow = $ref<boolean>(false);

// 挂载
onMounted(() => {
  currentUserInfo = userStore.getUserInfo;
});

// const { iconRender } = useIconRender();

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
</script>

<style lang="scss" scoped>
.content-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.625rem;
  height: 3.125rem;
  box-shadow: 0 0.2125rem 0.1125rem #d6d9da;
  .header-left {
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
</style>
