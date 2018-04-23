/**
 * Created by LHammer on 18/04/21.
 * ES6 version
 * @method ViewType
 * @description Get the native type of a JavaScript value.
 */
const { toString } = {};

const ctorName = (val) => {
    return val.constructor ? val.constructor.name : null;
};

const isNull = (val) => {
    return val === null;
};

const isUndef = (val) => {
    return val === undefined || val === null;
};

const isNumber = (num) => {
    const number = +num;

    if ((number - number) !== 0) {
        return false;
    }

    if (number === num) {
        return true;
    }

    if (typeof num === 'string') {
        // +'' === 0 && +' ' === 0
        if (number === 0 && num.trim() === '') {
            return false;
        }
        return true;
    }
    return false;
};

const isArray = (val) => {
    if (Array.isArray) return Array.isArray(val);
    return val instanceof Array;
};

const isObject = (val) => {
    return val !== null && typeof val === 'object';
};

const isPlainObject = (val) => {
    return toString.call(val) === '[object Object]';
};

const isRegexp = (val) => {
    return toString.call(val) === '[object RegExp]';
};

const isGeneratorFn = (val) => {
    return ctorName(val) === 'GeneratorFunction';
};

const isFunction = (val) => {
    return typeof val === 'function';
};

const isPrimitive = (val) => {
    if (val === null) return true;

    const type = typeof val;
    switch (type) {
        case 'undefined':
        case 'boolean':
        case 'string':
        case 'number':
        case 'symbol':
            return true;
        default:
            return false;
    }
};

const isArguments = (val) => {
    try {
        if (typeof val.length === 'number' && typeof val.callee === 'function') {
            return true;
        }
    } catch (error) {
        if (error.message.indexOf('callee') !== -1) {
            return true;
        }
    }
    return false;
};

const viewType = (val) => {
    if (val === null) return 'null';

    const type = typeof val;
    switch (type) {
        case 'undefined':
            return 'undefined';
        case 'boolean':
            return 'boolean';
        case 'string':
            return 'string';
        case 'number':
            return 'number';
        case 'symbol':
            return 'symbol';
        case 'function':
            return isGeneratorFn(val) ? 'generatorfunction' : 'function';
        default:
            break;
    }

    if (isArray(val)) return 'array';
    if (isArguments(val)) return 'arguments';
    if (isObject(val)) return 'object';
    if (isRegexp(val)) return 'regexp';

    if (ctorName(val)) {
        return ctorName(val).toLowerCase();
    }

    return '';
};

viewType.isNull = isNull;
viewType.isUndef = isUndef;
viewType.isNumber = isNumber;
viewType.isArray = isArray;
viewType.isObject = isObject;
viewType.isPlainObject = isPlainObject;
viewType.isRegexp = isRegexp;
viewType.isArguments = isArguments;
viewType.isFunction = isFunction;
viewType.isGeneratorFn = isGeneratorFn;
viewType.isPrimitive = isPrimitive;

export default viewType;

/**
 * e.g. test
 * console.log(viewType(null)); // null
 * console.log(viewType(undefined)); // undefined
 * console.log(viewType(true)); // boolean
 * console.log(viewType(123)); // number
 * console.log(viewType('abc')); // string
 * console.log(viewType([1, 2, 3])); // array
 * console.log(viewType({})); // object
 * console.log(viewType(Object.create(null))); // object
 * console.log(viewType(new Date())); // date
 * console.log(viewType(function () {})); // function
 * console.log(viewType(function *(...arg) { yield arg[0]; })); // generatorfunction
 * console.log(viewType(arguments)); // arguments
 * console.log(viewType(Buffer.from(''))); // buffer
 * console.log(viewType(new Error('error'))); // error
 * console.log(viewType(/exp/)); // regexp
 * console.log(viewType(new RegExp('foo'))); // regexp
 * console.log(viewType.isNull(null)); // true
 * console.log(viewType.isUndef(null)); // true
 * console.log(viewType.isUndef(undefined)); // true
 * console.log(viewType.isArray([1, 2, 3])); // true
 * console.log(viewType.isObject({})); // true
 * console.log(viewType.isObject(Object.create(null))); // true
 * console.log(viewType.isRegexp(/exp/)); // true
 * console.log(viewType.isRegexp(new RegExp('foo'))); // true
 * console.log(viewType.isArguments(arguments)); // true
 * console.log(viewType.isFunction(function () {})); // true
 * console.log(viewType.isGeneratorFn(function *(...arg) { yield arg[0]; })); // true
 *
 * console.log(viewType.isNumber(5e3)); // true
 * console.log(viewType.isNumber(0xff)); // true
 * console.log(viewType.isNumber(-1.1)); // true
 * console.log(viewType.isNumber(0)); // true
 * console.log(viewType.isNumber(1)); // true
 * console.log(viewType.isNumber(1.1)); // true
 * console.log(viewType.isNumber(10)); // true
 * console.log(viewType.isNumber(10.10)); // true
 * console.log(viewType.isNumber(100)); // true
 * console.log(viewType.isNumber('-1.1')); // true
 * console.log(viewType.isNumber('0')); // true
 * console.log(viewType.isNumber('012')); // true
 * console.log(viewType.isNumber('0xff')); // true
 * console.log(viewType.isNumber('1')); // true
 * console.log(viewType.isNumber('1.1')); // true
 * console.log(viewType.isNumber('10')); // true
 * console.log(viewType.isNumber('10.10')); // true
 * console.log(viewType.isNumber('5e3')); // true
 * console.log(viewType.isNumber(parseInt('012', 10))); // true
 * console.log(viewType.isNumber(parseFloat('012'))); // true
 *
 * console.log(viewType.isNumber('foo')); // false
 * console.log(viewType.isNumber([1])); // false
 * console.log(viewType.isNumber([])); // false
 * console.log(viewType.isNumber(function () {})); // false
 * console.log(viewType.isNumber(Infinity)); // false
 * console.log(viewType.isNumber(NaN)); // false
 * console.log(viewType.isNumber(Buffer.from('abc'))); // false
 * console.log(viewType.isNumber(null)); // false
 * console.log(viewType.isNumber(undefined)); // false
 * console.log(viewType.isNumber({ abc: 'abc' })); // false
 *
 * console.log(viewType.isPrimitive(null)); // true
 * console.log(viewType.isPrimitive(undefined)); // true
 * console.log(viewType.isPrimitive(123)); // true
 * console.log(viewType.isPrimitive(true)); // true
 * console.log(viewType.isPrimitive('foo')); // true
 * console.log(viewType.isPrimitive(Symbol(''))); // true
 */
