<template>
  <div class="cl-message">
    <div class="cl-message__icon iconfont icon-tishi"></div>
    <div class="cl-message__content">{{content}}</div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        content: ''
      }
    }
  }
</script>

<style lang="scss">
  @import '~assets/css/main'
</style>