// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import Qs from "qs"
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css';
import store from './store'
import 'babel-polyfill'
// import Mock from './mock'
// Mock.bootstrap();

// 创建全局的 axios 默认值
axios.defaults.baseURL = 'http://192.168.2.180:9999';
axios.defaults.timeout = 5000; // request timeout,现在，在超时前，所有请求都会等待 5 秒
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
 
Vue.prototype.$axios = axios

Vue.config.productionTip = false
Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
