import { defineStore } from 'pinia';
import { useRouter, RouteLocationNormalizedLoaded, RouteRecordRaw } from 'vue-router';
import router from '@/router';

// const router = useRouter();

type IStagState = {
  activeTagPath: string;
  pageTagList: Array<RouteLocationNormalizedLoaded>;
};

const useTagStore = defineStore({
  id: 'tag', // id必填，且需要唯一
  state: (): IStagState => ({
    // 当前活动的tag路径
    activeTagPath: '',
    // 全部的tag数组
    pageTagList: []
  }),
  getters: {
    // 获取当前活动的路径
    getActiveTagPath(state): string {
      return state.activeTagPath;
    },
    // 获取当前路由信息
    getPageTagList(state): [] | Array<any> {
      return state.pageTagList;
    }
  },
  actions: {
    // 设置当前tag
    setActiveTagPath(route: RouteLocationNormalizedLoaded) {
      this.makePageTags(route);
      this.activeTagPath = route.path;
    },
    // 标签页变动
    makePageTags(route: RouteLocationNormalizedLoaded) {
      if (this.pageTagList.length === 0) {
        this.pageTagList.push(route);
      } else if (route.path !== '/index' && !this.pageTagList.some((tag) => tag.path === route.path)) {
        this.pageTagList.push(route);
      }
    }
  }
});

export default useTagStore;
