/**
 * Created by LHammer on 18/04/10.
 * @class Watcher
 * @description 数据的订阅者，数据变化时 -> Watcher收到相应dep通知 -> 执行相应操作，例如：更新视图
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
    this.depIds = {};

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
  /**
   * @method addDep 增加监听器（观察指挥中心）
   * @param {Object} dep 当前属性的dep
   * 调用update -> 触发相应属性的getter -> 触发属性的dep.depend() -> addDep
   * 如果相应属性的dep.id已经在当前watcher的depIds中，说明不是一个新属性，仅仅是改变起值而已；
   * 如果相应属性的dep.id不在当前watcher的depIds中，说明是一个新的属性，则需要将当前watcher添加到该属性的dep中
   */
  addDep(dep) {
    if (!{}.hasOwnProperty.call(this.depIds, dep.id)) {
      dep.addSub(this);
      this.depIds[dep.id] = dep;
    }
  }
  get() {
    Dep.target = this; // 保存当前需要操作的watcher
    let value;
    if (~this.exp.search(/\./)) {
      const obj = this.exp.split('.')[0]; // 当为对象情况时(data.vetar.author) key
      const val = this.exp.split('.')[1]; // 当为对象情况时(data.vetar.author) value
      value = this.vm.data[obj][val];
    } else {
      value = this.vm.data[this.exp];
    }
    Dep.target = null; // 释放当前操作的watcher
    return value;
  }
}
