import { defineStore } from 'pinia';
import { useRouter, RouteLocationNormalizedLoaded, RouteRecordRaw } from 'vue-router';
import useAppStore from './app';
import router from '@/router';

type IStagState = {
  activeTag: string;
  visitedTags: Array<RouteLocationNormalizedLoaded>;
  cachedTags: Array<string>;
};

const useTagStore = defineStore({
  id: 'tag', // id必填，且需要唯一
  state: (): IStagState => ({
    // 当前活动的tag路径
    activeTag: '',
    // 全部的tag数组
    visitedTags: [],
    cachedTags: []
  }),
  getters: {
    // 获取当前活动的路径
    getActiveTag(state): string {
      return state.activeTag;
    },
    // 获取当前访问过的路由信息
    getVisitedTags(state): [] | Array<any> {
      return state.visitedTags;
    },
    // 获取需要被缓存的页面
    getCachedTags(state): [] | Array<string> {
      return state.cachedTags;
    }
  },
  actions: {
    // 标签页变动
    addVisitedTag(route: RouteLocationNormalizedLoaded) {
      if (this.visitedTags.some((v) => v.path === route.path)) return;
      this.visitedTags.push(route);
    },
    // 设置缓存的标签页
    addCachedTag(route: RouteLocationNormalizedLoaded | any) {
      if (this.cachedTags.includes(route.name)) return;
      this.cachedTags.push(route.name);
    },
    // 设置当前tag
    setActiveTag(route: RouteLocationNormalizedLoaded) {
      this.addVisitedTag(route);
      this.activeTag = route.path;
      localStorage.setItem('activeTag', route.name as string);
    },
    // 标签页重新加载
    setTagReload() {
      useAppStore().reloadPage();
    },
    // 标签页行为
    setTagActive(key: string) {
      switch (key) {
        case 'reload':
          useAppStore().reloadPage();
          break;
      }
    }
  }
});

export default useTagStore;
