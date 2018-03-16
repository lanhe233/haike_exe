<template>
<div class="checkbox-wrapper" :class="{'is-checked': isChecked}" @click="change">
  <div class="checkbox">
    <i class="checkbox-icon"></i>
  </div>
  <span class="label"><slot></slot></span>
</div>
</template>

<script>
export default {
  name: 'checkbox',
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {

    }
  },
  computed: {
    isChecked() {
      return this.value
    }
  },
  methods: {
    change() {
      const isChecked = !this.isChecked
      this.$emit('input', isChecked)
      this.$emit('change', isChecked)
    }
  }
}
</script>
