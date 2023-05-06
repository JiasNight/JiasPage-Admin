<template>
  <div class="content-header">
    <div class="header-left">
      <n-icon size="20" style="cursor: pointer;"><MenuFilled></MenuFilled></n-icon>
      <!-- 面包屑 -->
      <n-breadcrumb>
        <n-breadcrumb-item> <n-icon :component="HomeFilled" /> 首页</n-breadcrumb-item>
      </n-breadcrumb>
    </div>
    <div class="header-right">
      <n-dropdown :options="dropdownOptions">
        <n-avatar size="small" src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg" />
      </n-dropdown>
    </div>
  </div>
</template>

<script lang="ts" setup>
// import { $ref } from 'vue/macros';
// import VLogo from './logo/index.vue';
import { Ref, ComputedRef, Component } from 'vue';
import {
  MenuFilled,
  HomeFilled,
  SupervisedUserCircleFilled,
  PersonOutlineFilled,
  LogOutFilled
} from '@vicons/material';

const renderIcon = (icon: Component) => {
  return () => {
    return h(NIcon, null, {
      default: () => h(icon)
    });
  };
};

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

const dropdownOptions = [
  {
    label: '用户资料',
    key: 'profile',
    icon: renderIcon(PersonOutlineFilled)
  },
  {
    label: '退出登录',
    key: 'logout',
    icon: renderIcon(LogOutFilled)
  }
];
</script>

<style lang="scss" scoped>
.content-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  .header-left {
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;
  }
}
</style>
