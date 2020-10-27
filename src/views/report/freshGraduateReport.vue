
<template>
  <div>
    <ts-calendar :current-day="value" day-title="日报" week-title="周报" month-title="月报">
      <template slot="tsdateCell">
        <div> hello </div>
      </template>
    </ts-calendar>
  </div>
</template>

<script>
import TsCalendar from '../../components/tsforce/TsCalendar.vue'

// import showWeekPlanModal from './modules/showWeekPlanModal.vue'
// import AddPlanModal from './modules/AddPlanModal.vue'
import { getUserInfo, getCalendarInfo } from '@/api/calendar'
// import { getSelfDayReport, getWeekReport, getMonthReport } from '@/api/report'
import moment from 'moment'
import { mapState, mapGetters } from 'vuex'
export default {
    name: 'Myplan',
    components: {
        TsCalendar
    },
    data() {
        return {
            tabPosition: 'self',
            value: new Date(),
            menuVisible: true,

            customPlan: [],
            seasonMonth: ['1月-3月', '4月-6月', '7月-9月', '10月-12月'],
            weeks: [
                { season: 1, weekPlan: [] },
                { season: 2, weekPlan: [] },
                { season: 3, weekPlan: [] },
                { season: 4, weekPlan: [] }
            ],
            weekPlan: [],

            monthPlan: [
                { month: 1, count: 0 },
                { month: 2, count: 0 },
                { month: 3, count: 0 },
                { month: 4, count: 0 },
                { month: 5, count: 0 },
                { month: 6, count: 0 },
                { month: 7, count: 0 },
                { month: 8, count: 0 },
                { month: 9, count: 0 },
                { month: 10, count: 0 },
                { month: 11, count: 0 },
                { month: 12, count: 0 }
            ],
            months: [
                { month: 1, count: 0 },
                { month: 2, count: 0 },
                { month: 3, count: 0 },
                { month: 4, count: 0 },
                { month: 5, count: 0 },
                { month: 6, count: 0 },
                { month: 7, count: 0 },
                { month: 8, count: 0 },
                { month: 9, count: 0 },
                { month: 10, count: 0 },
                { month: 11, count: 0 },
                { month: 12, count: 0 }
            ],
            days: [
                { day: 3, count: 3 },
                { day: 2, count: 2 },
                { day: 1, count: 1 }
            ],
            currentWeek: null,
            currentSeason: null,
            currentMonth: {},
            currentDay: null,
            currentYear: null,
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
            }
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
        reset() {
            this.getPageUserInfo()
            switch (this.tabPosition) {
                case 'self':
                    break
                case 'week':
                    this.getWeekPlan()
                    break
                case 'month':
                    this.getMonthPlan()
                    break
                default: ''
            }
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
                } else {
                    this.$message.error({ title: '查询失败', content: res.message })
                }
            })
            var params2 = { 'dateStr': moment(this.value).format('YYYY-MM-DD hh:mm:ss') }
            console.log('查询日历参数', params2)
            getCalendarInfo(params2)
            this.currentSeason = {
                seasonNo: this.seasonNo,
                seasonString: moment(this.currentDay).format('yyyy年') + this.seasonMonth[this.seasonNo - 1]
            }
            this.systemEnv.currentSeason = this.currentSeason
            this.currentWeek = this.weekNo
            this.systemEnv.currentWeek = this.currentWeek
            this.systemEnv.currentDay = this.currentDay

            this.currentMonth = {
                month: parseInt(moment(this.currentDay).format('MM')),
                monthString: moment(this.currentDay).format('yyyy年MM月')
            }
            this.systemEnv.currentMonth = this.currentMonth

            this.currentYear = {
                year: moment(this.currentDay).format('yyyy'),
                desc: moment(this.currentDay).format('yyyy年')
            }
            this.systemEnv.currentYear = this.currentYear
        },

        mouseover(e) {
            //  console.log('日计划--------------移动-----------------------', e)
        },
        clickDay(e) {
            // console.log('日计划--------- 点击----------------------------', e)
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
