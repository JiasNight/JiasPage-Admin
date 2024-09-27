<template>
  <!-- 样式设置 -->
  <div class="q-pa-md">
    <div class="flex justify-center text-bold q-mb-md">
      <q-chip outline square color="primary" text-color="white" :icon="mdiDraw"> 主题设计 </q-chip>
    </div>
    <q-separator />
    <div class="theme-row">
      <div class="row-title">主题</div>
      <div class="row-content">
        <q-toggle
          v-model="appThemeData.darkMode"
          :icon="mdiThemeLightDark"
          keep-color
          @update:model-value="handleToggleDarkMode"
        />
      </div>
    </div>
    <div class="theme-row">
      <div class="row-title">主色</div>
      <div class="row-content">
        <q-btn
          v-for="(item, i) in sysDefaultThemeColor"
          :key="i"
          class="q-ma-xs"
          padding="3px"
          size="xs"
          :icon="appThemeData.color === item.color ? mdiSelectColor : null"
          text-color="white"
          :style="{
            background: item.color,
          }"
        >
          <q-tooltip anchor="top middle" self="center middle"> {{ item.key }} </q-tooltip>
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-color v-model="appThemeData.color" no-footer @update:model-value="handleSelectColor($event, item)" />
          </q-popup-proxy>
        </q-btn>
      </div>
    </div>
    <div class="theme-row">
      <div class="row-title">大小</div>
      <div class="row-content">
        <q-btn
          v-for="(item, i) in defaultSizeOptions"
          :key="i"
          class="q-ma-xs"
          padding="5px"
          :size="item.size"
          :icon="appThemeData.size === item.size ? mdiCheck : ''"
          text-color="white"
          :style="{
            background: appThemeData.color,
          }"
          @click="handleSelectSize(item.size)"
        >
          <q-tooltip anchor="top middle" self="center middle"> {{ item.label }} </q-tooltip>
        </q-btn>
      </div>
    </div>
    <div class="theme-row">
      <div class="row-title">样式</div>
      <div class="row-content">
        <div
          v-for="(item, i) in defaultStyleOptions"
          :key="i"
          class="q-ma-md c-p"
          :class="appThemeData.layout === item.key ? 'active-style' : ''"
          @click="handleSelectStyle(item.key)"
        >
          <q-img :src="item.img.href" fit="fill" width="50px" height="50px" />
        </div>
      </div>
    </div>
    <div class="theme-row">
      <div class="row-title">侧栏颜色</div>
      <div class="row-content">
        <q-btn
          class="q-ma-xs"
          padding="3px"
          size="xs"
          text-color="white"
          :style="{
            background: item.color,
          }"
        >
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-color v-model="appThemeData.siderWidth" />
          </q-popup-proxy>
        </q-btn>
      </div>
    </div>
    <div class="theme-row">
      <div class="row-title">侧栏宽度</div>
      <div class="row-content">
        <q-slider
          v-model="appThemeData.siderWidth"
          class="w-100 q-mr-sm"
          :min="100"
          :max="500"
          :inner-min="100"
          :inner-max="500"
          :step="50"
          color="primary"
          track-color="positive"
          inner-track-color="transparent"
          selection-color="primary"
          label
          label-always
          markers
          @update:model-value="handleSelectSiderWidth"
        />
      </div>
    </div>
    <div class="theme-row">
      <div class="row-title">头部</div>
      <div class="row-content">
        <q-toggle v-model="appThemeData.header" :icon="mdiDockTop" />
      </div>
    </div>
    <div class="theme-row">
      <div class="row-title">面包屑</div>
      <div class="row-content">
        <q-toggle v-model="appThemeData.breadcrumbs" :icon="mdiLink" />
      </div>
    </div>
    <div class="theme-row">
      <div class="row-title">标签页</div>
      <div class="row-content">
        <q-toggle v-model="appThemeData.tagPage" :icon="mdiTab" />
      </div>
    </div>
    <div class="theme-row">
      <div class="row-title">底部</div>
      <div class="row-content">
        <q-toggle v-model="appThemeData.footer" :icon="mdiDockBottom" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import useUserStore from "@/store/module/user";
import { useRouter } from "vue-router";
import useAppStore from "@/store/module/app";
import useThemeStore from "@/store/module/theme";
import {
  mdiChartBox,
  mdiCheck,
  mdiChevronRight,
  mdiDockBottom,
  mdiDockTop,
  mdiDraw,
  mdiLink,
  mdiSelectColor,
  mdiTab,
  mdiThemeLightDark,
} from "@quasar/extras/mdi-v6";
import { QSpinnerBars, QSpinnerGears, useQuasar } from "quasar";

