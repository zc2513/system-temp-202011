<template>
  <el-form ref="ruleForm" :inline="true" :model="formInline" class="form-box">
    <el-form-item label="组别:" class="ml10" prop="group">
      <el-select v-model="formInline.group" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="状态:" class="ml10" prop="status">
      <el-select v-model="formInline.status" placeholder="请选择">
        <el-option
          v-for="item in options2"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="TS-Force:" class="ml10" prop="TS">
      <el-select v-model="formInline.TS" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" class="ml20" @click="submitForm('ruleForm')">查询</el-button>
      <el-button type="primary" class="ml20" @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
    props: {
        type: {
            type: [String, Number],
            default: 1
        }
    },
    data() {
        return {
            formInline: {
                group: '',
                status: '',
                TS: ''
            },
            options: [
                { value: '选项1', label: '黄金糕' },
                { value: '选项2', label: '双皮奶' },
                { value: '选项3', label: '蚵仔煎' }
            ],
            options2: [
                { value: '选项1', label: '在职' },
                { value: '选项2', label: '离职' }
            ]
        }
    },
    watch: {
        type: {
            handler(val) {
                this.inin()
            },
            immediate: true
        }
    },
    methods: {
        inin() { // 初始化基本数据
            //  根据类型拿对应数据this.type
        },
        submitForm(formName) {
            this.$emit('change', this.formInline)
        },
        resetForm(formName) {
            this.$refs[formName].resetFields()
        }

    }
}
</script>

<style lang="scss" scoped>
.form-box{

    border-radius: 15px;
    background-color: #fff;
    padding:20px 0px;
    ::v-deep{
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
