<template>
  <div class="content-tags">
    <q-btn class="tags-arrow" flat color="primary" :icon="mdiChevronDoubleLeft" @click="clickScrollLeftBtn" />
    <div ref="tagScroll" class="tags-wrap">
      <div
        v-for="(item, index) in tagsList"
        :key="index"
        class="tag-item"
        :class="tagStore.getActiveTag === item.path ? 'tag-active' : ''"
        @click="clickTagViewBtn(item)"
        @contextmenu.prevent="rightClickTagBtn(item, $event)"
      >
        <q-icon size="xs" class="q-ml-xs">
          <MdiIcon color="primary" :icon="item.meta.icon"></MdiIcon>
        </q-icon>
        <span class="tag-item-span">
          {{ item.meta.title }}
          <q-tooltip anchor="top middle" self="center middle"> {{ item.meta.title }} </q-tooltip>
        </span>
        <q-icon
          class="tag-item-end-icon"
          :name="mdiWindowClose"
          color="primary"
          size="xs"
          @click.prevent.stop="closeTagBtn(item)"
        />
      </div>
    </div>
    <q-btn class="tags-arrow" flat color="primary" :icon="mdiChevronDoubleRight" @click="clickScrollRightBtn" />
    <!-- 右键菜单内容 -->
    <ContextMenu
      :show="showRightMenuBox"
      :left="rightMenuX"
      :top="rightMenuY"
      :current-path="currentContextClickPath"
    ></ContextMenu>
  </div>
</template>

<script lang="ts" setup>
import ContextMenu from "./contextmenu.vue";
import useTagStore from "@/store/module/tag";
import { useRouter } from "vue-router";
import MdiIcon from "@/components/MdiIcon/MdiIcon.vue";
import { mdiChevronDoubleLeft, mdiChevronDoubleRight, mdiWindowClose } from "@quasar/extras/mdi-v6";

const router = useRouter();

// 扩展ITags的属性
type ITags = {
  path: string;
  name: string;
  key?: string;
  disabled?: boolean;
  icon?: string;
  show?: boolean;
};

const tagStore = useTagStore();

// 定义响应式数据
let tagScroll = $ref<HTMLElement>();

// 计算属性
const tagsList: ComputedRef<Array<any>> = computed(() => tagStore.getVisitedTags);

// 当前活动路径
// let currentActivePath = $ref<string>(tagStore.getActiveTag);

// 监听
watch(
  () => tagsList,
  (newRoute, oldRoute) => {
    console.log(newRoute);
  },
  { immediate: true }
);

// 关闭按钮
const closeTagBtn = (tag: ITags) => {
  let i: number = tagsList.value.findIndex((item: ITags) => item.path === tag.path);
  tagsList.value.splice(i, 1);
};

// 点击标签
const clickTagViewBtn = (tag: ITags) => {
  localStorage.setItem("activeTag", tag.name as string);
  router.push(tag.path);
};

// 是否显示右键菜单
let showRightMenuBox = $ref<boolean>(false);
// 右键菜单位置
let rightMenuX = $ref<number>(0);
let rightMenuY = $ref<number>(0);
let currentContextClickPath = $ref<string>("");

// 右键按钮
const rightClickTagBtn = (tag: ITags, e: any) => {
  showRightMenuBox = true;
  rightMenuX = e.pageX;
  rightMenuY = e.pageY;
  currentContextClickPath = tag.path;
};

/**
 * 缓动动画封装
 * @param ele
 * @param target
 */
function scrollMoveAnimate(ele: HTMLElement, target: number) {
  // 要用定时器，先清定时器
  // 一个萝卜一个坑儿，一个元素对应一个定时器
  let timer: any = null;
  clearInterval(timer);
  let start = 0;
  // 定义定时器
  timer = setInterval(() => {
    // 获取步长
    // 步长应该是越来越小的，缓动的算法。
    let step = target / 10;
    // 对步长进行二次加工(大于0向上取整,小于0向下取整)
    // 达到的效果是：最后10像素的时候都是1像素1像素的向目标位置移动，就能够到达指定位置。
    step = step > 0 ? Math.ceil(step) : Math.floor(step);
    // 动画原理： 目标位置 = 当前位置 + 步长
    ele.scrollLeft = ele.scrollLeft + step;
    start += step;
    // 检测缓动动画有没有停止
    if (start === target) {
      clearInterval(timer);
    }
  }, 30);
}

