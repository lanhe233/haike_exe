// container有滚动条，滚动到指定位置dom
import Vue from 'vue';

export default function scrollIntoView(container, selected) {
  if (Vue.prototype.$isServer) return;
  // 如果指定dom不存在，则滚动条位于顶部
  if (!selected) {
    container.scrollTop = 0;
    return;
  }

  const top = selected.offsetTop;
  const bottom = selected.offsetTop + selected.offsetHeight;
  const viewRectTop = container.scrollTop;
  const viewRectBottom = viewRectTop + container.clientHeight;

  if (top < viewRectTop) {
    // 如果指定dom在当前container可视区域上方，则移动到当前dom处
    container.scrollTop = top;
  } else if (bottom > viewRectBottom) {
    // 如果指定dom在当前container可视区域下方，则滚动到可视区域底部正好是指定dom底部的位置
    container.scrollTop = bottom - container.clientHeight;
  }
}
