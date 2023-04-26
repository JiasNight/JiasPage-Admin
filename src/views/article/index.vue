<template>
  <div>
    <MdEditor
      toolbarsExclude="['link', 'mermaid', 'katex', 'github']"
      v-model="mdText"
      @on-save="saveMdTextBtn"
    ></MdEditor>
  </div>
</template>

<script lang="ts" setup>
import { Ref, ComputedRef } from 'vue';
import { TreeOption, FormInst, DataTableColumns } from 'naive-ui';
import { SearchRound, AutorenewRound, Battery50Round, AcUnitRound } from '@vicons/material';
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

let mdText = $ref<string>('');

// 重置查询内容
const saveMdTextBtn = (e: string) => {
  console.log(e);
};
</script>

<style lang="scss" scoped>
.screen-layout {
}
</style>