// 滚动条左边按钮点击
const clickScrollLeftBtn = (e: Event) => {
  if (tagScroll && tagScroll.scrollLeft >= 0) {
    scrollMoveAnimate(tagScroll, -50);
  }
};

// 滚动条右边按钮点击
const clickScrollRightBtn = (e: Event) => {
  if (tagScroll && tagScroll.scrollLeft >= 0) {
    scrollMoveAnimate(tagScroll, 50);
  }
};

// 加载之后
onMounted(() => {
  window.addEventListener("click", () => {
    showRightMenuBox = false;
  });
});
</script>

<style lang="scss" scoped>
.content-tags {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border-bottom: 1px solid #e8eaed;
  box-shadow: 0 2px 2px #e8eaed;

  .tags-arrow {
    padding: 0 0.3125rem;

    &:hover {
      background-color: #f7f8fa;
    }

    &:first-of-type {
      box-shadow: 2px 0 2px #e8eaed;
    }

    &:last-of-type {
      box-shadow: 0 0 2px #e8eaed;
    }
  }

  .tags-wrap {
    display: flex;
    overflow: hidden;
    padding: 0 0.3125rem;
    width: 100%;
    border-radius: 0.125rem;

    .tag-item {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-around;
      align-items: center;
      margin: 0.3125rem 0;
      margin-left: 0.3125rem;
      width: 6.25rem;
      height: 1.5625rem;
      line-height: 1.5625rem;
      font-size: 0.75rem;
      border: 1px solid #d8dce5;
      border-radius: 0.125rem;
      cursor: pointer;
      color: #495060;
      background: #fff;

      .tag-item-span {
        display: inline-block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .tag-item-end-icon {
        color: #8c8e91;

        &:hover {
          border-radius: 50%;
          color: #ffa502;
          background-color: #d1d1d1ad;
        }
      }
    }

    .tag-active {
      background-color: #45e3ff;
    }

    // 定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸
    &::-webkit-scrollbar {
      width: 10px;
      height: 10px;
      background-color: #f5f5f5;
    }

    // 定义滚动条轨道 内阴影+圆角
    &::-webkit-scrollbar-track {
      border-radius: 10px;
      background-color: #f5f5f5;
      box-shadow: inset 0 0 6px rgb(0 0 0 / 30%);
    }

    // 定义滑块 内阴影+圆角
    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background-image: linear-gradient(90deg, #5b247a, #1bcedf);
      box-shadow: inset 0 0 6px rgb(0 0 0 / 30%);
    }
  }

  .right-menu-box {
    position: absolute;
    width: 100px;
    height: 135px;
    border: 1px solid #e8eaed;
    border-radius: 2px;
    background-color: #fff;
    box-shadow: 2px 2px 2px #b7b7bd;
    cursor: pointer;

    .box-btn {
      margin: 0 5px;
      width: 90%;
    }

    p {
      margin-left: 1px;
      padding-left: 10px;
      text-justify: middle;

      &:hover {
        color: #f9f7fa;
        background-color: #b7b7bd;
      }
    }
  }

  // 进入之前和离开后的样式
  .right-menu-enter-from,
  .right-menu-leave-to {
    opacity: 0;
  }

  // 离开和进入过程中的样式
  .right-menu-enter-active,
  .right-menu-leave-active {
    // 添加过渡动画
    transition: opacity 0.5s ease;
  }

  // 进入之后和离开之前的样式
  .right-menu-enter-to,
  .right-menu-leave-from {
    opacity: 1;
  }
}
</style>
