<template>
  <router-link class="chip-width" :to="{ path: '', query: '', fullPath: '' }">
    <v-icon icon="mdi-home"></v-icon>
    首页
  </router-link>
  <router-link
    v-for="(chip, index) in currentProps.chipsList"
    :key="index"
    class="chip-width"
    :to="{ path: chip.path, query: chip.query, fullPath: chip.fullPath }"
  >
    <v-icon icon="mdi-account"></v-icon>
    {{ chip.name }}
    <v-icon icon="mdi-close-circle"></v-icon>
  </router-link>
</template>

<script lang="ts" setup>
import { $ref } from 'vue/macros';
interface IChips {
  id: string;
  type: number;
  name: string;
  path: string;
  fullPath: string;
  query: string;
  description: string;
}

const currentProps = defineProps({
  chipsList: {
    type: Array<IChips>,
    default: () => [
      {
        id: 12,
        type: 1,
        name: '页面1',
        path: '页面1',
        fullPath: '',
        query: '',
        description: '页面1'
      },
      {
        id: 13,
        type: 1,
        name: '页面1看看大家的方式方法',
        path: '页面1fs的方式方法',
        fullPath: '',
        query: '',
        description: '页面1'
      },
      {
        id: 13,
        type: 1,
        name: '页面1',
        path: '页面1',
        fullPath: '',
        query: '',
        description: '页面1'
      },
      {
        id: 13,
        type: 1,
        name: '页面1',
        path: '页面1',
        fullPath: '',
        query: '',
        description: '页面1'
      },
      {
        id: 13,
        type: 1,
        name: '页面1',
        path: '页面1',
        fullPath: '',
        query: '',
        description: '页面1'
      }
    ]
  }
});
</script>

<style lang="scss" scoped>
.menu-label {
  color: #fff !important;
}
.chip-width {
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
  &.active {
    border-color: #42b983;
    color: #fff;
    background-color: #42b983;
    &::before {
      content: '';
      position: relative;
      display: inline-block;
      margin-right: 2px;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #fff;
    }
  }
}
</style>
