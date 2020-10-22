<template>
  <div class="details-box">
    <el-row>
      <el-col :sm="24" :lg="12" class="fl mb5 box-item">
        <div class="flc-y bold left">平台编码</div>
        <div class="flc-y fl1 pl10 right">{{ ruleForm.Code }}</div>
      </el-col>
      <el-col :sm="24" :lg="12" class="fl mb5 box-item">
        <div class="flc-y bold left">平台名称</div>
        <div class="flc-y fl1 pl10 right">{{ ruleForm.Name }}</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :sm="24" :lg="12" class="fl mb5 box-item">
        <div class="flc-y bold left">平台简介</div>
        <div class="flc-y fl1 pl10 right">{{ ruleForm.SimpleName }}</div>
      </el-col>
      <el-col :sm="24" :lg="12" class="fl mb5 box-item">
        <div class="flc-y bold left">平台类型</div>
        <div class="flc-y fl1 pl10 right">{{ ruleForm.PlatTypeName }}</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :sm="24" :lg="12" class="fl mb5 box-item">
        <div class="flc-y bold left">所在地区</div>
        <div class="flc-y fl1 pl10 right">{{ ruleForm.RegionName }}</div>
      </el-col>
      <el-col :sm="24" :lg="12" class="fl mb5 box-item">
        <div class="flc-y bold left">行业门类</div>
        <div class="flc-y fl1 pl10 right">{{ ruleForm.IndustryClassName }}</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :sm="24" :lg="12" class="fl mb5 box-item">
        <div class="flc-y bold left">平台地址url</div>
        <div class="flc-y fl1 pl10 right">{{ ruleForm.PlatUrl }}</div>
      </el-col>
      <el-col :sm="24" :lg="12" class="fl mb5 box-item">
        <div class="flc-y bold left">是否启用</div>
        <div class="flc-y fl1 pl10 right">{{ ruleForm.IsEnable ? '已开启':'已关闭' }}</div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getDockPlatDetail } from '@/api/systemSetting'
export default {
    props: {
        infoId: {
            type: [String, Number],
            default: ''
        }
    },
    data() {
        return {
            ruleForm: {}
        }
    },
    created() {
        getDockPlatDetail({ Id: this.infoId }).then(res => {
            res.Data.Id = res.Data.SId
            this.ruleForm = res.Data
        })
    }
}
</script>

<style lang="scss" scoped>
.details-box{
    .box-item{
        >div{
            height: 40px;
            line-height: 14px;
        }
        .left{
            width: 90px;
            min-width: 90px;
            justify-content: flex-end;
        }
    }
}
</style>
