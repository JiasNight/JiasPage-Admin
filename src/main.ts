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
const app = createApp(App);

// 挂载全局方法
app.provide('renderIcon', renderIcon);
app.provide('formatDate', formatDate);

// 全局挂载axios
app.config.globalProperties.$axios = axios;
app.config.globalProperties.$t = i18n.global.t;

// 全局指令
// Object.keys(directives).forEach((key) => {
//   app.directive(key, (directives as { [key: string]: Directive })[key]);
// });

app.use(store);
useAppStore().addRoutes();
app.use(i18n);
app.use(router);

// 挂载
app.mount('#app');
