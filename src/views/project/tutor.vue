
<template>
  <div>
    <el-card style="margin-bottom:10px">
      <el-row style="padding:10px">
        <span>基础计划</span>
      </el-row>

      <el-row style="padding:10px">
        <select-student :user-id="e3517f1ca22245e897077a25b5a8c328" @seache="seache" />
      </el-row>
    </el-card>
    <template>
      <el-row>
        <el-col :span="12">
          <el-card style="margin-right:8px">

            <el-row :gutter="24">
              <el-col :span="4">
                <img src="@/assets/planicon.png">
              </el-col>
              <el-col :span="10">

                <el-row style="margin:20px">
                  <el-col :span="18">
                    <el-row>
                      <span>所负责应届生总人数</span>
                    </el-row>
                    <el-row style="padding:10px">
                      <span>4</span>
                    </el-row>
                  </el-col>

                </el-row>

              </el-col>
            </el-row>

          </el-card>

        </el-col>
        <el-col :span="12">
          <TabelHeader :src="src" :symbols="symbols" style="margin-left:8px" />
        </el-col>
      </el-row>
    </template>

    <div>
      <ts-calendar :current-day="value" :show-day="false" day-title="周计划" week-title="周计划" month-title="月计划" @refreshDay="refreshDay" @refreshWeek="refreshWeek" @refreshMonth="refreshMonth" @addDay="addPlan" @viewDay="openDay">
        <template v-slot:tsdateCell="{ data }">

          <!-- <div class="bottom"></div> -->
          <div class="bottom">
            <z-circle size="20" :color=" countSave(data.data.day)>0?'#A2F07B':'#FF785F' ">
              {{ countSave(data.data.day) }}
            </z-circle>
          </div>
        </template>
        <template v-slot:weekContent="{ week }">

          <!-- <div class="bottom"></div> -->
          <div class="bottom">

            <z-circle size="20" :color=" countWeekSave(week.item.week)>0?'#A2F07B':'#FF785F' ">
              {{ countWeekSave(week.item.week) }}
            </z-circle>
          </div>
        </template>
        <template v-slot:monthContent="{ month }">

          <!-- <div class="bottom"></div> -->
          <div class="bottom">

            <z-circle size="20" :color=" countMonthSave(month.item.month)>0?'#A2F07B':'#FF785F' ">
              {{ countMonthSave(month.item) }}
            </z-circle>
          </div>
        </template>
      </ts-calendar>
      <add-plan-modal ref="addDayPlan" @ok="getCustomPlan" />
      <show-week-plan-modal ref="showWeekPlan" />

    </div>
  </div>
</template>

