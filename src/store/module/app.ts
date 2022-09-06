import { defineStore } from 'pinia';

type IAppState = {
  theme: boolean;
  language: string;
};

export default defineStore({
  id: 'app', // id必填，且需要唯一
  state: (): IAppState => ({
    theme: window.matchMedia('(prefers-color-scheme: dark)').matches,
    language: (window.navigator.languages && window.navigator.languages[0]) || window.navigator.language
  }),
  getters: {
    getTheme(state): boolean {
      return state.theme;
    },
    getLanguage(state): string {
      return state.language;
    }
  },
  actions: {
    setTheme() {
      this.theme = !this.theme;
    },
    setLanguage(language: string) {
      this.language = language;
    }
  }
});
