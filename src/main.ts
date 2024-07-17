import { createApp } from 'vue';
import App from '@/App.vue';
// 引入全局样式
import '@/style/globalStyle.scss';
// 引入自定义字体
import '@/assets/fonts/font.scss';
// 引入路由
import router from '@/router';
// 引入pinia
import store from '@/store';
// 引入axios
import axios from 'axios';
// 引入i18n
import i18n from '@/i18n';
// 引入quasar
import { Quasar, Notify, Dialog, Loading, LoadingBar, BottomSheet, AppFullscreen, AddressbarColor } from 'quasar';
// quasar语言包
import quasarLang from 'quasar/lang/zh-CN';
// quasar图标库
import quasarIconSet from 'quasar/icon-set/svg-mdi-v6';
// 引入图标库
import '@quasar/extras/roboto-font/roboto-font.css';
import '@quasar/extras/mdi-v6/mdi-v6.css';
// 引入Quasar css
import 'quasar/src/css/index.sass';
// 引入uno.css
import 'uno.css';
// 引入权限控制
import { setupPermission } from '@/router/permission';
// 引入工具函数
import { formatDate, renderIcon } from '@/utils/common';
import useAppStore from '@/store/module/app';

// 权限设置
setupPermission(router);

// 创建app实例
const myApp = createApp(App);

// 挂载全局方法
myApp.provide('renderIcon', renderIcon);
myApp.provide('formatDate', formatDate);

// 全局挂载axios
myApp.config.globalProperties.$axios = axios;
myApp.config.globalProperties.$t = i18n.global.t;

// 全局指令
// Object.keys(directives).forEach((key) => {
//   app.directive(key, (directives as { [key: string]: Directive })[key]);
// });

myApp.use(store);
useAppStore().addRoutes();
myApp.use(i18n);
myApp.use(router);
myApp.use(Quasar, {
  plugins: {
    Notify,
    Dialog,
    Loading,
    LoadingBar,
    BottomSheet,
    AppFullscreen,
    AddressbarColor
  }, // import Quasar plugins and add here
  lang: quasarLang,
  iconSet: quasarIconSet
});

// 挂载
myApp.mount('#app');
