
<template>
  <!-- 标段列表页面 -->
  <div class="list-box">
    <search @sendSearch="getSearchData" />
    <div class="content-box">
      <z-table :titles="titles" :btns="btn" :lists="tableData" @sendVal="getVal" />
      <z-page :total="total" :page-size="baseParams.pageSize" :current-page="baseParams.pageIndex" @pagesend="getPageData" @pagesizes="pagesizes" />
    </div>
  </div>
</template>

<script>
import search from './packSearch'
import searchQuery from '@/mixins/search'
import { getWarnBidSectionList } from '@/api/supwarning'
export default {
    components: { search },
    mixins: [searchQuery],
    data() {
        return {
            centerDialogVisible: false,
            titles: [
                { name: '序号', type: 'index' },
                { name: '标段（包）名称', data: 'BidSectionName' },
                { name: '所属招标项目', data: 'ProjectName' },
                { name: '招标人', data: 'TendererName' },
                { name: '所在地区', data: 'RegionName' },
                { name: '专业分类', data: 'BidSectionClassifyCode' },
                { name: '招标方式', data: 'TenderModeName' },
                { name: '来源平台', data: 'TradePlat' },
                { name: '直接监督单位', data: 'SuperviseDeptName' },
                { name: '标段（包）建立时间', data: 'SSegCreateTime' },
                { name: '项目进度', data: 'Progress' },
                { name: '预警级别', type: 'light', data: 'warns' }
            ],
            btn: {
                title: '操作',
                btnlist: [{ con: '详情', type: 'primary' }]
            }
        }
    },
    created() {
        this.init()
    },
    methods: {
        init() {
            this.searchData.tenProjectCode = this.$route.query.tenProjectCode
            const data = { ...this.baseParams, ...this.searchData }
            getWarnBidSectionList(data).then((res) => {
                const { Total, Data } = res.Data
                Data.map(e => {
                    const warns = []
                    if (e.IsGreen) warns.push({ num: 0, type: 'b' })
                    if (e.IsRed) warns.push({ num: e.RedCount, type: 'c' })
                    if (e.IsYellow) warns.push({ num: e.YellowCount, type: 'd' })
                    if (e.Progress === 'BidEvaluation') { e.Progress = '评标阶段' }
                    if (e.Progress === 'BidOpening') { e.Progress = '开标阶段' }
                    if (e.Progress === 'Bidding') { e.Progress = '招标阶段' }
                    if (e.Progress === 'Calibration') { e.Progress = '定标阶段' }
                    if (e.Progress === 'Ended') { e.Progress = '已结束' }
                    if (e.Progress === 'NotStarted') { e.Progress = '未开始' }
                    if (e.Progress === 'Tendering') { e.Progress = '投标阶段' }
                    if (e.Progress === '') { e.Progress = '未定义' }
                    e.warns = warns
                    return e
                })

                this.tableData = Data
                this.total = Total
            })
        },
        getVal(val) {
            if (val.type === '详情') {
                this.$router.push({
                    path: '/supwarning/info',
                    query: { SId: val.data.SId, bidSectionCodes: val.data.BidSectionCode }
                })
            } else return
        }
    }
}
</script>

<style lang="scss" scoped>
.content-box{
    margin-top: 10px;
    // border-top: 1px solid ;
}
@import '@/styles/views/listLayout.scss';
</style>
