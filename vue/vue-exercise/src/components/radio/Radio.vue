<template>
  <label class="cl-radio"
    :class="{
      'is-checked': model === label,
      'is-disabled': isDisabled
    }">
    <input class="cl-radio__origin" 
      type="radio"
      :value="label"
      :disabled="isDisabled"
      :name="name"
      v-model="model">
    <span class="cl-radio__adorn"></span>
    <span class="cl-radio__label"><slot></slot><template v-if="!$slots.default">{{label}}</template></span>
  </label>
</template>

<script>
  export default {
    name: 'cl-radio',
    data () {
      return {
        parent: {}
      }
    },
    props: {
      disabled: Boolean,
      label: [String, Number],
      value: {},
      name: {}
    },
    computed: {
      isGroup () {
        let parent = this.$parent
        while (parent) {
          if (parent.$options.name !== 'cl-radio-group') {
            parent = parent.$parent
          } else {
            this.parent = parent
            return true
          }
        }
        return false
      },
      model: {
        get () {
          return this.isGroup ? this.parent.value : this.value
        },
        set (val) {
          if (this.isGroup) {
            this.parent.$emit('input', val)
            this.parent.$emit('change', val)
          } else {
            this.$emit('input', val)
          }
        }
      },
      isDisabled () {
        return (this.isGroup ? this.parent.disabled : false) || this.disabled
      }
    }
  }
</script>

<style lang="scss">
  // @import '~@/assets/css/main'
</style>