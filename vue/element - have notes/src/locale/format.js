import { hasOwn } from 'element-ui/src/utils/util';

// 匹配%{name}、{name}
const RE_NARGS = /(%|)\{([0-9a-zA-Z_]+)\}/g;
/**
 *  String format template
 *  - Inspired:
 *    https://github.com/Matt-Esch/string-template/index.js
 */
// 传入的参数是Vue，此函数返回一个函数
// Vue的作用是啥，没用到啊
export default function(Vue) {
  /**
   * template
   *
   * @param {String} string
   * @param {Array} ...args
   * @return {String}
   */
  function template(string, ...args) {
    // 处理第二个参数传数组或对象的情况
    if (args.length === 1 && typeof args[0] === 'object') {
      args = args[0];
    }

    // 处理没有传参数或者参数不是对象的情况
    if (!args || !args.hasOwnProperty) {
      args = {};
    }

    // 替换匹配到的参数
    return string.replace(RE_NARGS, (match, prefix, i, index) => {
      // 正则：/(%|)\{([0-9a-zA-Z_]+)\}/g
      // match 匹配整个正则表达式的字符串
      // prefix 匹配第一个子串的字符串
      // i 匹配第二个子串的字符串
      // index 匹配整个正则表达式的字符串出现的下标
      // 如果原字符串中有多处匹配，每一个匹配处都会执行一遍此函数，因此不会一次匹配完直接返回个数组什么的
      let result;

      if (string[index - 1] === '{' &&
        string[index + match.length] === '}') {
        // 判断字符串 i 前后是否被 {} 包围，是的话直接返回 i
        // 形如 {{ val }} 直接返回， { val } 不进行解析
        return i;
      } else {
        // ？？？？？
        // 取得相应的值进行替换，不存在的话则替换为空
        result = hasOwn(args, i) ? args[i] : null;
        if (result === null || result === undefined) {
          return '';
        }

        return result;
      }
    });
  }

  // 返回该函数
  return template;
}
