/**
 * Created by LHammer on 18/03/04.
 * ES5 version
 * @function arrayPull 删除数组中指定的值
 */
var arrayPull = function (arr) {
  var len, key, _args, argState, pulled;
  for (len = arguments.length, _args = Array(len > 1 ? len - 1 : 0), key = 1; key < len; key++) {
    _args[key - 1] = arguments[key];
  }
  argState = Array.isArray(_args[0]) ? _args[0] : _args, pulled = arr.filter(function (v) {
    return !argState.includes(v);
  });
  arr.length = 0;
  pulled.forEach(function (v) {
    return arr.push(v);
  });
};

/**
 * e.g.
 * @returns myArray = [ 'b', 'd', 'e' ]
 */
const myArray = ['a', 'b', 'c', 'd', 'e'];
arrayPull(myArray, 'a', 'c');
