
<template>
  <!-- 检查内容设置 -->
  <div class="list-box">
    <search @sendSearch="getSearchData" />
    <div class="content-box">
      <div class="fle">
        <el-button type="primary mr10" @click="open(0)">新增</el-button>
      </div>
      <z-table :titles="titles" :btns="btn" :lists="tableData" @sendVal="getVal" />
      <z-page :total="total" :page-size="baseParams.pageSize" :current-page="baseParams.pageIndex" @pagesend="getPageData" @pagesizes="pagesizes" />
    </div>
    <!-- 新增，编辑，详情弹框 -->
    <el-dialog
      destroy-on-close
      :title="addor.title"
      :visible.sync="centerDialogVisible"
      width="40%"
      top="10vh"
      center
    >
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="150px" class="demo-ruleForm">
        <el-form-item label="检查内容编号:" prop="Code">
          <el-input v-model="ruleForm.Code" :disabled="addor.type===2||addor.type===1?true:false" />
        </el-form-item>
        <el-form-item label="检查内容名称:" prop="Name">
          <el-input v-model="ruleForm.Name" :disabled="addor.type===2?true:false" />
        </el-form-item>
        <el-form-item label="是否启用:" prop="IsEnable">
          <el-select v-model="ruleForm.IsEnable" placeholder="请选择" :disabled="addor.type===2?true:false">
            <el-option label="是" :value="true" />
            <el-option label="否" :value="false" />
          </el-select>
        </el-form-item>
        <el-form-item label="监督节点:" prop="NodeId">
          <el-select v-model="ruleForm.NodeId" placeholder="请选择" :disabled="addor.type===2||addor.type===1?true:false">
            <el-option v-for="(a,b) in dics.nodes" :key="b" :label="a.Name" :value="a.SId" />
          </el-select>
        </el-form-item>
        <el-form-item label="检查项:" prop="ItemId">
          <el-select v-model="ruleForm.ItemId" placeholder="请选择" :disabled="addor.type===2||addor.type===1?true:false">
            <el-option v-for="(c,d) in dics.napes" :key="d" :label="c.Name" :value="c.SId" />
          </el-select>
        </el-form-item>
        <el-form-item label="关联规则:" prop="CheckContentEnum">
          <el-select v-model="ruleForm.CheckContentEnum" placeholder="请选择" :disabled="addor.type===2||addor.type===1?true:false">
            <el-option v-for="(e,f) in dics.rules" :key="f" :label="e" :value="f" />
          </el-select>
        </el-form-item>
        <el-form-item label="绿灯预警说明:">
          <el-input v-model="ruleForm.GreenWarnExplain" type="textarea" rows="3" resize="none" maxlength="256" show-word-limit :disabled="addor.type===2?true:false" />
        </el-form-item>
        <el-form-item label="红灯预警说明:">
          <el-input v-model="ruleForm.RedWarnExplain" type="textarea" rows="3" resize="none" maxlength="256" show-word-limit :disabled="addor.type===2?true:false" />
        </el-form-item>
        <el-form-item label="黄灯预警说明:">
          <el-input v-model="ruleForm.YellowWarnExplain" type="textarea" rows="3" resize="none" maxlength="256" show-word-limit :disabled="addor.type===2?true:false" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button v-if="!(addor.type===2)" @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addor.type===2?(centerDialogVisible = false):(submitForm('ruleForm'))">{{ addor.type===2?'确 定':'保 存' }}</el-button>
      </span>
    </el-dialog>
    <!-- 设置参数弹框 -->
    <el-dialog
      destroy-on-close
      :title="addor.title"
      :visible.sync="csDialogVisible"
      top="10vh"
      width="40%"
      custom-class="params-setting-cls"
    >
      <div class="params-setting-content">
        <div class="flsb">
          <div class="w-50 fl">
            <div class="w90 bold f14">检查内容编号:</div>
            <div class="pl10 ">{{ setdata.Code }}</div>
          </div>
          <div class="fl w-50">
            <div class="w90 bold f14">检查内容名称:</div>
            <div class="pl10 ">{{ setdata.Name }}</div>
          </div>
        </div>
        <div v-if="setdata.GreenWarnExplain" class="flsb mt10">
          <div class="bold f14 w90 lh20">绿灯预警说明:</div>
          <div class="f12 fl1 lh20 pl10">{{ setdata.GreenWarnExplain }} </div>
        </div>
        <div v-if="setdata.RedWarnExplain" class="flsb mt10">
          <div class="bold f14 w90 lh20">红灯预警说明:</div>
          <div class="f12 fl1 lh20 pl10">{{ setdata.RedWarnExplain }}</div>
        </div>
        <div v-if="setdata.YellowWarnExplain" class="flsb mt10">
          <div class="bold f14 w90 lh20">黄灯预警说明:</div>
          <div class="f12 fl1 lh20 pl10">{{ setdata.YellowWarnExplain }}</div>
        </div>
      </div>
      <!-- v-if="csdata.length" -->
      <div v-if="csdata.length" class="liebiao">
        <div class="bold f14 mb10 mt10">参数列表:</div>
        <table border="1" style="width:100%;">
          <tr>
            <td>参数名称</td>
            <td>参数级别</td>
            <td>参数范围</td>
          </tr>
          <tr v-for="(item,index) in csdata" :key="index">
            <td>{{ item.Name }}</td>
            <td>{{ item.Range }}</td>
            <td>
              <el-input v-model="item.minValue" class="w90" /> <span v-if="item.unit">%</span>   ——   <el-input v-model="item.maxValue" class="w90" /> <span v-if="item.unit">%</span>
            </td>
          </tr>
        </table>
        <div class="mt15">提示：每个参数的参数范围包含最小值，不包含最大值。</div>
      </div>
      <span slot="footer" class="dialog-footer flcc">
        <el-button v-if="csdata.length" type="primary" @click="setcs">保 存</el-button>
        <el-button @click="csDialogVisible = false"> {{ csdata.length===0?'关 闭':'取 消' }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import search from './search'
import searchQuery from '@/mixins/search'
import {
    getCheckContentList, addCheckContent, getCheckContentDetail, editCheckContent, enableCheckContent,
    getAllSuperviseNodeList, getAllCheckItemList, getCheckContentEnum, getCheckContentParamList, editCheckContentParam } from '@/api/setting'
export default {
    components: { search },
    mixins: [searchQuery],
    data() {
        return {
            centerDialogVisible: false,
            csDialogVisible: false,
            dics: { // 下拉框数据
                nodes: [], // 监督节点
                napes: [], // 检测项
                rules: []// 关联规则
            },
            setdata: {},
            csdata: [],
            titles: [
                { name: '序号', type: 'index' },
                { name: '检查内容编号', data: 'Code' },
                { name: '检查内容名称', data: 'Name' },
                { name: '所属监督节点', data: 'NodeName' },
                { name: '所属检查项', data: 'ItemName' },
                { name: '设置时间', data: 'SCtrlTime' },
                { name: '启用/关闭', data: 'IsEnable', type: 'switch' }
            ],
            btn: {
                title: '操作',
                width: 220,
                btnlist: [
                    { con: '编辑', type: 'info' },
                    { con: '详情', type: 'primary' },
                    { con: '设置参数', type: 'info' }
                ]
            },
            addor: {},
            ruleForm: {
                Code: '',
                Name: '',
                IsEnable: '',
                NodeId: '',
                ItemId: '',
                CheckContentEnum: ''
            },
            rules: {
                Code: [
                    { required: true, message: '请输入监督节点编号', trigger: 'blur' }
                ],
                Name: [
                    { required: true, message: '请输入监督节点名称', trigger: 'blur' }
                ],
                IsEnable: [
                    { required: true, message: '请选择', trigger: 'change' }
                ],
                NodeId: [
                    { required: true, message: '请选择', trigger: 'change' }
                ],
                ItemId: [
                    { required: true, message: '请选择', trigger: 'change' }
                ],
                CheckContentEnum: [
                    { required: true, message: '请选择', trigger: 'change' }
                ]
            }
        }
    },
    created() {
        this.initDic()
        this.init()
    },
    methods: {
        initDic() {
            // 监督节点
            getAllSuperviseNodeList().then((res) => { this.dics.nodes = res.Data })
            // 检测项
            getAllCheckItemList().then((res) => { this.dics.napes = res.Data })
            // 关联规则
            getCheckContentEnum().then((res) => { this.dics.rules = res.Data })
        },
        init() {
            const data = { ...this.baseParams, ...this.searchData }
            getCheckContentList(data).then((res) => {
                const { Total, Data } = res.Data
                this.tableData = Data
                this.total = Total
            })
        },
        initget(id) {
            getCheckContentDetail({ Id: id }).then((res) => {
                res.Data.NodeId = res.Data.SNodeId
                res.Data.ItemId = res.Data.SItemId
                res.Data.Id = id
                res.Data.CheckContentEnum = res.Data.CheckContentEnumName
                this.ruleForm = res.Data
            })
        },
        initcs(id) {
            // 内容详情
            getCheckContentDetail({ Id: id }).then((res) => { this.setdata = res.Data })
            // 参数详情
            getCheckContentParamList({ contentId: id }).then((res) => { this.csdata = res.Data })
        },
        getVal(val) {
            if (val.type === '详情') {
                // this.open(2, val.data.SId)
                console.log(val)
                this.$router.push({
                    path: '/setting/content/details',
                    query: { SId: val.data.SId, SCtrlTime: val.data.SCtrlTime }
                })
            } else if (val.type === '编辑') {
                this.open(1, val.data.SId)
            } else if (val.type === 'switch') {
                enableCheckContent({ id: val.data.SId, isEnable: val.data.IsEnable }).then((res) => {
                })
            } else if (val.type === '设置参数') {
                this.open(3, val.data.SId)
            }
        },
        open(type, id) {
            this.addor.type = type
            this.ruleForm = {}
            if (type === 0) {
                this.addor.title = '新增'
                this.centerDialogVisible = true
            } else if (type === 1) {
                this.addor.title = '编辑'
                this.initget(id)
                this.centerDialogVisible = true
            } else if (type === 3) {
                this.addor.title = '设置参数'
                this.initcs(id)
                this.csDialogVisible = true
            }
            // else {
            //     this.addor.title = '详情'
            //     this.initget(id)
            //     this.centerDialogVisible = true
            // }
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (!valid) {
                    return false
                } else {
                    if (this.addor.type === 0) {
                        addCheckContent({ model: this.ruleForm }).then((res) => {
                            this.init()
                            this.centerDialogVisible = false
                        })
                    } else {
                        editCheckContent({ model: this.ruleForm }).then((res) => {
                            this.init()
                            this.centerDialogVisible = false
                        })
                    }
                }
            })
        },
        setcs() {
            const data = this.csdata.map(e => {
                return { minValue: e.minValue, maxValue: e.maxValue, ParamId: e.SId }
            })
            data.forEach((item) => {
                if (item.minValue && item.maxValue === undefined) { // 有小值，没有大值
                    this.$message({
                        showClose: true,
                        message: '请完善参数范围！',
                        type: 'error'
                    })
                } else if (item.minValue === undefined && item.maxValue) { // 有大值，没有小值
                    this.$message({
                        showClose: true,
                        message: '请完善参数范围！',
                        type: 'error'
                    })
                } else if (item.minValue >= item.maxValue) { // 小值大于等于大值
                    this.$message({
                        showClose: true,
                        message: '参数范围无效，请重新设置！',
                        type: 'error'
                    })
                } else if (item.unit === '%') {
                    if (item.minValue < 0 || item.maxValue > 100) { // 有百分号，并且小值小于0或者大值大于100
                        this.$message({
                            showClose: true,
                            message: '参数范围必须从0%—100%，请重新设置！',
                            type: 'error'
                        })
                    }
                } else {
                    editCheckContentParam({ param: data }).then((res) => {
                        this.csDialogVisible = false
                    })
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/styles/views/listLayout.scss';
.content-box{margin-top: 10px;}
::v-deep{
    .el-select{
        width: 100%;
    }
}
.params-setting-cls{//设置参数弹窗
    .w90{width: 90px;}
    .liebiao table{
        text-align: center;
        width: 100%;
        border-collapse: collapse;
        border-spacing: 0;
        tr{  height: 40px; }
        ::v-deep {
            .el-input__inner{
                text-align: center;
            }
        }
    }
}
</style>
