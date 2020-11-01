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
      <div v-if=" form.planType === 3 " class="skill fl mb20">
        <div>
          <span class="mt5">开始日期</span>
          <el-date-picker
            v-model="form.startDate"
            align="right"
            type="date"
            placeholder="选择日期"
            :picker-options="pickerOptions"
          />
        </div>
        <div>
          <span class="mt5">结束日期</span>
          <el-date-picker
            v-model="form.endDate"
            align="right"
            type="date"
            placeholder="选择日期"
            :picker-options="pickerOptions"
          />
        </div>
      </div>
      <div v-if=" form.planType === 1 || form.planType === 2" class="skill fl mb20">
        <select-student :user-id="userId" :show-button="false" :mult="multSelect" @changeUser="changeUser" />
      </div>
      <div class="skill fl mb20">
        <div class="fl" style="width:100%">
          <span class="mt5">计划标题</span>
          <el-input
            v-model="form.title"
            type="text"
            placeholder="请输入计划标题"
            maxlength="100"
            show-word-limit
          />
        </div>
      </div>
      <div class="skill fl mb20">
        <span class="mt5">技能类型</span>
        <el-select v-model="skillTypes" multiple filterable reserve-keyword placeholder="请选择">
          <el-option
            v-for="item in skills"
            :key="item.id"
            :label="item.skillType"
            :value="item.id"
          />
        </el-select>
      </div>
      <div class="plan fl">
        <span class="mt5">计划内容</span>
        <el-input
          v-model="form.planContent"
          type="textarea"
          :rows="8"
          placeholder="请输入内容"
          maxlength="200"
          show-word-limit
        />
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="showDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleOk">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { saveSelfPlan, getSkillType } from '@/api/project'
import SelectStudent from '@/components/tsforce/SelectStudent.vue'

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
            form: {},
            userId: null,
            multSelect: false
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
        handleOk() {
            this.showDialogVisible = false
            const formData = Object.assign(this.form)

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
        changeUser(selectorg, selectUser) {
            console.log('选中的用户组织架构与用户', selectorg, selectUser)
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
