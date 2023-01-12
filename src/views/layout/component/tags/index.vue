<template>
  <div class="content-tags">
    <router-link class="tag-width" :to="{ path: '/' }">
      <n-icon size="20">
        <HomeFilled></HomeFilled>
      </n-icon>
      <n-tooltip placement="top" trigger="hover">
        <template #trigger>
          <span class="tag-item-span"> 首页 </span>
        </template>
        <span> 首页 </span>
      </n-tooltip>
    </router-link>
    <router-link
      v-for="(item, index) in tagsList"
      :key="index"
      class="tag-width"
      :to="{ path: item.path }"
      @contextmenu.prevent="rightClickBtn(item, $event)"
    >
      <n-icon size="20">
        <MenuFilled></MenuFilled>
      </n-icon>
      <n-tooltip placement="top" trigger="hover">
        <template #trigger>
          <span class="tag-item-span"> {{ item.name }}</span>
        </template>
        <span> {{ item.name }} </span>
      </n-tooltip>
      <n-icon class="tag-item-end-icon" size="20" @click.prevent.stop="closeTagBtn(item)">
        <CloseRound></CloseRound>
      </n-icon>
    </router-link>
    <!-- 右键菜单内容 -->
    <div v-show="showRightMenuBox" class="right-menu-box" :style="rightStyle">
      <div>复制</div>
      <div>粘贴</div>
      <div>剪切</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { $ref } from 'vue/macros';
import { HomeFilled, MenuFilled, CloseRound } from '@vicons/material';
interface ITags {
  id: string;
  type: number;
  name: string;
  path: string;
  fullPath: string;
  query: string;
  description: string;
}

let tagsList = $ref<ITags[]>([
  {
    id: '11',
    type: 1,
    name: '页面1',
    path: '页面1',
    fullPath: '',
    query: '',
    description: '页面1'
  },
  {
    id: '12',
    type: 1,
    name: '页面1看看大家的方式方法',
    path: '页面1fs的方式方法',
    fullPath: '',
    query: '',
    description: '页面1'
  },
  {
    id: '13',
    type: 1,
    name: '页面1',
    path: '页面1',
    fullPath: '',
    query: '',
    description: '页面1'
  },
  {
    id: '14',
    type: 1,
    name: '页面1',
    path: '页面1',
    fullPath: '',
    query: '',
    description: '页面1'
  },
  {
    id: '15',
    type: 1,
    name: '页面1',
    path: '页面1',
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

// 右键菜单位置
let rightStyle: any = $ref({});
// 是否显示右键菜单
let showRightMenuBox = $ref<boolean>(false);

// 右键按钮
const rightClickBtn = (tag: ITags, e: any) => {
  console.log(tag);
  console.log(e);
  showRightMenuBox = true;
  rightStyle.left = e.clientX;
  rightStyle.top = e.clientY;
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
    margin: 5px 10px;
    margin-left: 0;
    width: 100px;
    height: 28px;
    line-height: 28px;
    font-size: 10px;
    border: 1px solid #d8dce5;
    border-radius: 2px;
    cursor: pointer;
    color: #495060;
    background: #fff;
    &:hover {
      border: 1px solid #9b59b6;
      color: #9b59b6;
    }
    .tag-item-span {
      display: block;
      overflow: hidden;
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
  .right-menu-box {
    position: fixed;
    z-index: 99 !important;
    width: 80px;
    height: 100px;
    border: 1px solid #e8eaed;
    background-color: #fff;
    box-shadow: 2px 2px 2px #e8eaed;
    cursor: pointer;
  }
}
</style>
