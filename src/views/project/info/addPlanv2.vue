<template>

  <el-dialog
    :visible.sync="showDialogVisible"
    width="60%"
    class="addPlan"
  >
    <div slot="title" class="flc-y dialog-header">
      <span class="mr15 f16">新建计划</span>
      <svg-icon icon-class="ask" class="cursor" @click="$emit('planHelp',{id:666,title:'计划说明'})" />
    </div>
    <div class="main">
      <div class="card fl">
        <div class="list">
          <div><span>计划类型</span><span>{{ planType }}</span></div>
          <div><span>制定人员</span><span>{{ form.createUser }}</span></div><br>
          <div v-if=" form.planType === 3 "><span>执行人员</span><span>{{ form.planUser }}</span></div>
          <div v-if=" form.planType === 3 "><span>地区</span><span>{{ form.areaName }}</span></div>
          <div v-if=" form.planType === 3 " class="flc"><span>组别</span><span>{{ form.departName }} {{ form.groupName }}</span></div>
        </div>

      </div>
      <el-form ref="ruleForm" :model="form" label-width="80px" class="form-box">
        <div v-if=" form.planType === 3 " class="skill fl mb20">
          <div>
            <el-form-item label="开始日期:" class="ml10" prop="startDate">

              <el-date-picker
                v-model="form.startDate"
                align="right"
                type="date"
                placeholder="选择日期"
                :picker-options="pickerOptions"
              />
            </el-form-item>
          </div>
          <div>
            <el-form-item label="结束日期:" class="ml10" prop="endDate">

              <el-date-picker
                v-model="form.endDate"
                align="right"
                type="date"
                placeholder="选择日期"
                :picker-options="pickerOptions"
              />
            </el-form-item>
          </div>
        </div>
        <div v-if=" (form.planType === 1 || form.planType === 2) && showDialogVisible " class="skill fl mb20">
          <select-student :user-id="userId" :show-button="false" :mult="multSelect" @changeUser="changeUser" />
        </div>
        <div class=" skill  mb20">

          <el-form-item label="计划标题" prop="title">
            <el-input
              v-model="form.title"
              type="text"
              placeholder="请输入计划标题"
              maxlength="100"
              show-word-limit
            />
          </el-form-item>

        </div>
        <div class="skill  mb20">

          <el-form-item label="技能类型" prop="skillType">
            <el-select v-model="skillTypes" multiple filterable reserve-keyword placeholder="请选择">
              <el-option
                v-for="item in skills"
                :key="item.id"
                :label="item.skillType"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
        </div>
        <div class="plan ">
          <el-form-item label="计划内容" prop="planContent">
            <el-input
              v-model="form.planContent"
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
import { saveSelfPlan, getSkillType } from '@/api/project'
import SelectStudent from '@/components/tsforce/SelectStudent.vue'
import { parseTime } from '@/utils/filter'

export default {
    components: {
        SelectStudent
    },
    data() {
        return {
            showDialogVisible: false,

            value1: [],
            areaText: '',
            planType: '',
            skills: null,
            skillTypes: [],
            form: {
                startDate: '',
                endDate: '',
                title: '',
                planContent: ''
            },
            userId: null,
            multSelect: false,
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
            switch (this.form.planType) {
                case 1:
                    this.planType = '周计划'
                    break
                case 2:
                    this.planType = '月计划'
                    break
                case 3:
                    this.planType = '自定义计划'
                    break
                default:
            }
            this.getSkillType()
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
            formData.startDate = formData.startDate ? parseTime(formData.startDate, '{y}-{m}-{d}') : null
            formData.endDate = formData.endDate ? parseTime(formData.endDate, '{y}-{m}-{d}') : null
            formData.skillType = this.skillTypes
            console.log(
                'formdata ====================================================',
                formData
            )
            saveSelfPlan(formData)
                .then(res => {
                    console.log('增加结果', res)
                    if (res.success) {
                        this.$message.success(res.message)
                        this.$emit('ok')
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
        getSkillType() {
            const params = {}
            getSkillType(params)
                .then(res => {
                    console.log('技能数据', res)
                    if (res.success) {
                        this.skills = res.result
                    } else {
                        this.$error({
                            title: '查询失败',
                            content: res.message
                        })
                    }
                })
                .finally(() => {})
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
