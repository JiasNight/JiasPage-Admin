<template>
  <!-- 右键菜单内容 -->
  <n-dropdown trigger="manual" :show="isShow" :options="contextMenuOption" :x="left" :y="top">
  </n-dropdown>
</template>

<script lang="ts" setup>
import { renderIcon } from '@/utils/common/index';

const props = defineProps({
  isShow: {
    type: Boolean,
    default: false
  },
  currentPath: {
    type: String,
    default: ''
  },
  left: {
    type: Number,
    default: 0
  },
  top: {
    type: Number,
    default: 0
  }
});

// 右键菜单
const contextMenuOption = computed(() => [
  {
    label: '重新加载',
    key: 'reload',
    // disabled: props.currentPath !== tagsStore.activeTag,
    icon: renderIcon('ic:baseline-refresh')
  },
  {
    label: '关闭',
    key: 'close',
    // disabled: tagsStore.tags.length <= 1,
    icon: renderIcon('ic:baseline-close')
  },
  {
    label: '关闭其他',
    key: 'close-other',
    // disabled: tagsStore.tags.length <= 1,
    icon: renderIcon('ic:outline-closed-caption-disabled')
  },
  {
    label: '关闭左侧',
    key: 'close-left',
    // disabled: tagsStore.tags.length <= 1 || props.currentPath === tagsStore.tags[0].path,
    icon: renderIcon('ic:baseline-switch-left')
  },
  {
    label: '关闭右侧',
    key: 'close-right',
    // disabled: tagsStore.tags.length <= 1 || props.currentPath === tagsStore.tags[tagsStore.tags.length - 1].path,
    icon: renderIcon('ic:baseline-switch-right')
  }
]);
</script>
