/**
 * Created by LHammer on 18/04/10.
 * ES6 version
 * @class mvvm
 * @description vetar: MVVM核心原理
 * @method Object.defineProperty() 访问器set/get
 */
const app = document.querySelector('#app');
const nodeToFragment = (node) => {
    let child;
    var flag = document.createDocumentFragment();
    while (child = node.firstChild) {
        flag.appendChild(child);
    }
    return flag;
};
const dom = nodeToFragment(app);

app.appendChild(dom);
