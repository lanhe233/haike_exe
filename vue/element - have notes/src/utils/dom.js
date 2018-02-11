/* istanbul ignore next */

import Vue from 'vue';

const isServer = Vue.prototype.$isServer;
const SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g;
const MOZ_HACK_REGEXP = /^moz([A-Z])/;
// documentMode是IE8+特殊属性，返回浏览器渲染文档的模式（5 - IE5，6 - IE6等）。
const ieVersion = isServer ? 0 : Number(document.documentMode);

/* istanbul ignore next */
// 清除字符串前后空白函数
const trim = function(string) {
  // \s指空白，包含空格、换行、tab等
  // \uFEFF ES5 新增的空白符，叫「字节次序标记字符（Byte Order Mark）」，也就是 BOM
  return (string || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '');
};
/* istanbul ignore next */
// 将使用 :、-和_ 分隔的字符串使用驼峰法重新命名
const camelCase = function(name) {
  return name.replace(SPECIAL_CHARS_REGEXP, function(_, separator, letter, offset) {
    // _: 匹配整个正则表达式的字符串
    // separator：匹配的第一个子串，该参数可能有多个，由正则表达式中的子集个数决定
    // letter：匹配的第二个子串，该参数可能有多个，由正则表达式中的子集个数决定
    // offset：匹配整个正则表达式的字符串出现的下标
    // origin：原字符串
    // 如果原字符串中有多处匹配，每一个匹配处都会执行一遍此函数，因此不会一次匹配完直接返回个数组什么的
    // separator参数无作用，可省略，并将正则改为 /[\:\-\_]+(.)/g
    return offset ? letter.toUpperCase() : letter;
  }).replace(MOZ_HACK_REGEXP, 'Moz$1');
};

/* istanbul ignore next */
// 绑定事件，兼容IE8-写法
// 注意，这里是用立即执行函数包裹，立即计算出应该return的函数赋值给on，而不会等到调用on函数时才来计算
export const on = (function() {
  if (!isServer && document.addEventListener) {
    // addEventListener：W3C标准方法
    // 同一元素可多次绑定同一事件，先绑定的先执行
    return function(element, event, handler) {
      if (element && event && handler) {
        // 第三个参数， false：冒泡， true： 捕获
        element.addEventListener(event, handler, false);
      }
    };
  } else {
    // attachEvent方法：为兼容IE8-，事件名需加上'on'
    // 同一元素可多次绑定同一事件，先绑定的后执行，与addEventListener相反，想要执行顺序一致，绑定事件时可以反一下顺序
    return function(element, event, handler) {
      if (element && event && handler) {
        element.attachEvent('on' + event, handler);
      }
    };
  }
})();

/* istanbul ignore next */
// 解绑事件，兼容IE8-写法
export const off = (function() {
  if (!isServer && document.removeEventListener) {
    return function(element, event, handler) {
      if (element && event) {
        element.removeEventListener(event, handler, false);
      }
    };
  } else {
    return function(element, event, handler) {
      if (element && event) {
        element.detachEvent('on' + event, handler);
      }
    };
  }
})();

/* istanbul ignore next */
// 绑定只执行一次的事件
export const once = function(el, event, fn) {
  var listener = function() {
    if (fn) {
      // 传arguments进去干什么？
      fn.apply(this, arguments);
    }
    off(el, event, listener);
  };
  on(el, event, listener);
};

/* istanbul ignore next */
// 判断指定dom元素是否含有指定类名
export function hasClass(el, cls) {
  if (!el || !cls) return false;
  // cls只能为一个类名，不判断多个
  if (cls.indexOf(' ') !== -1) throw new Error('className should not contain space.');
  // classList：IE10+，类数组，本身只读，但拥有contains、add、remove、toggle等方法去改变类名
  if (el.classList) {
    return el.classList.contains(cls);
  } else {
    // 前后加空格再验证是为了防止出现 'text text-top' 这样的类名导致判断错误
    return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1;
  }
};

