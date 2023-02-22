import { h, Component } from 'vue';
import { InsertEmoticonFilled } from '@vicons/material';
import { NIcon } from 'naive-ui';
// import SvgIcon from '@/components/icon/SvgIcon.vue';

// 渲染图标通用方法
export function renderIcon(icon?: Component, props = { size: 12 }) {
  if (!icon) icon = InsertEmoticonFilled;
  return () => h(NIcon, props, { default: () => h(icon as Component, { icon }) });
}

// export function renderCustomIcon(icon, props = { size: 12 }) {
//   return () => h(NIcon, props, { default: () => h(SvgIcon, { icon }) });
// }
