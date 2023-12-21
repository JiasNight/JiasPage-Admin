<template>
  <n-result status="404" title="404 资源不存在" description="生活总归带点荒谬">
    <template #footer>
      <n-button @click="gotoPage('/')">返回首页</n-button>
    </template>
  </n-result>
</template>

<script lang="ts" setup>
import { Ref, ComputedRef } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const gotoPage = (url: string) => {
  router.push(url);
};
</script>

<style lang="scss" scoped>
.screen-layout {
}
</style>
