<template>
  <template v-for="(item, i) in props.data" :key="i">
    <q-expansion-item
      v-if="item.show"
      expand-separator
      default-opened
      :header-inset-level="item.level"
      :content-inset-level="item.level === 0 ? 0 : item.level - 1"
      :icon="mdiMenu"
      :hide-expand-icon="item.type !== 0"
      :disable="item.disabled"
      :label="item.label"
    >
      <template #header>
        <div class="item-section">
          <q-icon class="q-mr-sm" :name="mdiMenu" :color="item.color" size="sm" />
          <span class="section-label">{{ item.label }}</span>
        </div>
      </template>
      <template #default>
        <MenuTree :data="item.children"></MenuTree>
      </template>
    </q-expansion-item>
  </template>
</template>

<script lang="ts" setup>
import { mdiMenu } from '@quasar/extras/mdi-v6';

interface IMenu {
  label: string;
  key: string;
  icon: string;
  color: string;
  type: number;
  path: string;
  show: boolean;
  disabled: boolean;
  cache: boolean;
  level: number;
  description?: string;
  children?: IMenu[];
}

const props = defineProps({
  data: {
    type: Array<IMenu>,
    default: () => []
  }
});
</script>

<style lang="scss" scoped>
.item-section {
  display: flex;
  flex-direction: row;
  align-items: center;
  // justify-content: space-between;
  width: 100%;
  // background-color: aqua;
  .section-label {
    font-family: '微软雅黑';
    font-weight: 500;
  }
}
</style>
