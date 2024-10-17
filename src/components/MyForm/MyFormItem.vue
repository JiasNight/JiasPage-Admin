<template>
  <div ref="formItemRef" class="my-form-item" :style="formItemStyle">
    <div v-if="labelWidth !== 'auto' && props.label !== ''" class="form-item-label" :style="formItemLabelStyle">
      <span v-if="props.required" class="text-red">*</span>{{ props.label }}
    </div>
    <div class="form-item-control" :style="formItemControlStyle">
      <slot name="default"></slot>
    </div>
  </div>
</template>

<script lang="ts" setup name="MyFormItem">
let props = defineProps({
  label: {
    type: String,
    default: "",
  },
  labelAlign: {
    type: String,
    default: "right",
  },
  singleRow: {
    type: Boolean,
    default: false,
  },
  required: {
    type: Boolean,
    default: false,
  },
});

// 接受传递过来的值
const labelWidth = inject("labelWidth");
const layout = inject("layout");
const queryForm = inject("queryForm");

// console.log("labelWidth" + labelWidth);
// console.log("layout" + layout);
let formItemRef = $ref<any>(null);
let formItemStyle = reactive({});
let formItemLabelStyle = reactive({});
let formItemControlStyle = reactive({});

const styleInit = () => {
  if (queryForm) {
    formItemStyle["min-height"] = "2.5rem";
  } else {
    if (props.required) {
      formItemStyle["min-height"] = "2.5rem";
    } else {
      formItemStyle["min-height"] = "3.75rem";
      formItemStyle["align-items"] = "start";
      let formItemHeight = formItemRef.offsetHeight;
      if (formItemHeight > 60) {
        formItemStyle["padding-bottom"] = "1.25rem";
      }
    }
  }

  formItemLabelStyle = { width: labelWidth, textAlign: props.labelAlign };
  if (layout === "vertical") {
    formItemStyle["width"] = "100%";
    formItemControlStyle = {
      width: `calc(100% - ${labelWidth})`,
    };
  } else if (layout === "horizontal") {
    if (props.singleRow) {
      formItemStyle["width"] = "100%";
      formItemControlStyle = {
        width: `calc(100% - ${labelWidth})`,
      };
    }
  }
};

onMounted(() => {
  styleInit();
});
</script>

<style lang="scss" scoped>
.my-form-item {
  display: flex;
  margin-bottom: 0.3125rem;
  padding: 0 0.3125rem;
  height: 100%;
  flex-direction: row;

  .form-item-label {
    margin-right: 0.25rem;
    font-size: 1rem;
    line-height: 2.5rem;
  }

  .form-item-control {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
}
</style>
