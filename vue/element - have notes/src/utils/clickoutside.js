// 绕了好几圈来绑定需要执行的函数。。。
// iview的简洁多了

import Vue from 'vue';
// on，绑定事件方法
import { on } from 'element-ui/src/utils/dom';

const nodeList = [];
const ctx = '@@clickoutsideContext';

let startClick;
let seed = 0;

// 绑定鼠标按下事件，将event赋值给startClick
!Vue.prototype.$isServer && on(document, 'mousedown', e => (startClick = e));

// 绑定鼠标抬起事件，循环nodeList数组，执行每个node绑定的指令函数
!Vue.prototype.$isServer && on(document, 'mouseup', e => {
  nodeList.forEach(node => node[ctx].documentHandler(e, startClick));
});


function createDocumentHandler(el, binding, vnode) {
  return function(mouseup = {}, mousedown = {}) {
    if (!vnode ||
      !vnode.context ||
      !mouseup.target ||
      !mousedown.target ||
      // 判断一个dom是否包含另一个dom用contains()
      el.contains(mouseup.target) ||
      el.contains(mousedown.target) ||
      // 判断是否是同一个dom可以直接用相等符号===
      el === mouseup.target ||
      (vnode.context.popperElm &&
      (vnode.context.popperElm.contains(mouseup.target) ||
      vnode.context.popperElm.contains(mousedown.target)))) return;

    if (binding.expression &&
      el[ctx].methodName &&
      vnode.context[el[ctx].methodName]) {
      vnode.context[el[ctx].methodName]();
    } else {
      el[ctx].bindingFn && el[ctx].bindingFn();
    }
  };
}

/**
 * v-clickoutside
 * @desc 点击元素外面才会触发的事件
 * @example
 * ```vue
 * <div v-element-clickoutside="handleClose">
 * ```
 */
export default {
  bind(el, binding, vnode) {
    // 所有绑定过该指令的元素dom都存入nodeList数组里
    nodeList.push(el);
    // 添加id标记
    const id = seed++;
    // 给el添加一个自定义的属性
    el[ctx] = {
      id,
      documentHandler: createDocumentHandler(el, binding, vnode),
      // 指令绑定的函数名
      methodName: binding.expression,
      // 指令绑定的函数
      bindingFn: binding.value
    };
  },

  update(el, binding, vnode) {
    el[ctx].documentHandler = createDocumentHandler(el, binding, vnode);
    el[ctx].methodName = binding.expression;
    el[ctx].bindingFn = binding.value;
  },

  unbind(el) {
    let len = nodeList.length;

    for (let i = 0; i < len; i++) {
      if (nodeList[i][ctx].id === el[ctx].id) {
        nodeList.splice(i, 1);
        break;
      }
    }
    delete el[ctx];
  }
};
