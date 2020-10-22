
<template>
  <!-- 监督预警列表页面 -->
  <div class="list-box">
    <search @sendSearch="getSearchData" />
    <div class="content-box">
      <z-table :titles="titles" :btns="btn" :lists="tableData" @sendVal="getVal" />
      <z-page :total="total" :page-size="baseParams.pageSize" :current-page="baseParams.pageIndex" @pagesend="getPageData" @pagesizes="pagesizes" />
    </div>
  </div>
</template>

<script>
import search from './indexSearch'
import searchQuery from '@/mixins/search'
import { getWarnTenProjectList } from '@/api/supwarning'
export default {
    components: { search },
    mixins: [searchQuery],
    data() {
        return {
            centerDialogVisible: false,
            titles: [
                { name: '序号', type: 'index' },
                { name: '招标项目名称', data: 'TenderProjectName' },
                { name: '招标项目编号', data: 'TenderProjectCode' },
                { name: '招标人', data: 'TendererName' },
                { name: '所在地区', data: 'RegionName' },
                { name: '直接监督单位', data: 'SuperviseDeptName' },
                { name: '招标项目建立时间', data: 'STenderProjectCreateTime' },
                { name: '来源平台', data: 'TradePlat' },
                { name: '预警情况', data: 'warnNum', type: 'percent' }
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
            getWarnTenProjectList(data).then((res) => {
                const { Total, Data } = res.Data
                Data.map(e => {
                    e.warnNum = { nums: e.ErrorSectionCount, nume: e.AllSectionCount }
                    return e
                })
                this.tableData = Data
                this.total = Total
            })
        },
        getVal(val) {
            if (val.type === '详情') {
                this.$router.push({
                    path: '/supwarning/index/packList',
                    query: { tenProjectCode: val.data.TenderProjectCode }
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
