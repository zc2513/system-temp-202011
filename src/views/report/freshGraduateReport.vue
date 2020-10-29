
<template>
  <div>
    <el-card style="margin-bottom:10px">
      <span>应届生汇报</span>
    </el-card>
    <tabel-header style="margin-bottom:10px" />
    <ts-calendar :current-day="value" day-title="日报" week-title="周报" month-title="月报" @refreshDay="refreshDay" @refreshWeek="refreshWeek" @refreshMonth="refreshMonth">
      <template v-slot:tsdateCell="{ data }">

        <!-- <div class="bottom"></div> -->
        <div class="bottom">
          <z-circle size="20" :color=" countSave(data.data.day)>0?'#A2F07B':'#FF785F' ">
            <!-- {{ countSave(data.data.day) }} -->
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
  </div>
</template>

<script>
import TsCalendar from '../../components/tsforce/TsCalendar.vue'

// import showWeekPlanModal from './modules/showWeekPlanModal.vue'
// import AddPlanModal from './modules/AddPlanModal.vue'
import { getUserInfo } from '@/api/calendar'
import { queryListGroupWeek, queryListGroupDay, queryListGroupMonth } from '@/api/report'
import moment from 'moment'
import TabelHeader from '../../components/tsforce/TableHeader.vue'

import { mapState, mapGetters } from 'vuex'
export default {
    name: 'Myplan',
    components: {
        TsCalendar,
        TabelHeader
    },
    data() {
        return {

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
        countSave(day) {
            const str = this.groupDay.filter(e => e.month === (day.split('-')[1]) && e.DAY === Number(day.split('-')[2]) && e.year === this.currentYear + '')[0]
            return str ? str.count : 0
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
                    var param2 = {
                        year: this.currentYear,
                        month: this.currentMonth,
                        userGroupId: 1,
                        userId: this.userInfo.id
                    }
                    console.log('日报汇总cansghu', param2)
                    queryListGroupDay(param2).then(res1 => {
                        if (res1.success === true) {
                            console.log('日报汇总', res1)
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
            console.log('日报--------- 点击----------------------------')
            this.currentYear = data.currentYear
            this.currentMonth = data.currentMonth
            var param2 = {
                year: this.currentYear,
                month: this.currentMonth,
                userGroupId: 1,
                userId: this.userInfo.id
            }
            console.log('日报汇总cansghu', param2)
            queryListGroupDay(param2).then(res1 => {
                if (res1.success === true) {
                    console.log('日报汇带你几获得总', res1)
                    this.groupDay = res1.result
                }
            })
        },
        refreshWeek(data) {
            console.log('周报--------- 点击----------------------------')
            this.currentYear = data.currentYear
            this.currentSeason = data.currentSeason
            this.getqueryListGroupWeek()
        },
        getqueryListGroupWeek() {
            console.log('周报--------- --------------------------')

            var param2 = {
                year: this.currentYear,
                quarter: this.currentSeason,
                userGroupId: 1,
                userId: this.userInfo.id
            }
            console.log('周报汇总cansghu', param2)
            queryListGroupWeek(param2).then(res1 => {
                if (res1.success === true) {
                    console.log('周报汇带你几获得总', res1)
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
                userId: this.userInfo.id
            }
            console.log('月报汇总cansghu', param2)
            queryListGroupMonth(param2).then(res1 => {
                if (res1.success === true) {
                    console.log('月报汇带你几获得总', res1)
                    this.monthWeek = res1.result
                }
            })
        },

        openWeek(data) {
            console.log('data---- 周--------------', data)
            this.$refs.showWeekPlan.planType = '周计划'
            this.$refs.showWeekPlan.tsUserInfo = this.tsUserInfo
            this.$refs.showWeekPlan.planTime = this.currentYear.desc + data.week + '周'
            this.$refs.showWeekPlan.loadData('1', this.systemEnv, data)
            this.$refs.showWeekPlan.dialogFormVisible = true
        },
        openMonth(data) {
            console.log('data---------------------月-----------------', data)
            this.$refs.showWeekPlan.tsUserInfo = this.tsUserInfo
            this.$refs.showWeekPlan.planType = '月计划'
            this.$refs.showWeekPlan.planTime = this.currentYear.desc + data.month + '月'
            this.$refs.showWeekPlan.loadData('2', this.systemEnv, data)
            this.$refs.showWeekPlan.dialogFormVisible = true
        },
        openDay(param) {
            console.log('data------------日-------------------------0000000------------', this.tsUserInfo)
            this.$refs.showWeekPlan.tsUserInfo = this.tsUserInfo
            this.$refs.showWeekPlan.planType = '自定义计划'
            this.$refs.showWeekPlan.planTime = param
            this.$refs.showWeekPlan.loadData('3', this.systemEnv, param)
            this.$refs.showWeekPlan.dialogFormVisible = true
        },
        addPlan(command) {
            console.log('点击', command)
            const commands = command.split(',')
            const action = commands[0]
            const param = commands[1]
            let model
            switch (action) {
                case 'new':
                    console.log('增加计划', action, param)
                    this.$refs.addDayPlan.planType = '自定义计划'
                    this.$refs.addDayPlan.planTime = param
                    model = {
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
                        planContent: null,
                        skillType: [],
                        status: 0,
                        weekStart: null,
                        weekEnd: null
                    }
                    this.$refs.addDayPlan.visible = true

                    console.log('----------model', model)

                    Object.assign(this.$refs.addDayPlan.model, model)
                    this.$refs.addDayPlan.add(model)
                    break
                case 'view':
                    console.log('浏览计划111', action, param)
                    this.openDay(param)
                    break
                default:
                    break
            }
        }
    }
}
</script>
<style lang='scss'  scoped>
#calendar .el-button-group > .el-button:not(:first-child):not(:last-child):after {
  content: '当月';
}
</style>
