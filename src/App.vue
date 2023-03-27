<template>
  <n-config-provider :theme="currentTheme" :locale="currentLanguage" :date-locale="currentDateLocale">
    <n-dialog-provider>
      <n-notification-provider>
        <n-message-provider>
          <n-loading-bar-provider>
            <!-- <NaiveProviderContent></NaiveProviderContent> -->
            <router-view></router-view>
          </n-loading-bar-provider>
        </n-message-provider>
      </n-notification-provider>
    </n-dialog-provider>
  </n-config-provider>
</template>

<script lang="ts" setup>
import { ComputedRef } from 'vue';
import {
  darkTheme,
  NConfigProvider,
  createDiscreteApi,
  NDialogProvider,
  NLoadingBarProvider,
  NMessageProvider,
  NNotificationProvider,
  useMessage,
  useDialog,
  useLoadingBar,
  useNotification,
  dateZhCN,
  zhCN
} from 'naive-ui';
import type { GlobalTheme, NLocale, NDateLocale } from 'naive-ui';
import appStore from '@/store/module/app';

const useAppStore = appStore();
let currentTheme: ComputedRef<GlobalTheme | null> = computed(() => (useAppStore.getTheme ? darkTheme : null));
let currentLanguage: ComputedRef<NLocale | null> = computed(() => (useAppStore.getLanguage ? zhCN : null));
let currentDateLocale: ComputedRef<NDateLocale | null> = computed(() => dateZhCN);

// 挂载naive组件的方法至window, 以便在全局使用
// function setupNaiveTools() {
//   window.$loadingBar = useLoadingBar();
//   window.$notification = useNotification();

//   window.$message = setupMessage(useMessage());
//   window.$dialog = setupDialog(useDialog());
// }

const NaiveProviderContent = defineComponent({
  setup() {
    // setupNaiveTools();
  },
  render() {
    return h('div');
  }
});
</script>

<style>
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100vh;
}
</style>
