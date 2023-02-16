import Vue from 'vue';
import App from './App';
import uView from 'uview-ui';
import store, { setupStore } from '@/store/index.js';
import plugins from '@/plugins';
const themeStyle = require('./styles/theme');
import * as filters from '@/filters';

// uview
Vue.use(uView);
// plugins
Vue.use(plugins);
// 系统主题
Vue.prototype.$theme = themeStyle;
//过滤器
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key]);
});

Vue.config.productionTip = false;

App.mpType = 'app';

const app = new Vue({
  ...App,
  store,
});
// 初始化vuex数据
setupStore();
app.$mount();
