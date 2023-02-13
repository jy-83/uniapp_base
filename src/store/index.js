/**
 * vuex
 * 在modules文件夹下创建响应的文件，无需其他操作
 * **/

import Vuex from "vuex";
import Vue from "vue";
import path from "path";

Vue.use(Vuex);
const files = require.context("./modules", false, /\.js/);
const modules = {};
files.keys().forEach(key => {
	const name = path.basename(key, ".js");
	modules[name] = files(key).default;
});

const store = new Vuex.Store({ modules });
/**
 * 初始化vuex数据
 **/
export function setupStore() {

}
export default store;
