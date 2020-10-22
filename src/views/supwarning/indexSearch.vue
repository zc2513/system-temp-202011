<template>
  <el-form :inline="true" :model="formInline" class="demo-form-inline box" label-width="110px">
    <el-form-item label="招标项目名称:">
      <el-input v-model="formInline.tenProjectName" placeholder="请输入" clearable />
    </el-form-item>
    <el-form-item label="招标项目编号:">
      <el-input v-model="formInline.tenProjectCode" placeholder="请输入" clearable />
    </el-form-item>
    <el-form-item label="招标人:">
      <el-input v-model="formInline.tenderName" placeholder="请输入" clearable />
    </el-form-item>
    <el-form-item label="所在地区:">
      <el-cascader v-model="formInline.regionCode" :props="{ checkStrictly: true,emitPath:false }" filterable clearable :options="$parent.Dic.citys" />
    </el-form-item>
    <el-form-item label="直接监督单位:">
      <el-input v-model="formInline.superviseDeptName" placeholder="请输入" clearable />
    </el-form-item>
    <el-form-item label="来源平台:">
      <el-input v-model="formInline.TradePlat" placeholder="请输入" clearable />
    </el-form-item>
    <el-form-item label="建立时间:">
      <el-date-picker
        v-model="formInline.createTime"
        type="date"
        placeholder="选择日期"
        value-format="yyyy-MM-dd"
      />
    </el-form-item>
    <el-form-item label="预警情况:">
      <el-select v-model="formInline.isWarnErr" clearable placeholder="请选择">
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
        start-placeholder="起始时间"
        end-placeholder="截止时间"
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
                tenProjectName: '',
                tenProjectCode: '',
                tenderName: '',
                regionCode: '',
                superviseDeptName: '',
                tradePlat: '',
                createTime: '',
                isWarnErr: '',
                warnBeginTime: '',
                warnEndTime: '',
                times: ''
            }
        }
    },
    methods: {
        onSubmit() {
            this.formInline.warnBeginTime = this.formInline.time ? this.formInline.times[0] : ''
            this.formInline.warnEndTime = this.formInline.times ? this.formInline.times[1] : ''
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
