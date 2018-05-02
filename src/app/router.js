import Vue from 'vue/dist/vue';
import Router from 'vue-router';

// 全加载
import index from './views/index.vue';
import record from './views/record.vue';

// 懒加载
// const index = () => import('./views/index.vue');
// const record = () => import('./views/record.vue');

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
    },
    {
      name: 'record',
      path: '/record',
      component: record,
    },
  ],
});
