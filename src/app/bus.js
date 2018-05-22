/**
 * 事件总线bus，非父子间通信
 */
import Vue from 'vue/dist/vue';

export default new Vue({
  data() {
    return {
      globalLoading: true,
    };
  },
  methods: {
    updateLoading(val) {
      this.globalLoading = val;
    },
  },
});
