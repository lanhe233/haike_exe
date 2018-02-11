<template>
  <button
    class="cl-button"
    :class="[{'is-plain' : plain}, `cl-button--${type}`, buttonSize, {'is-loading' : loading}]"
    :disabled="disabled"
    @click="onclick">
    <i v-if="iconClass || loading" :class="loading ? 'iconfont icon-loading' : iconClass"></i>
    <span><slot></slot></span>
  </button>
</template>

<script>
  export default {
    name: 'cl-button',
    data () {
      return {
      }
    },
    computed: {
      className () {
        return `cl-button--${this.type}`
      },
      buttonSize () {
        return this.size ? `cl-button--${this.size}` : ''
      }
    },
    props: {
      type: {
        type: String,
        default: 'default'
      },
      iconClass: {
        type: String
      },
      disabled: {
        type: Boolean,
        default: false
      },
      plain: {
        type: Boolean,
        default: false
      },
      size: {
        type: String
      },
      loading: {
        type: Boolean,
        default: false
      },
      click: {
        type: Function
      }
    },
    methods: {
      onclick () {
        this.$emit('click')
      }
    }
  }
</script>

<style lang="scss">
  // @import '~@/assets/css/main'
</style>