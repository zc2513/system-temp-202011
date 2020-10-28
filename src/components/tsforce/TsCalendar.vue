
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
              <el-col :span="4">
                <el-row>
                  <el-col :span="4">  <z-circle size="20" color="#A2F07B" /></el-col>
                  <el-col :span="10"><span>已提交</span></el-col>
                </el-row>
              </el-col>
              <el-col :span="4">
                <el-row>
                  <el-col :span="4">  <z-circle size="20" color="#FF785F" /></el-col>
                  <el-col :span="10"><span>未提交</span></el-col>
                </el-row>
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
          <el-row>
            <el-col :span="4">
              <el-button @click="pre"><</el-button>
            </el-col>
            <el-col style="margin-top:6px" :span="12">
              <span v-if="tabPosition === 'self'" style="width: 200px">{{ currentYear }} 年 {{ currentMonth }} 月</span>
              <span v-if="tabPosition === 'week'" style="width: 200px">{{ currentYear }} 年 {{ seasonMonth[currentSeason -1] }}</span>
              <span v-if="tabPosition === 'month'" style="width: 200px">{{ currentYear }} 年</span>
            </el-col>
            <el-col :span="4">
              <el-button @click="next">></el-button>
            </el-col>
            <el-col :span="4">

              <el-button v-if="tabPosition === 'self'" style="width: 80px" @click="reset">今天</el-button>
              <el-button v-if="tabPosition === 'week'" style="width: 80px" @click="reset">本周</el-button>
              <el-button v-if="tabPosition === 'month'" style="width: 80px" @click="reset">本月</el-button>
            </el-col>

          </el-row>

        </el-col>
      </el-row>

      <el-card v-if="tabPosition === 'self'">
        <el-calendar id="calendar" v-model="value" class="calendar-box">
          <template slot="dateCell" slot-scope="{ date, data }">
            <div :class="data.isSelected ? 'is-selected' : ''" class="fl-y-sb date-celc" style="height:100%;">
              <div class="top">{{ data.day.split('-')[2] }}</div>
              <slot name="tsdateCell" :data="{date,data}" />

              <div class="date-mode fl-y-sb" @click.stop="e=>e">
                <div class="flc-y">
                  <span @click.stop="add(data.day.split('-')[2])">新增</span>
                </div>
                <div class="flc-y">
                  <span @click.stop="lock(data.day.split('-')[2])">查看</span>
                </div>
              </div>
            </div>

          </template>
        </el-calendar>
      </el-card>
      <el-card v-if="tabPosition === 'week'">
        <div>
          <el-row>
            <el-col v-for="(item, index) in weekOneSeason" :key="index" :span="6">
              <!-- <svg-icon icon-class="yewan" /> -->
              <div class="calendar-box" style="height:100px">
                <el-row style="margin: 15px">
                  <span style="color: red; font-size: 24px">第{{ item.week }}周</span>
                  <span style="color: black"> {{ item.start }} ~ {{ item.end }} </span>
                </el-row>
                <slot name="weekContent" :week="{ item}" />
                <div class="date-mode fl-y-sb" @click.stop="e=>e">
                  <div class="flc-y">
                    <span @click.stop="addWeek(item)">新增</span>
                  </div>
                  <div class="flc-y">
                    <span @click.stop="viewWeek(item)">查看</span>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-card>
      <el-card v-if="tabPosition === 'month'">
        <div>
          <el-row>
            <el-col v-for="(item, index) in months" :key="index" :span="8">
              <!-- <svg-icon icon-class="yewan" /> -->
              <div>
                <el-row style="margin: 15px">
                  <span style="color: red; font-size: 24px">{{ item.month }}月</span>
                  <span style="color: black"> {{ item.start }} ~ {{ item.end }} </span>
                </el-row>
                <slot name="monthContent" :month="{ item }" />
                <div class="date-mode fl-y-sb" @click.stop="e=>e">
                  <div class="flc-y">
                    <span @click.stop="addWeek(item)">新增</span>
                  </div>
                  <div class="flc-y">
                    <span @click.stop="viewWeek(item)">查看</span>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-card>
    </el-card>
  </div>
