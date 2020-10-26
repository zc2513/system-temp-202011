<template>
  <div class="list-box">
    <div class="content-box f14">
      <el-row class="lh30">
        <el-col :span="24">
          <span class="label">检查内容编号：</span>
          <span>{{ detailsPageObj.Code }}</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <span class="label">检查内容名称：</span>
          <span>{{ detailsPageObj.Name }}</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <span class="label">是否启用：</span>
          <span>{{ detailsPageObj.IsEnable?'是':'否' }}</span>
        </el-col>
        <el-col :span="12">
          <span class="label">监督节点：</span>
          <span>{{ detailsPageObj.NodeId }}</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <span class="label">检查项：</span>
          <span>{{ detailsPageObj.ItemId }}</span>
        </el-col>
        <el-col :span="12">
          <span class="label">关联规则：</span>
          <span>{{ detailsPageObj.CheckContentEnum }}</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <span class="label">设置时间：</span>
          <span>{{ this.$route.query.SCtrlTime }}</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <span class="label">绿灯预警说明：</span>
          <span>{{ detailsPageObj.GreenWarnExplain }}</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <span class="label">红灯预警说明：</span>
          <span>{{ detailsPageObj.RedWarnExplain }}</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <span class="label">黄灯预警说明：</span>
          <span>{{ detailsPageObj.YellowWarnExplain }}</span>
        </el-col>
      </el-row>
    </div>
    <div v-if="paramsList.length || operateList.length" class="box mt15">
      <div v-if="paramsList.length">
        <span class="xhx">参数</span>
        <z-table :titles="paramsListTitles" :lists="paramsList" />
      </div>
      <div v-if="operateList.length">
        <span class="xhx mt20 mb15">操作记录</span>
        <z-table :titles="paramsListTitles" :lists="operateList" />
        <z-page :total="total" :page-size="baseParams.pageSize" :current-page="baseParams.pageIndex" @pagesend="getPageData" @pagesizes="pagesizes" />
      </div>
    </div>
  </div>
</template>

<script>
import { getCheckContentDetail } from '@/api/setting'
export default {
    name: 'Details',
    data() {
        return {
            baseParams: {
                pageIndex: 1,
                pageSize: 8
            },
            detailsPageObj: {
                Code: '',
                Name: '',
                IsEnable: '',
                NodeId: '',
                ItemId: '',
                CheckContentEnum: ''
            },
            paramsListTitles: [
                { name: '参数名称', data: 'paramsName' },
                { name: '参数级别', data: 'paramsLevel' },
                { name: '参数范围', data: 'paramsRange' }
            ],
            operateListTitles: [
                { name: '序号', type: 'index' },
                { name: '操作类型', data: 'operateType' },
                { name: '操作人', data: 'operator' },
                { name: '操作时间', data: 'operateTime' }
            ],
            paramsList: [], // 参数列表
            operateList: [] // 操作记录列表
        }
    },
    created() {
        this.initget(this.$route.query.SId)
    },
    methods: {
        initget(id) {
            getCheckContentDetail({ Id: id }).then((res) => {
                console.log(res)
                if (res.Code === '200') {
                    res.Data.NodeId = res.Data.SNodeId
                    res.Data.ItemId = res.Data.SItemId
                    res.Data.Id = id
                    res.Data.CheckContentEnum = res.Data.CheckContentEnumName
                    this.detailsPageObj = res.Data
                }
            })
        },
        // 参数列表
        initParamsList(id) {
            // eslint-disable-next-line no-undef
            getParamsList({ Id: id }).then((res) => {
                if (res.Code === '200') {
                    this.paramsList = res.Data
                }
            })
        },
        // 操作记录
        initOperateList(id) {
            const data = { ...this.baseParams, id }
            // eslint-disable-next-line no-undef
            getOperateList(data).then((res) => {
                const { Total, Data } = res.Data
                this.operateList = Data
                this.total = Total
            })
        },
        getPageData(page) {
            this.baseParams.page = page
        },
        pagesizes(size) {
            this.baseParams.page = 1
            this.baseParams.size = size
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/styles/views/listLayout.scss';

.content-box {
    .label{
        width:150px;
        display:inline-block;
        text-align:right;
        font-weight: 700;
    }
    .el-row{line-height:40px;}
}
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
}

</style>
