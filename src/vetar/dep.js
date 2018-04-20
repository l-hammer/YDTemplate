/**
 * Created by LHammer on 18/04/10.
 * @class Dep 观察指挥中心（observe与watcher的纽带）
 * @description 数据发生变化时 -> dep发送通知给相应的watcher
 */
let uid = 0;

export default class Dep {
    constructor() {
        uid += 1;
        this.subs = [];
        this.id = uid;
    }
    /**
     * 保存watcher实例到订阅池中
     * @param {*} sub watcher实例
     */
    addSub(sub) {
        this.subs.push(sub);
    }
    /**
     * Dep.target 为当前需要操作的watcher实例，调用
     */
    depend() {
        Dep.target.addDep(this);
    }
    /**
     * 数据变化是通知订阅池中的watcher执行相应的操作
     */
    notify() {
        this.subs.forEach(sub => sub.update());
    }
}