</template>

<script>
import { getCalendarInfo } from '@/api/calendar'
import moment from 'moment'
import { mapState } from 'vuex'
import { parseTime } from '@/utils/filter'
export default {
    name: 'Myplan',
    components: {
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
            ],
            months: null,
            arr: [
                { day: 27, count: 5 },
                { day: 2, count: 2 },
                { day: 5, count: 0 }
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
        countSave(day) {
            const str = this.arr.filter(e => e.day === Number(day))[0]
            return str ? str.count : 0
        },
        add(val) {
            console.log(val)
        },
        lock(val) {
            console.log(val)
        },
        calanderChange(type) {
            switch (type) {
                case 'self':
                    this.$emit('refreshDay', { 'currentYear': this.currentYear, 'currentMonth': this.currentMonth })
                    break
                case 'week':
                    this.$emit('refreshWeek', { 'currentYear': this.currentYear, 'currentSeason': this.currentSeason })
                    break
                case 'month':
                    this.$emit('refreshMonth', { 'currentYear': this.currentYear })
                    break
                default: ''
            }
        },
        reset() {
            this.currentDate = new Date()
            this.value = this.currentDate
            this.getCalander(this.currentDate, 'reset')
            this.calanderChange(this.tabPosition)
        },
        initDate() {
            console.log('fuck')
            this.currentMonth = parseTime(this.currentDate, '{m}')
            this.currentYear = parseTime(this.currentDate, '{y}')
            this.currentSeason = this.seasonNo
            console.log('当前季度', this.currentSeason)
            this.currentWeek = this.weekNo
        },
        init() {
            this.getCalander(this.value, 'init')
        },
        getCalander(data, type) {
            console.log('查询之前当前月份', this.currentMonth)

            this.currentDate = data
            this.currentYear = parseTime(this.currentDate, '{y}')
            console.log('进入更新 日历函数 开始进入日期控件', this.currentYear)
            var params2 = { 'dateStr': moment(data).format('YYYY-MM-DD hh:mm:ss') }
            //   var params2 = { 'dateStr': parseTime(this.value, '{y}-{m}-{d} {h}:{i}:{s}') }
            console.log('查询新日历 日历函数 开始进入日期控件', params2)
            getCalendarInfo(params2)
                .then(res => {
                    if (res.success) {
                        const weeks1 = res.result.weeks
                        console.log('查询新日历结果---全部', res)
                        this.months = res.result.months
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
                            return ((val.start.split('-')[1] === 10 + '' || val.start.split('-')[1] === 11 + '' || val.start.split('-')[1] === 12 + '' ||
                                    val.end.split('-')[1] === 10 + '' || val.end.split('-')[1] === 11 + '' || val.end.split('-')[1] === 12 + '') &&
                                    val.end.split('-')[0] === this.currentYear && val.start.split('-')[0] === this.currentYear)
                        })
                        console.log('按季度分周', this.weeks, this.currentYear)
                        if (type === 'init' || type === 'reset') {
                            this.seasonNo = res.result.newSeason
                            this.initDate()
                        }
                        this.weekOneSeason = this.weeks[this.currentSeason - 1].weekPlan
                        console.log('按季度分周', this.weekOneSeason, this.weeks, this.currentYear, this.currentMonth)
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
                if (this.currentMonth > 1) {
                    this.currentMonth--
                } else {
                    this.currentMonth = 12

                    this.currentYear--

                    this.currentSeason = 4
                }
                var newSeason = Math.ceil(this.currentMonth / 3)
                this.value = this.currentYear + '-' + this.currentMonth + '-' + '01' + ' 00:00:00'
                this.getCalander(this.value, 'no')
                this.currentSeason = newSeason
                this.weekOneSeason = this.weeks[this.currentSeason - 1].weekPlan
                console.log('前-----------------------------------', this.weekOneSeason)
            } else if (this.tabPosition === 'week') {
                if (this.currentSeason > 1) {
                    this.currentSeason--
                } else {
                    this.currentSeason = 4

                    this.currentYear--
                }
                this.currentMonth = this.weeks[this.currentSeason - 1].weekPlan[0].end.split('-')[1]
                console.log('按了周前的当前月', this.currentMonth, this.currentYear)
                this.value = this.currentYear + '-' + this.currentMonth + '-' + '01' + ' 00:00:00'
                this.getCalander(this.value, 'no')
            } else if (this.tabPosition === 'month') {
                this.currentSeason = 4
                this.currentYear--
                this.value = this.currentYear + '-' + 10 + '-' + '01 00:00:00'
                this.getCalander(this.value, 'no')
                this.currentMonth = parseInt(this.weeks[this.currentSeason - 1].weekPlan[0].end.split('-')[1])
            }
            //
            this.calanderChange(this.tabPosition)
        },
        next() {
            if (this.tabPosition === 'self') {
                if (this.currentMonth < 12) {
                    this.currentMonth++
                } else {
                    this.currentMonth = 1
                    this.currentYear++
                }
                var newSeason = Math.ceil(this.currentMonth / 3)
                console.log('新的季度计算结果----------', newSeason, this.currentMonth, this.seasonMonth[newSeason - 1])
                this.currentSeason = newSeason
                this.weekOneSeason = this.weeks[this.currentSeason - 1].weekPlan
                this.value = this.currentYear + '-' + this.currentMonth + '-' + '01'
                // if (this.currentSeason < 4) {
                //     this.currentSeason++
                // } else {
                //     this.currentSeason = 1

                //     this.currentYear.year++
                // }
                // this.currentMonth = this.weeks[this.currentSeason - 1].weekPlan[0].end.split('-')[1]
                // this.value = this.currentYear + '-' + this.currentMonth + '-' + '01'
                this.getCalander(this.value, 'no')
            } else if (this.tabPosition === 'week') {
                if (this.currentSeason < 4) {
                    this.currentSeason++
                } else {
                    this.currentSeason = 1

                    this.currentYear++
                }
                this.currentMonth = this.weeks[this.currentSeason - 1].weekPlan[0].end.split('-')[1]
                console.log('按了周前的当前月', this.currentMonth, this.currentYear)
                this.value = this.currentYear + '-' + this.currentMonth + '-' + '01' + ' 00:00:00'
                this.getCalander(this.value, 'no')
            } else if (this.tabPosition === 'month') {
                this.currentSeason = 1
                this.currentYear++
                this.value = this.currentYear + '-' + 10 + '-' + '01'
                this.getCalander(this.value, 'no')
                this.currentMonth = parseInt(this.weeks[this.currentSeason - 1].weekPlan[0].end.split('-')[1])
            }

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

<style lang="scss" scoped>
.calendar-box{
    ::v-deep{
        .el-calendar__header{
            display: none;
        }
        .date-celc{
            position: relative;
            .date-mode{
                display: none;
                height: 100%;
                >div{
                    height: 50%;
                    justify-content: flex-end;
                    color: #ccc;
                    span{
                        display: inline-block;
                        padding: 0 15px;
                        &:hover{
                            color: #FFF;
                        }
                    }
                }
            }
            &:hover{
                .date-mode{
                    display: block;
                    position: absolute;
                    right: 0;
                    left:0;
                    top: 0;
                    bottom: 0;
                    border-radius: 10px;
                    background-image: linear-gradient( to right,rgba(255,255,255,.2), #9198e5);

                }
            }
        }
    }
}
.over{ //已完成
    color: #A2F07B;
}
.ing{ //ing
    color:  #FF785F;
}

.is-selected {
    color: #000;
}
</style>
