<template>
  <el-dialog :title="addor.title" width="500px" :visible.sync="dialogVisible" :before-close="closeDialog">
    <el-form ref="ruleForm" size="small" :model="ruleForm" label-width="80px">
      <el-form-item label="角色名称" prop="RoleName" :rules="[ { required: true, message: '请输入角色名称', trigger: 'blur' }]">
        <el-input v-model="ruleForm.RoleName" placeholder="请输入角色名称" autocomplete="off" />
      </el-form-item>
      <el-form-item label="是否开启" prop="IsEnable">
        <el-switch v-model="ruleForm.IsEnable" active-color="#409EFF" inactive-color="#ccc" />
      </el-form-item>
      <el-form-item label="描述" prop="Remark">
        <el-input v-model="ruleForm.Remark" type="textarea" :rows="2" placeholder="请输入角色描述" />
      </el-form-item>
      <el-form-item class="t-r">
        <el-button @click="closeDialog">取消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
import { addRole, updateRole, getRoleModel } from '@/api/roles'
export default {
    data() {
        return {
            title: '',
            dialogVisible: false,
            ruleForm: {
                RoleName: '',
                IsEnable: false,
                Remark: ''
            },
            addor: {}
        }
    },
    methods: {
        open(type, row) {
            this.addor.type = type
            this.dialogVisible = true
            if (type === 1) {
                this.addor.title = '新增'
            } else {
                console.log(row)
                this.addor.title = '修改'
                // 反显表单数据
                getRoleModel({ Id: row.id }).then((res) => {
                    this.ruleForm = res.Data
                })
            }
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (!valid) return false
                console.log(this.ruleForm)
                // 调用提交和修改接口，穿入ruleData对象
                if (this.addor.type === 1) {
                    addRole({ model: this.ruleForm }).then((res) => {
                        this.$parent.init()
                        this.dialogVisible = false
                    })
                } else {
                    updateRole({ model: this.ruleForm }).then((res) => {
                        this.$parent.init()
                        this.dialogVisible = false
                    })
                }
            })
        },
        closeDialog() {
            this.$refs.ruleForm.resetFields()
            this.dialogVisible = false
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
