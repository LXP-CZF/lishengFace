'use strict'
// 首先引入的是webpack的merge插件，该插件是用来合并对象，也就是配置文件用的，相同的选项会被覆盖
const merge = require('webpack-merge')
// 导入prod.env.js配置文件
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
   // 将两个配置对象合并，最终结果是 NODE_ENV: '"development"'
  NODE_ENV: '"development"',
  MOCK: 'true',
  API_HOST: '"http://192.168.2.112:9527"'
})