<script>
import TsCalendar from '../../components/tsforce/TsCalendar.vue'
import TabelHeader from '../../components/tsforce/TableHeader.vue'
import SelectStudent from '../../components/tsforce/SelectStudent.vue'
import showWeekPlanModal from './modules/showWeekPlanModal.vue'
import AddPlanModal from './modules/AddPlanModal.vue'
import { getUserInfo } from '@/api/calendar'
import { queryListGroupCustom, queryListGroupWeek, queryListGroupMonth } from '@/api/project'
import moment from 'moment'
import { mapState, mapGetters } from 'vuex'
import { parseTime } from '@/utils/filter'
export default {
    name: 'Myplan',
    components: {
        TsCalendar,
        AddPlanModal,
        showWeekPlanModal,
        TabelHeader,
        SelectStudent
    },
    data() {
        return {
            // 标注
            rsc: require('@/assets/planicon.png'),
            symbols: [

                {
                    iconColor: '#A2F07B',
                    style: {},
                    title: '已提交人数',
                    iconText: ''
                },
                {
                    iconColor: '#FF785F',
                    style: {},
                    title: '全员提交',
                    iconText: ''
                }

            ],
            currentWeek: null,
            currentSeason: null,
            currentMonth: 10,
            currentDay: null,
            currentYear: 2020,
            tsUserInfo: null,
            seasonNo: null,
            weekNo: null,
            systemEnv: {
                // currentYear,
                // currentSeason,
                // currentMonth,
                // currentDay,
                // currentWeek,
                // tsUserInfo,
                // userInfo,
            },
            groupDay: [],
            groupWeek: [],
            groupMonth: []
        }
    },
    computed: {
        ...mapState('user', ['token', 'userInfo']),
        ...mapGetters(['token'])
    },
    created() {
        console.log('0000000000000000', this.userInfo)
        this.getPageUserInfo()
    },

    methods: {
        moment,
        handleChange(value) {
            console.log(value)
        },
        countSave(day) {
            console.log('day--------', day)
            var dayint = parseInt(parseTime(day, '{d}'))
            const str = this.groupDay[dayint - 1]
            console.log('day--------', str, dayint)
            return str
        },
        countWeekSave(week) {
            const str = this.groupWeek.filter(e => (e.week === week + '' && e.year === this.currentYear))[0]
            return str ? str.count : 0
        },
        countMonthSave(month) {
            console.log('===============================0000000000000============', this.groupMonth, month, this.currentYear)

            const str = this.groupMonth.filter(e => e.month === month && e.year === this.currentYear + '')[0]
            console.log('===============================0000000000000===========ccccccc=', str)

            return str ? str.count : 0
        },
        add(val) {
            console.log(val)
        },
        lock(val) {
            console.log(val)
        },
        getPageUserInfo() {
            this.value = new Date()
            console.log('当前用信息，注意是否为空：', this.userInfo)
            const params = {
                userId: this.userInfo.id
            }
            getUserInfo(params).then(res => {
                console.log(' 返回的用户信息', res.result)
                if (res.success) {
                    this.tsUserInfo = res.result
                    console.log(' 返回的用户信息', res.result)
                    this.tsUserInfo.realName = this.userInfo.realname
                    this.tsUserInfo.userId = this.userInfo.id
                    this.tsUserInfo.userName = this.userInfo.username
                    this.systemEnv.tsUserInfo = this.tsUserInfo
                    this.systemEnv.userInfo = this.userInfo
                    // 获取当前用户的组织架构信息

                    var param2 = {
                        year: this.currentYear,
                        month: this.currentMonth,
                        createType: 2,
                        planType: 3,
                        createUserId: this.userInfo.id
                        // planUserId: this.userInfo.id // TODO 有问题
                    }
                    console.log('自定义计划汇总cansghu', param2)
                    queryListGroupCustom(param2).then(res1 => {
                        if (res1.success === true) {
                            console.log('日计划汇总', res1)
                            this.groupDay = res1.result
                        }
                    })
                } else {
                    this.$message.error({ title: '查询失败', content: res.message })
                }
            })
        },

        mouseover(e) {
            //  console.log('日计划--------------移动-----------------------', e)
        },
        clickDay(e) {
            // console.log('日计划--------- 点击----------------------------', e)
        },
        refreshDay(data) {
            console.log('自定义计划--------- 点击----------------------------')
            this.currentYear = data.currentYear
            this.currentMonth = data.currentMonth
            this.getCustomPlan()
        },
        getCustomPlan() {
            var param2 = {
                year: this.currentYear,
                month: this.currentMonth,
                createType: 2,
                planType: 3,
                createUserId: this.userInfo.id
            }
            console.log('自定义计划汇总cansghu', param2)
            queryListGroupCustom(param2).then(res1 => {
                if (res1.success === true) {
                    console.log('自定义计划汇总结果', res1)
                    this.groupDay = res1.result
                }
            })
        },
        refreshWeek(data) {
            console.log('周计划--------- 点击----------------------------')
            this.currentYear = data.currentYear
            this.currentSeason = data.currentSeason
            this.getqueryListGroupWeek()
        },
        getqueryListGroupWeek() {
            console.log('周计划-------- --------------------------')

            var param2 = {
                year: this.currentYear,
                quarter: this.currentSeason,
                planType: 1,
                planUserId: this.userInfo.id
            }
            console.log('周计划汇总cansghu', param2)
            queryListGroupWeek(param2).then(res1 => {
                if (res1.success === true) {
                    console.log('周计划汇总cansghu 结果', res1)
                    this.groupWeek = res1.result
                }
            })
        },

        refreshMonth(data) {
            console.log('月报--------- 点击----------------------------')
            this.currentYear = data.currentYear
            this.getListGroupMonth()
        },
        getListGroupMonth() {
            console.log('月报--------- --------------------------')

            var param2 = {
                year: this.currentYear,
                userGroupId: 1,
                planType: 2,
                createType: 1,
                planUserId: this.userInfo.id
            }
            console.log('月计划汇总cansghu', param2)
            queryListGroupMonth(param2).then(res1 => {
                if (res1.success === true) {
                    console.log('月计划汇总cansghu结果', res1)
                    this.monthWeek = res1.result
                }
            })
        },

        openWeek(data) {
            console.log('data---- 周--------------', data)
            this.$refs.showWeekPlan.planType = '周计划'
            this.$refs.showWeekPlan.tsUserInfo = this.tsUserInfo
            this.$refs.showWeekPlan.planTime = this.currentYear.desc + data.week + '周'
            this.$refs.showWeekPlan.loadData('1', data)
            this.$refs.showWeekPlan.dialogFormVisible = true
        },
        openMonth(data) {
            console.log('data---------------------月-----------------', data)
            this.$refs.showWeekPlan.tsUserInfo = this.tsUserInfo
            this.$refs.showWeekPlan.planType = '月计划'
            this.$refs.showWeekPlan.planTime = this.currentYear.desc + data.month + '月'
            this.$refs.showWeekPlan.loadData('2', data)
            this.$refs.showWeekPlan.dialogFormVisible = true
        },
        openDay(param) {
            console.log('data------------日----------------00007777------------0000000------------', this.tsUserInfo, param)
            this.$refs.showWeekPlan.tsUserInfo = this.tsUserInfo
            this.$refs.showWeekPlan.planType = '自定义计划'
            this.$refs.showWeekPlan.planTime = param.day
            this.$refs.showWeekPlan.loadData('3', param)
            this.$refs.showWeekPlan.dialogFormVisible = true
        },
        addPlan(param) {
            console.log('增加计划', param)
            this.$refs.addDayPlan.planType = '自定义计划'
            this.$refs.addDayPlan.planTime = param
            const model = {
                planType: 1,
                createType: 1,
                year: this.currentYear.year,
                month: this.currentMonth.month,
                week: this.currentWeek,
                createUser: this.tsUserInfo.realName,
                createUserId: this.userInfo.id,
                planUser: this.tsUserInfo.realName,
                planUserId: this.userInfo.id,
                areaId: this.tsUserInfo.areaId,
                areaName: this.tsUserInfo.areaName,
                departId: this.tsUserInfo.dept[0].deptId,
                departName: this.tsUserInfo.dept[0].deptName,
                startDate: param,
                endDate: param,
                groupId: this.tsUserInfo.dept[0].groupList[0].groupId,
                groupName: this.tsUserInfo.dept[0].groupList[0].groupName,
                title: '请给计划输入一个标题',
                planContent: '',
                skillType: [],
                status: 0,
                weekStart: null,
                weekEnd: null
            }
            this.$refs.addDayPlan.visible = true

            console.log('----------model', model)

            Object.assign(this.$refs.addDayPlan.form, model)
            this.$refs.addDayPlan.add(model)
        },
        seache(orgs, users) {
            console.log('----------用户名：', users, orgs)
        }
    }
}
</script>
<style lang='scss'  scoped>
#calendar .el-button-group > .el-button:not(:first-child):not(:last-child):after {
  content: '当月';
}
</style>
