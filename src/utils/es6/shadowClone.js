/**
 * Created by LHammer on 18/04/22.
 * ES6 version
 * @method shadowClone
 * @description Make a shallow clone of an object, array or primitive(Undefined、Null、Boolean、Number、String).
 */
import viewType from './viewType';

const shadowClone = (val) => {
    switch (viewType(val)) {
        case 'object':
            return Object.assign({}, val);
        case 'array':
            return val.slice();
        case 'set':
            return new Set(val);
        case 'map':
            return new Map(val);
        default:
            return val;
    }
};

export default shadowClone;

/**
 * e.g. test
 *
 * console.log(clone(0)); // 0
 * console.log(clone(0) === 0); // true
 * console.log(clone('foo')); // 'foo'
 * console.log(clone('foo') === 'foo'); // true
 * const qux = { foo: 1 };
 * console.log(clone(qux)); // {foo: 1}
 * console.log(clone(qux) === qux); // false
 * const obj = Object.create(qux, { // qux.foo为继承属性（无法复制）
 *     bar: { // bar为不可枚举属性（无法复制）
 *         value: 2,
 *     },
 *     baz: { // baz为可枚举属性
 *         value: 3,
 *         enumerable: true,
 *     },
 * });
 * console.log(clone(obj)); // {baz: 3}
 * console.log(clone(obj) === obj); // false
 * const a = [1, 2, 3];
 * const clonea = clone(a);
 * a.push(5);
 * console.log(clone(a) === a); // false
 * console.log(clonea); // [1, 2, 3]
 * console.log(clone(a)); // [1, 2, 3, 5]
 * const foo = function () {};
 * console.log(clone(foo));
 * console.log(clone(foo) === foo);
 * const d = new Date('2018/04/22');
 * console.log(clone(d)); // Sun Apr 22 2018 00:00:00 GMT+0800 (CST)
 * console.log(clone(d) === d); // true
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
 * console.log(clone(re));
 * console.log(clone(re) === re);
 */
