<template>
  <div>
    <h3>测试computed setter属性</h3>
    <input type="text" v-model="firstName">
    <input type="text" v-model="lastName">
    <div>fullName：{{fullName}}</div>
    <button @click="fullName = want">设置fullName为{{want}}</button>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        firstName: '',
        lastName: '',
        want: 'si li'
      }
    },
    computed: {
      fullName: {
        get () {
          return this.firstName + ' ' + this.lastName
        },
        set () {
          let arr = this.want.split(' ')
          this.firstName = arr[0]
          this.lastName = arr[1]
        }
      }
    }
  }
</script>

<style lang="scss">
  @import '~@/assets/css/newDocReview/style'
</style>