// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App' //完整写法是./App.vue
//es6写法，等价于var App = require('./App')

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>', //大概可以理解为，<App/>是<App></App>的简写吧。。
  components: { App }
})
