<template>
  <el-form :inline="true" :model="formInline" class="demo-form-inline box">
    <el-form-item label="平台名称:" class="ml10">
      <el-input v-model="formInline.name" placeholder="请输入平台名称" clearable />
    </el-form-item>
    <el-form-item label="平台编码:" class="ml10">
      <el-input v-model="formInline.code" placeholder="请输入平台编码" clearable />
    </el-form-item>
    <el-form-item label="平台类型:" class="ml10">
      <el-select v-model="formInline.platType" placeholder="请选择" clearable>
        <el-option
          v-for="(val,key) in types"
          :key="key"
          :label="val"
          :value="key"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="是否启用:" class="ml10">
      <el-select v-model="formInline.isEnable" placeholder="请选择" clearable>
        <el-option label="已启用" value="true" />
        <el-option label="未启用" value="false" />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" class="ml20" @click="onSubmit">查询</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { getPlatTypeList } from '@/api/common'
export default {
    data() {
        return {
            types: [], // 行业类型
            formInline: {
                name: '',
                code: '',
                platType: '',
                isEnable: ''
            }
        }
    },
    created() {
        getPlatTypeList().then(res => { // 获取行业类型
            this.types = res.Data
        })
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
