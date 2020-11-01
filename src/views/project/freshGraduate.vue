
<template>
  <div>
    <z-header title="自定义计划" class="mb15" />
    <tabel-header />
    <ts-calendar
      :current-day="value"
      day-title="自定义"
      week-title="周计划"
      month-title="月计划"
      :week-action="weekActions"
      :month-action="monthActions"
      @refreshDay="refreshDay"
      @refreshWeek="refreshWeek"
      @refreshMonth="refreshMonth"
      @addDay="addPlan"
      @viewDay="openDay"
      @clickWeekMenu="clickWeekMenu"
      @clickMonthMenu="clickMonthMenu"
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
    <add-plan-modal ref="addDayPlan" @ok="getCustomPlan" />
    <show-week-plan-modal ref="showWeekPlan" />
    <addPlanv2 ref="addDayPlanv2" @planHelp="explain" />
    <planDrawer ref="planDrawer" />
    <lock ref="lock" />
  </div>

</template>

<script>
import TsCalendar from '../../components/tsforce/TsCalendar.vue'
import addPlanv2 from './info/addPlanv2'
import planDrawer from './info/planDrawer'
import lock from './info/lockv2'
import showWeekPlanModal from './modules/showWeekPlanModal.vue'
import AddPlanModal from './modules/AddPlanModal.vue'
import { getUserInfo } from '@/api/calendar'
import { queryListGroupCustom, queryListGroupWeek, queryListGroupMonth } from '@/api/project'
import moment from 'moment'
import { mapState, mapGetters } from 'vuex'
import { parseTime } from '@/utils/filter'
// import TabelHeader from '../../components/tsforce/TableHeader.vue'
import TabelHeader from '@/components/headerTab'

export default {
    name: 'Myplan',
    components: {
        lock,
        addPlanv2,
        planDrawer,
        TsCalendar,
        AddPlanModal,
        showWeekPlanModal,
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

            },
            groupDay: [],
            groupWeek: [],
            groupMonth: [],
            weekActions: [
                // { action: 'add',
                //     lable: '新增'
                // },
                { action: 'view',
                    lable: '查看'
                }
            ],
            monthActions: [
                // { action: 'add',
                //     lable: '新增'
                // },
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
        // 处理日历组件数据显示------------------end

        // 进入页面首先加载的内容
        getPageUserInfo() {
            this.value = new Date()
            console.log('当前用信息，注意是否为空：', this.userInfo)
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

        // 处理当用户点击 日历的 自定义计划按钮是刷新日历数据
        refreshDay(data) {
            console.log('自定义计划--------- 点击----------------------------')
            this.currentYear = data.currentYear
            this.currentMonth = data.currentMonth
            this.getCustomPlan()
        },
        // 获得自定义计划月汇总
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
            console.log('周计划汇总参数', param2)
            queryListGroupWeek(param2).then(res1 => {
                if (res1.success === true) {
                    console.log('周计划汇总cansghu 结果', res1)
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
                planType: 3,
                planTime: param.day,
                currentYear: this.currentYear,
                currentMonth: this.currentMonth,
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
        addPlan(param) {
            console.log('增加计划', param)
            // this.$refs.addDayPlan.planType = '自定义计划'
            // this.$refs.addDayPlan.planTime = param
            const model = {
                planType: 3,
                createType: 2,
                year: this.currentYear,
                month: this.currentMonth,
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
            // this.$refs.addDayPlan.visible = true

            console.log('----------model', model)

            // Object.assign(this.$refs.addDayPlan.form, model)
            this.$refs.addDayPlanv2.show(model)
        },
        // 自定义计划说明文档
        explain() {
            this.$refs.planDrawer.show({ title: '自定义计划' })
        }
    }
}
</script>
<style lang='scss'  scoped>
#calendar .el-button-group > .el-button:not(:first-child):not(:last-child):after {
  content: '当月';
}
</style>
