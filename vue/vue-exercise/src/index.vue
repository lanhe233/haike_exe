<!-- 页面入口文件 -->
<template>
  <div>
    <ul class="nav">
      <li><router-link to="/mixin">@mixin % @function</router-link></li>
      <li><router-link to="/center">六种水平居中</router-link></li>
      <li><router-link to="/button">button组件</router-link></li>
      <li><router-link to="/radio">radio组件</router-link></li>
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
