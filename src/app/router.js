import Vue from 'vue/dist/vue';
import Router from 'vue-router';
import index from './views/index.vue';
import record from './views/record.vue';

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
