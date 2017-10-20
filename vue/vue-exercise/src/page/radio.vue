<template>
  <div>
    <p>不输入标签内容</p>
    <cl-radio v-model="fruit" label="apple">apple</cl-radio>
    <cl-radio v-model="fruit" label="orange">orange</cl-radio>
    <div>选中：{{fruit}}</div>
    <p class="mt20">输入标签内容</p>
    <cl-radio v-model="fruit2" label="apple">苹果</cl-radio>
    <cl-radio v-model="fruit2" label="orange">橙子</cl-radio>
    <div>选中：{{fruit2}}</div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      fruit: 'orange',
      fruit2: ''
    }
  }
}

</script>

<style lang="scss">
  @import '~@/assets/css/index'
</style>