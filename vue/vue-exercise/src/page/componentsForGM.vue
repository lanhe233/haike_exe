<!-- 页面入口文件 -->
<template>
  <div>
    <div id="app">
      <el-button @click="click">默认按钮</el-button>
      <el-button @click="click" type="primary">主要按钮</el-button>
      <el-button @click="click" type="text">文字</el-button>
      <br>
      <el-button @click="click" :disabled="true">默认按钮禁用</el-button>
      <el-button @click="click" :disabled="true" type="primary">主要按钮禁用</el-button>
      <el-button @click="click" :disabled="true" type="text">文字禁用</el-button>
      <br>
      <el-button @click="click" size="large">较大按钮</el-button>
    </div>
  </div>
</template>

<script>
// import ElButton from '@/components/common/button/button'

export default {
  name: 'app',
  data () {
    return {
    }
  },
  methods: {
    click () {
      console.log(1)
    }
  },
  components: {
    // ElButton
  }
}
</script>

<style lang="scss">

</style>
