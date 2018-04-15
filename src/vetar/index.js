/**
 * Created by LHammer on 18/04/10.
 * @class Vetar
 * @description 极简版MVVM
 */
import Dep from './dep';
import Watcher from './watcher';

const replace = Symbol('private');

class Vetar {
    constructor(options = {}) {
        this.$options = options;
        this.data = this.$options.data;
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
            for (const ele of attrs) {
                if (ele.nodeName === 'v-model') {
                    const val = ele.nodeValue;
                    node.addEventListener('input', (e) => {
                        this.data[val] = e.target.value;
                    });
                    node.value = this.data[val];
                    node.removeAttribute('v-model');
                }
            }
        }
        // 文本节点 + 子元素为文本节点的节点
        if ((node.nodeType === 1 || node.nodeType === 3) && reg.test(con)) {
            const val = RegExp.$1;
            node.textContent = con.replace(reg, this.data[val]).trim();
            // 订阅消息
            new Watcher(this, node, val.trim());
        }
        if (node.childNodes && node.childNodes.length) {
            this[replace](node.childNodes, this);
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
                Object.defineProperty(this.data, key, {
                    configurable: true,
                    get() {
                        if (Dep.target) dep.addSub(Dep.target);
                        return val;
                    },
                    set(newVal) {
                        val = newVal;
                        // 发出通知
                        dep.notify();
                    },
                });
            }
        }
    }
    /**
     * @method observe 数据代理
     * @description 遍历data，将data上的属性代理到vm实例上
     */
    proxy() {
        for (const key in this.data) {
            if ({}.hasOwnProperty.call(this.data, key)) {
                Object.defineProperty(this, key, {
                    configurable: true,
                    get() {
                        return this.data[key];
                    },
                    set(newVal) {
                        this.data[key] = newVal;
                    },
                });
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
        });
    </script>
</body>
*/
