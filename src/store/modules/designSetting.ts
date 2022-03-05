import { InjectionKey } from 'vue';
import { createStore, Store } from 'vuex';

// 长时间不操作默认锁屏时间
const initTime = 60 * 60;

const isLock = null;

export type ILockscreenState = {
  isLock: boolean;    // 是否锁屏
  lockTime: number;   // 锁屏时间
};

export const key: InjectionKey<Store<ILockscreenState>> = Symbol();

export const useDesignSettingStore = createStore<ILockscreenState>({
  state() {
    return {
      isLock: isLock === true, // 是否锁屏
      lockTime: isLock == 'true' ? initTime : 0,
    }
  },
  mutations: {
    setLock(state, payload) {
      state.isLock = payload;
    },
    setLockTime(state, payload = initTime) {
      state.lockTime = payload;
    },
  }
})

