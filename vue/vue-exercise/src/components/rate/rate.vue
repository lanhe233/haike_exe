<template>
  <div :class="[prefixCls, {'is-disabled': disabled}]">
    <span v-for="i in 5"
      :class="`${prefixCls}__item`"
      @mouseleave="handleMouse('')"
      @mousemove="handleMouseMove(i, $event)">
      <i class="iconfont"
        :class="[
          `icon-${hover >= i || (!hover && value / oneStar >= i) ? 'xing-on' : 'xing-off'}`,
          {'allow-half': allowHalf && (hover == i || (!hover && value / oneStar == i))}
        ]"
        @click="handleClick(i)">
        <i class="iconfont icon-xing-on"
          v-if="allowHalf && (hover == i || (!hover && value / oneStar == i))"
          :style="{width: width}"></i>
      </i>
    </span>
    <span v-if="showText || showScore"
      :class="`${prefixCls}__note`">{{showScore ? value : texts[value / oneStar - 1]}}</span>
  </div>
</template>

<script>
  export default {
    name: 'cl-rate',
    data() {
      return {
        prefixCls: 'cl-rate',
        // 记录鼠标滑过第几颗星星
        hover: '',
        width: 0
      }
    },
    props: {
      // v-model绑定的值
      value: {},
      // 最大分值
      max: {
        type: Number,
        default: 5
      },
      // 是否只读
      disabled: Boolean,
      // 是否允许半选
      allowHalf: Boolean,
      // 低等和中等分数的界限，值本身属于低分
      lowThreshold: {
        type: Number,
        default: 2
      },
      // 中等和高等分数的界限，值本身属于高分
      highThreshold: {
        type: Number,
        default: 4
      },
      // 是否显示辅助文字，若为真，则从texts数组中选取当前分数对应的内容
      showText: Boolean,
      texts: {
        type: Array,
        default() {
          return ['极差', '失望', '一般', '满意', '惊喜']
        }
      },
      // 是否显示当前分数，show-text和show-score不能同时为真 怎么实现？？？？？？？？
      showScore: Boolean,
      // 分数显示模板
      scoreTemplate: {
        type: String,
        default: '{value}'
      }
    },
    computed: {
      // iconClass() {
      //   return hover >= i || value >= i ? 'xing-on' : 'xing-off'
      // }
      oneStar() {
        return (this.max / 5).toFixed(1)
      }
    },
    watch: {
      // hover(val) {
      //   if (val) {

      //   }
      // }
    },
    methods: {
      handleMouse(i, e) {
        if (this.disabled) {
          return
        }
        this.hover = i
      },
      handleMouseMove(i, e) {
        this.hover = i
        if (this.allowHalf && e.target.className.match('iconfont')) {
          // e.offsetX的值为0~17，e.target.offsetWidth的值为18
          if (e.offsetX < e.target.offsetWidth / 2) {
            this.width = '50%'
          } else {
            this.width = '100%'
          }
        } else {
          this.width = '100%'
        }
        // if (e.target.className.match('iconfont')) {
        //   if(e.offsetX < e.target.offsetWidth / 2) {
        //     this.hover = i
        //     if (this.allowHalf) {

        //     }
        //   }
        //   console.log(e.offsetX, e.target.offsetWidth)
        // }
      },
      handleClick(i) {
        // ??? 没有小数时仍有1位小数合不合适
        let val = (this.oneStar * i).toFixed(1)
        if (this.value === val || this.disabled) {
          return
        }
        this.$emit('input', val)
        this.$emit('change', val)
      }
    }
  }
</script>