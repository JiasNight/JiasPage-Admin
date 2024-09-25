import { defineStore } from "pinia";

type IThemeState = {
  darkMode: boolean;
  themeColor: string;
  language: string;
  loading: boolean;
  progress: number | null;
  message: string | null;
  screenLocked: boolean;
};

const useThemeStore = defineStore({
  id: "theme",
  state: (): IThemeState => ({
    // 暗黑模式
    darkMode: window.matchMedia("(prefers-color-scheme: dark)").matches,
    // 主题颜色
    themeColor: "#409EFF",
    // 语言
    language: (window.navigator.languages && window.navigator.languages[0]) || window.navigator.language,
    loading: false,
    progress: null,
    message: null,
    // 是否锁屏
    screenLocked: false,
  }),
  getters: {
    getDarkMode: (state) => state.darkMode,
    getThemeColor: (state) => state.themeColor,
    getLanguage: (state) => state.language,
    getLoading(state): boolean {
      return state.loading;
    },
    getProgress(state): number | null {
      state.loading = true;
      return state.progress;
    },
    getMessage(state): string | null {
      return state.message;
    },
  },
  actions: {
    setDarkMode(darkMode: boolean) {
      this.darkMode = darkMode;
    },
    setThemeColor(themeColor: string) {
      this.themeColor = themeColor;
    },
    setLoading(display: boolean) {
      this.loading = display;
    },
    // 语言切换
    setLanguage(language: string) {
      this.language = language;
      localStorage.setItem("language", language);
    },
    setProgress(progress: number | null) {
      this.progress = progress;
      this.loading = true;
    },
    setMessage(message: string) {
      this.message = message;
    },
  },
});

export default useThemeStore;
