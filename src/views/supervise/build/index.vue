
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
import { getProjectList } from '@/api/supervise'
export default {
    components: { search },
    mixins: [searchQuery],
    data() {
        return {
            centerDialogVisible: false,
            titles: [
                { name: '序号', type: 'index' },
                { name: '项目名称', data: 'ProjectName' },
                { name: '项目编号', data: 'ProjectCode' },
                { name: '投资项目统一代码', data: 'InvestProjectCode' },
                { name: '招标人', data: 'TendererName' },
                { name: '直接监督单位', data: 'SuperviseUnit' },
                { name: '所属行业', data: 'IndustriesType' },
                { name: '资金来源', data: 'FundSource' },
                { name: '所在地区', data: 'RegionName' },
                { name: '招标项目数量', data: 'BidProjectCount' }
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
            getProjectList(data).then((res) => {
                const { Total, Data } = res.Data
                Data.map(e => {
                    return e
                })
                this.tableData = Data
                this.total = Total
            })
        },
        getVal(val) {
            if (val.type === '详情') {
                this.$router.push({
                    path: '/supervise/info',
                    query: { id: val.data.SId, ProjectCode: val.data.ProjectCode }
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
