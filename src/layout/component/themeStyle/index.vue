<template>
  <!-- 样式设置 -->
  <n-drawer :show="props.drawerShow" placement="right" :width="300" :default-width="300" block-scroll mask-closable>
    <n-drawer-content>
      <template #header>
        <n-icon color="#8957e5">
          <icon-mdi:palette></icon-mdi:palette>
        </n-icon>
        主题样式
      </template>
      <n-form ref="themeForm" label-placement="top" label-width="auto" :model="themeFormData">
        <n-form-item label="主题">
          <n-switch :rail-style="themeFormData.model">
            <template #checked>
              <icon-mdi:lightbulb-on></icon-mdi:lightbulb-on>
            </template>
            <template #unchecked>
              <n-icon color="#000">
                <icon-mdi:lightbulb></icon-mdi:lightbulb>
              </n-icon>
            </template>
          </n-switch>
        </n-form-item>
        <n-form-item label="按钮颜色">
          <n-color-picker
            v-model:value="themeFormData.color"
            :show-alpha="true"
            show-preview
            :actions="['confirm', 'clear']"
          />
        </n-form-item>
        <n-form-item label="按钮大小">
          <n-button-group>
            <n-button type="primary" size="tiny"> tiny </n-button>
            <n-button type="primary" size="small"> small </n-button>
            <n-button type="primary" size="medium"> medium </n-button>
            <n-button type="primary" size="large"> large </n-button>
          </n-button-group>
        </n-form-item>
      </n-form>
      <template #footer>
        <n-space justify="center">
          <n-button type="primary">保 存</n-button>
          <n-button @click="cancelDrawerBtn">取 消</n-button>
        </n-space>
      </template>
    </n-drawer-content>
  </n-drawer>
</template>

<script lang="ts" setup>
import { renderIcon } from '@/utils/common';
import useUserStore from '@/store/module/user';
import { FormInst } from 'naive-ui';
import { useRouter } from 'vue-router';

const router = useRouter();

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

const emits = defineEmits(['close']);

// 定义响应式数据
let themeForm = $ref<FormInst | null>(null);
let themeFormData = $ref<IThemeFormData>({});

// 关闭主题设置的抽屉
const cancelDrawerBtn = () => {
  emits('close');
};
</script>

<style lang="scss" scoped>
.content-header {
}
</style>
