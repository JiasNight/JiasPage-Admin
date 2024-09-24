<template>
  <q-card class="view-card" flat bordered>
    <q-card-section class="flex items-center justify-end q-gutter-sm">
      <q-btn color="info" size="sm" round :icon="mdiPlus" @click="handleClickPlus">
        <q-tooltip anchor="top middle" self="center middle"> 新增 </q-tooltip>
      </q-btn>
      <q-btn color="negative" size="sm" round :icon="mdiMinus" @click="handleClickMinus">
        <q-tooltip anchor="top middle" self="center middle"> 删除 </q-tooltip>
      </q-btn>
      <q-btn color="info" size="sm" round :icon="mdiRefresh" @click="handleClickRefresh">
        <q-tooltip anchor="top middle" self="center middle"> 刷新 </q-tooltip>
      </q-btn>
    </q-card-section>
    <q-separator />
    <q-card-section>
      <q-input
        v-model="filterText"
        outlined
        borderless
        dense
        clearable
        maxlength="20"
        placeholder="输入关键字搜索"
        @update:model-value="handleInputFilter"
      >
        <template #append>
          <q-icon :name="mdiMagnify" />
        </template>
      </q-input>
    </q-card-section>
    <q-card-section>
      <q-tree
        v-model:selected="treeSelectedValue"
        :nodes="props.data"
        :filter="filterText"
        :node-key="props.nodeKey"
        :label-key="props.labelKey"
        :children-key="props.childrenKey"
        selected-color="primary"
        @update:selected="handleTreeSelected"
      />
      <q-inner-loading :showing="props.loading">
        <q-spinner-ios size="md" color="primary" />
      </q-inner-loading>
    </q-card-section>
  </q-card>
</template>

<script lang="ts" setup name="LeftTree">
import { mdiDelete, mdiMagnify, mdiMinus, mdiPlus, mdiRefresh } from "@quasar/extras/mdi-v6";
import { QTreeNode } from "quasar";

const props = defineProps({
  data: {
    type: Array<QTreeNode>,
    default: () => [],
  },
  nodeKey: {
    type: String,
    default: () => "id",
  },
  labelKey: {
    type: String,
    default: () => "name",
  },
  childrenKey: {
    type: String,
    default: () => "children",
  },
  loading: {
    type: Boolean,
    default: () => false,
  },
});

let filterText = $ref("");

let treeSelectedValue = $ref("");

const emits = defineEmits(["refresh", "selected"]);

// 新增
const handleClickPlus = () => {};

// 删除
const handleClickMinus = () => {};

// 刷新树
const handleClickRefresh = () => {
  emits("refresh");
};

// 搜索
const handleInputFilter = (val: String | Number | null) => {
  console.log(val);
};

// 点击树
const handleTreeSelected = (val: any) => {
  emits("selected", val);
};
</script>
