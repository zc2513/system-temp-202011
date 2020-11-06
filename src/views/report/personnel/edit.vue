
<template>
  <!-- 计划抽屉 -->
  <el-drawer
    title="编辑"
    :visible.sync="drawer"
    class="drawer-box"
    size="640px"
  >
    <div class="fl-y-sb hfull">
      <div class="flcc hfull">
        <el-form ref="ruleForm" :model="formInline" class="form-box" style="margin-bottom:200px;" label-width="100px">
          <el-form-item label="姓名:" class="ml10"> {{ formInline.realname }} </el-form-item>
          <el-form-item label="工号:" class="ml10"> {{ formInline.username }} </el-form-item>
          <el-form-item label="组别:" class="ml10"> {{ formInline.groupName }} </el-form-item>
          <el-form-item label="状态:" class="ml10" prop="status">
            <el-radio-group v-model="formInline.status">
              <el-radio :label="'1'">在职</el-radio>
              <el-radio :label="'2'">离职</el-radio>
              <el-radio :label="'3'">冻结</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="备注:" class="ml10" prop="remark">
            <el-input
              v-model="formInline.remark"
              type="textarea"
              placeholder="请输入内容"
              maxlength="500"
              rows="5"
              show-word-limit
            />
          </el-form-item>
        </el-form>
      </div>
      <div class="footer flc-y fle">
        <el-button type="primary" class="mr30" style="width:120px;" @click="submitForm('ruleForm')">提交</el-button>
      </div>
    </div>
  </el-drawer>
</template>

<script>
import { edit } from '@/api/studentState'

export default {
    name: 'PlankDrawer',
    data() {
        return {
            drawer: false,
            formInline: {
                status: 1,
                remark: ''
            }
        }
    },
    methods: {
        show(data) {
            this.drawer = true
            if (data) {
                Object.assign(this.formInline, data)
            }
            this.init()
        },
        init() {

        },
        submitForm(status) {
            console.log(this.formInline)
            this.$refs.ruleForm.validate((valid) => {
                // if (valid) {
                //     this.$message('待接口')
                //     this.drawer = false
                // }
                // return false
                var data = {
                    ids: this.formInline.id,
                    status: this.formInline.status
                }
                this.edit(data)

                // 通过逻辑处理
            })
        },
        edit(data) {
            console.log('is-background00', data)
            edit(data).then(res => {
                console.log('is-background', res)
                if (res.success) {
                    this.$message.success(res.message)
                    this.drawer = false
                    this.$emit('ok')
                    this.$refs['ruleForm'].resetFields()
                } else {
                    this.$message.warning(res.message)
                    this.drawer = false
                    this.$refs['ruleForm'].resetFields()
                }
            })
        }
    }
}
</script>
<style lang='scss' scoped>
.drawer-box{
    color: #5F6266;
    .footer{
        height: 80px;
        border-top:1px solid #E0E4EB;
    }
    ::v-deep{
        .el-form-item__label{
            color: #5F6266;
            font-weight: 400;
        }
        .el-textarea{
            width: 300px;
        }
    }
}
</style>
