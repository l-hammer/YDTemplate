/**
 * Created by LHammer on 18/04/10.
 * @class Vetar
 * @description 极简版MVVM
 */
import Dep from './dep';
import Watcher from './watcher';
import {
    isDirective,
    isEventDirective,
} from './util';

const replace = Symbol('replace');
const defineComputed = Symbol('defineComputed');
const sharedPropertyDefinition = {
    enumerable: true,
    configurable: true,
    get() {},
    set() {},
};

class Vetar {
    constructor(options = {}) {
        this.$options = options;
        this.data = this.$options.data;
        this.computed = this.$options.computed;
        this.methods = this.$options.methods;
        if (this.computed) this.initComputed();
        if (this.methods) this.initMethods();
        this.observe();
        this.proxy();
        this.compile();
    }
    /**
     * @method replace 私有方法
     */
    [replace](node) {
        const con = node.textContent;
        const reg = /\{\{(.*?)\}\}/;
        // 元素节点
        if (node.nodeType === 1) {
            const attrs = node.attributes;
            // 遍历解析属性
            for (const attr of attrs) {
                const attrName = attr.name;
                if (isDirective(attrName)) {
                    const exp = attr.value; // 属性名称(方法名)
                    const dir = attrName.substring(2); // on:click
                    if (isEventDirective(dir)) {
                        const eventType = dir.split(':')[1]; // 事件类型：click
                        const fn = this.methods && this.methods[exp];
                        if (eventType && fn) {
                            node.addEventListener(eventType, fn.bind(this), false);
                        }
                    } else {
                        const val = attr.nodeValue;
                        new Watcher(this, exp, (newVal) => {
                            node.value = newVal;
                        });
                        node.addEventListener('input', (e) => {
                            this.data[val] = e.target.value;
                        });
                        node.value = this.data[val];
                    }
                    node.removeAttribute(attrName);
                }
            }
        }
        // 文本节点 + 子元素为文本节点的节点
        if ((node.nodeType === 1 || node.nodeType === 3) && reg.test(con)) {
            const key = RegExp.$1; // 键名
            node.textContent = con.replace(reg, this.data[key]).trim();
            // 订阅消息
            new Watcher(this, key, (newVal, oldVal) => {
                node.textContent = node.textContent.replace(oldVal, newVal).trim();
            });
        }
        if (node.childNodes && node.childNodes.length) {
            this[replace](node.childNodes, this);
        }
    }
    /**
     * @method defineComputed 关联计算属性到data中，并劫持计算属性
     */
    [defineComputed](key, def) {
        if (typeof def === 'function') {
            sharedPropertyDefinition.get = def;
        } else {
            sharedPropertyDefinition.get = def.get ? def.get : {};
            sharedPropertyDefinition.set = def.set ? def.set : {};
        }
        Object.defineProperty(this.data, key, sharedPropertyDefinition);
    }
    /**
     * @method initComputed init计算属性
     */
    initComputed() {
        const _computed = this.computed;
        for (const key in _computed) {
            if (!(key in this.data)) {
                this[defineComputed](key, _computed[key]);
            }
        }
    }
    /**
     * @method initMethods init方法
     */
    initMethods() {
        const _methods = this.methods;
        for (const key in _methods) {
            if (!(key in this)) {
                this[key] = _methods[key]; // 挂载方法vm示例上
            }
        }
    }
    /**
     * @method observe 数据劫持
     * @description Deep response: 给所有对象增加Object.defineProperty()
     */
    observe() {
        const dep = new Dep();
        for (const key in this.data) {
            if ({}.hasOwnProperty.call(this.data, key)) {
                let val = this.data[key];
                sharedPropertyDefinition.get = () => {
                    if (Dep.target) dep.addSub(Dep.target);
                    return val;
                };
                sharedPropertyDefinition.set = (newVal) => {
                    val = newVal;
                    dep.notify(); // 发出通知
                };
                Object.defineProperty(this.data, key, sharedPropertyDefinition);
            }
        }
    }
    /**
     * @method observe 数据代理
     * @description 遍历data，将data上的属性代理到vm(this)实例上
     */
    proxy() {
        for (const key in this.data) {
            if ({}.hasOwnProperty.call(this.data, key)) {
                sharedPropertyDefinition.get = () => {
                    return this.data[key];
                };
                sharedPropertyDefinition.set = (newVal) => {
                    this.data[key] = newVal;
                };
                Object.defineProperty(this, key, sharedPropertyDefinition);
            }
        }
    }
    /**
     * @method compile 模板编译
     */
    compile() {
        let child;
        /** 节点劫持，放入文档片段中，编译完成后整体插入挂载目标~ */
        /** 文档片段createDocumentFragment保存在内存中，插入元素时不会引起页面回流~ */
        const flag = document.createDocumentFragment();
        // 挂载el到示例上方便调用
        this.$el = document.querySelector(this.$options.el);
        while (child = this.$el.firstChild) {
            this[replace](child, this);
            flag.appendChild(child);
        }
        this.$el.appendChild(flag);
    }
}

export default Vetar;

/**
 * e.g. 实例
 *
<body>
    <div id="app">
        <input type="text" placeholder="Entering……" v-model="message">
        <span>{{message}}</span>
    </div>
    <script src="./vetar.js"></script>
    <script>
        new Vetar({
            el: '#app',
            data: {
                message: 'Hello World~',
            },
            computed: {
                name() {
                    return 'Vetar';
                },
            },
            methods: {
                reverseMessage() {
                    this.message = this.message.split('').reverse().join('');
                },
            },
        });
    </script>
</body>
*/
