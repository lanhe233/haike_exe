<!-- 页面入口文件 -->
<template>
  <div>
    <ul class="nav">
      <li><router-link to="/mixin">@mixin % @function</router-link></li>
      <li><router-link to="/center">六种水平居中</router-link></li>
      <li><router-link to="/button">button组件</router-link></li>
      <li><router-link to="/radio">radio组件</router-link></li>
      <li><router-link to="/checkbox">checkbox组件</router-link></li>
      <li><router-link to="/newDocReview">vuejs document</router-link></li>
      <li><router-link to="/input">input组件</router-link></li>
      <li><router-link to="/componentsForGM">GM后台组件</router-link></li>
      <li><router-link to="/datePicker">时间组件</router-link></li>
      <li><router-link to="/badge">badge标记组件</router-link></li>
      <li><router-link to="/rate">rate评分组件</router-link></li>
    </ul>
    <div class="container"><router-view></router-view></div>
  </div>
</template>

<script>

export default {
  name: 'app',
  data () {
    return {
      show: true
    }
  },
  methods: {
    info () {
      this.$message.success({
        message: '消息提示'
      })
    }
  }
}
</script>

<style lang="scss">
  @import '~@/assets/css/index'
</style>
