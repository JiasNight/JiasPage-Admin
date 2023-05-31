<template>
  <n-result status="500" title="服务器错误" description="生活总归带点荒谬">
    <template #footer>
      <n-button @click="gotoPage('/')">返回首页</n-button>
    </template>
  </n-result>
</template>

<script lang="ts" setup>
import { Ref, ComputedRef } from 'vue';
import router from '@/router';

const gotoPage = (url: string) => {
  router.push(url);
};
</script>

<style lang="scss" scoped>
.screen-layout {
}
</style>
