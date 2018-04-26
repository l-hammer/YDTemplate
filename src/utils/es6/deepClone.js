/**
 * Created by LHammer on 18/04/22.
 * ES6 version
 * @method deepClone
 * @description Make a deep clone of JavaScript native types, like Object, Array, RegExp, Date as well as primitives.
 */
import clone from './clone';
import viewType from './viewType';

let deepcloneArray, deepcloneObject;

const deepClone = (val) => {
  switch (viewType(val)) {
    case 'object':
      return deepcloneObject(val);
    case 'array':
      return deepcloneArray(val);
    default:
      return clone(val);
  }
};

deepcloneObject = (object) => {
  const res = new object.constructor();
  for (const key in object) {
    if (key in object) {
      res[key] = deepClone(object[key]);
    }
  }
  return res;
};

deepcloneArray = (array) => {
  const {
    length,
  } = array;
  const res = new array.constructor(length);
  for (let i = 0; i < length; i++) {
    res[i] = deepClone(array[i]);
  }
  return res;
};

export default deepClone;

/**
 * e.g. test
 *
 * ------------ clone object S ------------
 * const obj = { foo: { bar: 1 } };
 * const cloneObj = clone(obj);
 * obj.foo.bar = 2;
 * console.log(cloneObj); // { foo: { bar: 2 } }
 * console.log(clone(obj)); //  foo: { bar: 2 } }
 * console.log(clone(obj).foo.bar === cloneObj.foo.bar); // false
 * ------------ clone object E ------------
 *
 * ------------ deepClone object S ------------
 * const deepObj = { foo: { bar: 1 } };
 * const cloneDeepObj = deepClone(deepObj);
 * deepObj.foo.bar = 2;
 * console.log(cloneDeepObj); // { foo: { bar: 1 } }
 * console.log(deepClone(deepObj)); //  foo: { bar: 2 } }
 * console.log(deepClone(deepObj).foo.bar === cloneDeepObj.foo.bar); // false
 * ------------ deepClone object E ------------
 *
 * ------------ clone array S ------------
 * const a = [1, 2, [3, 4]];
 * const cloneA = clone(a);
 * a[2].push(5);
 * console.log(cloneA); // [1, 2, [3, 4, 5]]
 * console.log(clone(a)); // [1, 2, [3, 4, 5]]
 * console.log(clone(a)[2][2] === cloneA[2][2]); // false
 * ------------ clone array E ------------
 *
 * ------------ deepClone array S ------------
 * const b = [1, 2, [3, 4]];
 * const cloneB = deepClone(b);
 * b[2].push(5);
 * console.log(cloneB); // [1, 2, [3, 4]]
 * console.log(deepClone(b)); // [1, 2, [3, 4, 5]]
 * console.log(deepClone(b)[2][2] === cloneB[2][2]); // false
 * ------------ deepClone array E ------------
 */
