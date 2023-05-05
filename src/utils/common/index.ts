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

/**
 * 
 * @param date 时间戳
 * @param fmt 格式
 * @returns 
 */
export function formatDate(date: any, fmt: string) {
  function padLeftZero(str: string) {
    return ('00' + str).substr(str.length);
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  const o: any = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      const str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str));
    }
  }
  return fmt;
}

