<template>
  <!-- OTJ新建计划/区域、部门、团队 -->
  <el-dialog :visible.sync="showDialogVisible" width="80%" fullscreen :modal-append-to-body="false" :modal="false" append-to-body class="addPlan">
    <div slot="title" class="flc-y dialog-header">
      {{ title }}
    </div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="汇报内容" name="first">
        <div class="mb10 ml20">
          <span>研发经理:</span>
          <span class="ml10">{{ formInline.realname }}</span>
        </div>
        <el-form ref="ruleForm" :model="formInline" label-width="80px" class="form-box">

          <!-- <select-student ref="selectStu" :user-id="userInfo.userId" :show-button="false" :selected="false" :mult="false" @changeUser="changeUser" /> -->
          <div class="fl flc-y">
            <div class="w-50">
              <el-form-item label="汇报标题:" class="ml10" prop="time">
                <el-input
                  v-model="formInline.monthReportName"
                  :disabled=" !(type === 1 || type === 2)"
                  type="textarea"
                  placeholder="请输入内容"
                  maxlength="50"
                  rows="2"
                  show-word-limit
                />
              </el-form-item>
            </div>

          </div>
          <div class="fl flc-y">
            <div class="w-50">
              <el-form-item label="组别:" class="ml10" prop="time">
                <el-cascader
                  v-if=" type === 1"
                  ref="tree"
                  v-model="selectorg"
                  style="width:500px;"
                  :options="areas"
                  :props="{ expandTrigger: 'hover' }"
                  @change="changeUser"
                />
                <span v-if=" type === 2">{{ formInline.newGroupName }}</span>
              </el-form-item>
            </div>

          </div>
          <div class="fl">
            <div class="w-30">
              <el-form-item label="提交时间:" class="ml10" prop="time">
                <el-date-picker
                  v-if=" type === 1"
                  v-model="formInline.monthReportDate"
                  type="date"
                  placeholder="请选择时间"
                  value-format="timestamp"
                />

                <span v-if=" type === 2">{{ formInline.createTime }}</span>
              </el-form-item>
            </div>
            <div class="w-10">
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

          </div>
          <div class="fl">

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
            :lists="jxlist"
            align="left"
            class="mt15"
            @sendVal="getVal"
          />
          <!-- <z-page :total="50" class="zPage" /> -->
        </div>
        <el-button @click="close">关 闭</el-button>
      </el-tab-pane>
    </el-tabs>

    <scoreDrawer ref="scoreDrawer" @ok="init(2)" />
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
        },
        areas: {
            type: Array,
            required: true
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
                status: 0,
                groupId: ''

            },
            options: [
                { value: -1, label: '删除' },
                { value: 0, label: '暂存' },
                { value: 1, label: '已提交' }

            ],
            titles: [
                { name: '序号', type: 'index' },
                { name: '工号', data: 'username' },
                { name: '姓名', data: 'realname' },
                { name: '基础活动', data: 'basicActivities' },
                { name: '软件编码', data: 'softwareCoding' },
                { name: '软件维护', data: 'softwareMaintenance' },
                { name: '软件验证', data: 'softwareVerification' },
                { name: '软件设计', data: 'softwareDesign' },
                { name: '软件需求', data: 'softwareDemand' },
                { name: '组别', data: 'newGroupName' },
                { name: '提交时间', data: 'createTime', type: 'time', time: '{y}-{m}-{d}' }
            ],
            tableData: datas.slice(0, 8),
            btn: {
                title: '操作',
                btnlist: [
                    { con: '编辑', type: 'text' }
                ]
            },
            jxlist: [],
            users: [],
            activeName: 'first',
            areaId: null,
            areaName: null,
            departId: null,
            monthlyReportId: null,
            selectNode: null,
            selectorg: null,
            departName: null
        }
    },
    computed: {
        ...mapState('user', ['token', 'userInfo'])
    },
    methods: {
        show(data, type) {
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
            this.init(type)
            this.showDialogVisible = true
        },
        init(type) {
            console.log('user 查询绩效学生-------------->', this.userInfo, this.formInline, this.formInline.groupId)
            this.searchData.monthlyReportId = this.formInline.id
            this.searchData.groupId = this.formInline.groupId
            const data = {
                ...this.searchData
            }
            if (type === 2) {
                console.log('init 参数', data)
                // this.loadData({ groupId: '1', monthlyReportId: this.formInline.id })

                this.loadData(data)
            }

            //  this.loadData(data)
        },
        loadData(data) {
            console.log('qiana8888888', data)
            list(data).then(res1 => {
                console.log('编辑经理查询结过月报', res1)
                if (res1.success === true) {
                    this.jxlist = res1.result
                    if (this.jxlist.length > 0) {
                        this.jxlist.forEach(val => {
                            val.monthlyReportId = this.formInline.id
                            val.newGroupName = this.formInline.newGroupName
                            if (val.createTime == null) {
                                val.createTime = new Date()
                            }
                        })
                    }

                    console.log('编辑经理tir月报', this.jxlist)
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
                        monthReportContent: this.formInline.monthReportContent,
                        monthReportName: this.formInline.monthReportName,
                        status: this.formInline.status
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
                        this.formInline.id = res.result.id
                        this.init(2)
                        this.activeName = 'second'
                        // 获得待评分的应届生
                    } else {
                        this.$message.warning(res.message)
                    }
                })
            }
        },

        resetForm(formName) {
            this.$refs[formName].resetFields()
        },
        changeUser(selectorg) {
            //  this.$emit('changeUser', this.selectorg, user[0], this.selectOrgName, this.selectNode, this.users.length)
            this.selectNode = this.$refs.tree.getCheckedNodes()[0]
            console.log('----------------------------', selectorg, this.selectNode)

            this.areaId = selectorg[0]
            this.areaName = this.selectNode.parent.parent.label
            this.departId = selectorg[1]
            this.departName = this.selectNode.parent.label

            this.formInline.groupId = selectorg[2]
            this.formInline.groupName = this.selectNode.label
            this.formInline.areaId = this.areaId
            this.formInline.areaName = this.areaName
            this.formInline.departId = this.departId
            this.formInline.departName = this.departName
            this.init()
        },
        getVal(v) {
            const { type, data } = v
            if (type === '编辑') {
                this.$refs.scoreDrawer.show(data)
            }
        },
        close() {
            this.showDialogVisible = false
            this.$emit('ok')
        },
        handleClick(tab, event) {
            this.activeName = tab
            console.log(tab)
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
