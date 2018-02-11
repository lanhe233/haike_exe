<template>
  <li class="el-option"
    :class="{active: index == parent.indexActive}"
    @click.stop="handleClick">
    <span>{{label}}</span>
  </li>
</template>

<script>
  export default {
    name: 'el-option',
    data () {
      return {
        index: -1
      }
    },
    computed: {
      parent() {
        let result = this.$parent;
        while (!result.name === 'el-select') {
          result = result.$parent;
        }
        return result;
      }
    },
    props: {
      label: String,
      value: [String, Number]
      // isActive: Boolean
    },
    methods: {
      handleClick () {
        this.parent.$emit.apply(this.parent, ['selectItem', this]);
        // this.parent.selectItem(this);
        // this.parent.indexActive = this.parent.options.indexOf(this);
      }
    },
    created () {
      this.parent.options.push(this);
      // this.parent.cachedOptions.push(this);
      // this.parent.optionsCount++;
      // this.parent.filteredOptionsCount++;
      this.index = this.parent.options.indexOf(this);
      // this.$on('queryChange', this.queryChange);
      // this.$on('handleGroupDisabled', this.handleGroupDisabled);
      // this.$on('resetIndex', this.resetIndex);
    }
  }
</script>