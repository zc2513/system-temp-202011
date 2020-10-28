
<template>
  <div>
    <el-card>
      <el-row>
        <el-col :span="2">
          <img src="@/assets/planicon.png">
        </el-col>
        <el-col :span="18">
          <el-row style="margin:20px">
            <span>标注说明</span>
          </el-row>
          <el-row style="margin:20px">
            <el-col :span="2">
              <span>已提交</span>
            </el-col>
            <el-col :span="2">
              <span>未提交</span>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-card>
    <el-card>
      <el-row>
        <el-col :span="10">
          <el-radio-group v-model="tabPosition" style="margin-bottom: 30px" @change="changePlanType">
            <el-radio-button label="self">自定义</el-radio-button>
            <el-radio-button label="week">周计划</el-radio-button>
            <el-radio-button label="month">月计划</el-radio-button>
          </el-radio-group>
        </el-col>
        <el-col :span="6">
          <el-button style="margin-right: 10px" @click="pre"><</el-button>
          <span v-if="tabPosition === 'self'" style="width: 80px">{{ currentMonth.monthString }}</span>
          <span v-if="tabPosition === 'week'" style="width: 80px">{{ currentSeason.seasonString }}</span>
          <span v-if="tabPosition === 'month'" style="width: 80px">{{ currentYear.desc }}</span>
          <el-button style="margin-left: 10px" @click="next">></el-button>
          <el-button style="margin-left: 10px" @click="reset">重置</el-button>
        </el-col>
      </el-row>

      <el-card v-if="tabPosition === 'self'">
        <el-calendar id="calendar" v-model="value">
          <template slot="dateCell" slot-scope="{ date, data }">
            <div @click="clickDay" @mouseover="mouseover">
              <el-row>
                <span>{{ data.day.split('-')[2] }}</span>
              </el-row>
              <el-row v-if="currentMonth.month == data.day.split('-')[1] && currentYear.year == data.day.split('-')[0]">
                <span>{{ customPlan[data.day.split('-')[2] - 1] }}</span>
              </el-row>
              <el-row>
                <el-col :span="4" :offset="20">
                  <el-dropdown @command="addPlan">
                    <span class="el-dropdown-link">. . .</span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item icon="el-icon-plus" :command="'new,' + data.day">新建</el-dropdown-item>
                      <el-dropdown-item icon="el-icon-tickets" :command="'view,' + data.day">详情</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </el-col>
              </el-row>
            </div>

            <!-- <p :class="data.isSelected ? 'is-selected' : ''">
              {{ data.day.split('-').slice(1).join('-') }} {{ data.isSelected ? '✔️' : '' }}

            </p>-->
          </template>
        </el-calendar>
      </el-card>
      <el-card v-if="tabPosition === 'week'">
        <week-calendar
          v-model="value"
          :week-plan="weekPlan"
          :season="currentSeason"
          :current-week="currentWeek + ''"
          @open="openWeek"
        />
      </el-card>
      <el-card v-if="tabPosition === 'month'">
        <year-calendar
          v-model="value"
          :month-plan="monthPlan"
          :current-year="currentYear"
          :current-month="currentMonth.month"
          @open="openMonth"
        />
      </el-card>
    </el-card>
    <show-week-plan-modal ref="showWeekPlan" />
    <add-plan-modal ref="addDayPlan" />
  </div>
</template>

