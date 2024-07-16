<template>
  <!-- 样式设置 -->
  <q-drawer v-model="drawerOpen" :width="250" :mini-width="200" overlay elevated side="right" bordered>
    <!-- 菜单 -->
    主题设计
  </q-drawer>
</template>

<script lang="ts" setup>
import { renderIcon } from '@/utils/common';
import useUserStore from '@/store/module/user';
import { FormInst } from 'naive-ui';
import { useRouter } from 'vue-router';
import { mdiCog } from '@quasar/extras/mdi-v6';

const router = useRouter();

interface IThemeFormData {
  model?: boolean;
  color?: string;
}

let userStore = useUserStore();

const props = defineProps({
  open: {
    type: Boolean,
    default: false
  }
});

const emits = defineEmits(['close']);

// 定义响应式数据
let themeForm = $ref<FormInst | null>(null);
let themeFormData = $ref<IThemeFormData>({});

// 计算属性
// 抽屉是否打开
const drawerOpen: ComputedRef<boolean> = computed(() => props.open);
// let drawerOpen = $ref<Boolean>(true);

// 关闭主题设置的抽屉
const cancelDrawerBtn = () => {
  emits('close');
};
</script>

<style lang="scss" scoped>
.content-header {
}
</style>
