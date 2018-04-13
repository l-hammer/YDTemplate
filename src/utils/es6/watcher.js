/**
 * Created by LHammer on 18/04/10.
 * @class Watcher
 * @description 订阅者
 */
import Dep from './dep';
/**
 * @param {Object} vm vm实例
 * @param {Object} node 节点对象
 * @param {String|Number} val 监听对象
 */
export default class Watcher {
    constructor(vm, node, val) {
        this.vm = vm;
        this.node = node;
        this.val = val;
        Dep.target = this;
        this.update();
        Dep.target = null;
    }
    update() {
        this.get();
        this.node.textContent = this.value;
    }
    get() {
        this.value = this.vm.data[this.val];
    }
}
