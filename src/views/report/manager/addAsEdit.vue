<template>
  <!-- OTJ新建计划/区域、部门、团队 -->
  <el-dialog :visible.sync="showDialogVisible" width="80%" fullscreen :modal-append-to-body="false" :modal="false" append-to-body class="addPlan">
    <div slot="title" class="flc-y dialog-header">
      {{ title }}
    </div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="汇报内容" name="first">
        <div>
          <span>研发经理:</span>
          <span>{{ formInline.realname }}</span>
        </div>
        <el-form ref="ruleForm" :model="formInline" label-width="80px" class="form-box">
          <select-student ref="selectStu" :user-id="userInfo.userId" :show-button="false" :selected="false" :mult="false" @changeUser="changeUser" />
          <div class="fl">
            <div class="w-50">
              <el-form-item label="提交时间:" class="ml10" prop="time">
                <el-date-picker
                  v-model="formInline.monthReportDate"
                  type="date"
                  placeholder="请选择时间"
                  value-format="timestamp"
                />
              </el-form-item>
            </div>
            <div class="w-50">
              <el-form-item label="完成状态:" class="ml10" prop="time">
                <el-select v-model="formInline.status" reserve-keyword placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </div>
            <div class="w-50">
              <el-form-item label="汇报内容:" class="ml10" prop="content">

                <editor v-model="formInline.monthReportContent" :disabled=" !(type === 1 || type === 2)" />
              </el-form-item>
            </div>

          </div>
        </el-form>
        <el-button @click="showDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm1(true)">确 定</el-button>
      </el-tab-pane>
      <el-tab-pane label="应届生绩效" name="second">
        <div class="mb30">
          <z-table
            :titles="titles"
            :btns="btn"
            :lists="tableData"
            align="left"
            class="mt15"
            @sendVal="getVal"
          />
          <z-page :total="50" class="zPage" />
        </div>
        <el-button @click="showDialogVisible = false">取 消</el-button>
        <el-button @click="submitForm(false)">暂存</el-button>
        <el-button type="primary" @click="submitForm(true)">确 定</el-button>

      </el-tab-pane>
    </el-tabs>

    <scoreDrawer ref="scoreDrawer" />
  </el-dialog>
</template>

<script>
import datas from '@/assets/json/data'
import scoreDrawer from './scoreDrawer'
import { mapState } from 'vuex'
import editor from '@/components/editor'

import SelectStudent from '@/components/tsforce/SelectStudent.vue'
import { save, list, list1, eidt } from '@/api/mgrMonthReport'
import serachSave from '@/mixins/search'
import { queryArearDeptGroupById, queryUserBaseByGroupId } from '@/api/systemOrg'

