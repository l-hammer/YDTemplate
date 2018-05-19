/**
 * Created by LHammer on 18/05/18.
 * ES6 version
 * @function initArrayWithRange 初始化指定范围内的数组
 */
const initArrayWithRange = (end, start = 0, step = 1) => {
  return Array.from({ length: Math.ceil((end - start + 1) / step) }).map((v, i) => {
    return start + i * step;
  });
};

export default initArrayWithRange;

/**
 * e.g.
 * @returns [1, 2, 3, 4, 5, 6, 7, 8, 9]
 */
initArrayWithRange(9, 1);
