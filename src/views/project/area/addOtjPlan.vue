<template>
  <!-- OTJ新建计划/区域、部门、团队 -->
  <el-dialog :visible.sync="showDialogVisible" class="addPlan">
    <div slot="title" class="flc-y dialog-header">
      新建{{ title }}
    </div>
    <el-form ref="ruleForm" :model="formInline" label-width="80px" class="form-box">

      <el-form-item label="计划时间:" class="ml10" prop="time">
        2020-01-20～2020-02-20
      </el-form-item>

      <div class="list fl">
        <div>
          <span>地区:</span>
          <span>{{ formInline.address }}</span>
        </div>
        <div>
          <span>提交人职级:</span>
          <span>{{ formInline.rank }}</span>
        </div>
        <div>
          <span>提交人:</span>
          <span>{{ formInline.person }}</span>
        </div>
      </div>
      <el-form-item v-if="title==='OJT团队计划'" label="团队:" class="ml10" prop="team">
        <el-select v-model="formInline.team" placeholder="请选择团队">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        v-if="title==='实训计划' || title==='正式入项计划' || title==='OJT部门计划' || title==='OJT团队计划' "
        label="组别:"
        class="ml10"
        prop="time"
      >
        <el-select v-model="formInline.team" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="计划内容:" class="ml10" prop="content">
        <el-input
          v-model="formInline.content"
          type="textarea"
          placeholder="请输入内容"
          maxlength="500"
          rows="8"
          show-word-limit
        />
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
export default {
    props: {
        type: {
            type: [String, Number],
            default: 1
        },
        title: {
            type: String,
            default: '默认标题'
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
                team: '',
                department: '',
                time: '',
                person: '张三',
                content: '',
                rank: '项目经理',
                address: '成都'
            },
            options: [
                { value: '选项1', label: '黄金糕' },
                { value: '选项2', label: '双皮奶' },
                { value: '选项3', label: '蚵仔煎' }
            ],
            areaText: ''
        }
    },
    methods: {
        show(data) {
            this.showDialogVisible = true
        },
        submitForm(status) {
            if (status) {
                // 验证提交信息
                this.$refs.ruleForm.validate((valid) => {
                    if (valid) return false

                    // 通过逻辑处理
                    const uri = this.type === 1 ? 'path' : (this.type === 2 ? 'url' : 'url')
                    console.log(uri, '提交地址')
                    this.postData()
                })
            } else {
                // 不验证
                this.postData()
            }
        },
        postData() {
            // 数据提交
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
            width: 280px;
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
