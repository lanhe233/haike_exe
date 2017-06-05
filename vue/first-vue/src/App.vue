<template>
  <div id="app">
    <!-- ./的意思是当前目录下，../的意思才是上一级目录下 -->
    <img src="./assets/logo.png" alt="">
    <!-- error1 标签名要和底下声明的components一样，大小写也要一样 -->
    <Hello></Hello>
  </div>
</template>

<script>
import Hello from './components/Hello'

//此模块只有一个export导出，所以写作export default{}是可以的
export default {
  // error2 不同的vue文件name不能一样！！！大小写不一样也不行！！！
  name: 'app', //这个name属性在上层没有用到？？
  components: {
    Hello
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
