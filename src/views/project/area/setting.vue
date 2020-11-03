<template>
  <!-- 时间段设置 -->
  <div class="hfull">
    <z-header title="时间阶段设置" class="mb15" />
    <el-form ref="ruleForm" :model="formData" :rules="rules" class="form-box plr24 mt15" label-width="120px">
      <el-form-item label="计划区域:" class="ml10 area" prop="team">
        成都
      </el-form-item>
      <el-form-item label="远程学习阶段:" class="ml10" prop="long">
        <el-date-picker
          v-model="formData.long"
          value-format="timestamp"
          type="daterange"
          range-separator="~"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
      </el-form-item>
      <el-form-item label="入职集训阶段:" class="ml10" prop="entry">
        <el-date-picker
          v-model="formData.entry"
          value-format="timestamp"
          type="daterange"
          range-separator="~"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
      </el-form-item>
      <el-form-item label="实训阶段:" class="ml10" prop="practise">
        <el-date-picker
          v-model="formData.practise"
          value-format="timestamp"
          type="daterange"
          range-separator="~"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
      </el-form-item>
      <el-form-item label="OJT计划阶段:" class="ml10" prop="ojt">
        <el-date-picker
          v-model="formData.ojt"
          value-format="timestamp"
          type="daterange"
          range-separator="~"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
      </el-form-item>
      <el-form-item label="正式入项阶段:" class="ml10" prop="official">
        <el-date-picker
          v-model="formData.official"
          value-format="timestamp"
          type="daterange"
          range-separator="~"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
      </el-form-item>
      <el-form-item label="" class="mt30 pt10">
        <el-button type="primary" class="ml20" size="mini" @click="submitForm('ruleForm')">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
    data() {
        return {
            formData: {
                long: '',
                entry: '',
                practise: '',
                ojt: '',
                official: ''
            },
            rules: {
                long: [{ required: true, message: '请选择远程学习阶段', trigger: 'change' }],
                entry: [{ required: true, message: '请选择入职集训阶段', trigger: 'change' }],
                practise: [{ required: true, message: '请选择实训阶段', trigger: 'change' }],
                ojt: [{ required: true, message: '请选择OJT计划阶段', trigger: 'change' }],
                official: [{ required: true, message: '请选择正式入项阶段', trigger: 'change' }]
            }
        }
    },
    created() {
        this.init()
    },
    methods: {
        init() {
            // 初始化地区数据
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    // 1.提交成功后跳转 区域计划页面
                    this.$router.push('/project/area')
                } else {
                    console.log(this.formData, '111')
                    return false
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.form-box{
    border-radius: 15px;
    background-color: #fff;
    min-height: calc(100% - 120px);
    .area{
        padding: 18px 0;
        border-bottom: 1px solid #f4f7fa;
    }
    ::v-deep{
        .el-form-item{
            padding-left: 50px;
            margin-bottom: 30px;
        }
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
