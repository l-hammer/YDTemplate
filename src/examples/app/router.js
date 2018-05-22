import Vue from 'vue/dist/vue';
import Router from 'vue-router';

// 全加载
import index from './views/index.vue';
import invite from './views/invite.vue';
import records from './views/records.vue';
import rules from './views/rules.vue';

// 懒加载
// const index = () => import('./views/index.vue');
// const record = () => import('./views/record.vue');

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: '/wx/yaoyou_fuwu/',
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      meta: {
        title: '', // 分享标题
        desc: '', // 分享描述
        link: '', // 分享链接
        imgUrl: '', // 分享图标
      },
    },
    {
      name: 'invite',
      path: '/invite',
      component: invite,
    },
    {
      name: 'records',
      path: '/records',
      component: records,
    },
    {
      name: 'rules',
      path: '/rules',
      component: rules,
    },
  ],
});
