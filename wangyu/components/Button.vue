<template>
<button :class="btnClass" :style="style" @click="click" :disabled="disabled"><slot></slot></button>
</template>

<script>
export default {
  name: 'btn',
  props: {
    type: {
      type: String,
      default: 'default'
    },
    width: {
      type: String,
      default: '120px'
    },
    size: {
      type: String,
      default: 'px'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },
  computed: {
    style() {
      return {
        width: this.width
      }
    },
    btnClass() {
      return {
        'btn-px': this.size === 'px',
        'btn-rem': this.size === 'rem',
        'default': this.type === 'default',
        'primary': this.type === 'primary'
      }
    }
  },
  methods: {
    click() {
      this.$emit('click')
    }
  }
}
</script>
