<template>
  <div class="main rules">
    <p class="ft-14">1. 活动时间：5.22—6.22</p>
    <p class="ft-14">2. 活动期间，邀请人和被邀请人之间，参与活动都可以拿到1-9的随机数字，按照比大小的结果生成对应的奖励。</p>
    <p class="ft-14">具体如下图：</p>
    <div class="table">
      <div class="table-header">
        <span>邀请人赢</span>
        <span>邀请人输</span>
      </div>
      <div class="table-body">
        <div
          v-for="record in records"
          :key="record.id"
          class="item">
          <span>{{ record.win }}</span>
          <span>{{ record.lose }}</span>
        </div>
      </div>
    </div>
    <p class="ps ft-14">Ps: 邀请人越多赚越多，输赢都有钱上不封顶哦！</p>
    <p class="ft-14">3. 被邀请人需为平台未注册用户，被邀请人完成注册并在银豆网服务号绑定账户后，双方即可同步激活有效奖励。</p>
    <p class="ft-14">4. 在活动页面中可以查看有效奖励的明细，奖励累积至3元就可提取，所有奖励均需手动领取，满足银豆网注册开户即可，奖励统一于当日24:00前到账。</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      records: [
        {
          win: '邀请人获得：1元',
          lose: '邀请人获得：0.5元',
        },
        {
          win: '被邀请人获得：0元',
          lose: '被邀请人获得：1元',
        },
      ],
    };
  },
};
</script>
