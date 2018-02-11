import Vue from 'vue';

let scrollBarWidth;

// 计算滚动条宽度，不同浏览器会有不同，只需计算一次即可
export default function() {
  if (Vue.prototype.$isServer) return 0;
  // 只要计算过一次scrollBarWidth，就不会再计算
  if (scrollBarWidth !== undefined) return scrollBarWidth;

  // 新建dom
  const outer = document.createElement('div');
  // 设置类名
  outer.className = 'el-scrollbar__wrap';
  // 设置隐藏
  outer.style.visibility = 'hidden';
  // 设置宽度
  outer.style.width = '100px';
  // 设置绝对定位
  outer.style.position = 'absolute';
  // 设置top远在 '-9999px'
  outer.style.top = '-9999px';
  // 将该dom插入body中
  document.body.appendChild(outer);

  // 获取dom设置的宽度
  const widthNoScroll = outer.offsetWidth;
  // 设置dom的overflow属性为'scroll'
  outer.style.overflow = 'scroll';

  // 再新建一个放里面的dom，用作滚动块
  const inner = document.createElement('div');
  // 设置滚动块宽度100%
  inner.style.width = '100%';
  // 将滚动块append到outer中去
  outer.appendChild(inner);

  const widthWithScroll = inner.offsetWidth;
  outer.parentNode.removeChild(outer);
  // 计算有滚动条的整体宽度 - 去掉滚动条的宽度 = 滚动条宽度
  scrollBarWidth = widthNoScroll - widthWithScroll;

  return scrollBarWidth;
};