// 静态资源请求
let getImg = (src: string) => {
  let url = new URL(src, import.meta.url);
  return url;
};

interface IThemeFormData {
  darkMode?: boolean;
  color?: string;
  size?: string;
  layout?: string;
  siderWidth?: number;
  header?: boolean;
  breadcrumbs?: boolean;
  tagPage?: boolean;
  footer?: boolean;
}

interface IThemeColor {
  color: string;
  label: string;
  key: string;
}

const $q = useQuasar();

const router = useRouter();

const appStore = useAppStore();
let userStore = useUserStore();
const themeStore = useThemeStore();

const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
});

// 定义响应式数据
let appThemeData = reactive<IThemeFormData>({
  darkMode: false,
  color: "#6e40c9",
  size: "md",
  layout: "",
  siderWidth: 250,
  header: true,
  breadcrumbs: true,
  tagPage: true,
  footer: true,
});

let defaultColorOptions = reactive<Array<any>>([]);

let defaultSizeOptions = reactive<Array<any>>([
  {
    size: "xs",
    label: "很小",
  },
  {
    size: "sm",
    label: "有点小",
  },
  {
    size: "md",
    label: "适中",
  },
  {
    size: "lg",
    label: "有点大",
  },
]);

let defaultStyleOptions = reactive<Array<any>>([
  {
    img: new URL("@/assets/images/theme/header-theme-dark.svg", import.meta.url),
    key: "dark",
    label: "很小",
  },
  {
    img: new URL("@/assets/images/theme/nav-horizontal-mix.svg", import.meta.url),
    key: "mix",
    label: "很小",
  },
  // {
  //   img: getImg('@/assets/images/theme/nav-horizontal.svg'),
  //   label: '很小'
  // },
  // {
  //   img: getImg('@/assets/images/theme/nav-theme-dark.svg'),
  //   label: '很小'
  // },
  // {
  //   img: getImg('@/assets/images/theme/nav-theme-light.svg'),
  //   label: '很小'
  // }
]);

// 计算属性
const darkMode: ComputedRef<boolean> = computed(() => themeStore.getDarkMode);
const sysDefaultThemeColor: ComputedRef<Array<IThemeColor>> = computed(() => themeStore.getThemeColor);

// 监听
watch(
  () => sysDefaultThemeColor,
  (nVal, oVal) => {
    defaultColorOptions = nVal.value;
  },
  {
    immediate: true,
    deep: true,
  }
);

// 传递给父组件的方法
const emit = defineEmits(["close"]);

// 开启loading
const showLoading = () => {
  $q.loading.show({
    message: "主题设置中...",
    spinner: QSpinnerBars,
    boxClass: "bg-grey-2 text-grey text-bold",
    spinnerColor: "primary",
    delay: 400,
  });
};

// 主题设置暗色模式
const handleToggleDarkMode = (value: boolean, evt: Event) => {
  themeStore.setDarkMode(value);
  showLoading();
  setTimeout(() => {
    $q.dark.set(value);
    $q.loading.hide();
  }, 1000);
};

// 主题色选择
const handleSelectColor = (evt: string, data: IThemeColor): void => {
  data.color = evt;
  // appThemeData.color = data.color;
  showLoading();
  setTimeout(() => {
    themeStore.setThemeColor(data);
    $q.loading.hide();
  }, 1000);
};

// 设置组件的大小
const handleSelectSize = (size: string): void => {
  appThemeData.size = size;
  console.log($q);
  showLoading();
  setTimeout(() => {
    console.log(size);
    // themeStore.setThemeColor(size);
    $q.loading.hide();
  }, 1000);
};

const handleSelectStyle = (style: string): void => {
  appThemeData.layout = style;
};

const handleSelectSiderWidth = (siderWidth: number): void => {
  console.log(siderWidth);
  appThemeData.siderWidth = siderWidth;
};
</script>

<style lang="scss" scoped>
.theme-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;

  .row-title {
    text-wrap: nowrap;
    margin-right: 10px;
  }

  .row-content {
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    .active-style {
      position: relative;

      &::after {
        position: absolute;
        bottom: -5px;
        left: 50%;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: $primary;
        transition: 0.5s;
        content: "";
        transform: translateX(-50%);
      }
    }
  }
}
</style>
