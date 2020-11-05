<template>
  <!-- OTJ新建计划/区域、部门、团队 -->
  <el-dialog :visible.sync="showDialogVisible" class="addPlan">
    <div slot="title" class="flc-y dialog-header">
      新建通知
    </div>
    <el-form ref="ruleForm" :model="formInline" :rules="rules" label-width="100px">
      <el-form-item label="通知标题:" class="ml10" prop="titile">
        <el-input v-model="formInline.titile" placeholder="请输入标题" />
      </el-form-item>
      <el-form-item label="计划内容:" class="ml10" prop="msgContent">
        <editor v-model="formInline.msgContent" />
      </el-form-item>
      <el-form-item label="接收人:" class="ml10" prop="userIds">
        <z-groud-person v-model="formInline.userIds" />
      </el-form-item>
    </el-form>
    <span slot="footer">
      <el-button @click="showDialogVisible = false">取 消</el-button>
      <el-button @click="submitForm(false)">暂存</el-button>
      <el-button type="primary" @click="submitForm(true)">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import editor from '@/components/editor'
import { add } from '@/api/notification'
import { mapState } from 'vuex'
export default {
    components: { editor },
    data() {
        return {
            showDialogVisible: false,
            formInline: {
                titile: '',
                msgContent: '',
                msgType: 'USER',
                userIds: '',
                createBy: '',
                enclosureIds: ''
            },
            rules: {
                titile: [
                    { required: true, message: '请输入通知标题', trigger: 'blur' },
                    { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
                ],
                msgContent: [
                    { required: true, message: '请编辑计划内容', trigger: 'change' }
                ],
                person: [
                    { type: 'array', required: true, message: '请至少选择一个接收人', trigger: 'change' }
                ]
            }
        }
    },
    computed: {
        ...mapState('user', ['userInfo'])
    },
    methods: {
        show(type, data) {
            if (type === 'edit') {
                this.formInline = data
            }
            this.showDialogVisible = true
        },
        submitForm(status) {
            this.$refs.ruleForm.validate((valid) => {
                if (!valid) return
                this.formInline.createBy = this.userInfo.updateBy
                add(this.formInline).then(res => {
                    if (res.code === 200) {
                        this.$message.success(res.message)
                        this.$parent.init(true)
                        this.showDialogVisible = false
                    }
                })
            })
        },
        resetForm(formName) {
            this.$refs[formName].resetFields()
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
