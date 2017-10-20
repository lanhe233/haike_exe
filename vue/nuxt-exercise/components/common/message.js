import Vue from 'vue'
// 创建构造器
let Constructor = Vue.extend(require('./message.vue'))
// let Constructor = Vue.extend({template: '<div>hello</div>'})
let func = (mes) => {
  // 服务端没有window/document，不加这句话有时候会报错
  if (Vue.prototype.$isServer) return
  // 创建 constructor 的实例，没有el选项则模板会渲染为文档之外的元素，后面需通过原生api插入到文档中
  let instance = new Constructor({
    data: {
      content: mes
    }
  })
  console.log(instance)
  instance.vm = instance.$mount()
  document.body.appendChild(instance.vm.$el)
  console.log(instance.vm.$el)
  console.log(instance)
  return instance.vm
}

export default func
