<template>
  <template v-if="renderLocalIcon">
    <svg aria-hidden="true" width="1em" height="1em" v-bind="bindAttrs">
      <use :xlink:href="symbolId" fill="currentColor" />
    </svg>
  </template>
  <template v-else>
    <Icon v-if="icon" :icon="icon" v-bind="bindAttrs" />
  </template>
</template>

<script lang="ts" setup>
/**
 * 图标组件
 * - 支持iconify和本地svg图标
 * - 同时传递了icon和localIcon，localIcon会优先渲染
 */
interface Props {
  /** 图标名称 */
  icon?: string;
  /** 本地svg的文件名 */
  localIcon?: string;
}

const props = defineProps<Props>();

const attrs = useAttrs();

const bindAttrs = computed<{ class: string; style: string }>(() => ({
  class: (attrs.class as string) || "",
  style: (attrs.style as string) || "",
}));

const symbolId = computed(() => {
  const defaultLocalIcon = "no-icon";
  const icon = props.localIcon || defaultLocalIcon;
  return `#icon-local-${icon}`;
});

/** 渲染本地icon */
const renderLocalIcon = computed(() => props.localIcon || !props.icon);
</script>

<style lang="scss" scoped>
svg {
  display: inline-block;
  overflow: hidden;
  width: 1rem;
  height: 1rem;
  vertical-align: -0.15rem;
  fill: currentColor;
}
</style>
