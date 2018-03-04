/**
 * Created by LHammer on 18/03/04.
 * ES5 version
 * @function distinctValuesOfArray 数组去重
 */
function toConsumableArray(arr) {
    var arr2,
        i = 0;
    if (Array.isArray(arr)) {
        for (i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
            arr2[i] = arr[i];
        }
        return arr2;
    }
    return Array.from(arr);
}

function distinctValuesOfArray(arr) {
    return [].concat(toConsumableArray(new Set(arr)));
}

/**
 * e.g.
 * @returns [1,2,8,9]
 */
distinctValuesOfArray([1, 2, 8, 8, 9, 9, 9]);
