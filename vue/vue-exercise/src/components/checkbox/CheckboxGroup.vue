<template>
  <div class="cl-checkbox-group">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'cl-checkbox-group',
    props: {
      value: Array,
      disabled: Boolean,
      min: Number,
      max: Number
    }
  }
</script>