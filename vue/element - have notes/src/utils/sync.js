const SYNC_HOOK_PROP = '$v-sync';

/**
 * v-sync 指令
 * v-sync directive
 * 用来同步组件的prop和它上下文中的变量的
 * 这里面有一个非常有趣的小技巧：$watch会返回一个unwatch的函数来取消监听。
 *
 * Usage:
 *  v-sync:component-prop="context prop name"
 *
 * If your want to sync component's prop "visible" to context prop "myVisible", use like this:
 *  v-sync:visible="myVisible"
 */
export default {
  // 只调用一次，指令第一次绑定到元素时使用，可以进行一次性的初始化设置
  //    el       指令所绑定的元素，可用来直接操作dom
  //    binding: 对象
  //      {
  //         name：指令名，不包括'v-'前缀,
  //         value: 指令的绑定值，如 v-sync="1+1"，value为2,
  //         olaValue: 指令绑定的前一个值，仅在update和componentUpdated钩子中可用,
  //         expression: 字符串形式的指令表达式，如 v-sync="1+1"，expression为'1+1',
  //         arg: 传给指令的参数，可选，如 v-sync:visible='1+1'，arg为'visible'（真的是'visible'，而不是visible绑定的值）,
  //         modifiers: 一个包含修饰符的对象，如 v-sync.foo.bar，modifiers为 { foo: true, bar: true }
  //      }
  //    vnode    Vue编译生成的虚拟节点
  //    oldValue 上一个虚拟节点，仅在update和componentUpdated钩子中可用
  bind(el, binding, vnode) {
    // 获取上下文，即组件渲染的作用域中
    const context = vnode.context;
    // 返回组件实例
    const component = vnode.child;
    // 返回表达式
    const expression = binding.expression;
    // 返回传参
    const prop = binding.arg;

    // v-sync指令必须传arg参数和expression值
    if (!expression || !prop) {
      console.warn('v-sync should specify arg & expression, for example: v-sync:visible="myVisible"');
      return;
    }

    // 判断是否包含$watch来确认是Vue的组件
    if (!component || !component.$watch) {
      console.warn('v-sync is only available on Vue Component');
      return;
    }

    // 将组件传的参prop与上下文中的expression同步（添加watch函数监听），同时返回这个函数，可以用于取消监听
    const unwatchContext = context.$watch(expression, (val) => {
      component[prop] = val;
    });

    // 将上下文中的expression与组件传的参prop同步
    const unwatchComponent = component.$watch(prop, (val) => {
      context[expression] = val;
    });

    // 将这两个函数存为不可枚举对象，存入组件实例中，方便unbind时调用
    Object.defineProperty(component, SYNC_HOOK_PROP, {
      value: {
        unwatchContext,
        unwatchComponent
      },
      enumerable: false
    });
  },

  // 只调用一次，指令与元素解绑时调用
  unbind(el, binding, vnode) {
    const component = vnode.child;
    // 删除watch监听
    if (component && component[SYNC_HOOK_PROP]) {
      const { unwatchContext, unwatchComponent } = component[SYNC_HOOK_PROP];
      unwatchContext && unwatchContext();
      unwatchComponent && unwatchComponent();
    }
  }
};
