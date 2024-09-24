import { defineStore } from "pinia";

type IGlobalState = {
  darkMode: boolean;
  language: string;
  loading: boolean;
  progress: number | null;
  message: string | null;
  screenLocked: boolean;
};

const useGlobalStore = defineStore({
  id: "theme",
  state: (): IGlobalState => ({
    // 暗黑模式
    darkMode: window.matchMedia("(prefers-color-scheme: dark)").matches,
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

export default useGlobalStore;
