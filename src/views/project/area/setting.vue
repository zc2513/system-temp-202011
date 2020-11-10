<template>
  <!-- 时间段设置1-->
  <div class="hfull">
    <z-header title="时间阶段设置" class="mb15" />
    <el-form ref="ruleForm" :model="formData" class="form-box plr24 mt15" label-width="120px">
      <el-form-item label="计划区域:" class="ml10 area">
        {{ userInfo.areaName }}
      </el-form-item>
      <template v-for="(item,index) in formData.subDatas">
        <el-form-item
          :key="item.id"
          :label="item.stageName"
          class="ml10"
          :prop="'subDatas.'+ index + '.time'"
          :rules="{
            required: true, message: `请选择${item.stageName}`, trigger: 'change'
          }"
        >
          <el-date-picker
            v-model="item.time"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="daterange"
            range-separator="~"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>
      </template>
      <el-form-item label="" class="mt30 pt10">
        <el-button type="primary" class="ml20" size="mini" @click="submitForm('ruleForm')">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getTempletList, addTimeStep } from '@/api/area'
import { mapGetters } from 'vuex'
export default {
    data() {
        return {
            formData: {
                subDatas: []
            }
        }
    },
    computed: {
        ...mapGetters(['userInfo'])
    },
    created() {
        this.init()
    },
    methods: {
        init() { // 初始化地区数据
            console.log('用户信息', this.userInfo)
            const data = {
                periodId: this.userInfo.defaultPeriodId,
                areaName: this.userInfo.areaName,
                areaId: this.userInfo.areaId
            }
            getTempletList().then(res => {
                console.log('用户信息模板', res)
                if (res.success) {
                    this.formData.subDatas = res.result.map(item => {
                        data.stageId = item.id
                        return { ...data, ...item }
                    })
                }
            })
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    const data = this.formData.subDatas.map(item => {
                        item['startTime'] = item.time[0]
                        item['endTime'] = item.time[1]
                        return item
                    })
                    console.log(data, 3333333333)
                    addTimeStep(data).then(res => {
                        const { success, message } = res
                        if (success) {
                            console.log(res, 777777777)
                            this.$message.success(message)
                            this.$router.push({
                                name: 'Area'
                            })
                        }
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
.form-box{
    border-radius: 15px;
    background-color: #fff;
    min-height: calc(100% - 120px);
    .area{
        padding: 18px 0;
        border-bottom: 1px solid #f4f7fa;
    }
    ::v-deep{
        .el-form-item{
            padding-left: 50px;
            margin-bottom: 30px;
        }
        .el-form-item__label{
            color: #5F6266;
            font-weight: 400;
        }
        .el-date-editor,.el-select{
            // width: 280px;
        }
    }

}
</style>
