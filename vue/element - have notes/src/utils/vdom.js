// hasOwn 判断对象中是否含有指定属性
import { hasOwn } from 'element-ui/src/utils/util';

// 判断传入的参数是否是VNode，通过传入的对象是否有componentOptions属性来判断
// 参考 https://cn.vuejs.org/v2/guide/render-function.html
// 例
//    h('p', null, [
//      h('span', null, '内容可以是 '),
//      h('i', { style: 'color: teal' }, 'VNode')
//    ]
export function isVNode(node) {
  return node !== null && typeof node === 'object' && hasOwn(node, 'componentOptions');
};

// 此函数仅tooltip组件的render选项中用到，不明其义？？？？？？？？
export function getFirstComponentChild(children) {
  // children是一个VNode格式的数组
  // 循环这个数组，如果对象有tag键，则保留这个对象在数组中
  // 并返回有tag的第一个值（对象）
  return children && children.filter(c => c && c.tag)[0];
};
