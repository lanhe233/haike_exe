<template>
  <div>
    <p class="mb10">不输入标签内容</p>
    <cl-radio v-model="fruit" label="apple"></cl-radio>
    <cl-radio v-model="fruit" label="orange"></cl-radio>
    <div>选中：{{fruit}}</div>
    <p class="mt20 mb10">输入标签内容</p>
    <cl-radio v-model="fruit2" label="apple">苹果</cl-radio>
    <cl-radio v-model="fruit2" label="orange">橙子</cl-radio>
    <div>选中：{{fruit2}}</div>
    <p class="mt20 mb10">禁止状态</p>
    <cl-radio v-model="fruit3" label="apple" :disabled="true">苹果</cl-radio>
    <cl-radio v-model="fruit3" label="orange" :disabled="true">橙子</cl-radio>
    <div>选中：{{fruit3}}</div>
    <p class="mt20 mb10">有group</p>
    <cl-radio-group v-model="fruit4" @change="show">
      <cl-radio label="apple">苹果</cl-radio>
      <cl-radio label="orange">橙子</cl-radio>
    </cl-radio-group>
    <div>选中：{{fruit4}}</div>
    <p class="mt20 mb10">有group 禁止状态</p>
    <cl-radio-group v-model="fruit5" :disabled="true">
      <cl-radio label="apple" :disabled="true">苹果</cl-radio>
      <cl-radio label="orange">橙子</cl-radio>
    </cl-radio-group>
    <div>选中：{{fruit5}}</div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      fruit: 'orange',
      fruit2: '',
      fruit3: 'apple',
      fruit4: 'apple',
      fruit5: 'apple'
    }
  },
  methods: {
    show (val) {
      console.log(val)
    }
  }
}

</script>

<style lang="scss">
  @import '~@/assets/css/index'
</style>