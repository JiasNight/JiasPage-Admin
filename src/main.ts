import { createApp } from 'vue';
import App from './App.vue';
// 引入全局样式
import './style/globalStyle.scss';
// 引入路由
import router from './router';
// 引入pinia
import store from './store';
// 引入axios
import axios from 'axios';
// 引入i18n
import i18n from './i18n';
// 引入权限控制
import './permission';
// 引入Naive-Ui组件
// import naive from 'naive-ui';
// 通用字体
import 'vfonts/Lato.css';
// 等宽字体
import 'vfonts/FiraCode.css';
import 'uno.css';
// 引入工具函数
// import { formatDate, renderIcon } from '@/utils/common';

// 创建app实例
const app = createApp(App);
app.use(router);
app.use(i18n);
app.use(store);
// 全局挂载axios
app.config.globalProperties.$axios = axios;
app.config.globalProperties.$t = i18n.global.t;
// 全局指令
// Object.keys(directives).forEach((key) => {
//   app.directive(key, (directives as { [key: string]: Directive })[key]);
// });
// 挂载
app.mount('#app');
