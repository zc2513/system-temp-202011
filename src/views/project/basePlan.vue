
<template>
  <div>
    <z-header title="基础计划">
      <select-student :user-id="userId" :show-button="true" @seache="seache" />
    </z-header>

    <el-row :gutter="15" class="mt15">
      <el-col :span="12">
        <TabelHeader title="所负责应届生总人数" num="4" img-name="person" />
      </el-col>
      <el-col :span="12">
        <TabelHeader type="1" />
      </el-col>
    </el-row>
    <ts-calendar
      :current-day="value"
      :show-day="false"
      day-title="周计划"
      week-title="周计划"
      month-title="月计划"
      :week-action="weekActions"
      :month-action="monthActions"
      @refreshWeek="refreshWeek"
      @refreshMonth="refreshMonth"
      @addDay="addPlan"
      @viewDay="openDay"
      @clickWeekMenu="clickWeekMenu"
      @clickMonthMenu="clickMonthMenu"
    >
      <!-- <template v-slot:tsdateCell="{ data }">

        <div class="bottom">
          <z-circle size="20" :color=" countSave(data.data.day)>0?'#A2F07B':'#FF785F' ">
            {{ countSave(data.data.day) }}
          </z-circle>
        </div>
      </template>  -->
      <template v-slot:weekContent="{ week }">

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
            {{ countMonthSave(month.item.month) }}
          </z-circle>
        </div>
      </template>
    </ts-calendar>
    <show-week-plan-modal ref="showWeekPlan" />
    <addPlanv2 ref="addDayPlanv2" @planHelp="explain" />
    <planDrawer ref="planDrawer" />
    <lock ref="lock" />
  </div>

</template>

<script>
import TsCalendar from '@/components/tsforce/TsCalendar.vue'
import SelectStudent from '@/components/tsforce/SelectStudent.vue'
import TabelHeader from '@/components/headerTab'
import addPlanv2 from './info/addPlanv2'
import planDrawer from './info/planDrawer'
import showWeekPlanModal from './modules/showWeekPlanModal.vue'
import AddPlanModal from './modules/AddWeekPlan.vue'
import { getUserInfo, getCalendarInfo } from '@/api/calendar'
import { queryListGroupCustom, queryListGroupWeek, queryListGroupMonth } from '@/api/project'
import moment from 'moment'
import { mapState, mapGetters } from 'vuex'
import { parseTime } from '@/utils/filter'
// import TabelHeader from '../../components/tsforce/TableHeader.vue'

