import { defineStore } from 'pinia';

type IGlobalState = {
  loading: boolean;
  progress: number | null;
  message: string | null;
};

const useGlobalStore = defineStore({
  id: 'global',
  state: (): IGlobalState => ({
    loading: false,
    progress: null,
    message: null
  }),
  getters: {
    loading(state): boolean {
      return state.loading;
    },
    progress(state): number | null {
      state.loading = true;
      return state.progress;
    },
    message(state): string | null {
      return state.message;
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
