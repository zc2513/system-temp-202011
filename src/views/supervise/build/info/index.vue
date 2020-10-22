
<template>
  <!-- 建设项目/项目详情 -->
  <div class="list-box">
    <div class="box">
      <span class="xhx">项目基本信息</span>
      <table border="0" cellpadding="0" cellspacing="0" class="biaoge">
        <tr>
          <td class="jc">项目名称</td>
          <td>{{ Projectdata.ProjectName }}</td>
          <td class="jc">投资项目统一代码</td>
          <td>{{ Projectdata.InvestProjectCode }}</td>
        </tr>
        <tr>
          <td class="jc">招标人</td>
          <td>{{ Projectdata.TendererName }}</td>
          <td class="jc">所属行业</td>
          <td>{{ Projectdata.IndustriesType }}</td>
        </tr>
        <tr>
          <td class="jc">所在地区</td>
          <td>{{ Projectdata.RegionName }}</td>
          <td class="jc">资金来源</td>
          <td>{{ Projectdata.FundSource }}</td>
        </tr>
        <tr>
          <td class="jc">项目规模</td>
          <td>{{ Projectdata.ProjectScale }}</td>
          <td class="jc">项目创建时间</td>
          <td>{{ Projectdata.SProjectCreateTime }}</td>
        </tr>
        <tr>
          <td class="jc">直接监督单位</td>
          <td>{{ Projectdata.SuperviseUnit }}</td>
          <td class="jc">招标项目数量</td>
          <td>{{ Projectdata.BidProjectCount }}</td>
        </tr>
        <tr>
          <td class="jc">数据来源</td>
          <td>{{ Projectdata.TradePlat || '暂无' }}</td>
          <td class="jc">数据来源时间</td>
          <td>{{ Projectdata.SSubmitTimestamp }}</td>
        </tr>
      </table>
      <span class="xhx mt20 mb15">招标项目信息</span>
      <z-table :titles="titles" :btns="btn" :lists="tableData" @sendVal="getVal" />
      <z-page :total="total" :page-size="baseParams.pageSize" :current-page="baseParams.pageIndex" @pagesend="getPageData" @pagesizes="pagesizes" />
    </div>
  </div>
</template>

<script>
import { getProjectDetail, getTenProjectByProjList } from '@/api/supervise'
import searchQuery from '@/mixins/search'
export default {
    name: 'Bidinfo',
    mixins: [searchQuery],
    data() {
        return {
            titles: [
                { name: '序号', type: 'index' },
                { name: '招标项目名称', data: 'TenderProjectName' },
                { name: '招标项目编号', data: 'TenderProjectCode' },
                { name: '招标人', data: 'TendererName' },
                { name: '所在地区', data: 'RegionName' },
                { name: '直接监督单位', data: 'SuperviseDeptName' },
                { name: '招标项目建立时间', data: 'STenderProjectCreateTime' },
                { name: '来源平台', data: 'TradePlat' },
                { name: '标段（包）数量', data: 'BidSectionCount' }
            ],
            btn: {
                title: '操作',
                btnlist: [
                    { con: '详情', type: 'primary' }
                ]
            },
            Projectdata: {}
        }
    },
    created() {
        this.init()
    },
    methods: {
        init() {
            getProjectDetail({ id: this.$route.query.id }).then((res) => {
                this.Projectdata = res.Data
            })
            getTenProjectByProjList({ projectCode: this.$route.query.ProjectCode, ...this.baseParams }).then((res) => {
                const { Total, Data } = res.Data
                this.tableData = Data
                this.total = Total
            })
        },
        getVal(val) {
            if (val.type === '详情') {
                this.$router.push({
                    path: '/supervise/pack',
                    query: { bidSectionCodes: val.data.BidSectionCodes, tenProjectCode: val.data.TenderProjectCode }
                })
            } else return
        }
    }
}
</script>

<style lang="scss" scoped>
.box{
    border-radius: 15px;
    background-color: #fff;
    padding:15px 15px 20px;
    .xhx{
        font-size: 14px;
        border-bottom: 3px solid #409EFF;
        margin-bottom: 10px;
        line-height: 30px;
        display: inline-block;
    }
    .biaoge{
        width: 100%;
        font-size: 14px;
        border-collapse: collapse;
        border-spacing: 0;
        margin-bottom: 10px;
        .jc{
            font-weight: 700;
            width: 10%;
            background: #f5f7fa;
            border: 0.5px solid #d9d9d9;
        }
        tr{
            height: 40px;
            td{
                width: 25%;
                line-height: 20px;
                text-align: center;
                border: 0.5px solid #d9d9d9;
            }
        }
    }
}

@import '@/styles/views/listLayout.scss';
</style>
