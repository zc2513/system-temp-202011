
<template>
  <div class="calendar pb25">
    <div class="flc-y flsb c-56" style="height:96px;">
      <div>
        <el-radio-group v-model="tabPosition" @change="changePlanType">
          <el-radio-button v-if="showDay" label="self">{{ dayTitle }}</el-radio-button>
          <el-radio-button v-if="showWeek" label="week">{{ weekTitle }}</el-radio-button>
          <el-radio-button v-if="showMonth" label="month">{{ monthTitle }}</el-radio-button>
        </el-radio-group>
      </div>
      <div class="flc-y" style="margin-right:20%;">
        <div>
          <i class="cursor el-icon-arrow-left" @click="pre" />
        </div>
        <div class="pl30 pr30 f18">
          <span v-if="tabPosition === 'self'">{{ currentYear }} 年 {{ currentMonth }} 月</span>
          <span v-if="tabPosition === 'week'">{{ currentYear }} 年 {{ seasonMonth[currentSeason -1] }}</span>
          <span v-if="tabPosition === 'month'">{{ currentYear }} 年</span>
        </div>
        <div>
          <i class="cursor el-icon-arrow-right" @click="next" />
        </div>
        <div class="flc-y ml30 f18">
          <div v-if="tabPosition === 'self'" @click="reset">今天</div>
          <div v-if="tabPosition === 'week'" @click="reset">本周</div>
          <div v-if="tabPosition === 'month'" @click="reset">本月</div>
        </div>
      </div>
      <div title="占位盒子" />
    </div>
    <el-calendar v-if="tabPosition === 'self' && showDay" v-model="value" class="calendar-box">
      <template slot="dateCell" slot-scope="{ date, data }">
        <div :class="data.isSelected ? 'is-selected' : ''" class="fl-y-sb date-celc" style="height:100%;">
          <div class="top">{{ data.day.split('-')[2] }}</div>
          <slot name="tsdateCell" :data="{date,data}" />
          <div class="date-mode fl-y-sb" @click.stop="e=>e">
            <!-- <div class="flc-y">
              <span @click.stop="addDay(data.day)">新增</span>
            </div> -->
            <div class="flc-y">
              <span @click.stop="viewDay(data.day)">查看</span>
            </div>
          </div>
        </div>
      </template>
    </el-calendar>

    <div v-if="tabPosition === 'week' && showWeek" class="box">
      <el-row>
        <el-col
          v-for="(item, index) in weekOneSeason"
          :key="index"
          :span="6"
          :class="{active: 44 === item.week }"
          class="date-item-box fl-y-sb cursor"
        >
          <div class="f18" style="color:#5F6266;">
            <span>第{{ item.week }}周</span>
            <span class="f12" style="color:#909398;">
              ({{ item.start.substring(5) }} ~ {{ item.end.substring(5) }})
            </span>
          </div>
          <slot name="weekContent" :week="{ item}" />
          <div class="date-mode fl-y-sb" @click.stop="e=>e">
            <div v-for="menu in weekAction" :key="menu.action" class="flc-y">
              <span @click.stop="clickMenu(menu,item)">{{ menu.lable }}</span>
            </div>

          </div>
        </el-col>
      </el-row>
    </div>

    <div v-if="tabPosition === 'month' && showMonth" class="box">
      <el-row>
        <el-col
          v-for="(item, index) in months"
          :key="index"
          :span="6"
          :class="{active:new Date().getMonth()+1 === item.month }"
          class="date-item-box fl-y-sb cursor"
        >
          <div class="f18" style="color:#5F6266;">{{ item.month }}月</div>
          <div>
            <slot name="monthContent" :month="{ item }" />
          </div>
          <div class="date-mode fl-y-sb" @click.stop="e=>e">
            <div v-for="menu in weekAction" :key="menu.action" class="flc-y">
              <span @click.stop="clickMonthMenu(menu,item)">{{ menu.lable }}</span>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
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
        showDay: {
            type: Boolean,
            default: true
        },
        showWeek: {
            type: Boolean,
            default: true
        },
        showMonth: {
            type: Boolean,
            default: true
        },
        currentDay: {
            type: Date,
            required: true,
            default: new Date()
        },
        weekAction: {
            type: Array,
            required: true,
            default: () => {
                [
                    { 'action': 'add',
                        lable: '新增'
                    },
                    { 'action': 'view',
                        lable: '查看'
                    }]
            }
        },
        monthAction: {
            type: Array,
            required: true,
            default: () => {
                [
                    { 'action': 'add',
                        lable: '新增'
                    },
                    { 'action': 'view',
                        lable: '查看'
                    }]
            }
        }
    },
    data() {
        return {
            tabPosition: 'self',
            value: new Date(),
            currentDate: null,
            seasonMonth: ['1月-3月', '4月-6月', '7月-9月', '10月-12月'],
            currentWeek: null,
            currentSeason: null,
            currentMonth: {},
            currentYear: null,
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
        if (!this.showDay) {
            this.tabPosition = 'week'
            this.calanderChange('week')
        }
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
        addDay(e) {
            this.$emit('addDay', e, { currentYear: this.currentYear, currentSeason: this.currentSeason, currentMonth: this.currentMonth, currentWeek: this.currentWeek })
        },
        viewDay(e) {
            this.$emit('viewDay', { 'currentYear': this.currentYear, 'currentMonth': this.currentMonth, 'day': e })
        },
        clickDayMenu(menu, day) {
            this.$emit('clickWeekMenu', { 'menu': menu, 'item': day, 'currentYear': this.currentYear })
        },
        clickMenu(menu, item) {
            this.$emit('clickWeekMenu', { 'menu': menu, 'item': item, 'currentYear': this.currentYear, 'currentWeek': this.weekNo })
        },
        clickMonthMenu(menu, item) {
            this.$emit('clickMonthMenu', { 'menu': menu, 'item': item, 'currentYear': this.currentYear, 'currentMonth': this.currentMonth })
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
            this.$emit('sysInitDate', { currentYear: this.currentYear, currentSeason: this.currentSeason, currentMonth: this.currentMonth, currentWeek: this.currentWeek, currentDay: parseTime(this.currentDay, '{y}-{m}-{d}') })
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
                        this.currentWeek = res.result.newWeek
                        this.weekNo = res.result.newWeek
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

        // mouseover(e) {
        //     //  console.log('日计划--------------移动-----------------------', e)
        // },
        // clickDay(e) {
        //     // console.log('日计划--------- 点击----------------------------', e)
        // },
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
        }

    }

}
</script>

<style lang="scss" scoped>
.calendar{
    .c-56{color: #5F6266;}
    @mixin dateActive{//选中样式
        border-top: 4px solid #6666FF;
        background: #F7F7FF;
    }
    .calendar-box{//日历插件原生样式修改（elment）
        .date-celc{
            &:hover .date-mode{  display: block; }
        }
        ::v-deep{
            .el-calendar__header{ display: none;}
            .el-calendar-day{ position: relative;}
            .is-selected {//日选中
                .el-calendar-day{
                    @include dateActive;
                }
            }
        }
    }

    .date-item-box{//日历布局盒子
        position: relative;
        color: #5F6266;
        height: 140px;
        padding: 24px 24px 16px;
        border-right: 1px solid #F4F7FA;
        &:nth-child(n+4){
            border-top: 1px solid #F4F7FA;
        }
        &:hover .date-mode{
            display: block;
        }
        &.active{
            @include dateActive;
        }
    }
    .date-mode{//日历浮层
        display: none;
        position: absolute;
        right: 0;
        left:0;
        top: 0;
        bottom: 0;
        background-image: linear-gradient( to right,rgba(255,255,255,.2),#9198e5);
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
}
</style>
