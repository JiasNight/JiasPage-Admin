<template>
  <div class="content-tags">
    <div class="tag-width" :to="{ path: '/' }">
      <n-icon size="20">
        <icon-ic:outline-home></icon-ic:outline-home>
      </n-icon>
      <n-tooltip placement="top" trigger="hover">
        <template #trigger>
          <span class="tag-item-span"> 首页 </span>
        </template>
        <span> 首页 </span>
      </n-tooltip>
    </div>
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
          <span class="tag-item-span"> {{ item.label }}</span>
        </template>
        <span> {{ item.label }} </span>
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
import ContextMenu from './contextmenu.vue';

interface ITags {
  id: string;
  type: number;
  label: string;
  name: string;
  path: string;
  fullPath: string;
  query: string;
  description: string;
}

onMounted(() => {
  window.addEventListener('click', () => {
    showRightMenuBox = false;
  });
});

let tagsList = $ref<ITags[]>([
  {
    id: '11',
    type: 1,
    label: '页面1',
    name: '123',
    path: '/index',
    fullPath: '',
    query: '',
    description: '页面1'
  },
  {
    id: '12',
    type: 1,
    label: '页面1看看大家的方式方法',
    name: 'age',
    path: '/index2',
    fullPath: '',
    query: '',
    description: '页面1'
  },
  {
    id: '13',
    type: 1,
    label: '页面133',
    name: 'bir',
    path: '/index3',
    fullPath: '',
    query: '',
    description: '页面1'
  },
  {
    id: '14',
    type: 1,
    label: '页面1',
    name: 'fdj',
    path: '/index4',
    fullPath: '',
    query: '',
    description: '页面1'
  },
  {
    id: '15',
    type: 1,
    label: '页面1',
    name: 'name',
    path: '/index5',
    fullPath: '',
    query: '',
    description: '页面1'
  }
]);

// 关闭按钮
const closeTagBtn = (tag: ITags) => {
  let i: number = tagsList.findIndex((item: ITags) => item.id === tag.id);
  tagsList.splice(i, 1);
};

// 当前活动路径
let currentActivePath = $ref<string>('/index');

// 点击标签
const clickTagViewBtn = (tag: ITags) => {
  currentActivePath = tag.path;
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
    margin: 5px 5px;
    margin-left: 0;
    width: 100px;
    height: 25px;
    line-height: 25px;
    font-size: 10px;
    border: 1px solid #d8dce5;
    border-radius: 3px;
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
        color: #ffa502;
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
