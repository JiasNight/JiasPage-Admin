<template>
  <!-- 右键菜单内容 -->
  <div v-if="props.show" v-close-popup class="contextmenu" :style="{ left: props.left + 'px', top: props.top + 'px' }">
    <div v-for="(item, i) in contextMenuOption" :key="i" class="contextmenu-item" @click="handleSelect(item.key)">
      <q-icon size="xs" class="q-ma-xs">
        <MdiIcon color="primary" :icon="item.icon"></MdiIcon>
      </q-icon>
      <span>{{ item.label }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import useAppStore from "@/store/module/app";
import useTagStore from "@/store/module/tag";
import MdiIcon from "@/components/MdiIcon/MdiIcon.vue";

const appStore = useAppStore();
const tagStore = useTagStore();

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  label: {
    type: String,
    default: "",
  },
  currentPath: {
    type: String,
    default: "",
  },
  left: {
    type: Number,
    default: 0,
  },
  top: {
    type: Number,
    default: 0,
  },
});

let labelStr = $ref("");

// 右键菜单
const contextMenuOption = $ref([
  {
    label: "重新加载",
    key: "reload",
    // disabled: props.currentPath !== tagsStore.activeTag,
    icon: "mdiRefresh",
  },
  {
    label: "关闭",
    key: "close",
    // disabled: tagsStore.tags.length <= 1,
    icon: "mdiClose",
  },
  {
    label: "关闭其他",
    key: "close-other",
    // disabled: tagsStore.tags.length <= 1,
    icon: "mdiCloseBoxOutline",
  },
  {
    label: "关闭左侧",
    key: "close-left",
    // disabled: tagsStore.tags.length <= 1 || props.currentPath === tagsStore.tags[0].path,
    icon: "mdiFormatPilcrowArrowLeft",
  },
  {
    label: "关闭右侧",
    key: "close-right",
    // disabled: tagsStore.tags.length <= 1 || props.currentPath === tagsStore.tags[tagsStore.tags.length - 1].path,
    icon: "mdiFormatPilcrowArrowRight",
  },
]);

// 标签菜单功能
const handleSelect = (key: string) => {
  tagStore.setTagActive(key);
};
</script>

<style lang="scss" scoped>
.contextmenu {
  position: absolute;
  z-index: 999;
  background-color: #ffffff;
  border: 1px solid #dfe4ea;
  border-radius: 0.3125rem;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  .contextmenu-item {
    width: 6.25rem;
    height: 1.875rem;
    display: flex;
    align-items: center;
    padding: 0 0.3125rem;
    cursor: pointer;
    &:hover {
      background-color: $primary;
      border-radius: 0.3125rem;
      color: #fff;
    }
  }
}
</style>
