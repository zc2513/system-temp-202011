
<template>
  <div>
    <z-header title="应届生汇报" class="mb15" />
    <tabel-header />
    <ts-calendar
      :current-day="value"
      day-title="日报"
      week-title="周报"
      month-title="月报"
      :week-action="weekActions"
      :month-action="monthActions"
      @refreshDay="refreshDay"
      @refreshWeek="refreshWeek"
      @refreshMonth="refreshMonth"
      @addDay="addReport"
      @viewDay="openDay"
      @clickWeekMenu="clickWeekMenu"
      @clickMonthMenu="clickMonthMenu"
      @sysInitDate="getSysInitDate"
    >
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
            {{ countMonthSave(month.item.month) }}
          </z-circle>
        </div>
      </template>
    </ts-calendar>
    <addReport ref="addDayReport" @planHelp="explain" @showPlan="showPlan" @ok="refreshDayReport" />
    <planDrawer ref="planDrawer" />
    <lock ref="lock" @showPlan="showPlan" />
  </div>

</template>

<script>
import TsCalendar from '../../components/tsforce/TsCalendar.vue'
import planDrawer from '../project/info/planDrawerv2.vue'
import addReport from './modules/addReport.vue'
import lock from './modules/lockReportv2'
import { getUserInfo } from '@/api/calendar'
import { queryListGroupDay, queryListGroupWeek, queryListGroupMonth } from '@/api/report'
import moment from 'moment'
import { mapState, mapGetters } from 'vuex'
import { parseTime } from '@/utils/filter'
// import TabelHeader from '../../components/tsforce/TableHeader.vue'
import TabelHeader from '@/components/headerTab'

