/**
 * v-copy
 * 复制某个值至剪贴板
 * 接收参数：string类型/Ref<string>类型/Reactive<string>类型
 */
import type { Directive, DirectiveBinding } from 'vue';

// 全局加载组件
const handleMove = (e: TouchEvent) => {
  e.preventDefault();
};

export const loading: Directive = {
  beforeMount(el: HTMLElement, binding: DirectiveBinding) {},
  beforeUpdate() {}, // 新
  updated() {},
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    // 更新的时候用这个
    if (binding.value) {
      /**
       * binding.value就是v-loading='true'传过来的那个值
       * 如果传过来的值为true 你们就是要展示loading
       * el是当前指令绑定的对象 binding是传过来的值
       */

      // 在移动端页面禁用滚动
      document.body.addEventListener('touchmove', handleMove, { passive: false });

      // 判断当前页面是否存在没有消失的loading
      // hasLoading 值为false 时表明没有loading 可以添加loading
      const hasLoading = el.getElementsByClassName('v-loading').length !== 0;
      if (hasLoading) return '日你温哦，有loading了还添加个锤子';

      // 判断是否传入了自定义提示文字
      const hasCustomText = el.getAttribute('loading-text');
      // 判断是否传入了自定义背景色
      const hasCustomBgColor = el.getAttribute('loading-background');

      el.style.position = 'relative';
      const mask = document.createElement('div'); // 创建最外层div 高度占满（包含滚动）
      const loadingBox = document.createElement('div'); // 显示loading的div 高度是100vh
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg'); // svg标签 用来实现旋转的圆
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle'); // 旋转的那个圆
      const text = document.createElement('p'); // 加载的文字

      // 下面所添加的class样式都会在后面贴出
      mask.setAttribute('class', 'v-loading');
      mask.style.background = !hasCustomBgColor ? 'rgba(255, 255, 255, .8)' : hasCustomBgColor;
      loadingBox.setAttribute('class', 'v-loading-box');
      svg.setAttribute('class', 'v-loading-circular v-rotate');
      svg.setAttribute('viewBox', '25 25 50 50');
      circle.setAttribute('cx', '50');
      circle.setAttribute('cy', '50');
      circle.setAttribute('r', '20');
      circle.setAttribute('fill', 'none');
      text.innerText = !hasCustomText ? '加载中...' : hasCustomText;

      svg.appendChild(circle);
      loadingBox.appendChild(svg);
      loadingBox.appendChild(text);
      mask.appendChild(loadingBox);
      el.appendChild(mask);
    } else {
      /**
       * 传过来的值为false 不需要展示loading
       * 移除loading相关dom
       */
      for (let i = 0; i < el.childNodes.length; i++) {
        if ((el.childNodes[i] as any).className === 'v-loading') {
          const childNodes = el.getElementsByClassName('v-loading')[0];
          el.removeChild(childNodes);
          break;
        }
      }

      // 弹窗消失时移除'禁用滑动事件'
      document.body.removeEventListener('touchmove', handleMove);
    }
  },
  beforeUnmount() {}, // 新
  unmounted() {}
};
