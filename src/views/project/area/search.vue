<template>
  <el-form ref="ruleForm" :inline="true" :model="formInline" class="form-box">
    <el-form-item v-if="type==='实训计划'" label="组别:" class="ml10" prop="time">
      <el-select v-model="formInline.department" placeholder="请选择部门">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item v-if="type==='远程学习计划' || type==='集训计划' || type==='OJT计划' || type==='正式入项计划' " label="区域:" class="ml10" prop="time">
      <el-select v-model="formInline.department" placeholder="请选择部门">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item v-if="type==='实训计划' || type==='OJT计划' || type==='正式入项计划' " label="提交人角色:" class="ml10" prop="person">
      <el-select v-model="formInline.person" placeholder="请选择提交人">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="提交人:" class="ml10" prop="person">
      <el-select v-model="formInline.person" placeholder="请选择提交人">
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
                team: '',
                department: '',
                time: '',
                leve: '',
                person: ''
            },
            options: [
                { value: '选项1', label: '黄金糕' },
                { value: '选项2', label: '双皮奶' },
                { value: '选项3', label: '蚵仔煎' }
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
