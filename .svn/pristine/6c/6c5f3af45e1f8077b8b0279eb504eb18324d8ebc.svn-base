// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import axios from 'axios'
import Qs from "qs"
import ElementUI from 'element-ui'
import { Message, MessageBox} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css';
import store from './store'
import 'babel-polyfill'
import promise from 'es6-promise';
promise.polyfill();

// Vue.prototype.$axios = axios

Vue.config.productionTip = false
Vue.use(ElementUI)

/**权限指令**/
//注册一个全局自定义指令 `v-has`
Vue.directive('has', {
// 当被绑定的元素插入到 DOM 中时……
  inserted: function (el, binding) {
    if (!permissionJudge(binding.value)) {
      el.parentNode.removeChild(el);
    }

    function permissionJudge(value) {
      // 此处sessionStorage.getItem('permissions')代表从数据库返回的按钮菜单数据
      let list = JSON.parse(localStorage.getItem('permissions'));
      for (let item=0; item<list.length;item++) {
        if (list[item].code === value) {
          return true;
        }
      }
      return false;
    }
  }
});
   

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
