<template>
  <div class="main-body">
    <router-view v-slot="{ Component, route }">
      <template v-if="Component">
        <Transition name="fade" mode="out-in">
          <KeepAlive :include="cachedTags" :max="10">
            <div
              v-if="!isReload"
              :key="route.path"
              class="body-view"
              :style="{
                height: headerHeight,
              }"
            >
              <component :is="Component" />
            </div>
          </KeepAlive>
        </Transition>
      </template>
    </router-view>
  </div>
</template>

<script lang="ts" setup>
import useAppStore from "@/store/module/app";
import useTagStore from "@/store/module/tag";
import useThemeStore from "@/store/module/theme";
import { useRouter } from "vue-router";

const router = useRouter();
const appStore = useAppStore();
const tagStore = useTagStore();
const themeStore = useThemeStore();

// 定义响应式数据
let headerHeight = $ref<string>("calc(100vh - 100px)");

// 计算属性
const headerShow: ComputedRef<boolean> = computed(() => themeStore.getHeaderShow);
const cachedTags: ComputedRef<Array<string>> = computed(() => tagStore.getCachedTags);
const isReload: ComputedRef<boolean> = computed(() => appStore.getReloadViews);
const tagPageShow: ComputedRef<boolean> = computed(() => themeStore.getTagPageShow);

// 监听
watch(
  () => router.currentRoute.value,
  (newRoute, oldRoute) => {
    appStore.setCurrentRoute(newRoute);
  },
  { immediate: true }
);

watch(headerShow, (nVal, oVal) => {
  if (nVal && tagPageShow.value) {
    headerHeight = "calc(100vh - 100px)";
  } else if (nVal && !tagPageShow.value) {
    headerHeight = "calc(100vh - 60px)";
  } else if (!nVal && tagPageShow.value) {
    headerHeight = "calc(100vh - 50px)";
  } else if (!nVal && !tagPageShow.value) {
    headerHeight = "calc(100vh)";
  }
});

watch(tagPageShow, (nVal, oVal) => {
  if (nVal && headerShow.value) {
    headerHeight = "calc(100vh - 100px)";
  } else if (nVal && !headerShow.value) {
    headerHeight = "calc(100vh - 50px)";
  } else if (!nVal && headerShow.value) {
    headerHeight = "calc(100vh - 60px)";
  } else if (!nVal && !headerShow.value) {
    headerHeight = "calc(100vh)";
  }
});
</script>

<style lang="scss" scoped>
.main-body {
  padding: 0.3125rem;
  min-height: 100vh;
  background-color: #f0fbff;

  .body-view {
    width: 100%;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.25s,
    transform 0.3s;
}

.fade-enter-from {
  opacity: 0;
  transform: translateX(50%);
}

.fade-leave-to {
  opacity: 0;
  transform: translateX(-10%);
}
</style>
