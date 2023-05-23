import { h, Component } from 'vue';
import { InsertEmoticonFilled } from '@vicons/material';
import { NIcon } from 'naive-ui';
import RenderIcon from '@/components/RenderIcon/index.vue';

// 渲染图标通用方法
export function renderIcon(icon?: string, props = { size: 12 }) {
  if (icon) {
    icon = 'icon-' + icon;
  } else {
    icon = 'icon-material-symbols:emoticon';
  }
  return () => h(NIcon, props, { default: () => h(icon as string, { icon }) });
}

// export function renderCustomIcon(icon, props = { size: 12 }) {
//   return () => h(NIcon, props, { default: () => h(SvgIcon, { icon }) });
// }

/**
 * 图标渲染
 * - 用于vue的render函数
 */
export const useIconRender = () => {
  interface IconConfig {
    // 图标名称(iconify图标的名称),例如：mdi-account 或者 mdi:account
    icon?: string;
    // 本地svg图标文件名(assets/icon文件夹下)
    localIcon?: string;
    // 图标颜色
    color?: string;
    // 图标大小
    fontSize?: number;
  }

  interface IconStyle {
    color?: string;
    fontSize?: string;
  }

  /**
   * 图标渲染
   * @param config
   * @property icon - 图标名称(iconify图标的名称), 例如：mdi-account 或者 mdi:account
   * @property localIcon - 本地svg图标文件名(assets/svg文件夹下)
   * @property color - 图标颜色
   * @property fontSize - 图标大小
   */
  const iconRender = (config: IconConfig) => {
    const { color, fontSize, icon, localIcon } = config;

    const style: IconStyle = {};

    if (color) {
      style.color = color;
    }
    if (fontSize) {
      style.fontSize = `${fontSize}px`;
    }

    if (!icon && !localIcon) {
      console.warn('没有传递图标名称，请确保给icon或localIcon传递有效值!');
    }

    return () => h(RenderIcon, { icon, localIcon, style });
  };

  return {
    iconRender
  };
};

/**
 *
 * @param date 标准时间格式
 * @param fmt 输出格式
 * @returns 期望的输出格式
 */
export function formatDate(date = new Date(), fmt = 'yyyy-MM-dd hh:mm:ss') {
  const _date = new Date(date);
  function padLeftZero(str: string) {
    return ('00' + str).substring(str.length);
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (_date.getFullYear() + '').substring(4 - RegExp.$1.length));
  }
  const o: any = {
    'M+': _date.getMonth() + 1,
    'd+': _date.getDate(),
    'h+': _date.getHours(),
    'm+': _date.getMinutes(),
    's+': _date.getSeconds()
  };
  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      const str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str));
    }
  }
  return fmt;
}

// /**
//  * @desc  函数节流
//  * @param {Function} fn
//  * @param {Number} wait
//  * @returns {Function}
//  */
// export function throttle(fn: Function, wait: number) {
//   let context, args;
//   let previous = 0;

//   return function () {
//     const now = +new Date();
//     context = this;
//     args = arguments;
//     if (now - previous > wait) {
//       fn.apply(context, args);
//       previous = now;
//     }
//   };
// }

// /**
//  * @desc  函数防抖
//  * @param {Function} func
//  * @param {number} wait
//  * @param {boolean} immediate
//  * @return {*}
//  */
// export function debounce(method: Function, wait: number, immediate: boolean) {
//   let timeout: any;
//   return function (...args: any) {
//     const context: any = this || null;
//     if (timeout) {
//       clearTimeout(timeout);
//     }
//     // 立即执行需要两个条件，一是immediate为true，二是timeout未被赋值或被置为null
//     if (immediate) {
//       /**
//        * 如果定时器不存在，则立即执行，并设置一个定时器，wait毫秒后将定时器置为null
//        * 这样确保立即执行后wait毫秒内不会被再次触发
//        */
//       const callNow = !timeout;
//       timeout = setTimeout(() => {
//         timeout = null;
//       }, wait);
//       if (callNow) {
//         method.apply(context, args);
//       }
//     } else {
//       // 如果immediate为false，则函数wait毫秒后执行
//       timeout = setTimeout(() => {
//         /**
//          * args是一个类数组对象，所以使用fn.apply
//          * 也可写作method.call(context, ...args)
//          */
//         method.apply(context, args);
//       }, wait);
//     }
//   };
// }
