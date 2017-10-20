// 程序入口文件，加载各种公共组件
import Vue from 'vue'
import App from './index'
import '@/assets/css/common.scss'
import router from '@/router'
// import 'http://at.alicdn.com/t/font_423497_9bynwinx3d31sjor.css'

Vue.config.productionTip = false

import message from '@/components/message/index'
import button from '@/components/button/index'
import buttonGroup from '@/components/buttonGroup/index'
import radio from '@/components/radio/index'
Vue.use(button)
Vue.use(buttonGroup)
Vue.use(radio)
Vue.prototype.$message = message

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
