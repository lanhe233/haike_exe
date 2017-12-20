<template>
  <div class="cl-radio-group">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'cl-radio-group',
    props: {
      value: {},
      disabled: Boolean
    }
  }
</script>