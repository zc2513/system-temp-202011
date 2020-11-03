<template>
  <!-- 已废弃 -->
  <!-- OTJ新建计划/区域、部门、团队 -->
  <el-dialog :visible.sync="showDialogVisible" width="30%" class="addPlan">
    <div slot="title" class="flc-y dialog-header">制定时间段</div>
    <el-form ref="ruleForm" :rules="rules" :model="formInline" label-width="90px">
      <el-form-item label="计划时间:" class="ml10" prop="times">
        <el-date-picker
          v-model="formInline.times"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right"
          value-format="timestamp"
          @change="getTime"
        />
      </el-form-item>
    </el-form>
    <span slot="footer">
      <el-button @click="showDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitForm">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
    props: {
        type: {
            type: [String, Number],
            default: 1
        }
    },
    data() {
        return {
            showDialogVisible: false,
            formInline: {
                times: null,
                startTime: '',
                endTime: ''
            },
            rules: {
                times: [{ required: true, message: '请选择时间段后提交', trigger: 'change' }]
            }
        }
    },
    methods: {
        show(data) {
            this.showDialogVisible = true
        },
        submitForm() {
            this.$refs.ruleForm.validate((valid) => {
                if (valid) {
                    // 通过逻辑处理
                    alert('确少提交逻辑')
                }
            })
        },
        resetForm(formName) {
            this.$refs[formName].resetFields()
        },
        getTime(e) { // 时间赋值
            this.formInline.startTime = e ? e[0] : null
            this.formInline.endTime = e ? e[1] : null
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
            width: 100%;
        }
    }
    .dialog-header  {
        height: 54px;
        color: #303133;
        border-bottom: 1px solid #E0E4EB;
    }
}
</style>
