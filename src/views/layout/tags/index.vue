<template>
  <router-link class="tag-width" :to="{ path: '/', query: '', fullPath: '' }">
    <v-icon icon="mdi-home"></v-icon>
    首页
  </router-link>
  <router-link
    v-for="(item, index) in tagsList"
    :key="index"
    class="tag-width"
    :to="{ path: item.path, query: item.query, fullPath: item.fullPath }"
    @contextmenu.prevent="rightClickBtn(item, $event)"
  >
    <v-icon icon="mdi-account"></v-icon>
    <v-tooltip :text="item.name" location="top">
      <template #activator="{ props }">
        <span class="tag-item-span" v-bind="props"> {{ item.name }}</span>
      </template>
    </v-tooltip>
    <v-icon class="tag-item-end-icon" icon="mdi-close-circle" @click.prevent.stop="closeTagBtn(item)"></v-icon>
  </router-link>
</template>

<script lang="ts" setup>
import { $ref } from 'vue/macros';
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
// 右键按钮
const rightClickBtn = (tag: ITags, e) => {
  console.log(tag);
  console.log(e);
};
</script>

<style lang="scss" scoped>
.tag-width {
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin: 5px 5px;
  padding: 0 5px;
  height: 30px;
  line-height: 30px;
  font-size: 12px;
  cursor: pointer;
  border: 1px solid #d8dce5;
  color: #495060;
  background: #fff;
  .tag-item-span {
    display: block;
    overflow: hidden;
    width: 60px;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .tag-item-end-icon {
    color: #bdc3c7;
    &:hover {
      color: #d35400;
    }
  }
}
</style>
