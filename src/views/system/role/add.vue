<template>
  <el-form ref="ruleForm" size="small" :model="ruleData" label-width="80px">
    <el-form-item label="角色" prop="RoleName" :rules="[ { required: true, message: '请输入角色', trigger: 'blur' }]">
      <el-input v-model="ruleData.RoleName" placeholder="请输入角色" autocomplete="off" />
    </el-form-item>
    <el-form-item label="是否开启">
      <el-switch v-model="ruleData.IsEnable" active-color="#409EFF" inactive-color="#ccc" />
    </el-form-item>
    <el-form-item label="描述">
      <el-input v-model="ruleData.Remark" type="textarea" :rows="2" placeholder="请输入角色描述" />
    </el-form-item>
    <el-form-item class="t-c">
      <el-button type="primary" style="width:100%;" @click="submitForm('ruleForm')">提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
    data() {
        return {
            ruleData: {
                RoleName: '',
                IsEnable: false,
                Remark: ''
            }
        }
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    console.log(this.ruleData)
                } else {
                    return false
                }
            })
        },
        resetForm(formName) {
            this.$refs[formName].resetFields()
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
