<template>
  <el-form :inline="true" :model="formInline" class="demo-form-inline box">
    <el-form-item label="检查项名称:" class="ml10">
      <el-input v-model="formInline.checkItemName" placeholder="请输入" clearable />
    </el-form-item>
    <el-form-item label="预警情况:">
      <el-select v-model="formInline.isErrWarn" clearable placeholder="请选择">
        <el-option label="全部" value="" />
        <el-option label="有异常预警" value="true" />
        <el-option label="无异常预警" value="false" />
      </el-select>
    </el-form-item>
    <el-form-item label="预警时间:">
      <el-date-picker
        v-model="formInline.times"
        type="daterange"
        align="right"
        unlink-panels
        value-format="yyyy-MM-dd"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      />
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
                checkItemName: '',
                isErrWarn: '',
                superviseUnit: '',
                beginTime: '',
                endTime: '',
                times: ''
            }
        }
    },
    methods: {
        onSubmit() {
            this.formInline.beginTime = this.formInline.time ? this.formInline.times[0] : ''
            this.formInline.endTime = this.formInline.times ? this.formInline.times[1] : ''
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
