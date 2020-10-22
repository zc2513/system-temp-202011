
<template>
  <!-- 建设项目监督 -->
  <div class="list-box">
    <search @sendSearch="getSearchData" />
    <div class="content-box">
      <z-table :titles="titles" :btns="btn" :lists="tableData" @sendVal="getVal" />
      <z-page :total="total" :page-size="baseParams.pageSize" :current-page="baseParams.pageIndex" @pagesend="getPageData" @pagesizes="pagesizes" />
    </div>
  </div>
</template>

<script>
import search from './search'
import searchQuery from '@/mixins/search'
import { getItemReportList } from '@/api/statement'
export default {
    components: { search },
    mixins: [searchQuery],
    data() {
        return {
            titles: [
                { name: '序号', type: 'index' },
                { name: '检查项编号', data: 'CheckItemCode' },
                { name: '检查项名称', data: 'CheckItemName' },
                { name: '招标项目监督', data: 'ErrorTenProj', des: '(异常项目数量/项目总数量)', type: 'percent' },
                { name: '标段（包）监督', data: 'ErrorSection', des: '(异常标段数量/标段总数量)', type: 'percent' }
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
            const data = { ...this.baseParams, ...this.searchData }
            getItemReportList(data).then((res) => {
                const { Total, Data } = res.Data
                Data.map(e => {
                    e.ErrorSection = { nums: e.ErrorSectionCount, nume: e.TotalSectionCount }
                    e.ErrorTenProj = { nums: e.ErrorTenProjCount, nume: e.TotalTenProjCount }
                    return e
                })
                this.tableData = Data
                this.total = Total
            })
        },
        getVal(val) {
            if (val.type === '详情') {
                this.$router.push({
                    path: '/statement/info',
                    query: { checkItemCode: val.data.CheckItemCode, checkItemName: val.data.CheckItemName }
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
