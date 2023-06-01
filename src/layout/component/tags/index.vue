<template>
  <div class="content-tags">
    <!-- <div class="tag-width" :to="{ path: '/' }">
      <n-icon size="20">
        <icon-ic:outline-home></icon-ic:outline-home>
      </n-icon>
      <n-tooltip placement="top" trigger="hover">
        <template #trigger>
          <span class="tag-item-span"> 首页 </span>
        </template>
        <span> 首页 </span>
      </n-tooltip>
    </div> -->
    <div
      v-for="(item, index) in tagsList"
      :key="index"
      class="tag-width"
      :class="currentActivePath === item.path ? 'tag-active' : ''"
      @click="clickTagViewBtn(item)"
      @contextmenu.prevent="rightClickTagBtn(item, $event)"
    >
      <n-icon size="20">
        <icon-ic:baseline-menu></icon-ic:baseline-menu>
      </n-icon>
      <n-tooltip placement="top" trigger="hover">
        <template #trigger>
          <span class="tag-item-span"> {{ item.meta.title }}</span>
        </template>
        <span> {{ item.meta.title }} </span>
      </n-tooltip>
      <n-icon class="tag-item-end-icon" size="20" @click.prevent.stop="closeTagBtn(item)">
        <icon-ic:baseline-close></icon-ic:baseline-close>
      </n-icon>
    </div>
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

onMounted(() => {
  window.addEventListener('click', () => {
    showRightMenuBox = false;
  });
});

// let tagsList = $ref<ITags[]>([
//   {
//     id: '11',
//     type: 1,
//     label: '页面1',
//     name: '123',
//     path: '/index',
//     fullPath: '',
//     query: '',
//     description: '页面1'
//   }
// ]);

let tagsList = $ref<Array<any>>(useTagStore().getPageTagList);

// 关闭按钮
const closeTagBtn = (tag: ITags) => {
  let i: number = tagsList.findIndex((item: ITags) => item.path === tag.path);
  tagsList.splice(i, 1);
};

// 当前活动路径
let currentActivePath = $ref<string>(useTagStore().getActiveTagPath);

// 点击标签
const clickTagViewBtn = (tag: ITags) => {
  currentActivePath = tag.path;
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
</script>

<style lang="scss" scoped>
.content-tags {
  display: flex;
  flex: 1;
  overflow-x: hidden;
  width: 100%;
  border-bottom: 1px solid #e8eaed;
  box-shadow: 0 2px 2px #e8eaed;
  .tag-width {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    margin: .3125rem 0;
    margin-left: .3125rem;
    width: 6.25rem;
    height: 1.5625rem;
    line-height: 1.5625rem;
    font-size: .625rem;
    border: 1px solid #d8dce5;
    border-radius: .1875rem;
    cursor: pointer;
    color: #495060;
    background: #fff;
    &:hover {
      border: 1px solid #9b59b6;
      color: #9b59b6;
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
      color: #bdc3c7;
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
    background-color: #2ed573;
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
