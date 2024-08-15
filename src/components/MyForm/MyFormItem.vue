<template>
  <div class="my-form-item" :style="formItemStyle">
    <div class="form-item-label" :style="formItemLabelStyle">
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
    default: ''
  },
  labelAlign: {
    type: String,
    default: 'right'
  },
  aloneRow: {
    type: Boolean,
    default: false
  },
  required: {
    type: Boolean,
    default: false
  }
});

// 接受传递过来的值
const labelWidth = inject('labelWidth');

let formItemStyle = reactive({});
let formItemLabelStyle = reactive({});
let formItemControlStyle = reactive({});

const styleInit = () => {
  formItemLabelStyle = { width: labelWidth, textAlign: props.labelAlign };
  formItemStyle = {
    width: props.aloneRow ? '100%' : ''
  };
  formItemControlStyle = {
    width: props.aloneRow ? `calc(100% - ${labelWidth})` : ''
  };
};

onBeforeMount(() => {
  styleInit();
});

onMounted(() => {});
</script>

<style lang="scss" scoped>
.my-form-item {
  display: flex;
  flex-direction: row;
  margin-bottom: 0.125rem;
  padding: 0 0.3125rem;
  .form-item-label {
    line-height: 2.5rem;
    font-size: 1rem;
    margin-right: 0.125rem;
  }
  .form-item-control {
    // background-color: red;
  }
}
</style>
