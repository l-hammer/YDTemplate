<template>
  <div id="app">
    <Loading-bar :imgs="imgs"></Loading-bar>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      imgs: [
        'https://caiyunupload.b0.upaiyun.com/ydimg/theme/2018/05/riseseason/bg-1-amend.png',
        'https://caiyunupload.b0.upaiyun.com/ydimg/theme/2018/05/riseseason/bg-2.png',
        'https://caiyunupload.b0.upaiyun.com/ydimg/theme/2018/05/riseseason/bg-3.png',
        'https://caiyunupload.b0.upaiyun.com/ydimg/theme/2018/05/riseseason/wave-shadow-amend.png',
        'https://caiyunupload.b0.upaiyun.com/ydimg/theme/2018/05/riseseason/wave-main-amend.png',
        'https://caiyunupload.b0.upaiyun.com/ydimg/theme/2018/05/riseseason/dialog-bg-1.png',
        'https://caiyunupload.b0.upaiyun.com/ydimg/theme/2018/05/riseseason/dialog-bg-2.png',
        'https://caiyunupload.b0.upaiyun.com/ydimg/theme/2018/05/riseseason/dfjlb.png',
      ],
    };
  },
};
</script>

<style lang="scss">
@import '../../assets/examples/app.scss';
</style>

