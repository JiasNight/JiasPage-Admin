<template>
  <div class="logo-wrapper" :style="{ width: siderWidth }" @click="$router.push('/index')">
    <img
      v-if="logoShow"
      class="logo-img"
      src="@/assets/images/logo.png"
      alt="logo"
      :style="{ height: headerHeight + 'px' }"
    />
    <span
      v-if="!collapsedValue"
      class="logo-text"
      :style="{
        lineHeight: headerHeight + 'px',
      }"
    >
      PAGE
    </span>
  </div>
</template>

<script lang="ts" setup>
import useAppStore from "@/store/module/app";
import useThemeStore from "@/store/module/theme";

const appStore = useAppStore();
const themeStore = useThemeStore();

// 响应式
let siderWidth = $ref<string>("");

// 计算属性
const collapsedValue: ComputedRef<boolean> = computed(() => appStore.getCollapsedSider);
const siderBarWidth: ComputedRef<number> = computed(() => themeStore.getSiderWidth);
const headerHeight: ComputedRef<string> = computed(() => themeStore.getHeaderHeight);
const logoShow: ComputedRef<boolean> = computed(() => themeStore.getLogoShow);

// 监听
watch(collapsedValue, (nVal, oVal) => {
  if (nVal) {
    siderWidth = "50px";
  } else {
    siderWidth = siderBarWidth.value + "px";
  }
});
watch(siderBarWidth, (nVal, oVal) => {
  siderWidth = nVal + "px";
});

// 加载之前
onBeforeMount(() => {
  siderWidth = siderBarWidth.value + "px";
});
</script>

<style lang="scss" scoped>
.logo-wrapper {
  display: flex;
  align-items: center;

  .logo-text {
    font-size: 1.875rem;
    font-weight: 600;
    color: #f3ecff;
  }
}
</style>
