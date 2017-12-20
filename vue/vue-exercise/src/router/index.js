import Vue from 'vue'
import Router from 'vue-router'
import mixin from '@/page/mixin-exercise'
import center from '@/page/center'
import table from '@/page/table'
import button from '@/page/button'
import radio from '@/page/radio'
import checkbox from '@/page/checkbox'

Vue.use(Router)
const router = new Router({
  mode: 'history',
  scrollBehavior () {
    return {
      y: 0
    }
  },
  routes: [
    { path: '/mixin', component: mixin },
    { path: '/center', component: center },
    { path: '/table', component: table },
    { path: '/button', component: button },
    { path: '/radio', component: radio },
    { path: '/checkbox', component: checkbox }
  ]
})

export default router
