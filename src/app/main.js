/**
 * Created by LHammer on 18/01/09.
 * build时autocopy脚本会自动拷贝dist目录下生成的文件到template.tpl
 */
import Vue from 'vue/dist/vue';
import axios from '../api/index';
import router from './router';
import bus from './bus';
import App from './App.vue';
import LoadingBar from '../components/loading-bar';
import wxShare from '../utils/es6/wxShare';

Vue.prototype.$bus = bus;
Vue.prototype.$axios = axios;
Vue.config.productionTip = false;

Vue.use(LoadingBar);

router.beforeEach((to, from, next) => {
  if (bus.globalLoading) {
    bus.$watch('globalLoading', function (loading) {
      !loading ? next() : next(false);
    });
  } else {
    next();
  }
});

router.afterEach((to) => {
  const shareData = {
    title: to.meta.title || '', // 分享标题
    desc: to.meta.desc || '', // 分享描述
    link: to.meta.link || '', // 分享链接
    imgUrl: to.meta.imgUrl || '', // 分享图标
  };
  wxShare({}, shareData);
});

new Vue({
  el: '#app',
  router,
  render: h => h(App),
});