import lock from './info/lockv2' // 详情
export default {
    name: 'Myplan',
    components: {
        lock,
        addPlanv2,
        planDrawer,
        TsCalendar,
        AddPlanModal,
        showWeekPlanModal,
        TabelHeader,
        SelectStudent
    },
    data() {
        return {
            userId: 'e3517f1ca22245e897077a25b5a8c328',
            currentWeek: null,
            currentSeason: null,
            currentMonth: 10,
            currentDay: null,
            currentYear: 2020,
            tsUserInfo: null,
            seasonNo: null,
            weekNo: null,
            systemEnv: {

            },
            groupDay: [],
            groupWeek: [],
            groupMonth: [],
            weekActions: [
                { action: 'add',
                    lable: '新增'
                },
                { action: 'view',
                    lable: '查看'
                }
            ],
            monthActions: [
                { action: 'add',
                    lable: '新增'
                },
                { action: 'view',
                    lable: '查看'
                }
            ]
        }
    },
    computed: {
        ...mapState('user', ['token', 'userInfo']),
        ...mapGetters(['token'])
    },
    created() {
        this.getPageUserInfo()
    },

    methods: {
        moment,
        countSave(day) {
            var dayint = parseInt(parseTime(day, '{d}'))
            const str = this.groupDay[dayint - 1]
            return str
        },
        countWeekSave(week) {
            const str = this.groupWeek.filter(e => (e.week === week + '' && e.year === this.currentYear))[0]

            return str ? str.count : 0
        },
        countMonthSave(month) {
            const str = this.groupMonth.filter(e => e.month === month + '' && e.year === this.currentYear + '')[0]

            return str ? str.count : 0
        },
        getPageUserInfo() {
            this.value = new Date()
            console.log('当前用信息，注意是否为空：', this.userInfo)
            this.userId = this.userInfo.id
            const params = {
                userId: this.userInfo.id
            }
            getUserInfo(params).then(res => {
                console.log(' 返回的用户信息-------------------------', res.result)
                if (res.success) {
                    this.tsUserInfo = res.result[0]
                    console.log(' 返回的用户信息', this.tsUserInfo)
                    this.tsUserInfo.realName = this.userInfo.realname
                    this.tsUserInfo.userId = this.userInfo.id
                    this.tsUserInfo.userName = this.userInfo.username
                    this.systemEnv.tsUserInfo = this.tsUserInfo
                    this.systemEnv.userInfo = this.userInfo

                    getCalendarInfo().then(dateRes => {
                        console.log('获得周计划ansghu========================================', dateRes)
                        this.currentWeek = dateRes.result.newWeek
                        this.currentSeason = dateRes.result.newSeason
                        this.currentDay = dateRes.result.date
                        this.currentYear = parseTime(dateRes.result.date, '{y}')
                        var param2 = {
                            year: this.currentYear,
                            season: this.currentSeason,
                            planType: 1,
                            createUserId: this.userInfo.id
                        }
                        console.log('周计划汇总参数 加载------------------', param2)
                        queryListGroupWeek(param2).then(res1 => {
                            if (res1.success === true) {
                                console.log('周计划计划汇总', res1)
                                this.groupWeek = res1.result
                            }
                        })
                    })
                } else {
                    this.$message.error({ title: '查询失败', content: res.message })
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
            // TODO 这才是错的
            var param2 = {
                year: this.currentYear,
                quarter: this.currentSeason,
                planType: '1',
                creatUserId: this.userInfo.id
            }
            //  TODO 这才是对的，后端改正后返回
            // var param2 = {
            //     year: this.currentYear,
            //     quarter: this.currentSeason,
            //     planType: 1,
            //     planUserId: this.userInfo.id
            // }
            console.log('周计划汇总参数 涮新的------------------', param2)
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
            //  TODO 这才是对的，后端改正后返回
            // var param2 = {
            //     year: this.currentYear,
            //     planType: 2,
            //     createType: 1,
            //     planUserId: this.userInfo.id
            // }

            var param2 = {
                year: this.currentYear,
                planType: 2,
                creatUserId: this.userInfo.id
            }

            console.log('月计划汇总cansghu', param2)
            queryListGroupMonth(param2).then(res1 => {
                if (res1.success === true) {
                    console.log('月计划汇总cansghu结果', res1)
                    this.groupMonth = res1.result
                }
            })
        },
        seache() {},
        openWeek(data) {
            console.log('data---- 周--------------', data)
            this.$refs.showWeekPlan.planType = '周计划'
            this.$refs.showWeekPlan.tsUserInfo = this.tsUserInfo
            this.$refs.showWeekPlan.planTime = data.currentYear + '年' + data.week + '周'
            this.$refs.showWeekPlan.loadData('1', data)
            this.$refs.showWeekPlan.dialogFormVisible = true
        },
        openMonth(data) {
            console.log('data---------------------月-----------------', data)
            this.$refs.showWeekPlan.tsUserInfo = this.tsUserInfo
            this.$refs.showWeekPlan.planType = '月计划'
            this.$refs.showWeekPlan.planTime = this.currentYear + '年' + data.month + '月'
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
        clickWeekMenu(data) {
            console.log('menu-------week---0000000000--', data)
            if (data.menu.action === 'add') {
                this.addPlan(data)
            } else if (data.menu.action === 'view') {
                var param = {
                    planType: 1,
                    currentYear: data.currentYear,
                    currentWeek: data.item.week,
                    tsUserInfo: this.tsUserInfo
                }
                this.$refs.lock.show(param)
            }
        },
        clickMonthMenu(data) {
            console.log('menu---------月---', data)
            if (data.menu.action === 'add') {
                this.addMonthPlan(data)
            } else if (data.menu.action === 'view') {
                var param = {
                    planType: 2,
                    currentYear: data.currentYear,
                    currentMonth: data.item.month,
                    tsUserInfo: this.tsUserInfo
                }
                this.$refs.lock.show(param)
            }
        },
        addPlan(param) {
            console.log('增加周计划', param)
            // this.$refs.addDayPlan.planType = '周计划'
            // this.$refs.addDayPlan.planTime = param
            this.$refs.addDayPlanv2.userId = this.userInfo.id
            const model = {
                planType: 1,
                createType: 1,
                year: this.currentYear,
                month: this.currentMonth,
                week: param.item.week,
                createUser: this.tsUserInfo.realName,
                createUserId: this.userInfo.id,
                planUser: null,
                planUserId: null,
                areaId: null,
                areaName: null,
                departId: null,
                departName: null,
                // startDate: param,
                // endDate: param,
                groupId: null,
                groupName: null,
                title: '',
                planContent: '',
                skillType: [],
                status: 0,
                weekStart: param.item.start,
                weekEnd: param.item.end
            }

            console.log('----------model', model)
            this.$refs.addDayPlanv2.show(model)
        },
        addMonthPlan(param) {
            console.log('增加周计划', param)
            // this.$refs.addDayPlan.planType = '周计划'
            // this.$refs.addDayPlan.planTime = param
            this.$refs.addDayPlanv2.userId = this.userInfo.id
            const model = {
                planType: 2,
                createType: 1,
                year: this.currentYear,
                month: param.item.month,
                week: null,
                createUser: this.tsUserInfo.realName,
                createUserId: this.userInfo.id,
                planUser: null,
                planUserId: null,
                areaId: null,
                areaName: null,
                departId: null,
                departName: null,
                // startDate: param,
                // endDate: param,
                groupId: null,
                groupName: null,
                title: '',
                planContent: '',
                skillType: [],
                status: 0,
                weekStart: null,
                weekEnd: null
            }

            console.log('----------model', model)
            this.$refs.addDayPlanv2.show(model)
        },
        // 自定义计划说明文档
        explain() {
            this.$refs.planDrawer.show({ title: '周计划' })
        }
    }
}
</script>
<style lang='scss'  scoped>
#calendar .el-button-group > .el-button:not(:first-child):not(:last-child):after {
  content: '当月';
}
</style>
