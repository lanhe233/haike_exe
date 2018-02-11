// 程序入口文件，加载各种公共组件
import Vue from 'vue'
import App from './index'
import '@/assets/css/common.scss'
import '@/assets/css/main.scss'
import router from '@/router'
// import 'http://at.alicdn.com/t/font_423497_9bynwinx3d31sjor.css'

Vue.config.productionTip = false

// 简化组件
import ElButton from '@/components/common/button/button'
Vue.component(ElButton.name, ElButton)

import message from '@/components/message/index'
import button from '@/components/button/index'
import buttonGroup from '@/components/buttonGroup/index'
import radio from '@/components/radio/index'
import radioGroup from '@/components/radioGroup/index'
import checkbox from '@/components/checkbox/index'
import checkboxGroup from '@/components/checkboxGroup/index'
import input from '@/components/input/index'
import badge from '@/components/badge/index'
import rate from '@/components/rate/index'
Vue.use(button)
Vue.use(buttonGroup)
Vue.use(radio)
Vue.use(radioGroup)
Vue.use(checkbox)
Vue.use(checkboxGroup)
Vue.use(input)
Vue.use(badge)
Vue.use(rate)
Vue.prototype.$message = message

import iView from 'iview'
import 'iview/dist/styles/iview.css'

Vue.use(iView)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
