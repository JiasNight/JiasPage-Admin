<template>
  <div class="error-container">
    <div class="container-svg"></div>
    <n-result status="info" title="找不到组件路径" description="该不会没有吧！">
      <template #icon>
        <n-icon :size="100" color="#ff7f50">
          <icon-mdi:emoticon-sick></icon-mdi:emoticon-sick>
        </n-icon>
      </template>
      <template #footer>
        <n-button @click="gotoPage('/')">返回首页</n-button>
      </template>
    </n-result>
  </div>
</template>

<script lang="ts" setup>
import { Ref, ComputedRef } from "vue";
import { useRouter } from "vue-router";

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
    background: url("@/assets/svg/error/notFound.svg") no-repeat;
    background-size: contain;
    margin: 0 auto;
  }
}
</style>
