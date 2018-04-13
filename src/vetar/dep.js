/**
 * Created by LHammer on 18/04/10.
 * @class Dep 观察指挥中心
 * @description 订阅发布模式（又称观察者模式）定义了一种一对多的关系，让多个观察者同时监听某一个主题对象;
 * @description 这个主题对象的状态发生改变时就会通知所有观察者对象。
 * @description 发布者发出通知 => 主题对象收到通知并推送给订阅者 => 订阅者执行相应操作
 */
export default class Dep {
    constructor() {
        this.subs = [];
    }
    addSub(sub) {
        this.subs.push(sub);
    }
    notify() {
        this.subs.forEach(sub => sub.update());
    }
}
