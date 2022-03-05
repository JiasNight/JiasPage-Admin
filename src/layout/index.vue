<template>
  <n-layout class="layout" has-sider>
    <n-layout-sider show-trigger="bar" collapse-mode="width" :collapsed-width="65" :width="leftMenuWidth"
                    @collapse="collapsed = true" @expand="collapsed = false" :native-scrollbar="false" :inverted="true"
                    class="layout-sider">
      <Logo :collapsed="collapsed" />
      <AsideMenu v-model:collapsed="collapsed" v-model:location="getMenuLocation" />
    </n-layout-sider>

    <!-- <n-layout :inverted="inverted">
      <n-layout-header :inverted="getHeaderInverted" :position="fixedHeader">
        <PageHeader v-model:collapsed="collapsed" :inverted="inverted" />
      </n-layout-header>

      <n-layout-content class="layout-content" :class="{ 'layout-default-background': getDarkTheme === false }">
        <div class="layout-content-main" :class="{
            'layout-content-main-fix': fixedMulti,
            'fluid-header': fixedHeader === 'static',
          }">
          <TabsView v-if="isMultiTabs" v-model:collapsed="collapsed" />
          <div class="main-view" :class="{
              'main-view-fix': fixedMulti,
              noMultiTabs: !isMultiTabs,
              'mt-3': !isMultiTabs,
            }">
            <MainView />
          </div>
        </div>
      </n-layout-content>
      <n-back-top :right="100" />
    </n-layout> -->
  </n-layout>
</template>

<script lang="ts" setup>
import { ref, unref, computed, onMounted } from 'vue';
import { useLoadingBar } from 'naive-ui';
import { Logo } from './components/Logo';
// import { TabsView } from './components/TagsView';
// import { MainView } from './components/Main';
import { AsideMenu } from './components/Menu';
// import { PageHeader } from './components/Header';



const collapsed = ref<boolean>(false);

const leftMenuWidth = ref<number>(200);

// const leftMenuWidth = computed(() => {
//   const { minMenuWidth, menuWidth } = unref(getMenuSetting);
//   return collapsed.value ? minMenuWidth : menuWidth;
// });

const watchWidth = () => {
  const width = document.body.clientWidth;
  if (width <= 950) {
    collapsed.value = true;
  } else collapsed.value = false;
};

onMounted(() => {
  window.addEventListener('resize', watchWidth);
  //挂载在 window 方便与在js中使用
  window['$loading'] = useLoadingBar();
  window['$loading'].finish();
});
</script>

<style lang="scss" scoped>
.layout {
  display: flex;
  flex-direction: row;
  flex: auto;

  &-default-background {
    background: #f5f7f9;
  }

  .layout-sider {
    min-height: 100vh;
    box-shadow: 2px 0 8px 0 rgb(29 35 41 / 5%);
    position: relative;
    z-index: 13;
    transition: all 0.2s ease-in-out;
  }

  .layout-sider-fix {
    position: fixed;
    top: 0;
    left: 0;
  }

  .ant-layout {
    overflow: hidden;
  }

  .layout-right-fix {
    overflow-x: hidden;
    padding-left: 200px;
    min-height: 100vh;
    transition: all 0.2s ease-in-out;
  }

  .layout-content {
    flex: auto;
    min-height: 100vh;
  }

  .n-layout-header.n-layout-header--absolute-positioned {
    z-index: 11;
  }

  .n-layout-footer {
    background: none;
  }
}

.layout-content-main {
  margin: 0 10px 10px;
  position: relative;
  padding-top: 64px;
}

.layout-content-main-fix {
  padding-top: 64px;
}

.fluid-header {
  padding-top: 0px;
}

.main-view-fix {
  padding-top: 44px;
}

.noMultiTabs {
  padding-top: 0;
}
</style>
