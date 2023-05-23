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
      <!-- 搜索框 -->
      <n-input class="right-search" placeholder="输入搜索">
        <template #prefix>
          <icon-material-symbols:search></icon-material-symbols:search>
        </template>
      </n-input>
      <n-button circle :bordered="false">
        <template #icon>
          <n-icon size="30">
            <icon-material-symbols:search></icon-material-symbols:search>
          </n-icon>
        </template>
      </n-button>
      <n-tooltip placement="bottom" trigger="hover">
        <template #trigger>
          <n-badge class="right-todo" :value="todoNumVal">
            <n-icon size="30">
              <icon-material-symbols:list-alt-outline></icon-material-symbols:list-alt-outline>
            </n-icon>
          </n-badge>
        </template>
        <span> 你有{{ todoNumVal }}条消息待处理！</span>
      </n-tooltip>
      <n-tooltip placement="top-start" trigger="hover">
        <template #trigger>
          <span class="right-user"> 欢迎您，{{ currentUserName }} </span>
        </template>
        <span> 欢迎您，{{ currentUserName }} </span>
      </n-tooltip>
      <n-dropdown trigger="click" :options="dropdownOptions" :show-arrow="true" @select="handleSelectDropdown">
        <img class="right-avatar" src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg" alt="用户头像" />
      </n-dropdown>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { renderIcon, useIconRender } from '@/utils/common';
import useUserStore from '@/store/module/user';
import router from '@/router';

// 定义响应式数据
let todoNumVal = $ref<number>(10);
let currentUserName = $ref<string>('');

// 挂载
onMounted(() => {
  currentUserName = useUserStore().userInfo.userNickName;
});

const { iconRender } = useIconRender();

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
    icon: iconRender({ icon: 'material-symbols:person' })
  },
  {
    label: '退出登录',
    key: 'logout',
    icon: iconRender({ icon: 'material-symbols:logout' })
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
      font-size: 1.1rem;
      font-weight: bold;
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
