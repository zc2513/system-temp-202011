<template>
  <!-- 时间段设置1-->
  <div class="hfull">
    <z-header title="时间阶段设置" class="mb15" />
    <el-tabs v-model="activeName" @tab-click="handleClick">

      <el-tab-pane v-for="(item ,index ) in areas " :key="index" :label="item.areaName" :name="index + ''" style="width:100%;height:100%">
        <el-form :ref="'ruleForm' + index" :model="'formData'+index" :rules="rules" class="form-box plr24 mt15" label-width="120px">
          <div v-for="(tem ,index2) in item.temlock" :key="index2">
            <el-form-item :label="tem.stageName" class="ml10" prop="long">
              <el-date-picker
                v-model="formData.long"
                value-format="timestamp"
                type="daterange"
                range-separator="~"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              />
            </el-form-item>
          </div>
          <el-form-item label="" class="mt30 pt10">
            <el-button type="primary" class="ml20" size="mini" @click="submitForm('ruleForm',item)">提交</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>

    </el-tabs>

    <!-- </el-form-item>
      <el-form-item label="入职集训阶段:" class="ml10" prop="entry">
        <el-date-picker
          v-model="formData.entry"
          value-format="timestamp"
          type="daterange"
          range-separator="~"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
      </el-form-item>
      <el-form-item label="实训阶段:" class="ml10" prop="practise">
        <el-date-picker
          v-model="formData.practise"
          value-format="timestamp"
          type="daterange"
          range-separator="~"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
      </el-form-item>
      <el-form-item label="OJT计划阶段:" class="ml10" prop="ojt">
        <el-date-picker
          v-model="formData.ojt"
          value-format="timestamp"
          type="daterange"
          range-separator="~"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
      </el-form-item>
      <el-form-item label="正式入项阶段:" class="ml10" prop="official">
        <el-date-picker
          v-model="formData.official"
          value-format="timestamp"
          type="daterange"
          range-separator="~"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
      </el-form-item> -->

  </div>
</template>

<script>
import { queryArearDeptGroupById } from '@/api/systemOrg'
import { getTmeLock, getTempletList, addTimeStep, addStepPlan, addStepEdit, planlock, getPlanList } from '@/api/area'
import { mapState } from 'vuex'

export default {
    computed: {
        ...mapState('user', ['token', 'userInfo'])
    },
    data() {
        return {
            formData: {
                long: '',
                entry: '',
                practise: '',
                ojt: '',
                official: ''
            },
            rules: {
                long: [{ required: true, message: '请选择远程学习阶段', trigger: 'change' }],
                entry: [{ required: true, message: '请选择入职集训阶段', trigger: 'change' }],
                practise: [{ required: true, message: '请选择实训阶段', trigger: 'change' }],
                ojt: [{ required: true, message: '请选择OJT计划阶段', trigger: 'change' }],
                official: [{ required: true, message: '请选择正式入项阶段', trigger: 'change' }]
            },
            activeName: '0',
            areas: new Array()

        }
    },
    created() {
        this.init()
    },
    methods: {
        async init() {
            console.log('判断是否设置了阶段', this.userInfo)
            // 初始化地区数据
            this.$nextTick(() => {
                this.getPageGroupInfo()
            })
            // this.getPageGroupInfo()
            // this.getTmeLock({
            //     areaId: 1,
            //     periodId: this.userInfo.defaultPeriodId
            // })
        },
        async  getPageGroupInfo() {
            this.value = new Date()
            // const params = {
            //     userId:this.userInfo.id
            // } TODO 替换
            const params = {
                userId: 'e3517f1ca22245e897077a25b5a8c328'
            }
            console.log('当前用信息，注意是否为空：', this.userInfo)
            queryArearDeptGroupById(params).then(res => {
                console.log('当前用信息，注意是否为空1111：', res)
                if (res.success) {
                    const userinfo = res.result
                    if (userinfo.length > 0) {
                        userinfo.forEach(element => {
                            var area = {
                                areaId: element.areaId,
                                areaName: element.areaName
                            }
                            getTmeLock({
                                areaId: element.areaId,
                                periodId: this.userInfo.defaultPeriodId
                            }).then(res1 => {
                                console.log('判断是否设置了jig阶段', res1)
                                if (res1.success === true) {
                                    var stus = res1.result
                                    console.log('000000000000000', stus, area)
                                    area.temlock = stus
                                    console.log('00000000000000660', stus, area)
                                    // this.stus.forEach(val => {
                                    //     val.newGroupName = val.areaName + ' ' + val.departName + ' ' + val.groupName
                                    // })
                                }
                            })
                            this.areas.push(area)
                            console.log('99999999999999999999999999999', this.areas)
                        })
                    } else {
                        this.$message.error({ title: '查询失败', content: res.message })
                    }
                }
            })
        },
        getTmeLock(data) {
            console.log('判断是否设置了阶段xxx96666666666666xxxx', data)
            getTmeLock(data).then(res1 => {
                console.log('判断是否设置了jig阶段', res1)
                if (res1.success === true) {
                    this.stus = res1.result.records
                    // this.stus.forEach(val => {
                    //     val.newGroupName = val.areaName + ' ' + val.departName + ' ' + val.groupName
                    // })
                }
            })
            console.log('判断是否设置了阶段xxxxxxx', this.stus)
            return this.stus
        },
        getTempletList(data) {
            getTempletList(data).then(res1 => {
                console.log('人员清单', res1)
                if (res1.success === true) {
                    this.stus = res1.result.records
                    // this.stus.forEach(val => {
                    //     val.newGroupName = val.areaName + ' ' + val.departName + ' ' + val.groupName
                    // })
                    this.baseParams.total = res1.result.total
                }
            })
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    // 1.提交成功后跳转 区域计划页面
                    this.$router.push({
                        name: 'Area',
                        params: {
                            istrue: true
                        }
                    })
                } else {
                    console.log(this.formData, '111')
                    return false
                }
            })
        },
        handleClick(tab) {
            console.log(tab)
            this.activeName = tab.name
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
