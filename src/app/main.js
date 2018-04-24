/**
 * Created by LHammer on 18/01/09.
 * build时autocopy脚本会自动拷贝dist目录下生成的文件到template.tpl
 */
import Vue from 'vue/dist/vue';
import axios from '../api/index';
import router from './router';
import App from './App.vue';

Vue.prototype.$axios = axios;
Vue.config.productionTip = false;

new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App },
});
