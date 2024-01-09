<template>
  <div class="error-container">
    <div class="container-svg"></div>
    <n-result status="500" title="服务器错误" description="生活总归带点荒谬">
      <template #footer>
        <n-button @click="gotoPage('/')">返回首页</n-button>
      </template>
    </n-result>
  </div>
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
.error-container {
  margin-top: 6.25rem;
  .container-svg {
    width: 31.25rem;
    height: 25rem;
    background: url('@/assets/svg/error/500.svg') no-repeat;
    background-size: contain;
    margin: 0 auto;
  }
}
</style>
