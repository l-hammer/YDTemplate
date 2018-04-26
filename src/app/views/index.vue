<template>
  <div
    v-if="!loading"
    class="main">
    <img
      src="https://caiyunupload.b0.upaiyun.com/newweb/imgs/logo.png"
      alt="银豆网">
    <p
      class="ft-15"
      v-html="message"></p>
  </div>
</template>

<script>
import bus from '../bus';

export default {
  data() {
    return {
      message: '欢迎使用银豆&#8197;H5&#8197;专题开发模板📄',
    };
  },
  computed: {
    loading() {
      return bus.loading;
    },
  },
  mounted() {
    const data = {
      username: 'LHammer',
    };
    this.$axios.test(data).then(function (res) {
      console.log(res);
    });
  },
};
</script>
