import Badge from './badge'

Badge.install = (Vue) => {
  Vue.component(Badge.name, Badge)
}

export default Badge
