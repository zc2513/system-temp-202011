<template>

  <el-dialog
    :visible.sync="showDialogVisible"
    width="60%"
    class="addPlan"
  >
    <div slot="title" class="flc-y dialog-header">
      <span class="mr15 f16">新建{{ reportType }}</span>
      <svg-icon icon-class="ask" class="cursor" @click="$emit('planHelp',{id:666,title:'计划说明'})" />
    </div>
    <div class="main">
      <div class="card ">

        <div class="name-tag wfull mb15 ">
          <el-tag v-for="(item, index) in plans" :key="index" class="mr10 cursor " size="medium" :effect="index === planIndex ? 'dark' : 'plain' " @click="clickPlan(index)">计划{{ index + 1 }} </el-tag>
        </div>

        <div class="list wfull">
          <div><span>汇报类型</span><span>{{ reportType }}</span></div>
          <div><span>{{ reportType }}时间</span><span>{{ reportTypeTitle }}</span></div><br>
          <div><span>提交人</span><span>{{ form.realname }}</span></div><br>
          <div style="width:40%"><span>地区</span><span>{{ form.areaName }}</span></div>
          <div style="width:80%"><span>组别</span><span>{{ form.departName }} {{ form.groupName }}</span></div>
        </div>

      </div>
      <el-form ref="ruleForm" :model="form" label-width="80px" class="form-box">
        <!-- <div v-if=" (form.reportType === 3 || form.reportType === 2) && showDialogVisible " class="skill fl mb20">
          <select-student :user-id="userId" :show-button="false" :mult="multSelect" @changeUser="changeUser" />
        </div> -->
        <!-- <div class=" skill  mb20">

          <el-form-item label="计划标题" prop="title">
            <el-input
              v-model="form.title"
              type="text"
              placeholder="请输入计划标题"
              maxlength="100"
              show-word-limit
            />
          </el-form-item>

        </div> -->
        <div class="plan ">
          <el-form-item label="汇报内容" prop="reportContent">
            <el-input
              v-model="form.reportContent"
              type="textarea"
              :rows="8"
              placeholder="请输入内容"
              maxlength="200"
              show-word-limit
            />
          </el-form-item>
        </div>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="handleOk">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { saveReport } from '@/api/report'
import { getSelfCutomPlan } from '@/api/project'
import SelectStudent from '@/components/tsforce/SelectStudent.vue'
import { parseTime } from '@/utils/filter'

export default {
    components: {
        SelectStudent
    },
    data() {
        return {
            showDialogVisible: false,
            planIndex: 99,

            value1: [],
            areaText: '',
            reportType: '',
            reportTypeTitle: '',
            skills: null,
            skillTypes: [],
            form: {
                startDate: '',
                endDate: '',
                title: '',
                reportContent: ''
            },
            userId: null,
            multSelect: false,
            plans: null,
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() > Date.now()
                },
                shortcuts: [
                    {
                        text: '今天',
                        onClick(picker) {
                            picker.$emit('pick', new Date())
                        }
                    },
                    {
                        text: '昨天',
                        onClick(picker) {
                            const date = new Date()
                            date.setTime(date.getTime() - 3600 * 1000 * 24)
                            picker.$emit('pick', date)
                        }
                    },
                    {
                        text: '一周前',
                        onClick(picker) {
                            const date = new Date()
                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
                            picker.$emit('pick', date)
                        }
                    }
                ]
            }
        }
    },
    methods: {
        init() {
            switch (this.form.reportType) {
                case 1:
                    this.reportType = '日报'
                    this.reportTypeTitle = this.form.reportDate
                    break
                case 2:
                    this.reportType = '周报'
                    this.reportTypeTitle = this.form.week + '周'
                    break
                case 3:
                    this.reportType = '月报'
                    this.reportTypeTitle = this.form.month + '月'

                    break
                default:
            }
            // 获取计划
            this.getUserPlan()
        },
        show(data) {
            Object.assign(this.form, data)
            this.init()
            this.showDialogVisible = true
        },
        cancel() {
            this.$refs.ruleForm.resetFields()
            this.showDialogVisible = false
        },
        handleOk() {
            this.showDialogVisible = false
            var formData = Object.assign(this.form)
            console.log(
                'formdata ====================================================',
                formData
            )
            saveReport(formData)
                .then(res => {
                    console.log('增加结果', res)
                    if (res.success) {
                        this.$message.success(res.message)
                        this.$emit('ok', this.currentDate)
                    } else {
                        this.$message.warning(res.message)
                    }
                })
                .finally(() => {
                    Object.assign(this.form, {})
                    this.$refs.ruleForm.resetFields()
                    this.skillTypes = []
                })
        },

        changeUser(selectorg, selectUser, selectOrgName, selectNode) {
            console.log('选中的用户组织架构与用户', selectorg, selectUser, selectOrgName, selectNode)
            if (selectOrgName.length > 0) {
                this.form.planUser = selectUser.realname
                this.form.planUserId = selectUser.userId
                this.form.areaId = selectorg[0]
                this.form.areaName = selectOrgName[0]
                this.form.departId = selectorg[1]
                this.form.departName = selectOrgName[1]
                this.form.groupId = selectorg[2]
                this.form.groupName = selectOrgName[2]
            } else {
                this.form.planUser = selectUser.realname
                this.form.planUserId = selectUser.userId
                this.form.areaId = selectorg[0]
                this.form.areaName = selectNode[0].parent.parent.label
                this.form.departId = selectorg[1]
                this.form.departName = selectNode[0].parent.label
                this.form.groupId = selectorg[2]
                this.form.groupName = selectNode[0].label
            }
        },
        getUserPlan() {
            var params = {
                planUserId: this.form.userId,
                year: this.form.year,
                month: parseTime(this.form.reportDate, '{m}'),
                day: parseTime(this.form.reportDate, '{d}')
            } // 查询条件

            //       listp:'com.thundersoft.studentreport/fstFreshStudentPlan/queryListPlanInfo?planType=3&planUserId=e3517f1ca22245e897077a25b5a8c328&year=2020&month=10&week=&day=22',

            console.log('计划查询参数', params)

            this.fetching = true
            this.plans = []
            //  params={}
            getSelfCutomPlan(params).then((res) => {
                console.log('返回结果', res)
                if (res.success) {
                    console.log('正确返回结果', res)

                    this.plans = res.result
                    if (this.plans.length > 0) {
                        this.plans.forEach((val) => {
                            val.skillType = []
                            if (val.skillPlanlist.length > 0) {
                                var skills = val.skillPlanlist.map((val2) => {
                                    return val2.skillType
                                })
                                val.skillType = skills
                            }
                        })
                    }
                    // }
                }
                if (res.code === 510) {
                    this.$message.warning(res.message)
                }
                this.fetching = false
            })
        },
        clickPlan(index) {
            this.planIndex = index
            this.$emit('showPlan', { plan: this.plans[index], index: index })
        }
    }
}
</script>

<style lang="scss" scoped>
.addPlan {
    ::v-deep {
        .el-dialog__header {
            padding: 0;
            text-indent: 24px;
        }
        .el-dialog__footer {
            border-top: 1px solid #E0E4EB;
        }
        .el-select {
            width: 100%;
        }
    }
    .dialog-header  {
        height: 54px;
        color: #303133;
        border-bottom: 1px solid #E0E4EB;
    }
    .main {
        .card {
            .list {
                div {
                    width: 220px;
                    display: inline-block;
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
        .skill,.plan {
            span {
                display: inline-block;
                width: 90px;
                text-align: right;
                margin-right: 10px;
            }
        }
    }
}
</style>
