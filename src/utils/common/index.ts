import { h, Component, defineComponent } from 'vue';
import { NIcon, FormInst } from 'naive-ui';
import { Icon } from '@iconify/vue';
import { ICON } from '@/enums/icon';

// 渲染菜单图标方法
// export function renderIcon(icon = 'mdi:emoticon', props = { size: 16 }) {
//   return () => h(NIcon, props, { default: () => h(Icon as Component, { icon: icon }) });
// }

// 图标渲染
export function renderIcon(type: ICON, icon = 'mdi:emoticon', props = { size: 14 }) {
  // 判断是直接渲染还是返回图标对象进行渲染
  if (type === 'O') {
    const iconInfo = {
      name: icon,
      render: () => {
        return h(NIcon, props, { default: () => h(Icon as Component, { icon: icon }) });
      }
    };
    return iconInfo;
  } else {
    return () => h(NIcon, props, { default: () => h(Icon as Component, { icon: icon }) });
  }
}

/**
 * * 格式化时间
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

/**
 * * 生成一个不重复的ID
 * @param randomLength 需要生成的长度
 * @returns
 */
export const getUUID = (randomLength = 10) => {
  return Number(Math.random().toString().substring(2, randomLength) + Date.now()).toString(36);
};

/**
 * * 重置表单对象
 * @param refsEl 表单元素
 */
export const resetForm = (refsEl: FormInst | null, formObj: any) => {
  const object = formObj;
  const resultObj: any = {};
  for (const key in object) {
    if (Object.prototype.hasOwnProperty.call(object, key)) {
      let ele = object[key];
      // Array.isArray(ele) ? (ele = []) : (ele = null);
      ele = null;
      resultObj[key] = ele;
    }
  }
  if (refsEl) refsEl.restoreValidation();
  return resultObj;
};

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
