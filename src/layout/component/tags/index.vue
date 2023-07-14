<template>
  <div class="content-tags">
    <n-button class="tags-arrow" text @click="clickScrollLeftBtn">
      <n-icon size="25">
        <icon-mdi:chevron-double-left></icon-mdi:chevron-double-left>
      </n-icon>
    </n-button>
    <div ref="tagScroll" class="tags-wrap">
      <div
        v-for="(item, index) in tagsList"
        :key="index"
        class="tag-item"
        :class="useTagStore().getActiveTagPath === item.path ? 'tag-active' : ''"
        @click="clickTagViewBtn(item)"
        @contextmenu.prevent="rightClickTagBtn(item, $event)"
      >
        <n-icon size="15" color="#A163F7">
          <icon-mdi:star-face></icon-mdi:star-face>
        </n-icon>
        <n-tooltip placement="top" trigger="hover">
          <template #trigger>
            <span class="tag-item-span"> {{ item.meta.title }}</span>
          </template>
          <span> {{ item.meta.title }} </span>
        </n-tooltip>
        <n-icon class="tag-item-end-icon" size="20" @click.prevent.stop="closeTagBtn(item)">
          <icon-mdi:window-close></icon-mdi:window-close>
        </n-icon>
      </div>
    </div>
    <n-button class="tags-arrow" text @click="clickScrollRightBtn">
      <n-icon size="25">
        <icon-mdi:chevron-double-right></icon-mdi:chevron-double-right>
      </n-icon>
    </n-button>
    <!-- 右键菜单内容 -->
    <ContextMenu
      :is-show="showRightMenuBox"
      :left="rightMenuX"
      :top="rightMenuY"
      :current-path="currentContextClickPath"
    ></ContextMenu>
  </div>
</template>

<script lang="ts" setup>
import { $ref } from 'vue/macros';
import type { MenuOption } from 'naive-ui';
import ContextMenu from './contextmenu.vue';
import useTagStore from '@/store/module/tag';
import router from '@/router';

// 扩展ITags的属性
type ITags = MenuOption & {
  path: string;
};

// 标签列表
let tagsList = $ref<Array<any>>(useTagStore().getPageTagList);

let tagScroll = $ref<HTMLElement>();

// 当前活动路径
// let currentActivePath = $ref<string>(useTagStore().getActiveTagPath);

// 加载之后
onMounted(() => {
  window.addEventListener('click', () => {
    showRightMenuBox = false;
  });
});

// 监听
watch(
  () => tagsList,
  (newRoute, oldRoute) => {
    console.log(newRoute);
  },
  { immediate: true }
);

// 关闭按钮
const closeTagBtn = (tag: ITags) => {
  let i: number = tagsList.findIndex((item: ITags) => item.path === tag.path);
  tagsList.splice(i, 1);
};

// 点击标签
const clickTagViewBtn = (tag: ITags) => {
  // currentActivePath = tag.path;
  router.push(tag.path);
};

// 是否显示右键菜单
let showRightMenuBox = $ref<boolean>(false);
// 右键菜单位置
let rightMenuX = $ref<number>(0);
let rightMenuY = $ref<number>(0);
let currentContextClickPath = $ref<string>('');

// 右键按钮
const rightClickTagBtn = (tag: ITags, e: any) => {
  showRightMenuBox = true;
  rightMenuX = e.pageX;
  rightMenuY = e.pageY;
  currentContextClickPath = tag.path;
};

/**
 * 缓动动画封装
 * @param ele
 * @param target
 */
function scrollMoveAnimate(ele: HTMLElement, target: number) {
  // 要用定时器，先清定时器
  // 一个萝卜一个坑儿，一个元素对应一个定时器
  let timer: any = null;
  clearInterval(timer);
  let start = 0;
  // 定义定时器
  timer = setInterval(() => {
    // 获取步长
    // 步长应该是越来越小的，缓动的算法。
    let step = target / 10;
    // 对步长进行二次加工(大于0向上取整,小于0向下取整)
    // 达到的效果是：最后10像素的时候都是1像素1像素的向目标位置移动，就能够到达指定位置。
    step = step > 0 ? Math.ceil(step) : Math.floor(step);
    // 动画原理： 目标位置 = 当前位置 + 步长
    ele.scrollLeft = ele.scrollLeft + step;
    start += step;
    // 检测缓动动画有没有停止
    if (start === target) {
      clearInterval(timer);
    }
  }, 30);
}