/* istanbul ignore next */
// 添加类名
export function addClass(el, cls) {
  if (!el) return;
  var curClass = el.className;
  var classes = (cls || '').split(' ');

  for (var i = 0, j = classes.length; i < j; i++) {
    var clsName = classes[i];
    // 防止参数cls中有两个以上空格，导致split出来的数组中有空字符串
    if (!clsName) continue;

    if (el.classList) {
      // el.classList.add(clsName)方法会自动检测是不是已经含有clsName
      el.classList.add(clsName);
    } else if (!hasClass(el, clsName)) {
      // 手动添加需检测是否已经含有clsName，防止重复添加
      curClass += ' ' + clsName;
    }
  }
  // 手动添加需要在循环结束后将值赋给el.className
  if (!el.classList) {
    el.className = curClass;
  }
};

/* istanbul ignore next */
// 删除类名
export function removeClass(el, cls) {
  if (!el || !cls) return;
  var classes = cls.split(' ');
  // 添加空格
  var curClass = ' ' + el.className + ' ';

  for (var i = 0, j = classes.length; i < j; i++) {
    var clsName = classes[i];
    if (!clsName) continue;

    if (el.classList) {
      el.classList.remove(clsName);
    } else if (hasClass(el, clsName)) {
      // 添加空格的用处
      curClass = curClass.replace(' ' + clsName + ' ', ' ');
    }
  }
  if (!el.classList) {
    // 赋值时删除空格
    el.className = trim(curClass);
  }
};

/* istanbul ignore next */
// 获取dom的指定样式值
// 知识点参考：http://www.zhangxinxu.com/wordpress/2012/05/getcomputedstyle-js-getpropertyvalue-currentstyle/
export const getStyle = ieVersion < 9 ? function(element, styleName) {
  if (isServer) return;
  if (!element || !styleName) return null;
  // 将需要查询的styleName统一驼峰命名
  styleName = camelCase(styleName);
  // float是js的保留字，无法使用style.float获得样式
  // 但chrome浏览器实测，style.float和style.cssFloat 均能取到值，且也能赋值
  // IE8-也可以不必单独测试float，使用element.currentStyle.getAttribute['float'];即可，与getPropertyValue不同的是，getAttribute支持驼峰写法和'-'分隔法！
  if (styleName === 'float') {
    // ie8-使用style.styleFloat，其他使用style.cssFloat，但经测试style.float是可行的
    styleName = 'styleFloat';
  }
  try {
    switch (styleName) {
      case 'opacity':
        try {
          return element.filters.item('alpha').opacity / 100;
        } catch (e) {
          return 1.0;
        }
      default:
        // element.style[styleName]仅能获取行内样式，可读可写
        // element.currentStyle[styleName]可以获取外联样式，只读
        return (element.style[styleName] || element.currentStyle ? element.currentStyle[styleName] : null);
    }
  } catch (e) {
    return element.style[styleName];
  }
} : function(element, styleName) {
  if (isServer) return;
  if (!element || !styleName) return null;
  styleName = camelCase(styleName);
  // IE9+也可以不必单独测试float，使用window.getComputedStyle(element, null).getPropertyValue("float");即可，但注意，getPropertyValue不支持驼峰写法！
  if (styleName === 'float') {
    styleName = 'cssFloat';
  }
  try {
    /** 
    /* document.defaultView.getComputedStyle(element, '')
    /* 或 window.getComputedStyle(element, '')
    /* 只读，不兼容IE8-，第二个参数为伪类（':after'）
    */
    var computed = document.defaultView.getComputedStyle(element, '');
    return element.style[styleName] || computed ? computed[styleName] : null;
  } catch (e) {
    return element.style[styleName];
  }
};

/* istanbul ignore next */
// 设置dom样式
export function setStyle(element, styleName, value) {
  if (!element || !styleName) return;

  if (typeof styleName === 'object') {
    for (var prop in styleName) {
      // hasOwnProperty会忽略从原型链上继承到的属性，in运算符不会
      if (styleName.hasOwnProperty(prop)) {
        setStyle(element, prop, styleName[prop]);
      }
    }
  } else {
    styleName = camelCase(styleName);
    if (styleName === 'opacity' && ieVersion < 9) {
      element.style.filter = isNaN(value) ? '' : 'alpha(opacity=' + value * 100 + ')';
    } else {
      element.style[styleName] = value;
    }
  }
};

// 好几个函数用到了递归方式处理传入的参数是数组、对象或者多个值组成的字符串，可参考
