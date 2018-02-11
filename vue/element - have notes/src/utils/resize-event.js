// 监听元素的大小改变的
// 参考资料 https://zhuanlan.zhihu.com/p/24887312
//          https://www.jianshu.com/p/984cf10954ae
// 使用方法：
//     在当前页面mounted时
//         addResizeListener(this.$el, this.handleResize);
//     在当前页面beforeDestroy时
//         removeResizeListener(this.$el, this.handleResize);
//     其中，handleResize为在el大小改变时需要执行的函数

/* Modified from https://github.com/sdecima/javascript-detect-element-resize
 * version: 0.5.3
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2013 Sebastián Décima
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 */
const isServer = typeof window === 'undefined';

/* istanbul ignore next */
// requestAnimationFrame兼容写法
const requestFrame = (function() {
  if (isServer) return;
  const raf = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame ||
    function(fn) {
      return window.setTimeout(fn, 20);
    };
  return function(fn) {
    return raf(fn);
  };
})();

/* istanbul ignore next */
// cancelAnimationFrame兼容写法
const cancelFrame = (function() {
  if (isServer) return;
  const cancel = window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame || window.clearTimeout;
  return function(id) {
    return cancel(id);
  };
})();

/* istanbul ignore next */
// 重置触发器 ？？
const resetTrigger = function(element) {
  // 要重置的触发器
  const trigger = element.__resizeTrigger__;
  // firstElementChild / lastElementChild 没接触过的两个API
  // 第一个子元素，用来监听变大
  const expand = trigger.firstElementChild;
  // 最后一个子元素，用来监听变小
  const contract = trigger.lastElementChild;
  // 第一个子元素的第一个子元素，用来监听变大
  const expandChild = expand.firstElementChild;

  // 滚动到最右
  contract.scrollLeft = contract.scrollWidth;
  // 滚动到最下
  contract.scrollTop = contract.scrollHeight;
  // 保持宽度多1px
  expandChild.style.width = expand.offsetWidth + 1 + 'px';
  // 保持高度多1px
  expandChild.style.height = expand.offsetHeight + 1 + 'px';
  // 滚动到最右
  expand.scrollLeft = expand.scrollWidth;
  // 滚动到最下
  expand.scrollTop = expand.scrollHeight;
};

/* istanbul ignore next */
// ？？？
// 检测触发器状态，返回是否改变了大小
const checkTriggers = function(element) {
  // 高度或宽度不一致就返回true
  return element.offsetWidth !== element.__resizeLast__.width || element.offsetHeight !== element.__resizeLast__.height;
};

/* istanbul ignore next */
const scrollListener = function(event) {
  // 重置触发器
  // 注意，在此处使用中，this会指代调用该函数的对象，即element
  // element.addEventListener('scroll', scrollListener, true);
  resetTrigger(this);
  // 取消之前的回调
  if (this.__resizeRAF__) cancelFrame(this.__resizeRAF__);
  // 设置新的函数
  this.__resizeRAF__ = requestFrame(() => {
    // 如果改变了大小
    if (checkTriggers(this)) {
      // 重置宽度
      this.__resizeLast__.width = this.offsetWidth;
      // 重置高度
      this.__resizeLast__.height = this.offsetHeight;
      // 执行回调
      this.__resizeListeners__.forEach((fn) => {
        fn.call(this, event);
      });
    }
  });
};

/* Detect CSS Animations support to detect element display/re-attach */
// 通过检测CSS动画支持来检测元素的显示和重新加入 ？？？
const attachEvent = isServer ? {} : document.attachEvent;
const DOM_PREFIXES = 'Webkit Moz O ms'.split(' ');
// animationstart css动画开始前出发，同理有动画重复时触发、动画结束时触发
const START_EVENTS = 'webkitAnimationStart animationstart oAnimationStart MSAnimationStart'.split(' ');
const RESIZE_ANIMATION_NAME = 'resizeanim';
// 标记是否已经找到了支持的animation及其前缀属性
let animation = false;
// 存储找到的前缀
let keyFramePrefix = '';
// 存储animationstart事件名
let animationStartEvent = 'animationstart';

