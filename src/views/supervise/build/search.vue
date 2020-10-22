<template>
  <el-form :inline="true" :model="formInline" class="demo-form-inline box">
    <el-form-item label="项目名称:" class="ml10">
      <el-input v-model="formInline.projectName" placeholder="请输入" clearable />
    </el-form-item>
    <el-form-item label="招标人:" class="ml10">
      <el-input v-model="formInline.tenderName" placeholder="请输入" clearable />
    </el-form-item>
    <el-form-item label="直接监督单位:" class="ml10">
      <el-input v-model="formInline.superviseUnit" placeholder="请输入" clearable />
    </el-form-item>
    <el-form-item label="所在地区:" class="ml10">
      <el-cascader v-model="formInline.regionCode" :props="{ checkStrictly: true,emitPath:false }" filterable clearable :options="$parent.Dic.citys" />
    </el-form-item>
    <el-form-item label="年度:" class="ml10">
      <el-select v-model="formInline.year" placeholder="请输入">
        <el-option v-for="(i,t) in $parent.Dic.years" :key="t" :label="i.Remark+'年'" :value="i.Remark" />
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
                projectName: '',
                tenderName: '',
                superviseUnit: '',
                regionCode: '',
                year: ''
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
