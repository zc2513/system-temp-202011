<template>
  <!-- OTJ新建计划/区域、部门、团队 -->
  <el-dialog :visible.sync="showDialogVisible" class="addPlan">
    <div slot="title" class="flc-y dialog-header">
      {{ title }}
    </div>
    <div class="list fl">
      <div>
        <span>地区:</span>
        <span>{{ formInline.areaName }}</span>
      </div>
      <div>
        <span>Mgr姓名:</span>
        <span>{{ formInline.realname }}</span>
      </div>
    </div>
    <el-form ref="ruleForm" :model="formInline" label-width="80px" class="form-box">
      <el-form-item label="汇报时间:" class="ml10" prop="time">
        <el-date-picker
          v-model="formInline.monthReportDate"
          type="month"
          placeholder="请选择时间"
          @change="change"
        />
      </el-form-item>
      <el-form-item label="汇报标题:" class="ml10" prop="time">
        <el-input
          v-model="formInline.monthReportName"
          type="textarea"
          placeholder="请输入内容"
          maxlength="50"
          rows="2"
          show-word-limit
        />
      </el-form-item>
      <el-form-item label="计划内容:" class="ml10" prop="content">
        <!-- <el-input
          v-model="formInline.monthReportContent"
          type="textarea"
          placeholder="请输入内容"
          maxlength="500"
          rows="8"
          show-word-limit
        /> -->
        <editor v-model="formInline.monthReportContent" :disabled=" !(type === 1 || type === 2)" />
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
import { save, list, queryById, deleteById, edit } from '@/api/mgr'
import { parseTime } from '@/utils/filter'

export default {
    components: {
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
                time: '',
                realname: '',
                monthReportName: '',
                monthReportContent: '',
                areaName: '',
                monthReportDate: ''
            },
            areaText: ''
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

                    // if (valid) return false   TODO

                    // 通过逻辑处理
                    // const uri = this.type === 1 ? 'path' : (this.type === 2 ? 'url' : 'url')
                    // console.log(uri, '提交地址')
                    this.formInline.month = parseTime(this.formInline.monthReportDate, '{m}')
                    this.formInline.year = parseTime(this.formInline.monthReportDate, '{y}')
                    this.postData()
                })
            } else {
                // 不验证
                this.postData()
            }
        },
        postData() {
            console.log('type-------------', this.type)
            switch (this.type) {
                case 1: // 新增

                    console.log('保存辅导-------------------------------->', this.formInline)
                    this.save()
                    break
                case 2: // 编辑
                    console.log('被编辑xxxxxxxxxxxxxxxxx', this.formInline)
                    var data = {
                        id: this.formInline.id,
                        onthReportName: this.formInline.onthReportName,
                        monthReportContent: this.formInline.monthReportContent,
                        month: this.formInline.month,
                        year: this.formInline.year
                    }

                    console.log('mgr-----修改--------------------------->', data)
                    this.save(data)
                    break
                default:
                    this.showDialogVisible = false
                    break
            }
            // 数据提交
        },
        save(data) {
            if (data) {
                console.log('被编辑', data)
                edit(data).then(res => {
                    if (res.success) {
                        this.$message.success(res.message)
                        this.showDialogVisible = false
                        this.$refs['ruleForm'].resetFields()
                        this.$emit('ok')
                    } else {
                        this.$message.warning(res.message)
                        this.showDialogVisible = false
                        this.$refs['ruleForm'].resetFields()
                    }
                })
            } else {
                this.formInline.id = null
                save(this.formInline).then(res => {
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
            this.$refs['formName'].resetFields()
        },
        change(e) {
            console.log('换日期了', e)
            this.formInline.monthReportName = 'Ts-Force' + parseTime(e, '{y}年{m}月份月报')
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
