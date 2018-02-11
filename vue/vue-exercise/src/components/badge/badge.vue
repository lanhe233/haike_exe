<template>
  <div :class="prefixCls">
    <slot></slot>
    <!-- <template v-if="!hidden && show">
      <sup v-if="isDot" :class="`${prefixCls}__content is-dot`"></sup>
      <sup v-else :class="`${prefixCls}__content`">{{currentValue}}</sup>
    </template> -->
    <sup :class="[`${prefixCls}__content`, {'is-dot': isDot}, {'is-fixed': $slots.default}]"
      v-show="!hidden && (currentValue || isDot)"
      v-text="currentValue"></sup>
  </div>
</template>

<script>
  export default {
    name: 'cl-badge',
    data() {
      return {
        prefixCls: 'cl-badge'
        // currentValue: '',
        // show: true
      }
    },
    props: {
      // value允许字符串和数字，数字与max搭配使用
      value: [String, Number],
      // value为数字时，到达最大值后使用 max+ 显示
      max: Number,
      // 是否显示小红点
      isDot: Boolean,
      // 是否隐藏标记
      hidden: Boolean
    },
    computed: {
      currentValue() {
        if (this.isDot) { return }

        let value = this.value

        if (typeof value === 'number' && this.max && value > this.max) {
          value = this.max + '+'
        }
        return value
      }
    }
    /*
    watch: {
      value: {
        immediate: true,
        handler(val) {
          if (typeof val === 'number' && this.max && val > this.max) {
            val = this.max + '+'
          }
          this.show = !(typeof val === 'number' && val === 0)
          this.currentValue = val
        }
      }
    },
    */
  }

  /*
  1.currentValue用computed比watch好，而且不必immediate
  2.sup标签可以只写一个，在computed里判断isDot直接return，然后使用v-text注入就不会显示undfined或者误多写的value
  3.为什么v-show不行？ 合并为一个标签再试 √
    另不需添加变量show控制，直接判断计算出来的currentValue是否为空或者存在isDot
  4.更改类名 cl-badge-sup 为 cl-badge__content
  5.考虑没有slot的情况，那就不必absolute了，直接放着inline-block; 且注意修改样式
  */
</script>