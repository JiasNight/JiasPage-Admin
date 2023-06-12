import { defineStore } from 'pinia';

type IGlobalState = {
  loading: boolean;
  progress: number | null;
  message: string | null;
  isLock: boolean;
};

const useGlobalStore = defineStore({
  id: 'global',
  state: (): IGlobalState => ({
    loading: false,
    progress: null,
    message: null,
    isLock: false
  }),
  getters: {
    getLoading(state): boolean {
      return state.loading;
    },
    getProgress(state): number | null {
      state.loading = true;
      return state.progress;
    },
    getMessage(state): string | null {
      return state.message;
    },
    getIsLock(state): boolean {
      return state.isLock;
    }
  },
  actions: {
    setLoading(display: boolean) {
      this.loading = display;
    },
    setProgress(progress: number | null) {
      this.progress = progress;
      this.loading = true;
    },
    setMessage(message: string) {
      this.message = message;
    }
  }
});

export default useGlobalStore;
