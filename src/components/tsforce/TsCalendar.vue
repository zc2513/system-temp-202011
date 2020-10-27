
<template>
  <div>
    <el-card>
      <slot name="header">
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
      </slot>
    </el-card>
    <el-card>
      <el-row>
        <el-col :span="10">
          <el-radio-group v-model="tabPosition" style="margin-bottom: 30px" @change="changePlanType">
            <el-radio-button label="self">{{ dayTitle }}</el-radio-button>
            <el-radio-button label="week">{{ weekTitle }}</el-radio-button>
            <el-radio-button label="month">{{ monthTitle }}</el-radio-button>
          </el-radio-group>
        </el-col>
        <el-col :span="6">
          <el-button style="margin-right: 10px" @click="pre"><</el-button>
          <span v-if="tabPosition === 'self'" style="width: 80px">{{ currentMonth.monthString }}</span>
          <span v-if="tabPosition === 'week'" style="width: 80px">{{ currentSeason.seasonString }}</span>
          <span v-if="tabPosition === 'month'" style="width: 80px">{{ currentYear.yearString }}</span>
          <el-button style="margin-left: 10px" @click="next">></el-button>
          <el-button style="margin-left: 10px" @click="reset">重置1</el-button>
        </el-col>
      </el-row>

      <el-card v-if="tabPosition === 'self'">
        <el-calendar id="calendar" v-model="value">
          <template slot="dateCell" slot-scope="{ date, data }">
            <div @click="clickDay" @mouseover="mouseover">
              <el-row>
                <span>{{ data.day.split('-')[2] }} </span>
              </el-row>
            </div>
          </template>
          <slot name="tsdateCell" /></el-calendar>
      </el-card>
      <el-card v-if="tabPosition === 'week'">
        <div>
          <el-row>
            <el-col v-for="(item, index) in weekOneSeason" :key="index" :span="6">
              <!-- <svg-icon icon-class="yewan" /> -->
              <div @click="open(item)" @mouseover="mouseover(item)">
                <el-row style="margin: 15px">
                  <span style="color: red; font-size: 24px">第{{ item.week }}周</span>
                  <span style="color: black"> {{ item.start }} ~ {{ item.end }} </span>
                </el-row>
                <slot name="content" :week="{ 'week':item}" />
              </div>
            </el-col>
          </el-row>
        </div>
      </el-card>
      <el-card v-if="tabPosition === 'month'">
        <year-calendar
          v-model="value"
          :months="months"
          :current-year="currentYear"
          :current-month="currentMonth.month"
          @open="openMonth"
        />
      </el-card>
    </el-card>
  </div>
</template>

