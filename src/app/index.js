/**
 * Created by LHammer on 18/01/09.
 * build时autocopy脚本会自动拷贝dist目录下生成文件到template.tpl
 */
import Vue from 'vue/dist/vue';
// import axios from '../api/index';
import format from '../utils/es6/moment';
import '../assets/app.scss';

// Vue.prototype.$axios = axios;

new Vue({
    template: `
        <div id="app" class="main">\
            <img src="https://caiyunupload.b0.upaiyun.com/newweb/imgs/logo.png" alt="银豆网">\
            <p class="ft-15" v-html="message"></p>\
        </div>
    `,
    data() {
        return {
            message: '欢迎使用银豆&#8197;H5&#8197;专题开发模板📄',
        };
    },
    mounted() {
        // const data = {
        //     username: 'LHammer',
        // };
        // this.$axios.test(data).then(function (res) {
        //     console.log(res);
        // }).catch(function (error) {
        //     console.log(error);
        // });
        console.log(format);
        console.log(format.format(new Date(), 'yyyy-MM-dd'));
    },
}).$mount('#app');

/**
 * 热模块替换，开发环境使用
 */
if (module.hot) {
    module.hot.accept();
}
