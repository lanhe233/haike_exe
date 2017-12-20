<template>
  <label class="cl-checkbox"
    :class="{
      'is-checked': model,
      'is-disabled': isDisabled
    }">
    <input class="cl-checkbox__origin" 
      type="checkbox" 
      :name="name"
      :value="value"
      :disabled="isDisabled"
      v-model="model">
    <span class="cl-checkbox__adorn"></span>
    <span class="cl-checkbox__label"><slot><template v-if="!$slots.default">{{label}}</template></slot></span>
  </label>
</template>

<script>
  export default {
    name: 'cl-checkbox',
    data () {
      return {
        checked: false,
        parent: null
      }
    },
    props: {
      label: null,
      value: null,
      name: String,
      disabled: Boolean
    },
    computed: {
      isGroup () {
        let parent = this.$parent

        while (parent && parent.$options.name !== 'cl-checkbox-group') {
          parent = parent.$parent
        }
        if (parent && parent.$options.name === 'cl-checkbox-group') {
          this.parent = parent
          return true
        }
        return false
      },
      // 给model分别写set和get方法，才能实现父元素赋初值
      model: {
        get () {
          return this.isGroup ? Array.from(this.parent.value).includes(this.label) : this.value
        },
        set (val) {
          if (this.isGroup) {
            let arr = Array.from(this.parent.value)
            val ? arr.push(this.label) : arr.splice(arr.indexOf(this.label), 1)
            // if (val) {
            //   if (this.parent.max) {
            //     let count = arr.length
            //     if (count + 1 < max) {
            //       arr.push(this.label)
            //     } else {
            //       return false
            //     }
            //   }
            // } else {
            //   arr.splice(arr.indexOf(this.label), 1)
            // }
            this.parent.$emit('input', arr)
          } else {
            this.$emit('input', val)
          }
        }
      },
      isDisabled () {
        return this.isGroup ? this.parent.disabled || this.disabled : this.disabled
      }
    }
  }
</script>

<style lang="scss">
  @import '~@/assets/css/main'
</style>