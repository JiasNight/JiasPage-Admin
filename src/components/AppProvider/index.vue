<template>
  <n-loading-bar-provider>
    <n-dialog-provider>
      <n-notification-provider>
        <n-message-provider>
          <slot name="default"></slot>
          <NaiveProviderContent />
        </n-message-provider>
      </n-notification-provider>
    </n-dialog-provider>
  </n-loading-bar-provider>
</template>

<script lang="ts" setup>
// import { ComputedRef } from 'vue';
// import { darkTheme, dateZhCN, zhCN } from 'naive-ui';
// import type { GlobalTheme, NLocale, NDateLocale } from 'naive-ui';
// import useAppStore from '@/store/module/app';
// import useGlobalStore from '@/store/module/global';

// let currentTheme: ComputedRef<GlobalTheme | null> = computed(() => (useAppStore().getTheme ? darkTheme : null));
// let currentLanguage: ComputedRef<NLocale | null> = computed(() => (useAppStore().getLanguage ? zhCN : null));
// let currentDateLocale: ComputedRef<NDateLocale | null> = computed(() => dateZhCN);
// 挂载naive组件的方法至window, 以便在全局使用
function setupNaiveTools() {
  window.$loadingBar = useLoadingBar();
  window.$dialog = useDialog();
  window.$message = useMessage();
  window.$notification = useNotification();
}

const NaiveProviderContent = defineComponent({
  setup() {
    setupNaiveTools();
  },
  render() {
    return h('div');
  }
});
</script>
