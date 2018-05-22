<template>
  <div id="app">
    <Loading-bar
      :imgs="imgs"
      :show="globalLoading">
    </Loading-bar>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      imgs: [
        'https://caiyunupload.b0.upaiyun.com/ydimg/theme/2018/05/invitefriends/page-1.jpg',
        'https://caiyunupload.b0.upaiyun.com/ydimg/theme/2018/05/invitefriends/drum.png',
        'https://caiyunupload.b0.upaiyun.com/ydimg/theme/2018/05/invitefriends/drumming.png',
        'https://caiyunupload.b0.upaiyun.com/ydimg/theme/2018/05/invitefriends/rule-title.png',
        'https://caiyunupload.b0.upaiyun.com/ydimg/theme/2018/05/invitefriends/records-title.png',
        'https://caiyunupload.b0.upaiyun.com/ydimg/theme/2018/05/invitefriends/invite.png',
      ],
    };
  },
  computed: {
    globalLoading() {
      return this.$bus.globalLoading;
    },
  },
};
</script>

<style lang="scss">
@import '../../assets/examples/app.scss';
</style>

