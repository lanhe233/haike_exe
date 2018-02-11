<template>
  <transition name="message" @after-leave="destroy">
    <div class="cl-message" v-if="show"
      @mouseenter="stopTimer"
      @mouseleave="beginTimer">
      <i :class="'cl-message__icon iconfont icon-' + type"></i>
      <i class="cl-message__close iconfont icon-error" @click="close" v-if="showClose"></i>
      <div class="cl-message__content">{{message}}</div>
    </div>
  </transition>
</template>

<script>
  export default {
    data () {
      return {
        message: '',
        show: false,
        type: 'info',
        duration: 3000,
        showClose: false,
        timer: null,
        onclose: null
      }
    },
    methods: {
      beginTimer () {
        if (this.duration > 0) {
          this.timer = setTimeout(() => {
            this.close()
          }, this.duration)
        }
      },
      close () {
        this.show = false
        if (typeof this.onclose === 'function') {
          this.onclose(this)
        }
      },
      destroy () {
        this.$destroy()
        this.$el.parentNode.removeChild(this.$el)
      },
      stopTimer () {
        clearTimeout(this.timer)
      }
    },
    mounted () {
      this.show = true
      this.beginTimer()
    }
  }
</script>

<style lang="scss">
  // @import '~@/assets/css/main.scss'
</style>
