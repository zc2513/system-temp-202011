<template>
  <div>
    <z-table :titles="titles" :lists="list" :btns="btn" />
    <!-- <z-page :total="total" :page-size="baseParams.pageSize" :current-page="baseParams.pageIndex" @pagesend="getPageData" @pagesizes="pagesizes" /> -->
  </div>
</template>

<script>
export default {
    props: {
        list: {
            type: Array,
            default: _ => []
        }
    },
    data() {
        return {
            titles: [
                { name: '序号', type: 'index' },
                { name: '标段（包）名称', data: 'BidSectionName' },
                { name: '所属招标项目', data: 'TenderProjectName' },
                { name: '招标代理机构', data: 'TendererName' },
                { name: '招标采购方式', data: 'TenderMode' },
                { name: '中标日期', data: 'BidWinningDateTime' },
                { name: '中标金额', data: 'BidWinningAmount' },
                { name: '交易平台', data: 'TradePlat' }
            ],
            btn: false
        }
    }
}
</script>

<style lang="stylus" scoped>

</style>
