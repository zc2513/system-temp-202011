<template>
  <!-- OTJ新建计划/区域、部门、团队 -->
  <el-dialog :visible.sync="showDialogVisible" class="addPlan">
    <div slot="title" class="flc-y dialog-header">
      {{ title }}
    </div>
    <div class="list fl">
      <div>
        <span>辅导员姓名:</span>
        <span>{{ formInline.realname }}</span>
      </div>
      <div v-if=" !(type===1)">
        <span>组别:</span>
        <span style="width:200px">{{ formInline.groupName }}</span>
      </div>

    </div>
    <div v-if=" !(type===1)" class="list fl">

      <div>
        <span>应届生姓名:</span>
        <span>{{ formInline.realname }}</span>
      </div>
      <div>
        <span>辅导时间:</span>
        <span>{{ formInline.startTime }}</span>
      </div>
    </div>

    <el-form ref="ruleForm" :model="formInline" label-width="80px" class="form-box">
      <div v-if=" type ===1">
        <el-form-item :v-if=" !(type == 1) " class="ml10" prop="time">
          <select-student ref="selectStu" :user-id="formInline.userId" :show-button="false" :selected="false" :mult="true" @changeUser="changeUser" />
        </el-form-item>

        <el-form-item :v-if=" type === 1 " label="辅导时间:" class="ml10" prop="time">
          <el-date-picker
            v-model="formInline.startTime"

            type="date"
            placeholder="请选择时间"
          />
        </el-form-item>
      </div>
      <el-form-item label="辅导内容:" class="ml10" prop="content">
        <!-- <el-input
          v-model="formInline.content"
          :disabled=" !(type === 1 || type === 2)"
          type="textarea"
          placeholder="请输入内容"
          maxlength="500"
          rows="8"
          show-word-limit
        /> -->
        <editor v-model="formInline.content" :disabled=" !(type === 1 || type === 2)" />
      </el-form-item>
    </el-form>

    <span slot="footer">
      <el-button @click="showDialogVisible = false">取 消</el-button>
      <el-button v-if="type === 1" @click="submitForm(false)">暂存</el-button>
      <el-button type="primary" @click="submitForm(true)">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import editor from '@/components/editor'
import SelectStudent from '@/components/tsforce/SelectStudent.vue'
import { saveCoach, listCoach, coachQueryById, deleteCoach } from '@/api/coach'
import { parseTime } from '@/utils/filter'

export default {
    components: {
        SelectStudent,
        editor
    },
    props: {
        type: {
            type: [String, Number],
            default: 1
        },
        title: {
            type: String,
            default: '新建辅导记录'
        }
    },

    data() {
        return {
            showDialogVisible: false,
            formInline: {
                content: '',
                areaId: '',
                areaName: '',
                departId: '',
                departName: '',
                endTime: '',
                // fstCounselorRecordStudentVOList	[...]
                groupId: '',
                groupName: '',
                periodId: '1',
                realname: '',
                startTime: '',
                status: '-1',
                userId: '',
                username: ''
            },
            areaText: '',
            selectOrg: null,
            selectOrgName: null,
            selectUser: []
        }
    },
    methods: {
        show(data) {
            if (data) {
                Object.assign(this.formInline, data)
            }
            this.showDialogVisible = true
        },
        submitForm(status) {
            console.log(this.formInline)

            if (status) {
                // 验证提交信息
                this.$refs.ruleForm.validate((valid) => {
                    console.log('被编辑')
                    this.postData()
                    // if (valid) return false

                    // // // 通过逻辑处理
                    // // const uri = this.type === 1 ? 'path' : (this.type === 2 ? 'url' : 'url')
                    // // console.log(uri, '提交地址')
                    // this.postData()
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
                    this.formInline.startTime = parseTime(this.formInline.startTime, '{y}-{m}-{d}')

                    this.formInline.fstCounselorRecordStudentVOList = this.selectUser
                    console.log('保存辅导-------------------------------->', this.formInline)
                    this.saveCoach()
                    break
                case 2: // 编辑
                    console.log('被编辑')
                    var data = {
                        id: this.formInline.id,
                        content: this.formInline.content
                    }
                    console.log('保存辅导-----修改--------------------------->', data)
                    this.saveCoach(data)
                    break
                default:
                    this.showDialogVisible = false
                    break
            }
        },
        saveCoach(data) {
            if (data) {
                console.log('被编辑')
                saveCoach(data).then(res => {
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
                saveCoach(this.formInline).then(res => {
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
        changeUser(selectorg, selectUser, selectOrgName, selectNode, userCount) {
            this.selectOrg = selectorg
            this.selectOrgName = selectOrgName

            console.log('选中的用户组织架构与用户', selectUser)
            if (selectOrgName.length > 0) {
                this.formInline.areaId = selectorg[0]
                this.formInline.areaName = selectOrgName[0]
                this.formInline.departId = selectorg[1]
                this.formInline.departName = selectOrgName[1]
                this.formInline.groupId = selectorg[2]
                this.formInline.groupName = selectOrgName[2]
            }
            if (selectUser != null && selectUser.length > 0) {
                this.selectUser = []
                selectUser.forEach(val => {
                    this.selectUser.push({ userId: val.id })
                })
            }
        }

    }
}
</script>

<style lang="scss" scoped>
.addPlan {
    ::v-deep {
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
