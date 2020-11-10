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
        v-model="formInline.sendTime"
        type="date"
        placeholder="请选择时间"
        format="yyyy 年 MM 月 dd 日"
        value-format="yyyy-MM-dd"
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
            formInline: {
                titile: '',
                sendTime: '',
                sender: ''
            }
        }
    },
    methods: {
        submitForm(formName) {
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
