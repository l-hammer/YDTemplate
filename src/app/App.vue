<template>
  <div id="app">
    <div
      v-if="showProgress"
      class="progress-block">
      <div class="progress-outer">
        <div class="progress-enter">
          <div
            :style="{width: progressPercent + '%'}"
            class="progress-bg">
          </div>
        </div>
        <div
          :style="{left: progressPercent + '%'}"
          class="tooltip ft-12"
          v-html="progressPercent + '%'">
        </div>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
import bus from './bus';

export default {
  name: 'App',
  data() {
    return {
      count: 0,
      showProgress: true,
      progressPercent: 0,
      cacheImgs: [],
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
  watch: {
    count: function (val) {
      const per = val / this.imgs.length;
      this.progressPercent = Math.floor(per * 100);
      if (per === 1) {
        this.showProgress = false;
        bus.updateLoading(this.showProgress);
      }
    },
  },
  mounted() {
    this.imgs.forEach((url, idx) => {
      this.cacheImgs[idx] = new Image();
      this.cacheImgs[idx].onload = () => {
        this.count += 1;
        Math.floor(this.count / this.imgs.length) * 100 + '%';
      };
      this.cacheImgs[idx].src = url;
    });
  },
};
</script>

<style lang="scss">
@import '../assets/app.scss';
</style>

