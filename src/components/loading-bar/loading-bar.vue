<template>
  <div
    v-if="show"
    class="progress-block">
    <div class="progress-outer">
      <div class="progress-enter">
        <div
          :style="{width: percent + '%'}"
          class="progress-bg">
        </div>
      </div>
      <div
        :style="{left: percent + '%'}"
        class="tooltip ft-12"
        v-html="percent + '%'">
      </div>
    </div>
  </div>
</template>

<script>
import bus from '../../app/bus';

export default {
  name: 'LoadingBar',
  props: {
    imgs: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      count: 0,
      show: true,
      percent: 0,
      cacheImgs: [],
    };
  },
  watch: {
    count: function (val) {
      const per = val / this.imgs.length;
      this.percent = Math.floor(per * 100);
      if (per === 1) {
        this.show = false;
        bus.updateLoading(this.show);
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
