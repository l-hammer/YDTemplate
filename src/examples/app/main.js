/**
 * Created by LHammer on 18/01/09.
 * build时autocopy脚本会自动拷贝dist目录下生成的文件到template.tpl
 */
import Vue from 'vue/dist/vue';
import axios from '../../api/index';
import router from './router';
import App from './App.vue';
import LoadingBar from '../../components/loading-bar';
import Dialog from '../../components/dialog';
import Icon from '../../components/icon';

Vue.prototype.$axios = axios;
Vue.config.productionTip = false;

Vue.use(LoadingBar);
Vue.use(Dialog);
Vue.use(Icon);

new Vue({
  el: '#App',
  router,
  render: h => h(App),
});
