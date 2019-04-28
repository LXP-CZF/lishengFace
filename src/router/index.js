import Vue from 'vue'
import Router from 'vue-router'

// 懒加载方式，当路由被访问的时候才加载对应组件
const Home = resolve => require(['@/views/layout/Layout'], resolve)
const capability_type = resolve => require(['@/views/access/capability_type'], resolve)
const capability_engineversion = resolve => require(['@/views/access/capability_engineversion'], resolve)
const capability_units = resolve => require(['@/views/access/capability_units'], resolve)
const capability_engine = resolve => require(['@/views/access/capability_engine'], resolve)
const manage_interface = resolve => require(['@/views/common_interface/manage_interface'], resolve)
const editTabel = resolve => require(['@/views/Characteristics/editTabel'], resolve)
const test = resolve => require(['@/views/Characteristics/test'], resolve)
const login = resolve => require(['@/views/login/index'], resolve)
Vue.use(Router)

export default new Router({
  routes: [
      
    // {
    //   path: '',
    //   component: Home,
    //   redirect: '/access/capability_type'
    // },
    {
      path: '/',
      component: login,
        //redirect: 'login',
       name: '',
       hidden: true
   },
    {
      path: '/capability_type',
      component: Home,
      name:'能力接入管理',
      redirect: '/capability_type',
      iconCls: 'el-icon-news',//图标样式class
      meta: { title: '能力接入管理' },
      children: [
          { path: '/capability_type', component: capability_type, name: '能力类型管理',meta: { title: '能力类型管理' }},
          { path: '/test', component: test, name: '能力引擎管理' },
          // { path: '/capability_units', component: capability_units, name: '能力单元管理' },
          // { path: '/capability_engineversion', component: capability_engineversion, name: '能力引擎版本管理' },  
      ]
    },
     {
        path: '/Home',
        component: Home,
        name:'识别策略管理',
        iconCls: 'el-icon-document',//图标样式class
        meta: { title: '识别策略管理' },
        // children: [
        //     { path: '/', component: table,  hidden: true },
        //     { path: '/table', component: table, name: '识别策略管理' },
        //     { path: '/admin', component: admin, name: '识别策略组管理' },
        //     { path: '/Test', component: Test, name: '识别场景管理' },
        //     { path: '/Test', component: Test, name: '识别阈值管理' },   
        // ]
      },
      {
        path: '/Home',
        component: Home,
        name:'特征库管理',
        iconCls: 'el-icon-setting',//图标样式class
        meta: { title: '特征库管理' },
        children: [
            // { path: '/editTabel', component: editTabel,  hidden: true },
             { path: '/editTabel', component: editTabel, name: '特征库维护',meta: { title: '特征库维护' } },
            // { path: '/admin', component: admin, name: '特征类型维护' },
            // { path: '/Test', component: Test, name: '特征信息维护' },
        ]
      },
      {
        path: '/manage_interface',
        component: Home,
        name:'公共服务接口管理',
        iconCls: 'el-icon-menu',//图标样式class
        meta: { title: '公共服务接口管理' },
        children: [
            // { path: '/manage_interface', component: manage_interface,name:'接口管理'},
           
        ]
      },
     /*  {
        path: '/Home',
        component: Home,
        name:'系统管理',
        iconCls: 'el-icon-location',//图标样式class
        
      }, */
  
  ]
})
