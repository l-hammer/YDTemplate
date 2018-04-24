<template>
    <div class="records">
        <div class="records-table">
            <div class="records-table-header">
                <span>日期</span>
                <span>类型</span>
                <span>金额（元）</span>
            </div>
            <div v-if="!loading && records.length > 0" class="records-table-body">
                <div class="item" v-for="record in records">
                    <span>{{record.dt}}</span>
                    <span>{{record.bonus_type}}</span>
                    <span>{{record.money}}</span>
                </div>
            </div>
            <div v-if="!loading && records.length === 0" class="empty">暂无记录</div>
            <div v-if="loading" class="loading"><span class="YDSICON yds-icon-loading ft-20"></span></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'record',
    data() {
        return {
            records: [],
            loading: true,
        };
    },
    created() {
        this.getRecords();
    },
    methods: {
        getRecords() {
            // this.$axios.getCardRecords().then((res) => {
            //     this.records = res || [];
            //     this.loading = false;
            // });
        },
    },
};
</script>
