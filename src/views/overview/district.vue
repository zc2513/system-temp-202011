<template>
  <!-- 地区概览 -->
  <div class="overview-district">
    <div class="flc-y" style="height:80px;">
      <div>地区</div>
      <div>地区</div>
      <div>地区</div>
      <div>地区</div>
    </div>

    <echartLayout title="整体培养日程阶段展示图-北京">
      <xline id="xline1" :x-axis="xAxis" :y-axis="yAxis" :series="series" />
    </echartLayout>

    <div class="list-main flsb flw">
      <echartLayout :show-title="false" height="318">
        <div class="flot-box">
          <div class="title">总人数折线图-北京</div>
          <div class="time">2020-06～2020-11</div>
        </div>
        <xline id="xline1" :x-axis="xAxis" :y-axis="yAxis" :series="series" />
      </echartLayout>
      <echartLayout :show-title="false" height="318">
        <div class="flot-box">
          <div class="title">TS-Force日报提交情况-北京</div>
          <div class="time">2020-06～2020-11</div>
        </div>
        <xline id="xline1" :x-axis="xAxis" :y-axis="yAxis" :series="series" />
      </echartLayout>
      <echartLayout :show-title="false" height="318">
        <div class="flot-box">
          <div class="title">TS-Force日报Review情况-北京</div>
          <div class="time">2020-06～2020-11</div>
        </div>
        <xline id="xline1" :x-axis="xAxis" :y-axis="yAxis" :series="series" />
      </echartLayout>
      <echartLayout :show-title="false" height="318">
        <div class="flot-box">
          <div class="title">辅导员辅导记录提交情况-北京</div>
          <div class="time">2020-06～2020-11</div>
        </div>
        <xline id="xline1" :x-axis="xAxis" :y-axis="yAxis" :series="series" />
      </echartLayout>
      <echartLayout :show-title="false" height="318">
        <div class="flot-box">
          <div class="title">一线经理月报提交情况-北京</div>
          <div class="time">2020-06～2020-11</div>
        </div>
        <xline id="xline1" :x-axis="xAxis" :y-axis="yAxis" :series="series" />
      </echartLayout>
      <echartLayout :show-title="false" height="318">
        <div class="flot-box">
          <div class="title">地区月报提交情况-北京</div>
          <div class="time">2020-06～2020-11</div>
        </div>
        <xline id="xline1" :x-axis="xAxis" :y-axis="yAxis" :series="series" />
      </echartLayout>
    </div>
  </div>
</template>

<script>
import echartLayout from './echartLayout'
import xline from '@/components/echarts/line'
export default {
    components: { echartLayout, xline },
    data() {
        return {
            xAxis: {},
            yAxis: {},
            series: []
        }
    },
    created() {
        this.init()
        setInterval(() => {
            this.init()
        }, 1000)
    },
    methods: {
        init() {
            this.xAxis = {
                data: ['01月', '02月', '03月', '04月', '05月', '06月', '07月', '08月', '09月', '10月', '11月', '12月']
            }
            this.yAxis = {
                max: 250
            }
            this.series = [
                { //  线条一
                    data: [200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200],
                    type: 'line',
                    symbol: 'none',
                    name: '应交数量',
                    color: '#A2F07B',
                    lineStyle: { // 线条颜色
                        color: '#A2F07B',
                        width: 3
                    }
                },
                { // 线条二
                    data: [170 * Math.random(), 180 * Math.random(), 191 * Math.random(), 154 * Math.random(),
                        129 * Math.random(), 130 * Math.random(), 180 * Math.random(), 168 * Math.random(),
                        112 * Math.random(), 121 * Math.random(), 134 * Math.random(), 149 * Math.random()],
                    type: 'line',
                    name: '实际提交数量',
                    color: '#D697FF',
                    itemStyle: { // 折线拐点标志的样式。
                        color: '#ccc'
                    },
                    lineStyle: { // 线条颜色
                        color: '#D697FF'
                    },
                    areaStyle: { // 区域颜色...渐变色
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0, color: '#f0daff' // 0% 处的颜色
                            }, {
                                offset: 1, color: '#fefeff' // 100% 处的颜色
                            }],
                            global: false // 缺省为 false
                        }
                    }
                }
            ]
        }
    }
}
</script>

<style lang="scss" scoped>
.overview-district{
    .list-main{//
        margin: 16px 0;
        >div{
            width: calc(50% - 8px);
            margin-bottom: 16px;
            &:nth-child(even){  margin-left: 16px; }
        }
        .flot-box{
            position: absolute;
            background-color: #fff;
            .time{
                padding-top: 9px;
                font-size: 12px;
                color: #5F6266;
            }
        }
    }
}
</style>
