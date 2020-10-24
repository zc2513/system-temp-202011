<template>
  <el-form :inline="true" :model="formInline" class="box">
    <el-form-item label="角色名称:" class="ml10">
      <el-input v-model="formInline.RoleName" clearable placeholder="请输入" />
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
                RoleName: ''
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
