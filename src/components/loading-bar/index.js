import LoadingBar from './loading-bar.vue';

LoadingBar.install = function (Vue) {
  Vue.component(LoadingBar.name, LoadingBar);
};

export default LoadingBar;
