<template>
<transition name="fade">
  <div class="setting-page" :class="className" v-if="visible">
<!--     <div class="back" @click="back">
      <span class="text">返回</span>
      <i class="icon"></i>
    </div> -->
    <slot></slot>
  </div>
</transition>
</template>

<script>
export default {
  name: 'setting',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    className: {
      type: String,
      default: 'login'
    }
  },
  computed: {
    visible() {
      return this.$store.state.settingPage
    }
  },
  methods: {
    back() {
      this.$store.commit('hideSettingPage')
    }
  }
}
</script>
