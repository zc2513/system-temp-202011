<template>
  <!-- OTJ新建计划/区域、部门、团队 -->
  <el-dialog :visible.sync="showDialogVisible" class="addPlan">
    <div slot="title" class="flc-y dialog-header">
      新建通知
    </div>
    <el-form ref="ruleForm" :model="formInline" :rules="rules" label-width="100px">
      <el-form-item label="通知标题:" class="ml10" prop="title">
        <el-input v-model="formInline.title" placeholder="请输入标题" />
      </el-form-item>
      <el-form-item label="计划内容:" class="ml10" prop="msgContent">
        <editor v-model="formInline.msgContent" />
      </el-form-item>
      <el-form-item label="接收人:" class="ml10" prop="userIds">
        <el-select v-model="formInline.userIds" multiple filterable reserve-keyword placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
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
import { mapState } from 'vuex'
export default {
    components: { editor },
    props: {
        type: {
            type: [String, Number],
            default: 1
        },
        objTag: {
            type: String,
            default: 'a'
        }
    },

    data() {
        return {
            showDialogVisible: false,
            formInline: {
                title: '',
                msgContent: '',
                userIds: '',
                createBy: ''
            },
            options: [
                { value: '选项1', label: '黄金糕' },
                { value: '选项2', label: '龙须面2' },
                { value: '选项3', label: '龙须面1' },
                { value: '选项4', label: '龙须面' },
                { value: '选项5', label: '北京烤鸭' }
            ],
            rules: {
                title: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 20 个字符', trigger: 'blur' }
                ],
                msgContent: [
                    { required: true, message: '请选择活动区域', trigger: 'change' }
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
        show(data) {
            this.showDialogVisible = true
        },
        submitForm(status) {
            this.$refs.ruleForm.validate((valid) => {
                if (!valid) return
                this.formInline.createBy = this.userInfo.updateBy
                // 1.请求处理
                // 2.刷新父组件页面数据
                this.$parent.init(true)
                // 3.关闭弹窗
                this.showDialogVisible = false
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
