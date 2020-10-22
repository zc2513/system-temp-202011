<template>
  <el-form :inline="true" :model="formInline" class="demo-form-inline box">
    <el-form-item label="标段（包）编号:" class="ml10">
      <el-input v-model="formInline.sectionCode" placeholder="请输入" clearable />
    </el-form-item>
    <el-form-item label="标段（包）名称:" class="ml10">
      <el-input v-model="formInline.sectionName" placeholder="请输入" clearable />
    </el-form-item>
    <el-form-item label="招标项目名称:" class="ml10">
      <el-input v-model="formInline.tenProjectName" placeholder="请输入" clearable />
    </el-form-item>
    <el-form-item label="预警级别:" class="ml10">
      <el-select v-model="formInline.warnLevel" placeholder="请选择" clearable>
        <el-option label="红灯" value="Error" />
        <el-option label="黄灯" value="Warning" />
        <el-option label="绿灯" value="Normal" />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" class="ml20" @click="onSubmit">查询</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
    data() {
        return {
            formInline: {
                sectionCode: '',
                sectionName: '',
                tenProjectName: '',
                warnLevel: ''
            }
        }
    },
    methods: {
        onSubmit() {
            this.$emit('sendSearch', this.formInline)
        }
    }
}
</script>

<style lang="scss" scoped>
.box{
    font-weight: 700;
    color: gray;
    border-radius: 15px;
    background-color: #fff;
    padding:20px 15px 0px;
}

</style>
