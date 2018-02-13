/**
 * 第一个测试用例
 */
import Vue from 'vue';
import app from '../../src/app/index'

describe('test app/index.js', () => {
    it('组件加载后，title应该是YDTemplate', () => {
        // 这里将app生成vue实例，并使用 $mount() 模拟挂载状态
        let vm = new Vue(app).$mount();
        // 断言组件的title是否变为了'YDTemplate'
        expect(document.title).toBe('YDTemplate');
    });
});