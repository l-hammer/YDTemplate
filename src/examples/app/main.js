/**
 * Created by LHammer on 18/01/09.
 * build时autocopy脚本会自动拷贝dist目录下生成的文件到template.tpl
 */
import Vue from 'vue/dist/vue';
import axios from '../../api/index';
import router from './router';
import bus from './bus';
import App from './App.vue';
import LoadingBar from '../../components/loading-bar';
import Dialog from '../../components/dialog';
import wxShare from '../../utils/es6/wxShare';

Vue.prototype.$bus = bus;
Vue.prototype.$axios = axios;
Vue.config.productionTip = false;

Vue.use(LoadingBar);
Vue.use(Dialog);

const data = {
  invitation_id: location.search.split('=')[1]
    ? decodeURIComponent(location.search.split('=')[1].split('&')[0])
    : '',
};
const resint = axios.gameInfo(data);

router.beforeEach((to, from, next) => {
  const handleNext = (name) => {
    if (bus.globalLoading) {
      bus.$watch('globalLoading', function (loading) {
        !loading ? next({ name: name }) : next(false);
      });
    } else {
      next();
    }
  };
  resint.then((res) => {
    bus.updatedGameInfo(res);
    if (!res.state && to.name === 'invite') {
      handleNext('index');
    } else if (res.state && to.name === 'index') {
      handleNext('invite');
    } else {
      handleNext();
    }
  });
});
router.afterEach((to) => {
  resint.then((res) => {
    const shareData = {
      title: to.meta.title || '邀友比大小，输赢都有钱', // 分享标题
      desc: to.meta.desc || '转发有价都有赚，快乐无价乐翻天', // 分享描述
      url: to.meta.link || res.share_url, // 分享链接
      imgUrl: to.meta.imgUrl || 'https://caiyunupload.b0.upaiyun.com/ydimg/theme/2018/05/invitefriends/wxshare.jpg', // 分享图标
    };
    wxShare(res.share_data, shareData);
  });
});

new Vue({
  el: '#app',
  router,
  render: h => h(App),
});
