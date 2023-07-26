<template>
  <div class="content-header">
    <!-- 样式设置 -->
    <n-drawer v-model:show="props.drawerShow" :width="300" :default-width="300" placement="right" resizable>
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

const props = defineProps({
  drawerShow: {
    type: Boolean,
    default: false
  }
});

// 定义响应式数据
let themeForm = $ref<FormInst | null>(null);
let themeFormData = $ref<IThemeFormData>({});
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