export default {
    name: 'Myplan',
    components: {
        lock,
        addReport,
        planDrawer,
        TsCalendar,
        TabelHeader
    },
    data() {
        return {

            currentWeek: null,
            currentSeason: null,
            currentMonth: null,
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
        // 处理日历组件 数据显示
        countSave(day) {
            var dayint = parseInt(parseTime(day, '{d}'))
            const str = this.groupDay.filter(e => (e.DAY === dayint && e.year === this.currentYear && e.month === parseTime(day, '{m}')))[0]
            return str ? str.count : 0
        },
        countWeekSave(week) {
            const str = this.groupWeek.filter(e => (e.week === week + '' && e.year === this.currentYear))[0]

            return str ? str.count : 0
        },
        countMonthSave(month) {
            const str = this.groupMonth.filter(e => e.month === month + '' && e.year === this.currentYear + '')[0]

            return str ? str.count : 0
        },
        // 处理日历组件数据显示------------------end

        // 进入页面首先加载的内容
        getPageUserInfo() {
            this.value = new Date()
            console.log('当前用信息，注意是否为空：', this.userInfo)
            if (this.currentMonth == null) {
                this.currentMonth = parseTime(this.value, '{m}')
            }
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
                    var param2 = {
                        year: this.currentYear,
                        month: this.currentMonth,
                        userId: this.userInfo.id
                        // planUserId: this.userInfo.id // TODO 有问题
                    }
                    console.log('日报汇总参数------------------------------------------->', param2)
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

        refreshDayReport() {
            var param2 = {
                year: parseTime(this.value, '{y}'),
                month: parseTime(this.value, '{m}'),
                userId: this.userInfo.id
            }
            console.log('日报汇总', param2)
            queryListGroupDay(param2).then(res1 => {
                if (res1.success === true) {
                    console.log('日报汇总结果', res1)
                    this.groupDay = res1.result
                }
            })
        },

        // 处理当用户点击 日历的 自定义计划按钮是刷新日历数据
        refreshDay(data) {
            this.currentYear = data.currentYear
            this.currentMonth = data.currentMonth
            this.getCustomPlan()
        },
        // 获得自定义计划月汇总
        getCustomPlan() {
            var param2 = {
                year: this.currentYear,
                month: this.currentMonth,
                userId: this.userInfo.id
            }
            console.log('日报汇总', param2)
            queryListGroupDay(param2).then(res1 => {
                if (res1.success === true) {
                    console.log('日报汇总结果', res1)
                    this.groupDay = res1.result
                }
            })
        },
        // 用户点击周计划，刷新周计划季度汇总
        refreshWeek(data) {
            console.log('周计划--------- 点击----------------------------')
            this.currentYear = data.currentYear
            this.currentSeason = data.currentSeason
            this.getqueryListGroupWeek()
        },
        // 获得周计划汇总
        getqueryListGroupWeek() {
            console.log('周计划-------- --------------------------')
            // TODO 这才是错的
            var param2 = {
                year: this.currentYear,
                quarter: this.currentSeason,
                userId: this.userInfo.id
            }
            //  TODO 这才是对的，后端改正后返回
            // var param2 = {
            //     year: this.currentYear,
            //     quarter: this.currentSeason,
            //     planType: 1,
            //     planUserId: this.userInfo.id
            // }
            console.log('周报汇总参数', param2)
            queryListGroupWeek(param2).then(res1 => {
                if (res1.success === true) {
                    console.log('周报汇报结果 结果', res1)
                    this.groupWeek = res1.result
                }
            })
        },
        // 用户点击月计划按钮触发
        refreshMonth(data) {
            console.log('月报--------- 点击----------------------------')
            this.currentYear = data.currentYear
            this.getListGroupMonth()
        },
        // 获得月计划汇总
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
                userId: this.userInfo.id
            }

            console.log('月计划汇总cansghu', param2)
            queryListGroupMonth(param2).then(res1 => {
                if (res1.success === true) {
                    console.log('月计划汇总cansghu结果', res1)
                    this.groupMonth = res1.result
                }
            })
        },
        // 浏览周计划
        openWeek(data) {
            var param = {
                planType: 1,
                currentYear: data.currentYear,
                currentWeek: data.week,
                tsUserInfo: this.tsUserInfo
            }
            this.$refs.lock.show(param)
        },
        // 浏览月计划
        openMonth(data) {
            var param = {
                planType: 2,
                currentYear: data.currentYear,
                currentMonth: data.month,
                tsUserInfo: this.tsUserInfo
            }
            this.$refs.lock.show(param)
        },
        // 浏览自定义计划
        openDay(param) {
            var data = {
                reportType: 3,
                createDate: param.day,
                tsUserInfo: this.tsUserInfo
            }
            this.$refs.lock.show(data)
        },
        // 点击了周计划中的菜单按钮
        clickWeekMenu(data) {
            console.log('menu------------', data)
            data.item.currentYear = data.currentYear
            this.openWeek(data.item)
        },
        // 点击了月计划中的菜单按钮
        clickMonthMenu(data) {
            console.log('menu------------', data)
            // TODO 判断菜单类型 决定操作
            data.item.currentYear = data.currentYear
            this.openMonth(data.item)
        },
        // 新增自定义计划
        addReport(param, current) {
            console.log('增加日报', param, current)
            // this.$refs.addDayPlan.planType = '自定义计划'
            // this.$refs.addDayPlan.planTime = param

            const model = {
                reportType: 3,
                reportContent: '',
                year: current.currentYear,
                quarter: current.currentSeason,
                month: current.currentMonth,
                week: current.currentWeek,
                userId: this.userInfo.id,
                username: this.tsUserInfo.userName,
                realname: this.tsUserInfo.realName,
                areaId: this.tsUserInfo.areaId,
                areaName: this.tsUserInfo.areaName,
                departId: this.tsUserInfo.dept[0].deptId,
                departName: this.tsUserInfo.dept[0].deptName,
                groupId: this.tsUserInfo.dept[0].groupList[0].groupId,
                groupName: this.tsUserInfo.dept[0].groupList[0].groupName,
                status: '1',
                periodId: '1',
                periodName: '2020届', // TODO 替换选择
                reportDate: param

            }

            // this.$refs.addDayPlan.visible = true

            console.log('----------model', model)

            // Object.assign(this.$refs.addDayPlan.form, model)
            this.$refs.addDayReport.show(model)
        },
        // 自定义计划说明文档
        explain(e) {
            console.log('计划id', e)
            this.$refs.planDrawer.show({ planId: '1' })
        },
        showPlan(e) {
            console.log('计划id---------------666666666666666----', e)
            this.$refs.planDrawer.show({ plan: e })
        },
        getSysInitDate(e) {
            console.log('系统初始日期----------------', e)
            this.currentYear = e.currentYear
            this.currentSeason = e.currentSeason
            this.currentMonth = e.currentMonth
            this.currentWeek = e.currentWeek
            this.currentDay = e.currentDay
        }
    }
}
</script>
<style lang='scss'  scoped>
#calendar .el-button-group > .el-button:not(:first-child):not(:last-child):after {
  content: '当月';
}
</style>
