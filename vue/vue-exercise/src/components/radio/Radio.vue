<template>
  <label class="cl-radio"
    :class="[
      { 'is-checked' : model === label },
      { 'is-disabled' : isDisabled }
    ]">
    <input class="cl-radio__origin" 
      type="radio"
      :value="label"
      :disabled="isDisabled"
      v-model="model">
    <span class="cl-radio__adorn"></span>
    <span class="cl-radio__label">
      <slot></slot>
      <template v-if="!$slots.default">{{label}}</template>
    </span>
  </label>
</template>

<script>
  import emitter from '@/js/mixins/emitter'

  export default {
    name: 'cl-radio',
    mixinx: [emitter],
    data () {
      return {
        checked: true,
        parent: {}
      }
    },
    props: {
      disabled: Boolean,
      label: [String, Number],
      value: {}
    },
    computed: {
      isGroup () {
        let parent = this.$parent
        while (parent && parent.$options.name !== 'cl-radio-group') {
          parent = parent.$parent
        }
        if (parent && parent.$options.name === 'cl-radio-group') {
          this.parent = parent
          return true
        }
        return false
      },
      model: {
        get () {
          console.log('触发了model的get')
          if (this.isGroup) {
            return this.parent.value
          }
          return this.value
        },
        set (val) {
          console.log('触发了model的set')
          if (this.isGroup) {
            this.dispatch('cl-radio-group', 'input', [val])
          } else {
            console.log(val)
            this.$emit('input', val)
          }
        }
      },
      isDisabled () {
        if (this.isGroup) {
          return this.parent.disabled || this.disabled
        }
        return this.disabled
      }
    }
  }
</script>

<style lang="scss">
  @import '~@/assets/css/main'
</style>