<template>
  <!-- 右键菜单内容 -->
  <n-dropdown
    trigger="manual"
    :show="props.show"
    :options="contextMenuOption"
    :x="props.left"
    :y="props.top"
    @select="handleSelect"
  >
  </n-dropdown>
</template>

<script lang="ts" setup>
import useAppStore from '@/store/module/app';
import useTagStore from '@/store/module/tag';
import { renderMenuIcon } from '@/utils/common/index';

const appStore = useAppStore();
const tagStore = useTagStore();

const props = defineProps({
  show: {
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
const contextMenuOption = $ref([
  {
    label: '重新加载',
    key: 'reload',
    // disabled: props.currentPath !== tagsStore.activeTag,
    icon: renderMenuIcon('mdi:refresh')
  },
  {
    label: '关闭',
    key: 'close',
    // disabled: tagsStore.tags.length <= 1,
    icon: renderMenuIcon('mdi:close')
  },
  {
    label: '关闭其他',
    key: 'close-other',
    // disabled: tagsStore.tags.length <= 1,
    icon: renderMenuIcon('mdi:close-box-outline')
  },
  {
    label: '关闭左侧',
    key: 'close-left',
    // disabled: tagsStore.tags.length <= 1 || props.currentPath === tagsStore.tags[0].path,
    icon: renderMenuIcon('mdi:format-pilcrow-arrow-left')
  },
  {
    label: '关闭右侧',
    key: 'close-right',
    // disabled: tagsStore.tags.length <= 1 || props.currentPath === tagsStore.tags[tagsStore.tags.length - 1].path,
    icon: renderMenuIcon('mdi:format-pilcrow-arrow-right')
  }
]);

// 标签菜单功能
const handleSelect = (key: string) => {
  console.log(key);
  tagStore.setTagActive(key);
};
</script>
