// 引入默认语言——简体中文
import defaultLang from 'element-ui/src/locale/lang/zh-CN';
import Vue from 'vue';
// 引入deepmerge库，用来深度合并对象
import deepmerge from 'deepmerge';
// 格式化，这里其实是字符串模板
import Format from './format';

// 构造模板函数
const format = Format(Vue);
// 语言设置为默认语言
let lang = defaultLang;
// 标识是否合并过
let merged = false;
let i18nHandler = function() {
  // Object.getPrototypeOf 返回对象的原型
  // 获取vue-i18n的模板方法
  const vuei18n = Object.getPrototypeOf(this || Vue).$t;
  // 如果有引入vue-i18n则使用它
  if (typeof vuei18n === 'function' && !!Vue.locale) {
    if (!merged) {
      merged = true;
      Vue.locale(
        Vue.config.lang,
        deepmerge(lang, Vue.locale(Vue.config.lang) || {}, { clone: true })
      );
    }
    return vuei18n.apply(this, arguments);
  }
};

export const t = function(path, options) {
  let value = i18nHandler.apply(this, arguments);
  if (value !== null && value !== undefined) return value;

  const array = path.split('.');
  let current = lang;

  for (let i = 0, j = array.length; i < j; i++) {
    const property = array[i];
    value = current[property];
    if (i === j - 1) return format(value, options);
    if (!value) return '';
    current = value;
  }
  return '';
};

export const use = function(l) {
  lang = l || lang;
};

export const i18n = function(fn) {
  i18nHandler = fn || i18nHandler;
};

export default { use, t, i18n };
