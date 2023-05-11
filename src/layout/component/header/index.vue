<template>
  <div class="content-header">
    <div class="header-left">
      <n-icon size="20" style="cursor: pointer"><MenuFilled></MenuFilled></n-icon>
      <!-- 面包屑 -->
      <n-breadcrumb>
        <n-breadcrumb-item> <n-icon :component="HomeFilled" /> 首页</n-breadcrumb-item>
      </n-breadcrumb>
    </div>
    <div class="header-right">
      <n-tooltip placement="bottom" trigger="hover">
        <template #trigger>
          <n-badge class="right-todo" :value="todoNumVal">
            <n-icon size="30">
              <ListAltRound />
            </n-icon>
          </n-badge>
        </template>
        <span> 你有{{ todoNumVal }}条消息待处理！</span>
      </n-tooltip>
      <span class="right-user"> 欢迎您，{{ currentUserName }} </span>
      <n-dropdown trigger="click" :options="dropdownOptions" :show-arrow="true" @select="handleSelectDropdown">
        <img class="right-avatar" src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg" alt="用户头像" />
      </n-dropdown>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { renderIcon } from '@/utils/common';
import useUserStore from '@/store/module/user';
import router from '@/router';
import {
  MenuFilled,
  HomeFilled,
  ListAltRound,
  SupervisedUserCircleFilled,
  PersonOutlineFilled,
  LogOutFilled
} from '@vicons/material';

// 定义响应式数据
let todoNumVal = $ref<number>(10);
let currentUserName = $ref<string>('');

// 挂载
onMounted(() => {
  currentUserName = useUserStore().userInfo.userNickName;
});

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
    label: '用户资料',
    key: 'userInfo',
    icon: renderIcon(PersonOutlineFilled)
  },
  {
    label: '退出登录',
    key: 'logout',
    icon: renderIcon(LogOutFilled)
  }
];

// 处理下拉菜单按钮点击
const handleSelectDropdown = (key: string) => {
  console.log(key);
  if (key === 'userInfo') {
    router.push('userInfo');
  } else if (key === 'logout') {
    useUserStore().logoutSystem();
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
    .right-todo {
      margin-left: 2rem;
      cursor: pointer;
    }
    .right-user {
      margin: 0 1rem;
      font-size: large;
      font-weight: bold;
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
