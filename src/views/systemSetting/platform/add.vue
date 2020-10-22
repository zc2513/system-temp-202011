<template>
  <!-- 对接平台(新增/编辑) -->
  <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="add-form">
    <el-row>
      <el-col :sm="24" :lg="12">
        <el-form-item label="平台编码" prop="Code">
          <el-input v-model="ruleForm.Code" />
        </el-form-item>
      </el-col>
      <el-col :sm="24" :lg="12">
        <el-form-item label="平台名称" prop="Name">
          <el-input v-model="ruleForm.Name" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :sm="24" :lg="12">
        <el-form-item label="平台简介" prop="SimpleName">
          <el-input v-model="ruleForm.SimpleName" />
        </el-form-item>
      </el-col>
      <el-col :sm="24" :lg="12">
        <el-form-item label="平台类型" prop="PlatTypeCode">
          <el-select v-model="ruleForm.PlatTypeCode" placeholder="请选择">
            <el-option
              v-for="(val,key) in types"
              :key="key"
              :label="val"
              :value="key"
            />
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :sm="24" :lg="12">
        <el-form-item label="所在地区" prop="RegionCode">
          <el-cascader v-model="ruleForm.RegionCode" :props="{ checkStrictly: true,emitPath:false }" filterable :options="citys" />
        </el-form-item>
      </el-col>
      <el-col :sm="24" :lg="12">
        <el-form-item label="行业门类" prop="IndustryClassCode">
          <el-select v-model="ruleForm.IndustryClassCode" placeholder="请选择">
            <el-option
              v-for=" item in categorys"
              :key="item.Id"
              :label="item.Name"
              :value="item.No"
            />
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :sm="24" :lg="12">
        <el-form-item label="平台地址url" prop="PlatUrl">
          <el-input v-model="ruleForm.PlatUrl" />
        </el-form-item>
      </el-col>
      <el-col :sm="24" :lg="12">
        <el-form-item label="是否启用" prop="IsEnable">
          <el-switch v-model="ruleForm.IsEnable" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row class="t-c">
      <el-button type="primary" round style="width:100px;" @click="submitForm('ruleForm')">{{ pageType === 'edit' ? '保存': '确认' }}</el-button>
    </el-row>
  </el-form>
</template>

<script>
import { getDicIndustryClass, getPlatTypeList } from '@/api/common'
import { addDockPlat, getDockPlatDetail } from '@/api/systemSetting'
import { validateURL } from '@/utils/formValidate'
export default {
    props: {
        pageType: {
            type: String,
            default: 'add'
        },
        infoId: {
            type: [String, Number],
            default: ''
        }
    },
    data() {
        return {
            citys: require('@/assets/json/citys.json'),
            types: [], // 行业类型
            categorys: [], // 行业门类
            ruleForm: {
                Code: '',
                Name: '',
                SimpleName: '',
                PlatTypeCode: '',
                IndustryClassCode: '',
                RegionCode: '',
                PlatUrl: '',
                IsEnable: false
            },
            rules: {
                Code: [
                    { required: true, message: '请输入平台编码', trigger: 'blur' }
                ],
                Name: [
                    { required: true, message: '请输入平台名称', trigger: 'blur' }
                ],
                SimpleName: [
                    { required: true, message: '请输入平台简介', trigger: 'blur' }
                ],
                PlatTypeCode: [
                    { required: true, message: '请选择平台类型', trigger: 'change' }
                ],
                RegionCode: [
                    { required: true, message: '请选择所在地区', trigger: 'change' }
                ],
                IndustryClassCode: [
                    { required: true, message: '请选择行业门类', trigger: 'change' }
                ],
                PlatUrl: [
                    { required: true, message: '请输入平台地址url', trigger: 'blur' },
                    { validator: validateURL, trigger: 'blur' }
                ]
            }
        }
    },
    created() {
        getDicIndustryClass().then(res => { // 获取行业门类
            this.categorys = res.Data
        })
        getPlatTypeList().then(res => { // 获取行业类型
            this.types = res.Data
        })
        if (this.pageType === 'edit') this.init(this.infoId)
    },
    methods: {
        init(Id) { // 详情
            getDockPlatDetail({ Id }).then(res => {
                res.Data.Id = res.Data.SId
                this.ruleForm = res.Data
            })
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let path = 'addDockPlat'
                    if (this.pageType === 'edit') path = 'editDockPlat'
                    addDockPlat({ model: this.ruleForm }, path).then(res => {
                        this.$parent.$parent.init()
                        this.$message.success('操作成功')
                        this.$emit('closeDia', false)
                    })
                } else {
                    return false
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.add-form{
    ::v-deep{
        .el-cascader,.el-select{
            width: 100%;
        }
    }
}
</style>
