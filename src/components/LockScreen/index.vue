<template>
  <div class="screen-lock">
    <div class="lock-time">
      <span>{{ currentTime.h }}</span>
      <span class="time-split">:</span>
      <span>{{ currentTime.m }}</span>
    </div>
    <div class="lock-date">{{ currentMonth }}月{{ currentDay }}号，星期{{ currentWeek }}</div>
    <q-btn class="lock-btn" flat dense round :icon="mdiLock" @click="handleUnlockScreen">
      <q-tooltip class="btn-tooltip bg-primary" anchor="top middle" self="center middle"> 点击解锁屏幕 </q-tooltip>
    </q-btn>
  </div>
</template>

<script lang="ts" setup>
import { mdiLock } from "@quasar/extras/mdi-v6";
import { ComputedRef } from "vue";
import useAppStore from "@/store/module/app";

const appStore = useAppStore();

// 响应式数据
let currentTime: any = $ref({
  h: "00",
  m: "00",
  s: "00",
});
let currentMonth: string = $ref("");
let currentDay: string = $ref("");
let currentWeek: string = $ref("");
let timerId: any = $ref(null);

// 页面初始化方法
const pageInit = () => {
  const getTime = () => {
    let nowDate = new Date();
    let h = nowDate.getHours().toString().padStart(2, "0");
    let m = nowDate.getMinutes().toString().padStart(2, "0");
    let s = nowDate.getSeconds().toString().padStart(2, "0");
    currentTime.h = h;
    currentTime.m = m;
  };

  const getDate = () => {
    let nowDate = new Date();
    currentMonth = (nowDate.getMonth() + 1).toString().padStart(2, "0");
    currentDay = nowDate.getDate().toString().padStart(2, "0");
    currentWeek = ["日", "一", "二", "三", "四", "五", "六"][nowDate.getDay()];
  };

  getDate();
  timerId = setInterval(() => {
    getTime();
  }, 1000);
};

// 解锁屏幕
const handleUnlockScreen = () => {
  appStore.setLockScreen(false);
};

// 挂载
onMounted(() => {
  pageInit();
});

// 卸载
onUnmounted(() => {
  clearInterval(timerId);
});
</script>

<style lang="scss" scoped>
.screen-lock {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 8888;
  overflow: hidden;
  width: 100vw;
  height: 100vh;
  color: white;
  background: #000;
  user-select: none;

  .lock-time {
    position: absolute;
    top: 10%;
    left: 50%;
    display: flex;
    align-items: center;
    overflow: hidden;
    height: 9.375rem;
    font-size: 6.25rem;
    font-weight: 900;
    text-align: center;
    transform: translateX(-50%);
    letter-spacing: 5px;

    .time-split {
      padding-bottom: 20px;
    }
  }

  .lock-date {
    position: absolute;
    bottom: 1.875rem;
    left: 3.125rem;
    display: flex;
    align-items: center;
    overflow: hidden;
    height: 9.375rem;
    font-size: 1.875rem;
    font-weight: 900;
    text-align: center;
    letter-spacing: 5px;
  }

  .lock-btn {
    position: absolute;
    bottom: 20%;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
