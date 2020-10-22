<template>
  <el-form :inline="true" :model="formInline" class="demo-form-inline box">
    <!-- <el-form-item label="标段（包）编号:" class="ml10">
      <el-input v-model="formInline.bidSectionCode" placeholder="请输入" />
    </el-form-item> -->
    <el-form-item label="标段（包）名称:" class="ml10">
      <el-input v-model="formInline.bidSectionName" placeholder="请输入" clearable />
    </el-form-item>
    <el-form-item label="建立时间:" class="ml10">
      <el-date-picker
        v-model="formInline.createTime"
        type="date"
        placeholder="选择日期"
        value-format="yyyy-MM-dd"
      />
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
                // bidSectionCode: '',
                bidSectionName: '',
                createTime: '',
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
