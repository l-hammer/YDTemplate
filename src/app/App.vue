<template>
  <div id="app">
    <Loading-bar :imgs="imgs"/>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      imgs: [
        'https://caiyunupload.b0.upaiyun.com/newweb/imgs/logo.png',
        'https://caiyunupload.b0.upaiyun.com/ydimg/theme/2018/03/tenBilRedPacket/page01-bg-amend.jpg',
        'https://caiyunupload.b0.upaiyun.com/ydimg/theme/2018/03/tenBilRedPacket/page-bg-1.png',
        'https://caiyunupload.b0.upaiyun.com/ydimg/theme/2018/03/tenBilRedPacket/page-bg-2.png',
        'https://caiyunupload.b0.upaiyun.com/ydimg/theme/2018/03/tenBilRedPacket/page-bg-3.png',
        'https://caiyunupload.b0.upaiyun.com/ydimg/theme/2018/03/tenBilRedPacket/page-bg-4.png',
        'https://caiyunupload.b0.upaiyun.com/ydimg/theme/2018/03/tenBilRedPacket/dialog-bg-1.png',
        'https://caiyunupload.b0.upaiyun.com/ydimg/theme/2018/03/tenBilRedPacket/dialog-bg-2.png',
        'https://caiyunupload.b0.upaiyun.com/ydimg/theme/2018/03/tenBilRedPacket/dialog-bg-3.png',
        'https://caiyunupload.b0.upaiyun.com/ydimg/theme/2018/03/tenBilRedPacket/countdown-bg-1.png',
        'https://caiyunupload.b0.upaiyun.com/ydimg/theme/2018/03/tenBilRedPacket/countdown-bg-2.png',
        'https://caiyunupload.b0.upaiyun.com/ydimg/theme/2018/03/tenBilRedPacket/loading-bg.jpg',
        'https://caiyunupload.b0.upaiyun.com/ydimg/theme/2018/03/tenBilRedPacket/records-bg.jpg',
        'https://caiyunupload.b0.upaiyun.com/ydimg/theme/2018/03/tenBilRedPacket/icons.png',
        'https://caiyunupload.b0.upaiyun.com/ydimg/theme/2018/03/tenBilRedPacket/redpackets.png',
      ],
    };
  },
};
</script>

<style lang="scss">
@import '../assets/app.scss';
</style>

