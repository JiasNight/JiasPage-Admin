<template>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path :d="iconPath" />
  </svg>
</template>

<script lang="ts" setup name="MdiIcon">
const props = defineProps({
  icon: {
    type: String,
    default: ''
  }
});

let iconPath = $ref<string>('');

const iconKey: any = computed(() => props.icon);

// 动态加载module
const loadModule = async () => {
  let defaultKey = 'mdiMenu';
  const module: any = await import('@quasar/extras/mdi-v6');
  defaultKey = iconKey.value !== '' ? iconKey.value : defaultKey;
  if (module[defaultKey]) {
    iconPath = module[defaultKey];
  } else {
    iconPath = module.mdiMenu;
  }
};

onMounted(() => {
  loadModule();
});
</script>
