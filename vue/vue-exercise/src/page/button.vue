<!-- 页面入口文件 -->
<template>
  <div>
    <div id="app">
      <button @click="info">按钮</button>
      <cl-button >默认按钮</cl-button>
      <cl-button 
        type="primary">默认按钮</cl-button>
      <cl-button 
        type="text">默认按钮</cl-button>
      <cl-button 
        type="success">成功按钮</cl-button>
      <cl-button 
        type="info">信息按钮</cl-button>
      <cl-button 
        type="error">错误按钮</cl-button>
      <cl-button 
        type="warning">警告按钮</cl-button>
      <cl-button 
        type="success" :plain="true">成功按钮</cl-button>
      <cl-button 
        type="info" :plain="true">信息按钮</cl-button>
      <cl-button 
        type="error" :plain="true">错误按钮</cl-button>
      <cl-button 
        type="warning" :plain="true">警告按钮</cl-button>
      <cl-button 
        type="success" :plain="true" :disabled="true">成功按钮</cl-button>
      <cl-button 
        type="info" :plain="true" :disabled="true">信息按钮</cl-button>
      <cl-button 
        type="error" :plain="true" :disabled="true">错误按钮</cl-button>
      <cl-button 
        type="warning" :plain="true" :disabled="true">警告按钮</cl-button>
      <cl-button  :disabled="true">默认按钮</cl-button>
      <cl-button 
        type="primary" :disabled="true">默认按钮</cl-button>
      <cl-button 
        type="text" :disabled="true">默认按钮</cl-button>
      <cl-button 
        type="success" :disabled="true">成功按钮</cl-button>
      <cl-button 
        type="info" :disabled="true">信息按钮</cl-button>
      <cl-button 
        type="error" :disabled="true">错误按钮</cl-button>
      <cl-button 
        type="warning" :disabled="true">警告按钮</cl-button>
      <cl-button 
        type="primary" 
        iconClass="iconfont icon-error">默认按钮</cl-button>
      <cl-button 
        type="primary" 
        iconClass="iconfont icon-error"></cl-button>
      <cl-button 
        type="primary" 
        size="large">大型按钮</cl-button>
      <cl-button 
        type="primary">正常按钮</cl-button>
      <cl-button 
        type="primary" 
        size="small">小型按钮</cl-button>
      <cl-button 
        type="primary" 
        size="mini">超小按钮</cl-button>
      <cl-button 
        type="primary" 
        :loading="true">加载按钮</cl-button>
      <cl-button @click="info">事件按钮</cl-button>

      <div class="mt20">
        <cl-button-group>
          <cl-button 
            type="primary">正常按钮</cl-button>
          <cl-button 
            type="primary">正常按钮</cl-button>
          <cl-button 
            type="primary">正常按钮</cl-button>
        </cl-button-group>
      </div>
    </div>
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

</style>
