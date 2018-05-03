<template>
  <div
    v-if="!loading"
    class="main">
    <div class="bg"></div>
    <div class="loan">
      <p class="ft-16">当前累计出借金额</p>
      <p class="ft-23">{{ loanMoney }}元</p>
    </div>
    <div class="rule">
      <span class="bg"></span>
      <span
        class="con ft-24"
        @click="openDialog('rules')">规则</span>
    </div>
    <div class="wave-container">
      <div class="wave-column">
        <div class="wave-column-clone">
          <div
            :style="{ height: height + 'rem' }"
            class="wave-main">
            <span class="wave"></span>
            <span class="wave shadow"></span>
            <span class="shape"></span>
          </div>
        </div>
      </div>
    </div>
    <div class="target-container">
      <div class="target-column">
        <div
          ref="target"
          :class="height < 6.826667 ? 'disabled' : ''"
          class="target">
          <span class="ft-21">1.2%加息券</span>
          <transition name="zoom">
            <a
              v-if="height === 6.826667"
              class="btn ft-18"
              href="javascript: void(0);"
              @click="getCash(3)">马上领取</a>
          </transition>
        </div>
        <div
          :class="height < 3.45333 ? 'disabled' : ''"
          class="target">
          <span class="ft-21">1.1%加息券</span>
          <transition name="zoom">
            <a
              v-if="height >= 3.45333"
              class="btn ft-18"
              href="javascript: void(0);"
              @click="getCash(2)">马上领取</a>
          </transition>
        </div>
        <div
          :class="height < 1.72 ? 'disabled' : ''"
          class="target">
          <span class="ft-21">1%加息券</span>
          <transition name="zoom">
            <a
              v-if="height >= 1.72"
              class="btn ft-18"
              href="javascript: void(0);"
              @click="getCash(1)">马上领取</a>
          </transition>
        </div>
      </div>
    </div>
    <Dialog
      :show-dialog="dialogs.rules.open"
      :name="dialogs.rules.name"
      @close-dialog="closeDialog"
      @global-close-dialog="closeDialog(dialogs.rules.name)">
      <div
        slot="main"
        class="dialog-rules">
        <h3 class="title ft-24">规则</h3>
        <p class="ft-16">1.活动期间，关注银豆网服务号的豆粉均可参与活动；</p>
        <p class="ft-16">2.活动期间，累计出借金额（期限≥30天的直投项目金额-活动期间用户债权转让金额）达到指定额度，即可领取对应的加息券奖励</p>
        <p class="ft-16">注：出借金额仅限于直投项目，预约标和手动标均可计入（新手标除外）</p>
        <p class="ft-16">出借≧5000元——1%加息券；</p>
        <p class="ft-16">出借≧100000元——1.1%加息券；</p>
        <p class="ft-16">出借≧500000元——1.2%加息券；</p>
        <p class="ft-16">3.加息券奖励计当前最高出借额度送出，满足条件可叠加领取，领取后重新按照当前在投金额计算对应奖励，只要满足条件仍可继续领取，没有次数限制；</p>
        <p class="ft-16">4.所有奖励均需在服务号手动领取，有效期为7天，领取后，加息券奖励会直接发放至账户，请注意查看使用；</p>
        <p class="ft-16">5.本次活动最终解释权归银豆网所有。</p>
      </div>
    </Dialog>
    <Dialog
      :show-dialog="dialogs.success.open"
      :name="dialogs.success.name"
      @close-dialog="closeDialog">
      <div
        slot="main"
        class="dialog-success">
        <p class="ft-23">恭喜您领取成功</p>
        <p class="ft-18">长按下方二维码，进行二维码识别还有现金卡奖励哦</p>
        <p><Icon
          :size="21"
          name="hand-down"></Icon></p>
        <img src="https://caiyunupload.b0.upaiyun.com/ydimg/theme/2018/05/riseseason/dfjlb.png">
        <div slot="btns">
          <a
            class="btn ft-26 gray"
            href="javascript: void(0);">关闭</a>
        </div>
      </div>
    </Dialog>
  </div>
</template>

<script>
import bus from '../../../app/bus';
import wxShare from '../../../utils/es6/wxShare';

export default {
  data() {
    return {
      styles: {
        height: '1.066667rem',
      },
      loanMoney: 0,
      nativeMoney: 0,
      height: 1.066667, // [1.066667, 6.826667]
      dialogs: {
        rules: {
          name: 'rules',
          open: false,
        },
        success: {
          name: 'success',
          open: false,
        },
      },
    };
  },
  computed: {
    loading() {
      return bus.loading;
    },
  },
  watch: {
    loading(newVal) {
      if (!newVal) {
        this.getUserInfo();
      }
    },
  },
  mounted() {
    if (!this.loading) {
      this.getUserInfo();
    }
    window.addEventListener('popstate', () => {
      this.getUserInfo();
    }, false);
    const shareData = {
      title: '加息助力升温季', // 分享标题
      desc: '点最高可达1.2，温度up收益爆表', // 分享描述
      link: '<{$share_url}>', // 分享链接
      imgUrl: 'https://caiyunupload.b0.upaiyun.com/ydimg/theme/2018/05/riseseason/share.png', // 分享图标
    };
    wxShare.setConfig();
    wxShare.init(shareData);
  },
  methods: {
    openDialog(name) {
      this.dialogs[name].open = true;
    },
    closeDialog(name) {
      this.dialogs[name].open = false;
      if (name === 'success') {
        this.updateHeight();
      }
    },
    updateHeight() {
      const diff1 = 1.76; // 132px [5000, 100000]
      const diff2 = 2.266667; // 170px [100000, 500000]
      if (this.nativeMoney >= 500000) {
        this.height = 6.826667; // 512px
      } else if (this.nativeMoney > 100000) {
        this.height = 3.453333 + ((this.nativeMoney - 100000) / 400000) * diff2;
      } else if (this.nativeMoney === 100000) {
        this.height = 3.453333; // 259px
      } else if (this.nativeMoney > 5000) {
        this.height = 1.72 + ((this.nativeMoney - 5000) / 95000) * diff1;
      } else if (this.nativeMoney === 5000) {
        this.height = 1.72; // 129px
      } else {
        this.height = 1.066667; // 80px
      }
    },
    getUserInfo(val) {
      this.$axios.getLoanInfo().then((data) => {
        this.loanMoney = data.total_money;
        this.nativeMoney = +data.money;
        if (val) {
          this.openDialog('success');
        } else {
          this.updateHeight();
        }
      });
    },
    getCash(id) {
      const DATA = {
        jaxiquan_id: id,
      };
      this.$axios.getCash(DATA).then((res) => {
        this.getUserInfo(res);
      });
    },
  },
};
</script>
