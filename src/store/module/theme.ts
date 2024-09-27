import { defineStore } from "pinia";
import { setCssVar } from "quasar";

interface IThemeColor {
  color: string;
  label: string;
  key: string;
}

type IThemeState = {
  darkMode: boolean;
  themeColor: Array<IThemeColor>;
  language: string;
  loading: boolean;
  progress: number | null;
  message: string | null;
  screenLocked: boolean;
};

// 默认主题颜色
const sysDefaultThemeColor = [
  {
    label: "默认",
    key: "primary",
    color: "#6e40c9",
  },
  {
    label: "默认",
    key: "secondary",
    color: "#31ccec",
  },
  {
    label: "默认",
    key: "accent",
    color: "#00a8ff",
  },
  {
    label: "默认",
    key: "positive",
    color: "#2ed573",
  },
  {
    label: "默认",
    key: "negative",
    color: "#eb2f06",
  },
  {
    label: "默认",
    key: "info",
    color: "#00d2d3",
  },
  {
    label: "默认",
    key: "warning",
    color: "#fc9607",
  },
  {
    label: "默认",
    key: "dark",
    color: "#1d1d1d",
  },
];

const useThemeStore = defineStore({
  id: "theme",
  state: (): IThemeState => ({
    // 暗黑模式
    darkMode: window.matchMedia("(prefers-color-scheme: dark)").matches,
    // 主题颜色
    themeColor: sysDefaultThemeColor,
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
    setThemeColor(data: IThemeColor) {
      this.themeColor.forEach((item) => {
        if (item.key === data.key) {
          item.color = data.color;
          setCssVar(data.key, data.color);
        }
      });
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
