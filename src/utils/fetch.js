import axios from 'axios';
import {
  Message,
  MessageBox
} from 'element-ui';
import store from '../store';
// import {
//   getToken
// } from 'utils/auth';

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 5000 // 请求超时时间
});

// request拦截器
service.interceptors.request.use(config => {
  // Do something before request is sent
  if (store.getters.token) {
    config.headers['Authorization'] = localStorage.getItem('token'); // 让每个请求携带token--['Authorization']为自定义key 请根据实际情况自行修改
  }
  return config;
}, error => {
  // Do something with request error
  console.log(error); // for debug
  Promise.reject(error);
})

// respone拦截器
service.interceptors.response.use(    
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
                  Message({
                    message: '登录过期，请重新登录',
                    type: 'error',
                    duration: 4*1000
                  });     
                            
                  // 清除token                    
                  localStorage.removeItem('token');                    
                  // store.commit('loginSuccess', null);                    
                  // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
                  setTimeout(() => {                        
                      router.replace({                            
                          path: '/',                            
                          query: { 
                              redirect: router.currentRoute.fullPath 
                          }                        
                      });                    
                  }, 1000);                    
                  break; 
              // 404请求不存在                
              case 404: 
              Message({
                message: '网络请求不存在',
                type: 'error',
                duration: 2000
              });                 
              break;                
              // 其他错误，直接抛出错误提示                
              default:                    
              Message({                        
                      message: error.response.statusText,                        
                      type: 'error',
                      duration: 2000                   
                  });            
          }            
          return Promise.reject(error.response);        
      }       
  }
);

export default service;
