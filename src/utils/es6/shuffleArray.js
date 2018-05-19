/**
 * Created by LHammer on 18/05/18.
 * ES6 version
 * @function shuffleArray 随机排列数组
 */
const shuffleArray = ([...arr]) => {
  let m = arr.length;
  while (m) {
    const i = Math.floor(Math.random() * m);
    m -= 1;
    [arr[m], arr[i]] = [arr[i], arr[m]];
  }

  return arr;
};

export default shuffleArray;

/**
 * e.g.
 * @returns [6, 8, 3, 5, 4, 9, 7, 2, 1]
 */
shuffleArray(1, 2, 3, 4, 5, 6, 7, 8, 9);
