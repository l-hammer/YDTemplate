/**
 * jax采用zepto.ajax
 * 上线时拷贝dist目录下生成的样式，并在./template.tpl引入对应脚本
 */
import $ from 'exports-loader?zepto!script-loader';
import Vue from 'vue/dist/vue';
import '../assets/app.scss';

/**
 * 使用ES5写法，上线时直接拷贝以下内容到./template.tpl
 */
new Vue({
    el: '#app',
    template: `
        <div id="app" class="main">
            <img src="https://caiyunupload.b0.upaiyun.com/newweb/imgs/logo.png" alt="银豆网">
            <p>欢迎使用银豆H5专题开发模板📄</p>
        </div>
    `,
    data: function(){
        return {

        }
    },
    created: function(){
        console.log('created');
    },
    methods: {

    }
});

/**
 * 热模块替换，开发环境使用
 */
if (module.hot) {
    module.hot.accept();
}