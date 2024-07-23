<template>
  <!-- 样式设置 -->
  <q-drawer v-model="drawerOpen" class="q-pa-md" :width="250" :mini-width="200" overlay elevated side="right" bordered>
    <!-- 菜单 -->
    <h5 class="text-center text-bold text-dark q-mb-md">主题设计</h5>
    <q-separator />
    <div class="theme-row">
      <div class="row-title">主题</div>
      <div class="row-content">
        <q-toggle v-model="appThemeData.model" :icon="mdiThemeLightDark" />
      </div>
    </div>
    <div class="theme-row">
      <div class="row-title">颜色</div>
      <div class="row-content">
        <q-btn
          v-for="(item, i) in defaultColorOptions"
          :key="i"
          class="q-ma-xs"
          padding="3px"
          size="xs"
          :icon="appThemeData.color === item.color ? mdiCheck : ''"
          text-color="white"
          :style="{
            background: item.color
          }"
          @click="handleSelectColor(item.color)"
        >
          <q-tooltip anchor="top middle" self="center middle"> {{ item.label }} </q-tooltip>
          <q-popup-edit v-if="item.key === 'custom'" v-slot="scope" v-model="item.color" auto-save>
            <q-color v-model="scope.value" />
          </q-popup-edit>
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
            background: appThemeData.color
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
      <div class="row-title">侧栏宽度</div>
      <div class="row-content">
        <q-input v-model="appThemeData.siderWidth" type="number"></q-input>
      </div>
    </div>
    <div class="theme-row">
      <div class="row-title">头部</div>
      <div class="row-content">
        <q-toggle v-model="appThemeData.model" :icon="mdiDockTop" />
      </div>
    </div>
    <div class="theme-row">
      <div class="row-title">面包屑</div>
      <div class="row-content">
        <q-toggle v-model="appThemeData.model" :icon="mdiLink" />
      </div>
    </div>
    <div class="theme-row">
      <div class="row-title">标签页</div>
      <div class="row-content">
        <q-toggle v-model="appThemeData.model" :icon="mdiTab" />
      </div>
    </div>
    <div class="theme-row">
      <div class="row-title">底部</div>
      <div class="row-content">
        <q-toggle v-model="appThemeData.model" :icon="mdiDockBottom" />
      </div>
    </div>
  </q-drawer>
</template>

<script lang="ts" setup>
import useUserStore from '@/store/module/user';
import { useRouter } from 'vue-router';
import {
  mdiChartBox,
  mdiCheck,
  mdiDockBottom,
  mdiDockTop,
  mdiLink,
  mdiTab,
  mdiThemeLightDark
} from '@quasar/extras/mdi-v6';

const router = useRouter();

interface IThemeFormData {
  model?: boolean;
  color?: string;
  size?: string;
  siderWidth?: number;
  layout?: string;
}

// 静态资源请求
let getImg = (src: string) => {
  let url = new URL(src, import.meta.url);
  console.log(url);
  return url;
};

let userStore = useUserStore();

const props = defineProps({
  open: {
    type: Boolean,
    default: false
  }
});

const emits = defineEmits(['close']);

// 定义响应式数据
let appThemeData = reactive<IThemeFormData>({
  model: true,
  color: '#6e40c9',
  size: 'md',
  siderWidth: 250,
  layout: ''
});

let defaultColorOptions = reactive<Array<any>>([
  {
    color: '#2177b8',
    key: '#2177b8',
    label: '虹蓝'
  },
  {
    color: '#12a182',
    key: '#12a182',
    label: '蓝绿'
  },
  {
    color: '#10aec2',
    key: '#10aec2',
    label: '甸子蓝'
  },
  {
    color: '#ee2c79',
    key: '#ee2c79',
    label: '紫荆红'
  },
  {
    color: '#815c94',
    key: '#815c94',
    label: '蕈紫'
  },
  {
    color: '#fff',
    key: 'custom',
    label: '自定义'
  }
]);

let defaultSizeOptions = reactive<Array<any>>([
  {
    size: 'xs',
    label: '很小'
  },
  {
    size: 'sm',
    label: '有点小'
  },
  {
    size: 'md',
    label: '适中'
  },
  {
    size: 'lg',
    label: '有点大'
  },
  {
    size: 'xl',
    label: '很大'
  }
]);

let defaultStyleOptions = reactive<Array<any>>([
  {
    img: new URL('@/assets/images/theme/header-theme-dark.svg', import.meta.url),
    key: 'dark',
    label: '很小'
  },
  {
    img: new URL('@/assets/images/theme/nav-horizontal-mix.svg', import.meta.url),
    key: 'mix',
    label: '很小'
  }
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
// 抽屉是否打开
const drawerOpen: ComputedRef<boolean> = computed(() => props.open);
// let drawerOpen = $ref<Boolean>(true);

// 关闭主题设置的抽屉
const cancelDrawerBtn = () => {
  emits('close');
};

const handleSelectColor = (color: string): void => {
  appThemeData.color = color;
};

const handleSelectSize = (size: string): void => {
  appThemeData.size = size;
};

const handleSelectStyle = (style: string): void => {
  appThemeData.layout = style;
};
</script>

<style lang="scss" scoped>
.theme-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
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
        content: '';
        width: 8px;
        height: 8px;
        position: absolute;
        bottom: -5px;
        left: 50%;
        transform: translateX(-50%);
        background: $primary;
        border-radius: 50%;
        transition: 0.5s;
      }
    }
  }
}
</style>
