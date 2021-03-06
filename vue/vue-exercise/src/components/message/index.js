import Vue from 'vue'
// 创建构造器
let Constructor = Vue.extend(require('./Message.vue'))

let func = (opts = {}) => {
  // 服务端没有window/document，不加这句话有时候会报错
  // if (Vue.prototype.$isServer) return
  // 创建 constructor 的实例，没有el选项则模板会渲染为文档之外的元素，后面需通过原生api插入到文档中
  if (typeof opts === 'string') {
    opts = {
      message: opts
    }
  }
  let instance = new Constructor({
    data: opts
  })
  instance.$mount()
  document.body.appendChild(instance.$el)
  return instance
}

['info', 'error', 'warning', 'success'].forEach(type => {
  func[type] = opts => {
    if (typeof opts === 'string') {
      opts = {
        message: opts,
        type
      }
    }
    opts.type = type
    return func(opts)
  }
})

export default func
