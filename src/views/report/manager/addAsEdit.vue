<template>
  <!-- OTJ新建计划/区域、部门、团队 -->
  <el-dialog :visible.sync="showDialogVisible" width="80%" fullscreen :modal-append-to-body="false" :modal="false" append-to-body class="addPlan">
    <div slot="title" class="flc-y dialog-header">
      {{ title }}
    </div>
    <div class="list fl">
      <div>
        <span>研发经理:</span>
        <span>{{ formInline.person }}</span>
      </div>
    </div>
    <el-form ref="ruleForm" :model="formInline" label-width="80px" class="form-box">
      <div class="fl">
        <div class="w-50">
          <el-form-item label="组别:" class="ml10" prop="group">
            <el-select v-model="formInline.group" placeholder="请选择组别">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </div>
        <div class="w-50">
          <el-form-item label="时间:" class="ml10" prop="time">
            <el-date-picker
              v-model="formInline.time"
              type="date"
              placeholder="请选择时间"
              value-format="timestamp"
            />
          </el-form-item>
        </div>
      </div>

      <div class="fl">
        <div class="w-50">
          <el-form-item label="完成状态:" class="ml10" prop="student">
            <el-select v-model="formInline.student" multiple filterable reserve-keyword placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </div>
        <div class="w-50">
          <el-form-item label="应届生:" class="ml10" prop="student">
            <el-select v-model="formInline.student" multiple filterable reserve-keyword placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </div>
      </div>

      <div class="mb30">
        <z-table
          :titles="titles"
          :btns="btn"
          :lists="tableData"
          align="left"
          class="mt15"
          @sendVal="getVal"
        />
        <z-page :total="50" class="zPage" />
      </div>

      <el-form-item label="汇报内容:" class="ml10" prop="content">
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

    <scoreDrawer ref="scoreDrawer" />
  </el-dialog>
</template>

<script>
import datas from '@/assets/json/data'
import scoreDrawer from './scoreDrawer'
export default {
    components: { scoreDrawer },
    props: {
        type: {
            type: [String, Number],
            default: 1
        },
        title: {
            type: String,
            default: '新建应届生培养月报'
        }
    },
    data() {
        return {
            showDialogVisible: false,
            formInline: {
                group: '',
                student: '',
                time: '',
                person: '张三',
                content: ''
            },
            options: [
                { value: '选项1', label: '黄金糕' },
                { value: '选项2', label: '双奶皮' },
                { value: '选项4', label: '双皮奶' },
                { value: '选项5', label: '皮双奶' },
                { value: '选项3', label: '蚵仔煎' }
            ],
            titles: [
                { name: '工号', data: 'producer' },
                { name: '姓名', data: 'producer' },
                { name: '基础活动', data: 'producer' },
                { name: '软件编码', data: 'producer' },
                { name: '软件维护', data: 'producer' },
                { name: '软件验证', data: 'producer' },
                { name: '软件设计', data: 'producer' },
                { name: '软件需求', data: 'producer' },
                { name: '组别', data: 'producer' },
                { name: '提交时间', data: 'lastUpdateTime', type: 'time', time: '{y}-{m}-{d}' }
            ],
            tableData: datas.slice(0, 8),
            btn: {
                title: '操作',
                btnlist: [
                    { con: '编辑', type: 'text' }
                ]
            }
        }
    },
    methods: {
        show(data) {
            if (data) {
                this.formInline = {
                    content: '范德萨发生',
                    group: '选项2',
                    person: '张三',
                    student: ['选项5'],
                    time: 1603641600000
                }
            }
            this.showDialogVisible = true
        },
        submitForm(status) {
            console.log(this.formInline)
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
        },
        getVal(v) {
            const { type } = v
            if (type === '编辑') {
                this.$refs.scoreDrawer.show()
            }
        }

    }
}
</script>

<style lang="scss" scoped>
.addPlan {

    ::v-deep {
        .el-dialog{
            min-width: 753px;
        }
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
        .zPage .el-select{
            width: auto !important;
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
