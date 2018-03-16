<template>
<div class="select-wrapper">
  <div class="select-input">
    <input type="text" class="input" :value="value" readonly @click="selectShow=!selectShow"/>
    <i class="select-icon" :class="selectShow ? 'select':''"></i>
    <ul v-if="selectShow">
      <li v-for="(item,index) in selectList" @click="change(index)">{{item.text}}</li>
    </ul>
  </div>
</div>
</template>

<script>
export default {
  name: 'select',
  props: {
    value: {
      type: String,
      default: ''
    },
    selectList: {
      default: []
    }
  },
  data() {
    return {
      selectShow: false
    }
  },
  methods: {
    change(index) {
      this.selectShow = false
      this.$emit('change', {'value': this.selectList[index].value, 'text': this.selectList[index].text})
    }
  }
}
</script>
