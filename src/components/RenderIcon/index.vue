<template>
  <n-icon :icon="'icon-' + props.icon" :color="props.color" :style="props.iconStyle" v-bind="bindAttrs" />
</template>

<script lang="ts" setup name="RenderIcon">
import type { CSSProperties } from 'vue';

const props = defineProps({
  // 图标的名称 ==> 必传
  icon: {
    type: String,
    require: true,
    default: 'material-symbols:emoticon'
  },
  // 图标的颜色 ==> 非必传
  color: {
    type: String,
    require: false,
    default: '#95a5a6'
  },
  // 图标的样式 ==> 非必传
  iconStyle: {
    type: Object,
    require: false,
    default: (): CSSProperties => {
      return {
        width: '1.25rem',
        height: '1.25rem'
      };
    }
  }
});

const attrs = useAttrs();

const bindAttrs = computed<{ class: string; style: string }>(() => ({
  class: (attrs.class as string) || '',
  style: (attrs.style as string) || ''
}));
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
