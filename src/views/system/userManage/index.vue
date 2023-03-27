<template>
  <n-grid cols="2" item-responsive>
    <n-grid-item span="0 400:1 600:2 800:3">
      <div class="light-green">
        0～400px：不显示<br>
        400～600px：占据空间 1<br>
        600～800px：占据空间 2<br>
        800px 以上：占据空间 3
      </div>
    </n-grid-item>
    <n-grid-item>
      <div class="green">
        2
      </div>
    </n-grid-item>
  </n-grid>
</template>

<script lang="ts" setup>
import { Ref, ComputedRef } from 'vue';
</script>

<style lang="scss" scoped>
.screen-layout {
}
</style>
