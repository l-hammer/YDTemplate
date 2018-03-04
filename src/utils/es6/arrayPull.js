
/**
 * Created by LHammer on 18/03/04.
 * ES6 version
 * @function arrayPull 删除数组中指定的值
 */
const arrayPull = (arr, ...args) => {
    const argState = Array.isArray(args[0]) ? args[0] : args;
    const pulled = arr.filter(v => !argState.includes(v));
    arr.length = 0;
    pulled.forEach(v => arr.push(v));
};

export default arrayPull;

/**
 * e.g.
 * @returns myArray = [ 'b', 'd', 'e' ]
 */
const myArray = ['a', 'b', 'c', 'd', 'e'];
arrayPull(myArray, 'a', 'c');
