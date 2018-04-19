/**
 * Created by LHammer on 18/04/10.
 * @class Watcher
 * @description 订阅者
 */
import Dep from './dep';
/**
 * @param {Object} vm vm实例
 * @param {Object} exp 键名、方法名
 * @param {String|Number} cb 回调函数
 */
export default class Watcher {
    constructor(vm, exp, cb) {
        this.vm = vm;
        this.exp = exp;
        this.cb = cb;
        this.value = this.get();
    }
    update() {
        const value = this.get(); // 取到最新值
        const oldVal = this.value;
        if (oldVal !== value) {
            this.value = value;
            this.cb.call(this.vm, value, oldVal);
        }
    }
    get() {
        Dep.target = this; // 缓冲自己
        const value = this.vm.data[this.exp];
        Dep.target = null; // 释放自己
        return value;
    }
}