/* istanbul ignore next */
if (!attachEvent && !isServer) {
  // 用来检测相关特性的支持
  const testElement = document.createElement('fakeelement');
  // 如果支持animation的话，支持的话值为''而不是undefined
  if (testElement.style.animationName !== undefined) {
    // 如果浏览器支持原生'animation-name'的话，就不用执行下面的循环找出适配的前缀
    animation = true;
  }

  if (animation === false) {
    let prefix = '';
    for (var i = 0; i < DOM_PREFIXES.length; i++) {
      // 根据testElement来检测支持的前缀
      if (testElement.style[DOM_PREFIXES[i] + 'AnimationName'] !== undefined) {
        prefix = DOM_PREFIXES[i];
        keyFramePrefix = '-' + prefix.toLowerCase() + '-';
        animationStartEvent = START_EVENTS[i];
        animation = true;
        // 在浏览器不支持原生'animation-name'的情况下找到一个支持的前缀就退出
        break;
      }
    }
  }
}

let stylesCreated = false;
/* istanbul ignore next */
// 创建样式
const createStyles = function() {
  if (!stylesCreated && !isServer) {
    const animationKeyframes = `@${keyFramePrefix}keyframes ${RESIZE_ANIMATION_NAME} { from { opacity: 0; } to { opacity: 0; } } `;
    const animationStyle = `${keyFramePrefix}animation: 1ms ${RESIZE_ANIMATION_NAME};`;

    // opacity: 0 works around a chrome bug https://code.google.com/p/chromium/issues/detail?id=286360
    const css = `${animationKeyframes}
      .resize-triggers { ${animationStyle} visibility: hidden; opacity: 0; }
      .resize-triggers, .resize-triggers > div, .contract-trigger:before { content: \" \"; display: block; position: absolute; top: 0; left: 0; height: 100%; width: 100%; overflow: hidden; z-index: -1 }
      .resize-triggers > div { background: #eee; overflow: auto; }
      .contract-trigger:before { width: 200%; height: 200%; }`;

    const head = document.head || document.getElementsByTagName('head')[0];
    const style = document.createElement('style');

    style.type = 'text/css';
    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }

    head.appendChild(style);
    stylesCreated = true;
  }
};

/* istanbul ignore next */
// 添加大小更改监听，element：要监听的元素
export const addResizeListener = function(element, fn) {
  if (isServer) return;
  // 处理低版本IE
  // IE可直接在元素上绑定resize事件，监听元素大小的改变
  // 可应用于各种拥有布局（触发了hasLayout属性）的元素对象上。
  if (attachEvent) {
    element.attachEvent('onresize', fn);
  } else {
    // 如果没有触发器
    if (!element.__resizeTrigger__) {
      if (getComputedStyle(element).position === 'static') {
        // 将static改为relative
        element.style.position = 'relative';
      }
      createStyles();
      // 初始化触发器最后的状态
      element.__resizeLast__ = {};
      // 初始化触发器的监听器
      element.__resizeListeners__ = [];
      // 创建触发器
      const resizeTrigger = element.__resizeTrigger__ = document.createElement('div');
      resizeTrigger.className = 'resize-triggers';
      resizeTrigger.innerHTML = '<div class="expand-trigger"><div></div></div><div class="contract-trigger"></div>';
      // 添加触发器到dom
      element.appendChild(resizeTrigger);

      // 重置触发器
      resetTrigger(element);
      // 监听滚动事件
      element.addEventListener('scroll', scrollListener, true);

      /* Listen for a css animation to detect element display/re-attach */
      // 监听css动画来检测元素显示或重新添加
      if (animationStartEvent) {
        // 动画开始时执行
        resizeTrigger.addEventListener(animationStartEvent, function(event) {
          // 如果是大小改变事件 因为元素本身可能有animation属性
          if (event.animationName === RESIZE_ANIMATION_NAME) {
            // 重置触发器
            resetTrigger(element);
          }
        });
      }
    }
    // 加入该回调
    element.__resizeListeners__.push(fn);
  }
};

/* istanbul ignore next */
// 移除大小改变的监听
export const removeResizeListener = function(element, fn) {
  if (!element || !element.__resizeListeners__) return;
  // 处理低版本IE
  if (attachEvent) {
    element.detachEvent('onresize', fn);
  } else {
    // 移除对应的回调函数
    element.__resizeListeners__.splice(element.__resizeListeners__.indexOf(fn), 1);
    // 如果全部事件被移除
    if (!element.__resizeListeners__.length) {
      // 移除滚动监听
      element.removeEventListener('scroll', scrollListener);
      // 移除对应的触发器，但保留下来 ？？？？？
      element.__resizeTrigger__ = !element.removeChild(element.__resizeTrigger__);
    }
  }
};
