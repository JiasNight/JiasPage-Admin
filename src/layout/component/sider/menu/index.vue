<template>
  <div class="sider-menu">
    <SubMenu :data="menuList" :accordion="props.accordion" :collapsed="props.collapsed"></SubMenu>
  </div>
</template>

<script lang="ts" setup name="CustomMenu">
import appStore from "@/store/module/app";
import { useRouter, RouteRecordRaw } from "vue-router";
import { mdiMenu, mdiViewDashboard } from "@quasar/extras/mdi-v6";
import SubMenu from "./SubMenu.vue";

// 定义props
const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: "",
  },
  data: {
    type: Array,
    default: () => [],
  },
  // 是否收缩
  collapsed: {
    type: Boolean,
    default: false,
  },
  // 是否开启手风琴
  accordion: {
    type: Boolean,
    default: false,
  },
});

let menuList = $ref<any[]>([]);

const emits = defineEmits(["update:modelValue", "change"]);

// 构建树形菜单需要的属性
const buildMenuTree = (list: Array<any>) => {
  // let resultMenuTree: Array<IMenu> = [];
  const loopItem = (mList: Array<any>, level: number) => {
    mList.forEach((item: any) => {
      item["expand"] = true;
      item["level"] = level;
      item["active"] = item.key === props.modelValue;
      if (item.children && item.children.length > 0) {
        loopItem(item.children, level + 1);
      }
    });
  };
  loopItem(list, 0);
  menuList = list;
};

// 设置菜单项
const setSubMenu = (val: any) => {
  let copyMenuList = JSON.parse(JSON.stringify(menuList));
  const findMenu = (list: any[]) => {
    list.forEach((item: any) => {
      // 手风琴
      if (props.accordion) {
        // let level = val.level - 1 === 0 ? 0 : val.level - 1;
        // if (item.key !== val.key) {
        //   item.expand = false;
        // }
      }
      item.active = false;
      if (item.key === val.key) {
        item.active = true;
        if (item.children && item.children.length > 0) {
          item.expand = !item.expand;
        }
      }
      if (item.children && item.children.length > 0) {
        findMenu(item.children);
      }
    });
  };
  findMenu(copyMenuList);
  menuList = copyMenuList;
};

const toggle = (val: any) => {
  let key = val.key;
  setSubMenu(val);
  emits("update:modelValue", val.key);
  emits("change", val);
};

provide("toggle", toggle);

// 监听
watch(
  () => props.data,
  (nVal, oVal) => {
    buildMenuTree(nVal);
  },
  {
    immediate: true,
    deep: true, // 开启深度监听
  }
);
</script>

<style lang="scss" scoped>
.sider-menu {
}
</style>
