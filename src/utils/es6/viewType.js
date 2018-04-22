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
        case 'undefined': return 'undefined';
        case 'boolean': return 'boolean';
        case 'string': return 'string';
        case 'number': return 'number';
        case 'symbol': return 'symbol';
        case 'function': return isGeneratorFn(val) ? 'generatorfunction' : 'function';
        default: break;
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
viewType.isArray = isArray;
viewType.isObject = isObject;
viewType.isPlainObject = isPlainObject;
viewType.isRegexp = isRegexp;
viewType.isArguments = isArguments;
viewType.isFunction = isFunction;
viewType.isGeneratorFn = isGeneratorFn;

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
 * console.log(viewType.isArray([1, 2, 3])); // true
 * console.log(viewType.isObject({})); // true
 * console.log(viewType.isObject(Object.create(null))); // true
 * console.log(viewType.isRegexp(/exp/)); // true
 * console.log(viewType.isRegexp(new RegExp('foo'))); // true
 * console.log(viewType.isArguments(arguments)); // true
 * console.log(viewType.isFunction(function () {})); // true
 * console.log(viewType.isGeneratorFn(function *(...arg) { yield arg[0]; })); // true
 */