<script>
import YearCalendar from '../../components/tsforce/YearCalendar.vue'
import { getCalendarInfo } from '@/api/calendar'
import moment from 'moment'
import { mapState } from 'vuex'
import { parseTime } from '@/utils/filter'
export default {
    name: 'Myplan',
    components: {
        YearCalendar
    },
    props: {
        dayTitle: {
            type: String,
            required: true,
            default: '日报'
        },
        weekTitle: {
            type: String,
            required: true,
            default: '周报'
        },
        monthTitle: {
            type: String,
            required: true,
            default: '月报'
        },
        currentDay: {
            type: Date,
            required: true,
            default: new Date()
        }
    },
    data() {
        return {
            tabPosition: 'self',
            value: new Date(),
            menuVisible: true,
            currentDate: null,
            customPlan: [],
            seasonMonth: ['1月-3月', '4月-6月', '7月-9月', '10月-12月'],
            currentWeek: null,
            currentSeason: null,
            currentMonth: {},
            currentYear: null,
            tsUserInfo: null,
            seasonNo: null,
            weekNo: null,
            weekOneSeason: null,
            weeks: [
                { season: 1, weekPlan: [] },
                { season: 2, weekPlan: [] },
                { season: 3, weekPlan: [] },
                { season: 4, weekPlan: [] }
            ]
        }
    },
    computed: {
        ...mapState('user', ['token', 'userInfo'])
    },
    created() {
        console.log('0000000000000000', this.userInfo)
        this.currentDate = this.currentDay
        this.init()
    },

    methods: {
        moment,
        calanderChange(type) {
            switch (type) {
                case 'self':
                    this.$emit('refreshDay', this.currentDay)
                    break
                case 'week':
                    this.$emit('refreshWeek', this.currentWeek, this.currentSeason)
                    break
                case 'month':
                    this.$emit('refreshMonth', this.currentMonth, this.currentYear)
                    break
                default: ''
            }
        },
        reset() {
            this.currentDate = new Date()
            this.getCalander(this.currentDay)
            this.calanderChange(this.tabPosition)
        },
        initDate() {
            console.log('fuck')
            this.currentMonth = {
                month: parseInt(moment(this.currentDay).format('MM')),
                monthString: moment(this.currentDay).format('yyyy年MM月')
            }
            this.currentYear = {
                year: moment(this.currentDay).format('yyyy'),
                yearString: moment(this.currentDay).format('yyyy年')
            }
            this.currentSeason = {
                seasonNo: this.seasonNo,
                seasonString: moment(this.currentDay).format('yyyy年') + this.seasonMonth[this.seasonNo - 1]
            }
            console.log('当前季度', this.currentSeason)
            this.currentWeek = this.weekNo
            this.currentMonth = {
                month: parseInt(moment(this.currentDay).format('MM')),
                monthString: moment(this.currentDay).format('yyyy年MM月')
            }
        },
        init() {
            this.getCalander(this.value)
        },
        getCalander(data) {
            this.currentDate = this.value
            this.currentYear = {
                year: parseTime(this.currentDate, '{y}'),
                yearString: parseTime(this.currentDate, '{y}年')
            }
            var params2 = { 'dateStr': moment(data).format('YYYY-MM-DD hh:mm:ss') }
            console.log('查询新日历 日历函数 开始进入日期控件', params2)
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
                                val.start.split('-')[1] === 1 + '' ||
                val.start.split('-')[1] === 2 + '' ||
                val.start.split('-')[1] === 3 + '' ||
                val.end.split('-')[1] === 1 + '' ||
                val.end.split('-')[1] === 2 + '' ||
                val.end.split('-')[1] === 3 + ''
                            )
                        })
                        this.weeks[1].weekPlan = weeks1.filter(val => {
                            return (
                                val.start.split('-')[1] === 4 + '' ||
                val.start.split('-')[1] === 5 + '' ||
                val.start.split('-')[1] === 6 + '' ||
                val.end.split('-')[1] === 4 + '' ||
                val.end.split('-')[1] === 5 + '' ||
                val.end.split('-')[1] === 6 + ''
                            )
                        })
                        this.weeks[2].weekPlan = weeks1.filter(val => {
                            return (
                                val.start.split('-')[1] === 7 + '' ||
                val.start.split('-')[1] === 8 + '' ||
                val.start.split('-')[1] === 9 + '' ||
                val.end.split('-')[1] === 7 + '' ||
                val.end.split('-')[1] === 9 + '' ||
                val.end.split('-')[1] === 9 + ''
                            )
                        })
                        this.weeks[3].weekPlan = weeks1.filter(val => {
                            return (
                                (val.start.split('-')[1] === 10 + '' ||
                  val.start.split('-')[1] === 11 + '' ||
                  val.start.split('-')[1] === 12 + '' ||
                  val.end.split('-')[1] === 10 + '' ||
                  val.end.split('-')[1] === 11 + '' ||
                  val.end.split('-')[1] === 12 + '') &&
                val.end.split('-')[0] === this.currentYear.year &&
                val.start.split('-')[0] === this.currentYear.year
                            )
                        })
                        console.log('按季度分周', this.weeks, this.currentYear)

                        this.seasonNo = res.result.newSeason
                        this.initDate()
                        this.weekOneSeason = this.weeks[this.seasonNo - 1].weekPlan
                        console.log('按季度分周', this.weekOneSeason, this.weeks, this.currentYear.year)
                    } else {
                        this.$message.error({ title: '查询失败', content: res.message })
                    }
                })
                .finally(() => {})
        },

        changePlanType(e) {
            this.calanderChange(e)
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
                    this.currentYear.yearString = this.currentYear.year + '年'
                    this.currentSeason.seasonNo = 4
                    this.currentSeason.seasonString = this.currentYear.yearString + '10月-12月'
                }
                this.currentMonth.monthString = this.currentYear.yearString + this.currentMonth.month + '月'
                var newSeason = Math.ceil(this.currentMonth.month / 3)
                this.currentSeason.seasonNo = newSeason
                this.currentSeason.seasonString = this.currentYear.yearString + this.seasonMonth[newSeason - 1]

                this.value = moment(this.currentYear.year + '-' + this.currentMonth.month + '-' + '01', 'YYYY-MM-DD').format()
            } else if (this.tabPosition === 'week') {
                if (this.currentSeason.seasonNo > 1) {
                    this.currentSeason.seasonNo--
                    this.currentSeason.seasonString = this.currentYear.yearString + this.seasonMonth[this.currentSeason.seasonNo - 1]
                } else {
                    this.currentSeason.seasonNo = 4

                    this.currentYear.year--
                    this.currentYear.yearString = this.currentYear.year + '年'
                    this.currentSeason.seasonString = this.currentYear.yearString + this.seasonMonth[this.currentSeason.seasonNo - 1]
                }
                this.currentMonth.month = this.weeks[this.currentSeason.seasonNo - 1].weekPlan[0].end.split('-')[1]
                this.currentMonth.monthString = this.currentYear.yearString + this.currentMonth.month + '月'
                this.value = moment(this.currentYear.year + '-' + this.currentMonth.month + '-' + '01', 'YYYY-MM-DD').format()
                this.getCalander(this.value)
            } else if (this.tabPosition === 'month') {
                this.currentSeason.seasonNo = 4
                this.currentYear.year--
                this.currentYear.yearString = this.currentYear.year + '年'
                this.currentSeason.seasonString = this.currentYear.yearString + this.seasonMonth[this.currentSeason.seasonNo - 1]
                this.currentMonth.month = parseInt(this.weeks[this.currentSeason.seasonNo - 1].weekPlan[0].end.split('-')[1])
                this.currentMonth.monthString = this.currentYear.yearString + this.currentMonth.month + '月'
                this.value = moment(this.currentYear.year + '-' + this.currentMonth.month + '-' + '01', 'YYYY-MM-DD').format()
                this.getCalander(this.value)
            }
            this.getCalander(this.value)
            this.calanderChange(this.tabPosition)
        },
        next() {
            if (this.tabPosition === 'self') {
                if (this.currentMonth.month < 12) {
                    this.currentMonth.month++
                } else {
                    this.currentMonth.month = 1
                    this.currentYear.year++
                    this.currentYear.yearString = this.currentYear.year + '年'
                }
                this.currentMonth.monthString = this.currentYear.yearString + this.currentMonth.month + '月'
                var newSeason = Math.ceil(this.currentMonth.month / 3)
                console.log('新的季度计算结果----------', newSeason, this.seasonMonth[newSeason - 1])
                this.currentSeason.seasonNo = newSeason
                this.currentSeason.seasonString = this.currentYear.yearString + this.seasonMonth[newSeason - 1]
                this.value = moment(this.currentYear.year + '-' + this.currentMonth.month + '-' + '01', 'YYYY-MM-DD').format()
            } else if (this.tabPosition === 'week') {
                if (this.currentSeason.seasonNo < 4) {
                    this.currentSeason.seasonNo++
                    this.currentSeason.seasonString = this.currentYear.yearString + this.seasonMonth[this.currentSeason.seasonNo - 1]
                } else {
                    this.currentSeason.seasonNo = 1

                    this.currentYear.year++
                    this.currentYear.yearString = this.currentYear.year + '年'
                    this.currentSeason.seasonString = this.currentYear.yearString + this.seasonMonth[this.currentSeason.seasonNo - 1]
                }
                this.currentMonth.month = this.weeks[this.currentSeason.seasonNo - 1].weekPlan[0].end.split('-')[1]
                this.currentMonth.monthString = this.currentYear.yearString + this.currentMonth.month + '月'
                this.value = moment(this.currentYear.year + '-' + this.currentMonth.month + '-' + '01', 'YYYY-MM-DD').format()
            } else if (this.tabPosition === 'month') {
                this.currentSeason.seasonNo = 1
                this.currentYear.year++
                this.currentYear.yearString = this.currentYear.year + '年'
                this.currentSeason.seasonString = this.currentYear.yearString + this.seasonMonth[this.currentSeason.seasonNo - 1]
                this.currentMonth.month = parseInt(this.weeks[this.currentSeason.seasonNo - 1].weekPlan[0].end.split('-')[1])
                this.currentMonth.monthString = this.currentYear.yearString + this.currentMonth.month + '月'
                this.value = moment(this.currentYear.year + '-' + this.currentMonth.month + '-' + '01', 'YYYY-MM-DD').format()
            }
            this.getCalander(this.value)
            this.calanderChange(this.tabPosition)
        },
        openWeek(data) {
            console.log('data---- 周--------------', data)
        },
        openMonth(data) {
            console.log('data---------------------月-----------------', data)
        },
        openDay(param) {
            console.log('data------------日-------------------------0000000------------', this.tsUserInfo)
        }
    }

}
</script>
<style lang='scss'  scoped>
#calendar .el-button-group > .el-button:not(:first-child):not(:last-child):after {
  content: '当月';
}
</style>
