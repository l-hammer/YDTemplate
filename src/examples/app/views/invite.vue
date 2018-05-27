<template>
  <div class="main invite">
    <div class="top">
      <p
        v-if="!selfLuckyNum || friendLuckyNum === '?'"
        class="tit single ft-26">{{ selfLuckyNum && selfLuckyNum !== '?' ? '激烈PK中……' : 'PK好友，赚钱拿奖金' }}</p>
      <p
        v-if="selfLuckyNum > friendLuckyNum"
        class="tit ft-26">恭喜您，PK胜利<br>获得1元奖金</p>
      <p
        v-if="selfLuckyNum < friendLuckyNum"
        class="tit ft-26">不要气馁，<br>邀请好友继续赚！</p>
      <router-link
        :to="{ name: 'rules', query: { invitation_id: gameInfo.invitation_id}}"
        class="rules ft-22">规则》</router-link>
    </div>
    <div
      :class="{ drumming: drumming }"
      class="mid">
      <div class="pk">
        <span class="num friend ft-80">{{ friendLuckyNum }}<span class="name ft-24"><br>好友</span></span>
        <span class="num vs ft-39">VS</span>
        <span class="num self ft-80">{{ selfLuckyNum }}<span class="name ft-24"><br>我的</span></span>
      </div>
      <transition name="zoom">
        <a
          v-if="!playStatus"
          href="javascript: void(0);"
          class="btn ft-24"
          @click="play">开始摇数</a>
      </transition>
    </div>
    <div
      :class="{ around: selfLuckyNum > friendLuckyNum }"
      class="bot">
      <a
        :class="{ disabled: disabled, shake: !disabled }"
        class="btn ft-21"
        href="javascript: void(0);"
        @click="invite">马上邀友去赚钱》</a>
      <a
        v-if="selfLuckyNum > friendLuckyNum"
        class="btn ft-21"
        href="javascript: void(0);"
        @click="withdraw">奖金提现》</a>
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
    <!-- <Dialog
      :show-dialog="dialogs.withdraw.open"
      :name="dialogs.withdraw.name"
      @global-close-dialog="closeDialog(dialogs.withdraw.name)">
      <div
        slot="main"
        class="dialog-withdraw">
        <div class="con ft-18">{{ withdrawStatus ? '奖金稍后将发放到您的账户中~' : '提现失败,请重新操作~' }}</div>
        <div slot="btns">
          <a
            class="btn ft-21"
            href="javascript: void(0);"
            @click="closeDialog(dialogs.withdraw.name)">确定</a>
        </div>
      </div>
    </Dialog> -->
  </div>
</template>

<script>
import mixin from '../mixins';

export default {
  mixins: [mixin],
  data() {
    return {
      friendLuckyNum: '?',
      selfLuckyNum: '?',
      drumming: false,
      playStatus: true,
      isBind: false,
      withdrawStatus: true,
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
    const num = res.slave_number;

    this.playStatus = !!+num;
    this.selfLuckyNum = !+num ? '?' : num;
    this.friendLuckyNum = !+num ? '?' : res.master_number;
    this.drumming = !!+num;
    this.disabled = !+num;
    this.isBind = this.gameInfo.fenxiang;
  },
  methods: {
    play() {
      let timer = null;
      let i = 0;
      const data = {
        act: 'slave_num',
        invitation_id: decodeURIComponent(this.gameInfo.invitation_id),
        open_id: this.gameInfo.openid,
      };

      this.$axios.invite(data).then((res) => {
        this.arrayPull(this.shuffleArr, res.s_number);
        this.shuffleArr.push(res.s_number);
        this.playStatus = true;
        timer = setInterval(() => {
          this.drumming = !this.drumming;
          this.selfLuckyNum = this.shuffleArr[i];
          i += 1;
          if (timer && i === this.shuffleArr.length) {
            clearInterval(timer);
            this.disabled = false;
            this.friendLuckyNum = this.gameInfo.result.master_number;
          }
        }, 129);
      });
    },
    invite() {
      this.$router.push({ name: 'index' });
    },
    goBind() {
      window.location.href = 'https://www.yindou.com/cnl/?ydcod=wx_regist';
    },
    withdraw() {
      if (!this.isBind) {
        this.openDialog('bind');
      } else {
        window.location.href = '/uc/index';
      }
    },
  },
};
</script>
