<template>
  <div class="main records">
    <div class="table">
      <div class="table-header">
        <span class="date">激活时间</span>
        <span>激活金额</span>
        <span>奖金来源</span>
      </div>
      <div
        v-if="!listLoading && records.length > 0"
        class="table-body">
        <div
          v-for="record in records"
          :key="record.id"
          class="item">
          <span class="date">{{ record.dt }}</span>
          <span>{{ record.money }} 元</span>
          <span>{{ record.state === 1 ? '参与邀请' : '好友绑定' }}</span>
        </div>
      </div>
      <div
        v-if="!listLoading && records.length === 0"
        class="empty">暂无记录</div>
      <div
        v-if="listLoading"
        class="loading">
        <span class="YDSICON yds-icon-loading ft-20"></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Record',
  data() {
    return {
      records: [],
      listLoading: false,
    };
  },
  created() {
    this.getRecords();
  },
  methods: {
    getRecords() {
      const data = {
        act: 'list',
      };
      this.$axios.invite(data).then((res) => {
        this.records = res || [];
        this.listLoading = false;
      });
    },
  },
};
</script>
