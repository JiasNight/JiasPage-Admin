<template>
  <div class="content-header">
    <div class="header-left">
      <!-- 面包屑 -->
      <n-breadcrumb>
        <n-breadcrumb-item>
          <n-icon size="20">
            <icon-ic:sharp-home></icon-ic:sharp-home>
          </n-icon>
          首页
        </n-breadcrumb-item>
      </n-breadcrumb>
    </div>
    <div class="header-right">
      <!-- 搜索框 -->
      <n-input class="right-search" placeholder="输入搜索">
        <template #prefix>
          <icon-material-symbols:search></icon-material-symbols:search>
        </template>
      </n-input>
      <!-- <n-button circle :bordered="false">
        <template #icon>
          <n-icon size="30">
            <icon-material-symbols:search></icon-material-symbols:search>
          </n-icon>
        </template>
      </n-button> -->
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
      <!-- 锁屏 -->
      <n-tooltip placement="top-start" trigger="hover">
        <template #trigger>
          <n-icon class="right-todo" size="30">
            <icon-material-symbols:lock></icon-material-symbols:lock>
          </n-icon>
        </template>
        <span>锁屏</span>
      </n-tooltip>
      <n-tooltip placement="top-start" trigger="hover">
        <template #trigger>
          <span class="right-user"> {{ currentUserName }} </span>
        </template>
        <span> 欢迎您，{{ currentUserName }} </span>
      </n-tooltip>
      <n-dropdown trigger="click" :options="dropdownOptions" :show-arrow="true" @select="handleSelectDropdown">
        <img class="right-avatar" src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg" alt="用户头像" />
      </n-dropdown>
    </div>
    <!-- 主题设置 -->
    <n-drawer v-model:show="themeDrawerShow" :width="300" :default-width="300" placement="right" resizable>
      <n-drawer-content>
        <template #header>
          <n-icon>
            <icon-mdi:palette></icon-mdi:palette>
          </n-icon>
          主题画盘
        </template>
        <n-form ref="themeForm" label-placement="left" label-width="auto" :model="themeFormData">
          <n-form-item label="主题">
            <n-switch :rail-style="themeFormData.model">
              <template #checked> 傍晚六点下班 </template>
              <template #unchecked> 午夜零点下班 </template>
            </n-switch>
          </n-form-item>
          <n-form-item label="颜色">
            <n-color-picker
              v-model:value="themeFormData.color"
              :show-alpha="true"
              show-preview
              :actions="['confirm', 'clear']"
            />
          </n-form-item>
          <n-form-item label="颜色">
            <n-color-picker
              v-model:value="themeFormData.color"
              :show-alpha="true"
              show-preview
              :actions="['confirm', 'clear']"
            />
          </n-form-item>
        </n-form>
        <template #footer>
          <n-button>Footer</n-button>
        </template>
      </n-drawer-content>
    </n-drawer>
  </div>
</template>

<script lang="ts" setup>
import { renderIcon } from '@/utils/common';
import useUserStore from '@/store/module/user';
import router from '@/router';
import { FormInst } from 'naive-ui';

interface IThemeFormData {
  model?: boolean;
  color?: string;
}

let userStore = useUserStore();

// 定义响应式数据
let todoNumVal = $ref<number>(10);
let currentUserName = $ref<string>('');
let themeDrawerShow = $ref<boolean>(false);
let themeForm = $ref<FormInst | null>(null);
let themeFormData = $ref<IThemeFormData>({});

// 挂载
onMounted(() => {
  currentUserName = userStore.userInfo.userNickName;
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
    icon: renderIcon('mdi:account-box')
  },
  {
    label: '主题模式',
    key: 'theme',
    icon: renderIcon('mdi:palette')
  },
  {
    label: '退出登录',
    key: 'logout',
    icon: renderIcon('mdi:logout')
  }
];

// 处理下拉菜单按钮点击
const handleSelectDropdown = (key: string) => {
  if (key === 'userInfo') {
    router.push('/personalCenter');
  } else if (key === 'theme') {
    console.log('主题设置');
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