export default {
    components: { scoreDrawer, SelectStudent, editor },
    mixins: [serachSave],

    props: {
        type: {
            type: [String, Number],
            default: 1
        },
        title: {
            type: String,
            default: '新建应届生培养月报'
        }
    },
    data() {
        return {
            showDialogVisible: false,
            formInline: {
                realname: '',
                monthReportContent: '',
                monthReportName: '',
                monthReportDate: '',
                status: '0'

            },
            options: [
                { value: '-1', label: '删除' },
                { value: '0', label: '暂存' },
                { value: '1', label: '已提交' }

            ],
            titles: [
                { name: '工号', data: 'producer' },
                { name: '姓名', data: 'producer' },
                { name: '基础活动', data: 'producer' },
                { name: '软件编码', data: 'producer' },
                { name: '软件维护', data: 'producer' },
                { name: '软件验证', data: 'producer' },
                { name: '软件设计', data: 'producer' },
                { name: '软件需求', data: 'producer' },
                { name: '组别', data: 'producer' },
                { name: '提交时间', data: 'lastUpdateTime', type: 'time', time: '{y}-{m}-{d}' }
            ],
            tableData: datas.slice(0, 8),
            btn: {
                title: '操作',
                btnlist: [
                    { con: '编辑', type: 'text' }
                ]
            },
            mgrlist: [],
            users: [],
            activeName: 'first',
            areaId: null,
            areaName: null,
            departId: null,
            departName: null
        }
    },
    computed: {
        ...mapState('user', ['token', 'userInfo'])
    },
    methods: {
        show(data) {
            // if (data) {
            //     this.formInline = {
            //         content: '范德萨发生',
            //         group: '选项2',
            //         person: '张三',
            //         student: ['选项5'],
            //         time: 1603641600000
            //     }
            // }
            if (data) {
                Object.assign(this.formInline, data)
            }
            this.init()
            this.showDialogVisible = true
        },
        init() {
            console.log('user 查询绩效学生-------------->', this.userInfo)
            this.searchData.periodId = this.userInfo.defaultPeriodId
            const data = {
                ...this.baseParams,
                ...this.searchData
            }
            console.log('init 参数', data)
            //  this.loadData(data)
        },
        loadData(data) {
            list(data).then(res1 => {
                console.log('编辑经理查询结过月报', res1)
                if (res1.success === true) {
                    this.mgrlist = res1.result.records
                    this.baseParams.total = res1.result.total
                    this.loadYJS(data)

                    console.log('编辑经理tir月报', this.mgrlist)
                }
            })
        },
        loadYJS(data) {
            var groupId = data.groupId
            this.queryUserBaseByGroupId(groupId)
        },
        queryUserBaseByGroupId(groupId) {
            const params = {
                groupId: groupId
            }
            // dd
            queryUserBaseByGroupId(params).then(res => {
                if (res.success) {
                    this.users = res.result
                    this.processUser()
                } else {
                    this.$message.error({ title: '查询失败', content: res.message })
                }
            })
        },
        processUser() {
            // 构建一个表
        },

        submitForm(status) {
            console.log(this.formInline)
            if (status) {
                // 验证提交信息
                this.$refs.ruleForm.validate((valid) => {
                    // if (valid) return false

                    // 通过逻辑处理
                    //   const uri = this.type === 1 ? 'path' : (this.type === 2 ? 'url' : 'url')
                    //   console.log(uri, '提交地址')
                    this.postData()
                })
            } else {
                // 不验证
                this.postData()
            }
        },
        submitForm1(status) {
            console.log(this.formInline)
            if (status) {
                // 验证提交信息
                this.$refs.ruleForm.validate((valid) => {
                    // if (valid) return false

                    // // 通过逻辑处理
                    // const uri = this.type === 1 ? 'path' : (this.type === 2 ? 'url' : 'url')
                    // console.log(uri, '提交地址')
                    this.postData()
                })
            } else {
                // 不验证
                this.postData()
            }
        },
        postData() {
            // 数据提交
            switch (this.type) {
                case 1: // 新增

                    console.log('保存 一线经理月报-------------------------->', this.formInline)
                    this.save()
                    break
                case 2: // 编辑
                    console.log('被编辑')
                    var data = {
                        id: this.formInline.id,
                        content: this.formInline.content
                    }
                    console.log('保存辅导-----修改--------------------------->', data)
                    this.save(data)
                    break
                default:
                    this.showDialogVisible = false
                    break
            }
        },
        save(data) {
            if (data) {
                console.log('被编辑')
                save(data).then(res => {
                    if (res.success) {
                        console.log('返回结果000000000000000000000000', res)
                        this.$message.success(res.message)
                        this.showDialogVisible = false
                        this.$emit('ok')
                    } else {
                        this.$message.warning(res.message)
                        this.showDialogVisible = false
                        this.$refs['ruleForm'].resetFields()
                    }
                })
            } else {
                this.formInline.id = null
                save(this.formInline).then(res => {
                    if (res.success) {
                        this.$message.success(res.message)
                        this.$emit('ok')
                    } else {
                        this.$message.warning(res.message)
                    }
                    this.showDialogVisible = false
                    this.$refs['ruleForm'].resetFields()
                    console.log('返回结果', res)
                })
            }
        },

        resetForm(formName) {
            this.$refs[formName].resetFields()
        },
        changeUser(selectorg, user, selectOrgName) {
            //  this.$emit('changeUser', this.selectorg, user[0], this.selectOrgName, this.selectNode, this.users.length)
            console.log('----------------------------', selectorg, user)
            this.areaId = selectorg[0]
            this.areaName = selectOrgName[0]
            this.departId = selectorg[1]
            this.departName = selectOrgName[1]
            this.searchData.groupId = selectorg[2]
            this.searchData.groupName = selectOrgName[2]
            if (user != null) {
                this.searchData.realname = user.realname
            }
            this.formInline.groupId = this.searchData.groupId
            this.formInline.groupName = this.searchData.groupName
            this.formInline.areaId = this.areaId
            this.formInline.areaName = this.areaName
            this.formInline.departId = this.departId
            this.formInline.departName = this.departName
            this.init()
        },
        getVal(v) {
            const { type } = v
            if (type === '编辑') {
                this.$refs.scoreDrawer.show()
            }
        },
        handleClick(tab, event) {
            console.log(tab, event)
        }

    }
}
</script>

<style lang="scss" scoped>
.addPlan {

    ::v-deep {
        .el-dialog{
            min-width: 753px;
        }
        .el-form-item__label{
            color: #5F6266;
            font-weight: 400;
        }
        .el-dialog__header {
            padding: 0;
            text-indent: 24px;
        }
        .el-dialog__footer {
            border-top: 1px solid #E0E4EB;
        }
        .el-select,.el-date-editor {
            width: 280px;
            min-width: 50%;
        }
        .zPage .el-select{
            width: auto !important;
        }
    }
    .dialog-header  {
        height: 54px;
        color: #303133;
        border-bottom: 1px solid #E0E4EB;
    }
    .list {
        div {
            width: 220px;
            margin-bottom: 22px;
            span {
                color: #303133;
            }
            >span:nth-of-type(1) {
                display: inline-block;
                width: 80px;
                text-align: right;
                margin-right: 10px;
                color: #5F6266;
            }
        }
    }
}
</style>