<script>
import WeekCalendar from '../../components/tsforce/WeekCalendar.vue'
import YearCalendar from '../../components/tsforce/YearCalendar.vue'
import showWeekPlanModal from './modules/showWeekPlanModal.vue'
import AddPlanModal from './modules/AddPlanModal.vue'
import { getUserInfo, getCalendarInfo, getSelfCutomPlan, getWeekPlanGroup, getMonthPlanGroup } from '@/api/project'
import moment from 'moment'
import { mapState, mapGetters } from 'vuex'
export default {
    name: 'Myplan',
    components: {
        WeekCalendar,
        YearCalendar,
        showWeekPlanModal,
        AddPlanModal
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
            this.getCalander(params2)
            // getCalendarInfo(params2).then(res => {
            //     if (res.success) {
            //         console.log('返回的日历数据', res)
            //         this.currentDay = res.result.date

            //         const weeks1 = res.result.weeks
            //         // .forEach((val)=>{
            //         //          val.count =0;
            //         // })
            //         this.weeks[0].weekPlan = weeks1.filter(val => {
            //             return (
            //                 val.start.split('-')[1] === 1 ||
            //                 val.start.split('-')[1] === 2 ||
            //     val.start.split('-')[1] === 3 ||
            //     val.end.split('-')[1] === 1 ||
            //     val.end.split('-')[1] === 2 ||
            //     val.end.split('-')[1] === 3
            //             )
            //         })
            //         this.weeks[1].weekPlan = weeks1.filter(val => {
            //             return (
            //                 val.start.split('-')[1] === 4 ||
            //     val.start.split('-')[1] === 5 ||
            //     val.start.split('-')[1] === 6 ||
            //     val.end.split('-')[1] === 4 ||
            //     val.end.split('-')[1] === 5 ||
            //     val.end.split('-')[1] === 6
            //             )
            //         })
            //         this.weeks[2].weekPlan = weeks1.filter(val => {
            //             return (
            //                 val.start.split('-')[1] === 7 ||
            //     val.start.split('-')[1] === 8 ||
            //     val.start.split('-')[1] === 9 ||
            //     val.end.split('-')[1] === 7 ||
            //     val.end.split('-')[1] === 9 ||
            //     val.end.split('-')[1] === 9
            //             )
            //         })
            //         this.weeks[3].weekPlan = weeks1.filter(val => {
            //             return (
            //                 (val.start.split('-')[1] === 10 ||
            //       val.start.split('-')[1] === 11 ||
            //       val.start.split('-')[1] === 12 ||
            //       val.end.split('-')[1] === 10 ||
            //       val.end.split('-')[1] === 11 ||
            //       val.end.split('-')[1] === 12) &&
            //     val.end.split('-')[0] === this.currentYear.year &&
            //     val.start.split('-')[0] === this.currentYear.year
            //             )
            //         })

            //         this.seasonNo = res.result.newSeason
            //         this.weekNo = res.result.newWeek

            //         this.getCustomPlan()
            //     } else {
            //         console.log('res----------------------------000000000000', res)
            //         this.$message.error({ title: '查询失败', content: res.message })
            //     }
            // })

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

        getCalander(data) {
            var params2 = { 'dateStr': moment(data).format('YYYY-MM-DD hh:mm:ss') }
            console.log('查询新日历 日历函数', params2)
            getCalendarInfo(params2)
                .then(res => {
                    if (res.success) {
                        const weeks1 = res.result.weeks
                        console.log('查询新日历结果', weeks1)
                        // .forEach((val)=>{
                        //          val.count =0;
                        // })
                        this.weeks[0].weekPlan = weeks1.filter(val => {
                            return (
                                val.start.split('-')[1] === 1 ||
                val.start.split('-')[1] === 2 ||
                val.start.split('-')[1] === 3 ||
                val.end.split('-')[1] === 1 ||
                val.end.split('-')[1] === 2 ||
                val.end.split('-')[1] === 3
                            )
                        })
                        this.weeks[1].weekPlan = weeks1.filter(val => {
                            return (
                                val.start.split('-')[1] === 4 ||
                val.start.split('-')[1] === 5 ||
                val.start.split('-')[1] === 6 ||
                val.end.split('-')[1] === 4 ||
                val.end.split('-')[1] === 5 ||
                val.end.split('-')[1] === 6
                            )
                        })
                        this.weeks[2].weekPlan = weeks1.filter(val => {
                            return (
                                val.start.split('-')[1] === 7 ||
                val.start.split('-')[1] === 8 ||
                val.start.split('-')[1] === 9 ||
                val.end.split('-')[1] === 7 ||
                val.end.split('-')[1] === 9 ||
                val.end.split('-')[1] === 9
                            )
                        })
                        this.weeks[3].weekPlan = weeks1.filter(val => {
                            return (
                                (val.start.split('-')[1] === 10 ||
                  val.start.split('-')[1] === 11 ||
                  val.start.split('-')[1] === 12 ||
                  val.end.split('-')[1] === 10 ||
                  val.end.split('-')[1] === 11 ||
                  val.end.split('-')[1] === 12) &&
                val.end.split('-')[0] === this.currentYear.year &&
                val.start.split('-')[0] === this.currentYear.year
                            )
                        })
                    } else {
                        this.$message.error({ title: '查询失败', content: res.message })
                    }
                })
                .finally(() => {})
        },

        getCustomPlan() {
            var params = {} // 查询条件
            params.planType = 3
            params.createType = 2
            params.planUserId = this.userInfo.userId
            params.year = this.currentYear.year
            params.month = this.currentMonth.month

            this.fetching = true

            getSelfCutomPlan(params).then(res => {
                if (res.success) {
                    // if (res.result.records.lenght > 0) {
                    // const data = res.result.records.map((element) => ({
                    //   text: element.carno,
                    //   value: element.carno,
                    // }))
                    this.customPlan = res.result
                    console.log('res--------customPlan--------', this.customPlan)
                    // }
                }
                if (res.code === 510) {
                    this.$message.warning(res.message)
                }
                this.fetching = false
            })
        },

        getWeekPlan() {
            console.log('res---周计划-------------------------------------------------------------------')
            // 加载数据 若传入参数1则加载第一页的内容
            var params = {} // 查询条件

            params.planUserId = this.tsUserInfo.userId
            params.year = this.currentYear.year
            params.planType = 1
            params.quarter = this.currentSeason.seasonNo
            this.fetching = true

            getWeekPlanGroup(params).then(res => {
                if (res.success) {
                    // if (res.result.records.lenght > 0) {
                    // const data = res.result.records.map((element) => ({
                    //   text: element.carno,
                    //   value: element.carno,
                    // }))
                    var weekPlan = res.result
                    console.log('周计划查询结果', weekPlan)
                    console.log('新的周计划统计', this.weeks, this.weeks[this.currentSeason.seasonNo - 1].weekPlan)
                    this.weeks[this.currentSeason.seasonNo - 1].weekPlan.forEach(element => {
                        if (weekPlan.length > 0) {
                            for (var i = 0; i < weekPlan.length; i++) {
                                const weekint = parseInt(weekPlan[i].week)
                                if (element.week === weekint) {
                                    element.count = weekPlan[i].count
                                    break
                                } else {
                                    if (element.count === null) {
                                        element.count = 0
                                    }
                                }
                            }
                        } else {
                            element.count = 0
                        }
                    })
                    this.weekPlan = this.weeks[this.currentSeason.seasonNo - 1].weekPlan

                    // }
                }
                if (res.code === 510) {
                    this.$message.warning(res.message)
                }
                this.fetching = false
            })
        },
        getMonthPlan() {
            var params = {} // 查询条件

            params.planUserId = this.tsUserInfo.userId
            params.year = this.currentYear.year
            params.planType = 2

            this.fetching = true
            console.log('0-------月计划汇总- 参数-------', params)
            getMonthPlanGroup(params).then(res => {
                console.log('res---月计划结果--------', res)
                if (res.success) {
                    if (res.result.length > 0) {
                        res.result.forEach(val => {
                            this.monthPlan[parseInt(val.month) - 1].count = val.count
                        })
                    }
                    console.log('res--------月计划汇总结果--------', this.monthPlan)
                }
                if (res.code === 510) {
                    this.$message.warning(res.message)
                }
                this.fetching = false
            })
        },

        changePlanType(e) {
            console.log(e, this.tabPosition)
            if (e === 'self') {
                this.getCustomPlan()
            }
            if (e === 'week') {
                this.getWeekPlan()
            }
            if (e === 'month') {
                this.getMonthPlan()
            }
        },

        mouseover(e) {
            //  console.log('日计划--------------移动-----------------------', e)
        },
        clickDay(e) {
            // console.log('日计划--------- 点击----------------------------', e)
        },
        pre() {
            if (this.tabPosition === 'self') {
                if (this.currentMonth.month > 1) {
                    this.currentMonth.month--
                } else {
                    this.currentMonth.month = 12

                    this.currentYear.year--
                    this.currentYear.desc = this.currentYear.year + '年'
                    this.currentSeason.seasonNo = 4
                    this.currentSeason.seasonString = this.currentYear.desc + '10月-12月'
                }
                this.currentMonth.monthString = this.currentYear.desc + this.currentMonth.month + '月'
                var newSeason = Math.ceil(this.currentMonth.month / 3)
                this.currentSeason.seasonNo = newSeason
                this.currentSeason.seasonString = this.currentYear.desc + this.seasonMonth[newSeason - 1]

                this.value = moment(this.currentYear.year + '-' + this.currentMonth.month + '-' + '01', 'YYYY-MM-DD').format()

                this.getCalander(this.value)
                this.getCustomPlan()
            } else if (this.tabPosition === 'week') {
                if (this.currentSeason.seasonNo > 1) {
                    this.currentSeason.seasonNo--
                    this.currentSeason.seasonString = this.currentYear.desc + this.seasonMonth[this.currentSeason.seasonNo - 1]
                } else {
                    this.currentSeason.seasonNo = 4

                    this.currentYear.year--
                    this.currentYear.desc = this.currentYear.year + '年'
                    this.currentSeason.seasonString = this.currentYear.desc + this.seasonMonth[this.currentSeason.seasonNo - 1]
                }
                this.currentMonth.month = this.weeks[this.currentSeason.seasonNo - 1].weekPlan[0].end.split('-')[1]
                this.currentMonth.monthString = this.currentYear.desc + this.currentMonth.month + '月'
                this.value = moment(this.currentYear.year + '-' + this.currentMonth.month + '-' + '01', 'YYYY-MM-DD').format()
                this.getCalander(this.value)
                this.getWeekPlan()
            } else if (this.tabPosition === 'month') {
                this.currentSeason.seasonNo = 4
                this.currentYear.year--
                this.currentYear.desc = this.currentYear.year + '年'
                this.currentSeason.seasonString = this.currentYear.desc + this.seasonMonth[this.currentSeason.seasonNo - 1]
                this.currentMonth.month = parseInt(this.weeks[this.currentSeason.seasonNo - 1].weekPlan[0].end.split('-')[1])
                this.currentMonth.monthString = this.currentYear.desc + this.currentMonth.month + '月'
                this.value = moment(this.currentYear.year + '-' + this.currentMonth.month + '-' + '01', 'YYYY-MM-DD').format()
                this.getCalander(this.value)
                this.getMonthPlan()
            }
        },
        next() {
            if (this.tabPosition === 'self') {
                if (this.currentMonth.month < 12) {
                    this.currentMonth.month++
                } else {
                    this.currentMonth.month = 1
                    this.currentYear.year++
                    this.currentYear.desc = this.currentYear.year + '年'
                }
                this.currentMonth.monthString = this.currentYear.desc + this.currentMonth.month + '月'
                var newSeason = Math.ceil(this.currentMonth.month / 3)
                console.log('新的季度计算结果----------', newSeason, this.seasonMonth[newSeason - 1])
                this.currentSeason.seasonNo = newSeason
                this.currentSeason.seasonString = this.currentYear.desc + this.seasonMonth[newSeason - 1]
                this.value = moment(this.currentYear.year + '-' + this.currentMonth.month + '-' + '01', 'YYYY-MM-DD').format()
                this.getCalander(this.value)
                this.getCustomPlan()
            } else if (this.tabPosition === 'week') {
                if (this.currentSeason.seasonNo < 4) {
                    this.currentSeason.seasonNo++
                    this.currentSeason.seasonString = this.currentYear.desc + this.seasonMonth[this.currentSeason.seasonNo - 1]
                } else {
                    this.currentSeason.seasonNo = 1

                    this.currentYear.year++
                    this.currentYear.desc = this.currentYear.year + '年'
                    this.currentSeason.seasonString = this.currentYear.desc + this.seasonMonth[this.currentSeason.seasonNo - 1]
                }
                this.currentMonth.month = this.weeks[this.currentSeason.seasonNo - 1].weekPlan[0].end.split('-')[1]
                this.currentMonth.monthString = this.currentYear.desc + this.currentMonth.month + '月'
                this.value = moment(this.currentYear.year + '-' + this.currentMonth.month + '-' + '01', 'YYYY-MM-DD').format()
                this.getCalander(this.value)
                this.getWeekPlan()
            } else if (this.tabPosition === 'month') {
                this.currentSeason.seasonNo = 1
                this.currentYear.year++
                this.currentYear.desc = this.currentYear.year + '年'
                this.currentSeason.seasonString = this.currentYear.desc + this.seasonMonth[this.currentSeason.seasonNo - 1]
                this.currentMonth.month = parseInt(this.weeks[this.currentSeason.seasonNo - 1].weekPlan[0].end.split('-')[1])
                this.currentMonth.monthString = this.currentYear.desc + this.currentMonth.month + '月'
                this.value = moment(this.currentYear.year + '-' + this.currentMonth.month + '-' + '01', 'YYYY-MM-DD').format()
                this.getCalander(this.value)
                this.getMonthPlan()
            }
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
