<template>
  <el-form :inline="true" :model="formInline" class="box">
    <el-form-item label="检查内容编号:" class="ml10">
      <el-input v-model="formInline.code" clearable placeholder="请输入" />
    </el-form-item>
    <el-form-item label="检查内容名称:" class="ml10">
      <el-input v-model="formInline.name" clearable placeholder="请输入" />
    </el-form-item>
    <el-form-item label="是否启用:" class="ml10">
      <el-select v-model="formInline.isEnable" clearable placeholder="请选择">
        <el-option label="已启用" value="true" />
        <el-option label="未启用" value="false" />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" class="ml20" @click="$emit('sendSearch',formInline)">查询</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
    data() {
        return {
            formInline: {
                code: '',
                name: '',
                isEnable: ''
            }
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
