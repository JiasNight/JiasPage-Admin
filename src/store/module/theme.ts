import { defineStore } from "pinia";
import { setCssVar, Dark } from "quasar";
import { IThemeState, IThemeColor } from "@/interface/common";

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
    // darkMode: window.matchMedia("(prefers-color-scheme: dark)").matches,
    darkMode: false,
    // 主题颜色
    themeColor: sysDefaultThemeColor,
    // 侧栏是否有顶部
    siderHasHeader: false,
    // 侧栏位置
    siderPosition: "left",
    // 侧栏宽度
    siderWidth: 200,
    // 侧栏颜色
    siderBgColor: "#6e40c9",
    // 头部是否显示
    headerShow: true,
    // 头部背景颜色
    headerBgColor: "#23272f",
    // 头部高度
    headerHeight: 50,
    // logo是否显示
    logoShow: true,
    // 面包屑显示
    breadcrumbsShow: true,
    // 标签页显示
    tagPageShow: true,
  }),
  getters: {
    getDarkMode: (state) => state.darkMode,
    getThemeColor: (state) => state.themeColor,
    getSiderHasHeader: (state) => state.siderHasHeader,
    getSiderPosition: (state) => state.siderPosition,
    getSiderWidth: (state) => state.siderWidth,
    getSiderBgColor: (state) => state.siderBgColor,
    getHeaderShow: (state) => state.headerShow,
    getHeaderBgColor: (state) => state.headerBgColor,
    getHeaderHeight: (state) => state.headerHeight,
    getLogoShow: (state) => state.logoShow,
    getBreadcrumbsShow: (state) => state.breadcrumbsShow,
    getTagPageShow: (state) => state.tagPageShow,
  },
  actions: {
    setDarkMode(darkMode: boolean) {
      this.darkMode = darkMode;
      Dark.set(darkMode);
    },
    setThemeColor(data: IThemeColor) {
      this.themeColor.forEach((item: IThemeColor) => {
        if (item.key === data.key) {
          item.color = data.color;
          setCssVar(data.key, data.color);
        }
      });
    },
    setSiderHasHeader(hasHeader: boolean) {
      this.siderHasHeader = hasHeader;
    },
    setSiderPosition(position: string) {
      this.siderPosition = position;
    },
    setSiderWidth(width: number) {
      this.siderWidth = width;
    },
    setSiderBgColor(color: string) {
      this.siderBgColor = color;
    },
    setHeaderShow(display: boolean) {
      this.headerShow = display;
    },
    setHeaderBgColor(color: string) {
      this.headerBgColor = color;
    },
    setHeaderHeight(height: number) {
      this.headerHeight = height;
    },
    setLogoShow(display: boolean) {
      this.logoShow = display;
    },
    setBreadcrumbsShow(show: boolean) {
      this.breadcrumbsShow = show;
    },
    setTagPageShow(show: boolean) {
      this.tagPageShow = show;
    },
  },
});

export default useThemeStore;
