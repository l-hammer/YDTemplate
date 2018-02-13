/**
 * jax采用zepto.ajax
 * 上线时拷贝dist目录下生成的样式，并在./template.tpl引入对应脚本
 */
import Vue from 'vue/dist/vue';
import '../assets/app.scss';

/**
 * 使用ES5写法，上线时直接拷贝以下内容到./template.tpl
 * this is a mark line(以此线为标准，autocopy脚本会自动拷贝其之后的代码)
 */
var Child = {
    template: `
        <div id="app" class="main">
            <img src="https://caiyunupload.b0.upaiyun.com/newweb/imgs/logo.png" alt="银豆网">
            <p>欢迎使用银豆&#8197;H5&#8197;专题开发模板📄</p>
        </div>
    `,
};

new Vue({
    el: '#app',
    components: {
        'v-child': Child,
    },
    data: function () {
        return {
            title: 'YDTemplate',
        };
    },
    mounted: function () {
        document.title = this.title;
    },
});

/**
 * 热模块替换，开发环境使用
 */
if (module.hot) {
    module.hot.accept();
}
