<template>
  <div>
    <cl-badge :value="count" :max="10">
      <cl-button @click="add">点击评论+1</cl-button>
    </cl-badge>
    <cl-badge value="new" class="ml30">
      <cl-button>评论</cl-button>
    </cl-badge>
    <cl-badge is-dot class="ml30">
      <cl-button>评论</cl-button>
    </cl-badge>
    <cl-badge :value="12" :max="10" class="ml30 mt10"></cl-badge>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        count: 0
      }
    },
    methods: {
      add() {
        this.count++
      }
    }
  }
</script>