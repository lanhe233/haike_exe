<template>
  <div>
    <cl-rate v-model="value" showScore :max="11" allow-half></cl-rate>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        value: 4.5
      }
    },
    methods: {
    }
  }
</script>