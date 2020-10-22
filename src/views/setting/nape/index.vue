
<template>
  <!-- 检查项设置 -->
  <div class="list-box">
    <search @sendSearch="getSearchData" />
    <div class="content-box">
      <div class="fle">
        <el-button type="primary mr10" @click="open(0)">新增</el-button>
      </div>
      <z-table :titles="titles" :btns="btn" :lists="lists" @sendVal="getVal" />
      <z-page :total="total" :page-size="baseParams.pageSize" :current-page="baseParams.pageIndex" @pagesend="getPageData" @pagesizes="pagesizes" />
    </div>
    <el-dialog
      destroy-on-close
      :title="addor.title"
      :visible.sync="centerDialogVisible"
      width="550px"
    >
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="150px" class="demo-ruleForm">
        <el-form-item label="检查项编号" prop="Code">
          <el-input v-model="ruleForm.Code" style="width:250px" :disabled="addor.type===2||addor.type===1?true:false" />
        </el-form-item>
        <el-form-item label="检查项名称" prop="Name">
          <el-input v-model="ruleForm.Name" style="width:250px" :disabled="addor.type===2?true:false" />
        </el-form-item>
        <el-form-item label="是否启用" prop="IsEnable">
          <el-select v-model="ruleForm.IsEnable" placeholder="请选择" :disabled="addor.type===2?true:false">
            <el-option label="是" :value="true" />
            <el-option label="否" :value="false" />
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer flcc">
        <el-button type="primary" @click="addor.type===2?(centerDialogVisible = false):(submitForm('ruleForm'))">{{ addor.type===2?'确 定':'保 存' }}</el-button>
        <el-button v-if="!(addor.type===2)" @click="centerDialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import search from './search'
import searchQuery from '@/mixins/search'
import { getCheckItemList, addCheckItem, getCheckItemDetail, editCheckItem, enableCheckItem } from '@/api/setting'
export default {
    components: { search },
    mixins: [searchQuery],
    data() {
        return {
            centerDialogVisible: false,
            lists: [],
            titles: [
                { name: '序号', data: 'index' },
                { name: '检查项编号', data: 'Code' },
                { name: '检查项名称', data: 'Name' },
                { name: '检查内容', data: 'ContentCount' },
                { name: '设置时间', data: 'SCtrlTime' },
                { name: '启用/关闭', data: 'IsEnable', type: 'switch' }
            ],
            btn: {
                title: '操作',
                width: 130,
                btnlist: [
                    { con: '编辑', type: 'info' },
                    { con: '详情', type: 'primary' }
                ]
            },
            addor: {},
            ruleForm: {
                Code: '',
                Name: '',
                IsEnable: '',
                IsWarnNode: ''
            }, rules: {
                Code: [
                    { required: true, message: '请输入监督节点编号', trigger: 'blur' }
                ],
                Name: [
                    { required: true, message: '请输入监督节点名称', trigger: 'blur' }
                ],
                IsEnable: [
                    { required: true, message: '请选择', trigger: 'change' }
                ]
            }
        }
    },
    created() {
        this.init()
    },
    methods: {
        init() {
            const data = { ...this.baseParams, ...this.searchData }
            getCheckItemList(data).then((res) => {
                const { Total, Data } = res.Data
                var i = 1
                const lists = Data.map(item => {
                    item.index = i++
                    return item
                })
                this.lists = lists
                this.total = Total
            })
        },
        initget(id) {
            getCheckItemDetail({ Id: id }).then((res) => {
                this.ruleForm = res.Data
                this.ruleForm.Id = String(id)
            })
        },
        getVal(val) {
            if (val.type === '详情') {
                this.open(2, val.data.SId)
            } else if (val.type === '编辑') {
                this.open(1, val.data.SId)
            } else if (val.type === 'switch') {
                enableCheckItem({ id: val.data.SId, isEnable: val.data.IsEnable })
            } else return
        },
        open(type, id) {
            if (type === 0) {
                this.addor.title = '新增'
                this.addor.type = type
                this.centerDialogVisible = true
                this.ruleForm = {
                    Code: '',
                    Name: '',
                    IsEnable: '',
                    IsWarnNode: ''
                }
            } else if (type === 1) {
                this.addor.title = '编辑'
                this.addor.type = type
                this.initget(id)
                this.centerDialogVisible = true
            } else {
                this.addor.title = '详情'
                this.addor.type = type
                this.initget(id)
                this.centerDialogVisible = true
            }
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                const data = this.ruleForm
                if (this.addor.type === 0) {
                    addCheckItem({ model: data }).then((res) => {
                        this.init()
                        this.centerDialogVisible = false
                    })
                } else {
                    editCheckItem({ model: data }).then((res) => {
                        this.init()
                        this.centerDialogVisible = false
                    })
                }
            })
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
