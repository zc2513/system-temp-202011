<template>
  <el-form ref="ruleForm" :inline="true" :model="formInline" class="form-box">
    <el-form-item label="标题:" class="ml10" prop="titile">
      <el-input v-model="formInline.titile" placeholder="请输入标题" />
    </el-form-item>
    <el-form-item label="发布人:" class="ml10" prop="sender">
      <el-input v-model="formInline.sender" placeholder="请输入发布人" />
    </el-form-item>
    <el-form-item label="发布时间:" class="ml10" prop="sendTime">
      <el-date-picker
        v-model="Time"
        value-format="yyyy-MM-dd HH:mm:ss"
        type="daterange"
        range-separator="~"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" class="ml20" @click="submitForm('ruleForm')">查询</el-button>
      <el-button type="primary" class="ml20" @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
    data() {
        return {
            Time: '',
            formInline: {
                titile: '',
                startTime: '',
                endTime: '',
                sender: ''
            }
        }
    },
    methods: {
        submitForm(formName) {
            if (this.Time) {
                this.formInline.startTime = this.Time[0]
                this.formInline.endTime = this.Time[1]
            }
            this.$emit('change', this.formInline)
        },
        resetForm(formName) {
            this.$refs[formName].resetFields()
        }

    }
}
</script>

<style lang="scss" scoped>
.form-box{

    border-radius: 15px;
    background-color: #fff;
    padding:20px 0px;
    ::v-deep{
        .el-form-item__label{
            color: #5F6266;
            font-weight: 400;
        }
        .el-date-editor,.el-select{
            // width: 280px;
        }
    }

}
</style>
