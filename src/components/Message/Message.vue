<template>
  <Transition @after-leave="onClose">
    <div v-show="visibled" :id="id" class="message" :style="{ top: top + 'px' }">
      <v-alert class="alert" outlined :type="type" max-width="300">
        {{ message }}
      </v-alert>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
import { PropType } from 'vue';

const props = defineProps({
  id: String,
  type: {
    validator: (value: string) => {
      return ['success', 'warning', 'error', 'info'].includes(value);
    },
    default: 'info',
    type: String as PropType<'error' | 'success' | 'warning' | 'info'>
  },
  top: {
    type: Number,
    default: 56
  },
  message: {
    type: String,
    default: ''
  },
  duration: {
    type: Number,
    default: 3000
  },
  onClose: {
    type: Function,
    default: () => {}
  }
});

const visibled = $ref<boolean>(false);
</script>

<style lang="scss" scoped>
.message {
  position: fixed;
  pointer-events: none;
  left: 0;
  right: 0;
  z-index: 9999;
  transition: top 0.7s linear;

  .alert {
    margin: auto;
  }
}
</style>
