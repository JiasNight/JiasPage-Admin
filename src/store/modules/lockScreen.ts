import { InjectionKey } from 'vue';
import { createStore, Store } from 'vuex';

// 长时间不操作默认锁屏时间
const initTime = 60 * 60;

const isLock = null;

interface ILockscreenState {
  isLock: boolean;    // 是否锁屏
  lockTime: number;   // 锁屏时间
};

const state: ILockscreenState = {
  isLock: false,
  lockTime: 100
}


const mutations = {
  setLock(state: ILockscreenState, payload: boolean) {
    state.isLock = payload;
  },
  setLockTime(state: ILockscreenState, payload: number) {
    state.lockTime = payload;
  },
}

const actions = {
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
};

