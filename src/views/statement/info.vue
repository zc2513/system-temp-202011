<template>
  <div class="list-box">
    <search @sendSearch="getSearchData" />
    <div class="content-box mt10">
      <div class="flsb mb5">
        <div class="f14 bold">
          当前检查项：{{ $route.query.checkItemCode }}---{{ $route.query.checkItemName }}
        </div>
        <!-- <div>
          <el-button size="mini" type="primary" class="mr20">全部导出</el-button>
        </div> -->
      </div>
      <z-table :titles="titles" :lists="tableData" :btns="btn" @sendVal="getVal" />
      <z-page :total="total" :page-size="baseParams.size" :current-page="baseParams.page" @pagesend="getPageData" @pagesizes="pagesizes" />
    </div>
  </div>
</template>

<script>
import search from './infosearch'
import searchQuery from '@/mixins/search'
import { getSectionForCheckItemList } from '@/api/statement'
export default {
    components: { search },
    mixins: [searchQuery],
    data() {
        return {
            titles: [
                { name: '序号', type: 'index' },
                { name: '标段(包)编号', data: 'BidSectionCode' },
                { name: '标段(包)名称', data: 'BidSectionName' },
                { name: '所属招标项目', data: 'ProjectName' },
                { name: '标段（包）建立时间', data: 'SSegCreateTime' },
                { name: '预警情况', data: 'warns', type: 'light' },
                { name: '最近预警时间', data: 'LastWarnTime' }
            ],
            btn: {
                title: '操作',
                btnlist: [
                    { con: '详情', type: 'primary' }
                ]
            }
        }
    },
    created() {
        this.init()
    },
    methods: {
        init() {
            const data = { ...this.baseParams, ...this.searchData, checkItemCode: this.$route.query.checkItemCode }
            getSectionForCheckItemList(data).then((res) => {
                const { Total, Data } = res.Data
                Data.map(e => {
                    const warns = []
                    if (e.IsGreen) warns.push({ num: 0, type: 'b' })
                    if (e.IsRed) warns.push({ num: e.RedCount, type: 'c' })
                    if (e.IsYellow) warns.push({ num: e.YellowCount, type: 'd' })
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
                    query: { SId: val.data.SId, bidSectionCodes: val.data.BidSectionCode, pageType: 'statement' }
                })
            } else return
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/styles/views/listLayout.scss';
</style>
