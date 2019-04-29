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
// import has from'./common/js/btnPermissions';
import store from './store'
import 'babel-polyfill'
import promise from 'es6-promise';
promise.polyfill();
// import Mock from './mock'
// Mock.bootstrap();

// 创建全局的 axios 默认值
axios.defaults.baseURL = '/api';
axios.defaults.timeout = 5000; // request timeout,现在，在超时前，所有请求都会等待 5 秒
// post请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
// 请求拦截器
axios.interceptors.request.use(    
  config => {
      // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
      // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
      // const token = store.state.token;        
      // token && (config.headers.Authorization = token);        
      if (store.getters.token) {
        config.headers.Authorization = localStorage.getItem('token'); // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
      }
      return config;    
  },    
  error => {        
      return Promise.error(error);    
  })

// 响应拦截器
axios.interceptors.response.use(    
  response => {        
      if (response.status === 200) {            
          return Promise.resolve(response);        
      } else {            
          return Promise.reject(response);        
      }    
  },
  // 服务器状态码不是200的情况    
  error => {        
      if (error.response.status) {            
          switch (error.response.status) {                
              // 401: 未登录                
              // 未登录则跳转登录页面，并携带当前页面的路径                
              // 在登录成功后返回当前页面，这一步需要在登录页操作。                
              case 401:                    
                  router.replace({                        
                      path: '/',                        
                      query: { redirect: router.currentRoute.fullPath } 
                  });
                  break;
              // 403 token过期                
              // 登录过期对用户进行提示                
              // 清除本地token和清空vuex中token对象                
              // 跳转登录页面                
              case 403:                     
                  Toast({                        
                      message: '登录过期，请重新登录',                        
                      duration: 1000,                        
                      forbidClick: true                    
                  });                    
                  // 清除token                    
                  localStorage.removeItem('token');                    
                  store.commit('loginSuccess', null);                    
                  // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
                  setTimeout(() => {                        
                      router.replace({                            
                          path: '/login',                            
                          query: { 
                              redirect: router.currentRoute.fullPath 
                          }                        
                      });                    
                  }, 1000);                    
                  break; 
              // 404请求不存在                
              case 404:                    
                  Toast({                        
                      message: '网络请求不存在',                        
                      duration: 1500,                        
                      forbidClick: true                    
                  });                    
              break;                
              // 其他错误，直接抛出错误提示                
              default:                    
                  Toast({                        
                      message: error.response.data.message,                        
                      duration: 1500,                        
                      forbidClick: true                    
                  });            
          }            
          return Promise.reject(error.response);        
      }       
  }
);
Vue.prototype.$axios = axios

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
      let list = JSON.parse(sessionStorage.getItem('permissions'));
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
