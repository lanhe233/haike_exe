<template>
<transition name="tips">
  <div class="tips-wrapper" :class="iconClass" v-show="visible" ref="tips">
    <i :class="iconClass"></i>
    <span class="message">{{message}}</span>
  </div>
</transition>
</template>

<script>
export default {
  name: 'tips',
  data() {
    return {
      type: 'success',
      message: '',
      visible: false,
      duration: 3000,
      closed: false
    }
  },
  watch: {
    closed(val) {
      const self = this
      if (val) {
        self.visible = false
        self.$el.addEventListener('transitionend', self.destroy)
      }
    }
  },
  computed: {
    iconClass() {
      return {
        icon: true,
        success: this.type === 'success',
        warning: this.type === 'warning',
        error: this.type === 'error',
        loading: this.type === 'loading'
      }
    }
  },
  methods: {
    destroy() {
      const self = this
      self.$el.removeEventListener('transitionend', self.destroy)
      self.$destroy(true)
      document.body.removeChild(self.$el)
    },
    startTimer() {
      const self = this
      if (self.duration > 0) {
        setTimeout(() => {
          if (!self.closed) {
            self.closed = true
          }
        }, self.duration)
      }
    }
  },
  mounted() {
    this.startTimer()
  }
}
</script>
