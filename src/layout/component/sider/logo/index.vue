<template>
  <router-link to="/index">
    <img src="@/assets/images/logo.png" alt="logo">
    <h2 v-show="!collapsed">
      PAGE
    </h2>
  </router-link>

</template>

<script lang="ts" setup>
const props = defineProps({
  collapsed: {
    // 侧边栏菜单是否收起
    type: Boolean,
    default: true
  }
});

// watch(
//   () => props.collapsed,
//   (newValue: boolean, oldValue: boolean) => {
//     console.log(newValue);
//   },
//   { deep: true }
// );
</script>

<style lang="scss" scoped>
img {
  display: inline-block;
  width: 100px;
}
h2 {
  display: inline-block;
  color: #F3ECFF;
}
</style>
