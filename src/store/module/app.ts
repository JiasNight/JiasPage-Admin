import { defineStore } from 'pinia';

type IAppState = {
  theme: boolean;
  language: string;
  pageLoading: boolean;
  pageKeys: object;
};

export default defineStore({
  id: 'app', // id必填，且需要唯一
  state: (): IAppState => ({
    // theme: window.matchMedia('(prefers-color-scheme: dark)').matches,
    theme: false,
    language: (window.navigator.languages && window.navigator.languages[0]) || window.navigator.language,
    pageLoading: false,
    pageKeys: {}
  }),
  getters: {
    getTheme(state): boolean {
      return state.theme;
    },
    getLanguage(state): string {
      return state.language;
    }
  },
  actions: {
    // 重新加载页面
    async reloadPage() {
      // $loadingBar.start();
      this.pageLoading = false;
      await nextTick();
      this.pageLoading = true;

      setTimeout(() => {
        document.documentElement.scrollTo({ left: 0, top: 0 });
        // $loadingBar.finish();
      }, 100);
    },
    // 模式切换
    setTheme() {
      this.theme = !this.theme;
    },
    // 语言切换
    setLanguage(language: string) {
      this.language = language;
      localStorage.setItem('language', language);
    }
  }
});
