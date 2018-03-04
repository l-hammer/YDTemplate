/**
 * Created by LHammer on 18/03/04.
 * ES6 version
 * @function distinctValuesOfArray 数组去重
 */
const distinctValuesOfArray = arr => [...new Set(arr)];

export default distinctValuesOfArray;

/**
 * e.g.
 * @returns [1,2,8,9]
 */
distinctValuesOfArray([1, 2, 8, 8, 9, 9, 9]);
