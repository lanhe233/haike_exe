// 处理对象合并
// 函数的第一个参数为目标对象，依次将其他参数（对象）中的键值放到目标对象中去，后面的值会覆盖前面的
export default function(target) {
  // i = 1, 表示从第二个参数开始
  for (let i = 1, j = arguments.length; i < j; i++) {
    let source = arguments[i] || {};
    for (let prop in source) {
      // 只取不是从原型链上继承来的属性
      if (source.hasOwnProperty(prop)) {
        let value = source[prop];
        if (value !== undefined) {
          // 覆盖
          target[prop] = value;
        }
      }
    }
  }

  return target;
};
