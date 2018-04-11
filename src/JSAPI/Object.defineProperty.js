/**
 * Created by LHammer on 18/04/11.
 * ES6 version
 * @method Object.defineProperty()
 */
const mvvm = {};
mvvm.author = 'LHammer';

Object.defineProperty(mvvm, 'name', {
    // value: 'vetar',  // 与get只能存在一个
    // writable: true,  // 与set只能存在一个
    configurable: true,
    enumerable: true, // 是否可枚举
    get() {
        return 'vetar';
    },
    set(val) {
        this.author = val;
    },
});

console.log(mvvm);
mvvm.name = 'vme';
console.log(mvvm);

// 遍历可枚举的属性
for (const key in mvvm) {
    if ({}.hasOwnProperty.call(mvvm, key)) {
        console.log(key);
    }
}
