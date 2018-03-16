<template>
  <div :class="switchClass" @click="change">
    <div class="circle-wrapper">
      <span class="circle"></span>
    </div>
    <div class="background"></div>
  </div>
</template>

<script>
export default {
  name: 'switch',
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },
  computed: {
    switchClass() {
      return {
        'switch-wrapper': true,
        'checked': this.isChecked
      }
    },
    isChecked() {
      return this.value
    }
  },
  methods: {
    change() {
      const isChecked = !this.isChecked
      this.$emit('input', isChecked)
      this.$emit('change')
    }
  }
}
</script>
