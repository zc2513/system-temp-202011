<template>
  <!-- OTJ新建计划/区域、部门、团队 -->
  <el-dialog :visible.sync="showDialogVisible" class="addPlan" top="10vh">
    <div slot="title" class="flc-y dialog-header">
      新建{{ formInline.stageName }}
      （{{ formInline.stageType === '1' ? '区域计划':(formInline.stageType === '2' ? '部门计划':'团队计划') }}）
    </div>
    <el-form ref="ruleForm" :rules="rules" :model="formInline" label-width="84px" class="form-box">
      <el-form-item label="计划时间:" class="ml10" prop="time">
        {{ formInline.startTime | parseTime('{y}-{m}-{d}') }}
        ~
        {{ formInline.endTime | parseTime('{y}-{m}-{d}') }}
      </el-form-item>

      <div class="fl">
        <el-form-item label="地区:" class="mr30" label-width="94px" prop="time">
          {{ userInfo.areaName }}
        </el-form-item>
        <el-form-item label="提交人职级:" class="mr30" label-width="90px" prop="time">
          {{ userInfo.post }}
        </el-form-item>
        <el-form-item label="提交人:" label-width="90px" prop="time">
          {{ userInfo.username }}
        </el-form-item>
      </div>

      <!-- <el-form-item v-if="formInline.stageType === '2' || formInline.stageType === '3'" label="部门:" class="ml10" prop="time">
        <el-select v-model="formInline.team" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item v-if="formInline.stageType === '3'" class="ml10" prop="team" label="团队:">
        <el-select v-model="formInline.team" placeholder="请选择团队">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item> -->

      <el-form-item label="计划标题:" class="ml10" prop="planTitle">
        <el-input v-model="formInline.planTitle" placeholder="请输入标题" />
      </el-form-item>
      <el-form-item label="计划内容:" class="ml10" prop="planContent">
        <editor v-model="formInline.planContent" />
      </el-form-item>
      <el-form-item label="附件上传:" class="ml10" prop="enclosureIds">
        <z-upfile v-model="formInline.enclosureIds" multiple />
      </el-form-item>
    </el-form>
    <span slot="footer">
      <el-button @click="showDialogVisible = false">取 消</el-button>
      <!-- <el-button @click="submitForm(false)">暂存</el-button> -->
      <el-button type="primary" @click="submitForm(true)">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import zUpfile from '@/components/z-upfile'
import editor from '@/components/editor'
import { addStepPlan, addStepEdit } from '@/api/area'
import { uploadFile } from '@/api/file'
import { mapGetters } from 'vuex'
export default {
    components: { zUpfile, editor },
    data() {
        return {
            showDialogVisible: false,
            formInline: {
                stageType: '',
                stageId: '',
                stageName: '',
                startTime: '',
                endTime: '',
                planTitle: '',
                planContent: '',
                enclosureIds: [],
                areaId: '',
                areaName: ''
            },
            options: [
                { value: '选项1', label: '黄金糕' },
                { value: '选项2', label: '双皮奶' },
                { value: '选项3', label: '蚵仔煎' }
            ],
            rules: {
                planContent: [
                    { required: true, message: '请输入计划内容', trigger: 'blur' }
                ],
                planTitle: [
                    { required: true, message: '请输入计划标题', trigger: 'blur' }
                ]
            },
            pageType: 'add'
        }
    },
    computed: {
        ...mapGetters(['userInfo'])
    },
    methods: {
        show(data, type) {
            this.pageType = type
            this.formInline = data
            this.showDialogVisible = true
        },
        submitForm(status) {
            this.$refs.ruleForm.validate(async(valid) => {
                if (valid) {
                    if (this.formInline.enclosureIds.length) { // 图片上传内容处理
                        const files = this.formInline.enclosureIds.map(item => item.raw)
                        const formData = new FormData()
                        for (const item of files) {
                            formData.append('files', item)
                        }
                        await uploadFile(formData).then(res => {
                            if (res.success) {
                                this.$message.success(res.message)
                                this.formInline.enclosureIds = res.result.map(item => item.id).join(',')
                            } else {
                                this.$message.error(res.message)
                            }
                        })
                    }
                    if (this.pageType === 'add') {
                        addStepPlan(this.formInline).then(result => {
                            this.Response(result)
                        })
                    } else {
                        addStepEdit(this.formInline).then(result => {
                            this.Response(result)
                        })
                    }
                }
            })
        },
        Response(result) { // 相应数据处理
            if (result.success) {
                this.$message.success(result.message)
                this.$parent.initTable()
                this.showDialogVisible = false
            } else {
                this.$message.error(result.message)
            }
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
        .el-dialog{
            min-width: 500px;
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
}
</style>
