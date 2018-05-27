<template>
  <div class="main home">
    <div class="top">
      <p class="tit ft-26">我的激活奖金<br>{{ money }}元</p>
      <router-link
        class="rules ft-22"
        to="rules">规则》</router-link>
    </div>
    <div
      :class="{ drumming: drumming }"
      class="mid">
      <span class="num ft-112">{{ luckyNum }}</span>
      <transition name="zoom">
        <a
          v-if="!playStatus"
          href="javascript: void(0);"
          class="btn ft-24"
          @click="play">开始摇数</a>
      </transition>
    </div>
    <div class="bot">
      <a
        :class="{ disabled: disabled, shake: !disabled }"
        class="btn ft-21"
        href="javascript: void(0);"
        @click="invite">马上邀友去赚钱》</a>
      <router-link
        class="btn ft-21"
        to="records">奖金激活记录》</router-link>
    </div>
    <Dialog
      :show-dialog="dialogs.invite.open"
      :name="dialogs.invite.name"
      @close-dialog="closeDialog"
      @global-close-dialog="closeDialog(dialogs.invite.name)">
      <div
        slot="main"
        class="dialog-invite">
        <div class="forward"></div>
      </div>
    </Dialog>
    <Dialog
      :show-dialog="dialogs.bind.open"
      :name="dialogs.bind.name"
      @global-close-dialog="closeDialog(dialogs.bind.name)">
      <div
        slot="main"
        class="dialog-bind">
        <div class="con ft-18">您还未绑定服务号</div>
        <div slot="btns">
          <a
            class="btn ft-21 gray"
            href="javascript: void(0);"
            @click="closeDialog(dialogs.bind.name)">取消</a>
          <a
            class="btn ft-21"
            href="javascript: void(0);"
            @click="goBind">去绑定</a>
        </div>
      </div>
    </Dialog>
  </div>
</template>

<script>
import mixin from '../mixins';

export default {
  mixins: [mixin],
  data() {
    return {
      money: 88888,
      luckyNum: '?',
      drumming: false,
      playStatus: true,
      isBind: false,
      disabled: true,
      dialogs: {
        invite: {
          name: 'invite',
          open: false,
        },
        bind: {
          name: 'bind',
          open: false,
        },
      },
    };
  },
  computed: {
    gameInfo() {
      return this.$bus.gameInfo;
    },
  },
  mounted() {
    const res = this.gameInfo.result;
    const num = res.number;

    this.money = res.money;
    this.playStatus = !!+num;
    this.luckyNum = !+num ? '?' : num;
    this.drumming = !!+num;
    this.disabled = !+num;
    this.isBind = this.gameInfo.fenxiang;
  },
  methods: {
    play() {
      let timer = null;
      let i = 0;
      const data = {
        act: 'master_num',
      };

      this.$axios.invite(data).then((res) => {
        this.arrayPull(this.shuffleArr, res.number);
        this.shuffleArr.push(res.number);
        this.playStatus = true;
        timer = setInterval(() => {
          this.drumming = !this.drumming;
          this.luckyNum = this.shuffleArr[i];
          i += 1;
          if (timer && i === this.shuffleArr.length) {
            clearInterval(timer);
            this.disabled = false;
          }
        }, 129);
      });
    },
    invite() {
      if (this.isBind) {
        this.openDialog('invite');
      } else {
        this.openDialog('bind');
      }
    },
    goBind() {
      window.location.href = 'https://www.yindou.com/cnl/?ydcod=wx_regist';
    },
  },
};
</script>