// 滚动条左边按钮点击
const clickScrollLeftBtn = (e: Event) => {
  if (tagScroll && tagScroll.scrollLeft >= 0) {
    scrollMoveAnimate(tagScroll, -50);
  }
};

// 滚动条右边按钮点击
const clickScrollRightBtn = (e: Event) => {
  if (tagScroll && tagScroll.scrollLeft >= 0) {
    scrollMoveAnimate(tagScroll, 50);
  }
};
</script>

<style lang="scss" scoped>
.content-tags {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border-bottom: 1px solid #e8eaed;
  box-shadow: 0 2px 2px #e8eaed;
  .tags-arrow {
    padding: 0 0.3125rem;
    &:hover {
      background-color: #f7f8fa;
    }
    &:first-of-type {
      box-shadow: 2px 0 2px #e8eaed;
    }
    &:last-of-type {
      box-shadow: 0 0 2px #e8eaed;
    }
  }
  .tags-wrap {
    display: inherit;
    overflow: hidden;
    padding: 0 0.3125rem;
    width: 100%;
    border-radius: 0.125rem;
    .tag-item {
      display: inline-flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
      flex-wrap: nowrap;
      margin: 0.3125rem 0;
      margin-left: 0.3125rem;
      width: 6.25rem;
      height: 1.5625rem;
      line-height: 1.5625rem;
      font-size: 0.625rem;
      border: 1px solid #d8dce5;
      border-radius: 0.125rem;
      cursor: pointer;
      color: #495060;
      background: #fff;
      &:hover {
        border: 1px solid #A163F7;
      }
      .tag-item-span {
        display: inline-block;
        overflow: hidden;
        margin-top: 2px;
        margin-left: 5px;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .tag-item-end-icon {
        color: #8c8e91;
        &:hover {
          width: 1.25rem;
          height: 1.25rem;
          border-radius: 50%;
          color: #ffa502;
          background-color: #dee4e7;
        }
      }
    }
    .tag-active {
      // border: 0.0625rem solid #A163F7;
      background-color: #45E3FF;
    }
    // 定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸
    &::-webkit-scrollbar {
      width: 10px;
      height: 10px;
      background-color: #f5f5f5;
    }
    // 定义滚动条轨道 内阴影+圆角
    &::-webkit-scrollbar-track {
      border-radius: 10px;
      background-color: #f5f5f5;
      -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    }
    // 定义滑块 内阴影+圆角
    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background-image: linear-gradient(90deg, #5b247a, #1bcedf);
      -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    }
  }
  .right-menu-box {
    position: absolute;
    width: 100px;
    height: 135px;
    border: 1px solid #e8eaed;
    border-radius: 2px;
    background-color: #fff;
    box-shadow: 2px 2px 2px #b7b7bd;
    cursor: pointer;
    .box-btn {
      margin: 0 5px;
      width: 90%;
    }
    p {
      margin-left: 1px;
      padding-left: 10px;
      text-justify: middle;
      &:hover {
        color: #f9f7fa;
        background-color: #b7b7bd;
      }
    }
  }
  // 进入之前和离开后的样式
  .right-menu-enter-from,
  .right-menu-leave-to {
    opacity: 0;
  }
  // 离开和进入过程中的样式
  .right-menu-enter-active,
  .right-menu-leave-active {
    // 添加过渡动画
    transition: opacity 0.5s ease;
  }
  // 进入之后和离开之前的样式
  .right-menu-enter-to,
  .right-menu-leave-from {
    opacity: 1;
  }
}
</style>
