<template>logo</template>

<script lang="ts" setup>
const props = defineProps({
  collapsed: {
    // 侧边栏菜单是否收起
    type: Boolean,
    default: true
  }
});

watch(
  () => props.collapsed,
  (newValue: boolean, oldValue: boolean) => {
    console.log(newValue);
  },
  { deep: true }
);
</script>

<style lang="scss" scoped>
.box-logo {
  height: 50px;
  color: #f1f3f5;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  line-height: 50px;
  overflow: hidden;
  white-space: nowrap;
  border-bottom: 1px dashed #fff;
  padding-bottom: 10px;
  img {
    height: 60px;
  }
  .logo-title {
    text-align: center;
    font-size: 20px;
    font-weight: 900;
  }
}
</style>
