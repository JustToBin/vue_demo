// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import CustComponents from './components';
import CustServices from './services';
import CustDirectives from './directives';
// import CustI18n from "./i18n";
import store from './store';
// import 'element-ui/lib/theme-chalk/index.css';
import 'mint-ui/lib/style.css';
import '@/styles/iconfont/iconfont.css';
import '@/styles/default_theme.less';
import SystemSetting from "../config/system.setting";

global.vue = new Vue();

global.CONTEXT_NAME = SystemSetting.contextName;

global.addEventListener("storage", function (e) {
  global.vue.$emit("storage-changed", e);
});


// const i18n = CustI18n(Vue);
Vue.use(CustComponents);
Vue.use(CustServices);
Vue.use(CustDirectives);


Vue.config.productionTip = SystemSetting.debugMode;

/* eslint-disable no-new */
const vueInstance = new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});

/**
 * 生成vue对象
 * @returns {Object} 返回生成的vue对象
 */
function createApp() {
  return vueInstance;
}

export default createApp;
