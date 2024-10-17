<template>
  <q-form
    ref="formRef"
    class="my-form"
    autocorrect="off"
    autocapitalize="off"
    autocomplete="off"
    spellcheck="false"
    :style="myFormStyle"
    no-error-focus
    greedy
  >
    <slot name="default"> </slot>
  </q-form>
</template>

<script lang="ts" setup name="MyForm">
let props = defineProps({
  modelValue: {
    type: Object,
    default: () => {},
  },
  queryForm: {
    type: Boolean,
    default: false,
  },
  labelWidth: {
    type: String,
    default: "auto",
  },
  labelAlign: {
    type: String,
    default: "left",
  },
  layout: {
    type: String,
    default: "vertical",
  },
});

// 传递给子组件
provide("labelWidth", props.labelWidth);
provide("layout", props.layout);
provide("queryForm", props.queryForm);

let formRef = $ref<any>(null);

// 判断布局是垂直还是水平
const getLayout = () => {
  let defaultLayout = "column";
  switch (props.layout) {
    case "vertical":
      defaultLayout = "column";
      break;
    case "horizontal":
      defaultLayout = "row";
      break;
  }
  return defaultLayout;
};

let myFormStyle = reactive({});

const onSubmit = () => {};

const reset = () => {
  console.log(formRef);
  return formRef?.reset();
};

const validate = async () => {
  return formRef?.validate();
};

const resetValidation = () => {
  return formRef?.resetValidation();
};

defineExpose({
  validate,
  resetValidation,
  reset,
});

onMounted(() => {
  myFormStyle = {
    flexDirection: getLayout(),
  };
});
</script>

<style lang="scss" scoped>
.my-form {
  display: flex;
  width: 100%;

  // justify-content: space-between;
  flex-wrap: wrap;
}
</style>
