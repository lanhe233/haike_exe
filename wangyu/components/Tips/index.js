import Vue from 'vue'

const TipsConstructor = Vue.extend(require('./main.vue'))

export function Tips(options) {
  const tips = new TipsConstructor({
    data: options
  })
  const vm = tips.$mount()
  document.body.appendChild(vm.$el)
  vm.visible = true
  return vm
}
