<template>
  <div class="el-select"
    @click="handleClick"
    >
    <el-input
      v-model="selectedLabel"
      :placeholder="placeholder"
      :readonly="true"
      :disabled="disabled"></el-input>
    <span class="el-select__suffix iconfont"
      :class="[ `icon-${suffixIcon}`,
        suffixIcon === 'xiajiantou' ? 'no-pointer' : '',
        {
          rotate: rotate,
        }
      ]"></span>
    <ul class="el-option__group"
      v-show="visible">
      <slot></slot>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'el-select',
    data () {
      return {
        rotate: false,
        suffixIcon: 'xiajiantou',
        selectedLabel: '',
        visible: false,
        options: [],
        indexActive: -1
      }
    },
    computed: {
      
    },
    props: {
      name: String,
      value: {
        required: true
      },
      placeholder: String,
      multiple: Boolean,
      disabled: Boolean,
      clearable: Boolean
    },
    methods: {
      handleBlur () {
        this.rotate = this.visible = false
      },
      handleClick () {
        if (this.disabled) {
          return
        }
        this.rotate = !this.rotate
        this.visible = !this.visible
      },
      selectItem (item) {
        this.handleBlur()
        this.indexActive = this.options.indexOf(item)
        this.selectedLabel = item.label
        this.$emit('input', this.options[this.indexActive].value)
      }
    },
    created () {
      this.$on('selectItem', this.selectItem)
    }
  }
</script>