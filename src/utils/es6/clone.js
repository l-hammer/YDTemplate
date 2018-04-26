/**
 * Created by LHammer on 18/04/22.
 * ES6 version
 * @method clone
 * @description Make a shallow clone of an object, array or primitive(Undefined、Null、Boolean、Number、String).
 */
import viewType from './viewType';

const cloneRegexp = (val) => {
  const re = new val.constructor(val.source, val.flags);
  re.lastIndex = val.lastIndex;
  return re;
};

const clone = (val) => {
  switch (viewType(val)) {
    case 'object':
      return Object.assign({}, val);
    case 'array':
      return val.slice();
    case 'date':
      return new val.constructor(val.getTime());
    case 'set':
      return new Set(val);
    case 'map':
      return new Map(val);
    case 'regexp':
      return cloneRegexp(val);
    default:
      return val;
  }
};

export default clone;

/**
 * e.g. test
 *
 * console.log(clone(0)); // 0
 * console.log(clone(0) === 0); // true
 * console.log(clone('foo')); // 'foo'
 * console.log(clone('foo') === 'foo'); // true
 *
 * const obj = { foo: 1 };
 * const cloneObj = clone(obj);
 * obj.foo = 2;
 * console.log(cloneObj); // {foo: 1}
 * console.log(clone(obj)); // {foo: 2}
 * console.log(clone(obj) === obj); // false
 *
 * const a = [1, 2, 3];
 * const clonea = clone(a);
 * a.push(5);
 * console.log(clonea); // [1, 2, 3]
 * console.log(clone(a)); // [1, 2, 3, 5]
 * console.log(clone(a) === a); // false
 * const foo = function () {};
 * console.log(clone(foo));
 * console.log(clone(foo) === foo);
 *
 * const date = new Date('2018/04/22');
 * const cloneDate = clone(date);
 * console.log(cloneDate); // Sun Apr 22 2018 00:00:00 GMT+0800 (CST)
 * date.setMonth(9);
 * console.log(cloneDate); // Sun Apr 22 2018 00:00:00 GMT+0800 (CST)
 * console.log(date); // Mon Oct 22 2018 00:00:00 GMT+0800 (CST)
 * console.log(clone(date) === date); // false
 *
 * const set = new Set([1, 2]);
 * const cloneSet = clone(set);
 * set.add(3);
 * console.log(clone(set) === cloneSet); // false
 * console.log(cloneSet); // Set(2){1, 2}
 * console.log(clone(set)); // Set(3){1, 2, 3}
 * const map = new Map([['bar', 1], ['baz', 2]]);
 * const cloneMap = clone(map);
 * map.set('foo', 3);
 * console.log(clone(map) === cloneMap); // false
 * console.log(cloneMap); // Map(2){"bar" => 1, "baz" => 2}
 * console.log(clone(map)); // Map(3){"bar" => 1, "baz" => 2, "foo" => 3}
 * const symbol = Symbol('');
 * console.log(clone(symbol)); // Symbol()
 * console.log(clone(symbol) === symbol); // true
 * const objs = { prop: Symbol('') };
 * const cloneSymbol = clone(objs);
 * console.log(cloneSymbol === objs); // false
 * console.log(cloneSymbol.prop === objs.prop); // true
 * const buffer = Buffer.from('');
 * console.log(clone(buffer)); // Uint8Array[]
 * console.log(clone(buffer) === buffer); // true
 * const re = /\\w+/; // /\\w+/
 * console.log(clone(re)); // /\\w+/
 * console.log(clone(re) === re);  // false
 */
