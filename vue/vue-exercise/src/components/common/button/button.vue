<template>
  <button
    class="el-button"
    :class="[`el-button--${type}`, buttonSize]"
    :disabled="disabled"
    @click="onclick">
    <span><slot></slot></span>
  </button>
</template>

<script>
  export default {
    name: 'el-button',
    data () {
      return {
      }
    },
    computed: {
      buttonSize () {
        return this.size ? `el-button--${this.size}` : ''
      }
    },
    props: {
      type: {
        type: String,
        default: 'default'
      },
      disabled: {
        type: Boolean,
        default: false
      },
      size: {
        type: String
      },
      click: {
        type: Function
      }
    },
    methods: {
      onclick () {
        this.$emit('click')
      }
    }
  }
</script>

<style lang="scss">
  $color-blue: #1890ff;
  $color-hover: #40a9ff;
  $color-grey: #d9d9d9;
  $color-disabled: #c0c4cc;
  $color-disabled-border: #ebeef5;
  $color-disabled-primary: #a0cfff;

  .el-button {
    font-size: 14px;
    line-height: 1;
    padding: 8px 15px;
    border: 1px solid transparent;
    border-radius: 4px;
    cursor: pointer;
    outline: none;
    -webkit-appearance: none;
    white-space: nowrap;
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);

    &.el-button--large {
      font-size: 16px;
      padding: 10px 20px;
    }

    &:disabled, &:disabled:hover {
      cursor: not-allowed;
      color: $color-disabled;

      > span {
        pointer-events: none;
      }
    }

    &--default {
      border-color: $color-grey;
      background-color: #fff;

      &:hover {
        color: $color-hover;
        border-color: $color-hover;
      }
      &:disabled {
        border-color: $color-disabled-border;
      }
    }

    &--primary {
      color: #fff;
      border-color: $color-blue;
      background-color: $color-blue;

      &:hover {
        border-color: $color-hover; 
        background-color: $color-hover;

        &:disabled {
          color: #fff;
        }
      }

      &:disabled {
        color: #fff;
        border-color: $color-disabled-primary;
        background-color: $color-disabled-primary;
      }
    }

    &--text {
      color: $color-blue;
      background-color: transparent;
      padding-left: 0;
      padding-right: 0;

      &:hover {
        color: $color-hover; 
      }
    }
  }
</style>