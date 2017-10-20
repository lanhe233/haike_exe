<template>
  <section class="container">
    <button @click="open">按钮</button>
  </section>
</template>

<script>
import Vue from 'vue'
import func from '~/components/common/message.js'
Vue.prototype.$message = func

export default {
  methods: {
    open () {
      this.$message('这是一条提示提示')
    }
  }
}
</script>

<style>

</style>
