// util 表示工具性质的函数

const hasOwnProperty = Object.prototype.hasOwnProperty;

export function noop() {};

// 判断对象自身属性中是否具有指定的属性
export function hasOwn(obj, key) {
  // 为啥不直接用 obj.hasOwnProperty(key)... --
  return hasOwnProperty.call(obj, key);
};

// 合并对象
// Object.assign...
function extend(to, _from) {
  for (let key in _from) {
    to[key] = _from[key];
  }
  return to;
};

// 将数组转化为对象
export function toObject(arr) {
  var res = {};
  for (let i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res;
};

// 根据路径从对象中获取数据，路径可为多级路径，例'parent.child'
export const getValueByPath = function(object, prop) {
  prop = prop || '';
  const paths = prop.split('.');
  // 后续对object有自赋值操作，因此...赋值符号直接赋值会导致原参数object被改变吧？实测，不会
  let current = object;
  let result = null;
  for (let i = 0, j = paths.length; i < j; i++) {
    const path = paths[i];
    if (!current) break;

    // 当paths数组只有一个值时执行
    if (i === j - 1) {
      // 直接取对象中的path键值返回
      result = current[path];
      break;
    }
    // 多级路径则依次取下去
    current = current[path];
  }
  return result;
};

// 根据路径从对象中获取数据（一个对象，包含原对象、指定键名、指定键值），
// 路径可为多级路径，例'parent.child'、'parent[child]'
export function getPropByPath(obj, path, strict) {
  let tempObj = obj;
  // \w：任意一个字母、数字或下划线
  // 此处将obj[key]形式的路径转化为obj.key形式
  path = path.replace(/\[(\w+)\]/g, '.$1');
  // 此处防止上一步中开头出现了小圆点
  path = path.replace(/^\./, '');

  let keyArr = path.split('.');
  let i = 0;
  for (let len = keyArr.length; i < len - 1; ++i) {
    // strict看起来只能为true的样子... 意义？
    if (!tempObj && !strict) break;
    let key = keyArr[i];
    // 加这一步干啥。。上一个函数也没加啊
    if (key in tempObj) {
      tempObj = tempObj[key];
    } else {
      if (strict) {
        throw new Error('please transfer a valid prop path to form item!');
      }
      break;
    }
  }
  return {
    // 原对象
    o: tempObj,
    // 指定键名
    k: keyArr[i],
    // 指定键值
    v: tempObj ? tempObj[keyArr[i]] : null
  };
};

// 取随机数并且向下取整
export const generateId = function() {
  return Math.floor(Math.random() * 10000);
};

// 判断两个数组是否相等
export const valueEquals = (a, b) => {
  // see: https://stackoverflow.com/questions/3115982/how-to-check-if-two-arrays-are-equal-with-javascript
  if (a === b) return true;
  if (!(a instanceof Array)) return false;
  if (!(b instanceof Array)) return false;
  if (a.length !== b.length) return false;
  for (let i = 0; i !== a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
};
