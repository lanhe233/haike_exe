export default {
  methods: {
    dispatch (componentName, eventName, paramsArr) {
      let parent = this.$parent || this.$root
      while (parent && parent.$options.name !== componentName) {
        parent = parent.$parent
      }
      if (parent && parent.$options.name === componentName) {
        parent.$emit.apply(parent, [eventName].concat(paramsArr))
      }
    }
  }
}
