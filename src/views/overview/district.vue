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
      <!-- <xline id="xline1" :x-axis="xAxis" :y-axis="yAxis" :series="series" /> -->
      柱状图
    </echartLayout>

    <div class="list-main flsb flw">
      <echartLayout :show-title="false" height="318">
        <div class="flot-box">
          <div class="title">总人数折线图-北京</div>
          <div v-if="false" class="time">2020-06～2020-11</div>
        </div>
        <xline id="totalPerson" :legend="totalPerson.legend" :x-axis="totalPerson.xAxis" :y-axis="totalPerson.yAxis" :series="totalPerson.series" />
      </echartLayout>
      <echartLayout :show-title="false" height="318">
        <div class="flot-box">
          <div class="title">TS-Force日报提交情况-北京</div>
          <div class="time">2020-06～2020-11</div>
        </div>
        <xline id="tsSubs" :x-axis="tsSubs.xAxis" :y-axis="tsSubs.yAxis" :series="tsSubs.series" />
      </echartLayout>
      <echartLayout :show-title="false" height="318">
        <div class="flot-box">
          <div class="title">TS-Force日报Review情况-北京</div>
          <div class="time">2020-06～2020-11</div>
        </div>
        <bar id="Review" :x-axis="TsReview.xAxis" :y-axis="TsReview.yAxis" :series="TsReview.series" />
      </echartLayout>
      <echartLayout :show-title="false" height="318">
        <div class="flot-box">
          <div class="title">辅导员辅导记录提交情况-北京</div>
          <div class="time">2020-06～2020-11</div>
        </div>
        <bar id="record" :x-axis="record.xAxis" :y-axis="record.yAxis" :series="record.series" />
      </echartLayout>
      <echartLayout :show-title="false" height="318">
        <div class="flot-box">
          <div class="title">一线经理月报提交情况-北京</div>
          <div class="time">2020-06～2020-11</div>
        </div>
        <bar id="manager" :x-axis="manager.xAxis" :y-axis="manager.yAxis" :series="manager.series" />
      </echartLayout>
      <echartLayout :show-title="false" height="318">
        <div class="flot-box">
          <div class="title">地区月报提交情况-北京</div>
          <div class="time">2020-06～2020-11</div>
        </div>
        <bar id="region" :x-axis="region.xAxis" :y-axis="region.yAxis" :series="region.series" />
      </echartLayout>
    </div>
  </div>
</template>

<script>
import echartLayout from './echartLayout'
import xline from '@/components/echarts/line'
import bar from '@/components/echarts/bar'
export default {
    components: { echartLayout, xline, bar },
    data() {
        return {
            totalPerson: { // 总人数折线图
                legend: {},
                xAxis: {},
                yAxis: {},
                series: []
            },
            tsSubs: { // 日报提交情况
                xAxis: {},
                yAxis: {},
                series: []
            },
            TsReview: { // TS-Force日报Review情况
                series: []
            },
            record: { // 辅导员辅导记录提交情况
                series: []
            },
            manager: { // 一线经理月报提交情况
                series: []
            },
            region: { // 地区月报提交情况
                series: []
            }
        }
    },
    created() {
        this.init()
        setInterval(() => {
            this.init()
        }, 5000)
    },
    methods: {
        init(params) {
            // let params = {}
            // this.one(params)
            // this.one(params)
            // this.one(params)
            // this.one(params)
            // this.one(params)
            // this.one(params)

            this.getTsReview(/* 获取TS-force review */)
            this.getRecord(/* 辅导员辅导记录提交情况 */)
            this.getManager(/* 一线经理月报提交情况 */)
            this.getRegion(/* 地区月报提交情况 */)

            this.totalPerson = {
                legend: {
                    show: false
                },
                xAxis: {
                    data: ['01月', '02月', '03月', '04月', '05月', '06月']
                },
                yAxis: {
                    max: 200
                },
                series: [
                    this.setTJLine(
                        {
                            data: [170 * Math.random(), 180 * Math.random(), 191 * Math.random(), 154 * Math.random(),
                                129 * Math.random(), 130 * Math.random(), 180 * Math.random()]
                        }
                    )
                ]
            }

            this.tsSubs = {
                xAxis: {
                    data: ['20/9', '21/9', '22/9', '23/9', '24/9', '25/9', '26/9']
                },
                yAxis: {
                    max: 200
                },
                series: [
                    this.setTargetLine(
                        {
                            name: '测试平均值',
                            data: [140, 140, 140, 140, 140, 140, 140]
                        }
                    ),
                    this.setTJLine(
                        {
                            name: '统计名次测试',
                            data: [170 * Math.random(), 180 * Math.random(), 191 * Math.random(), 154 * Math.random(),
                                129 * Math.random(), 130 * Math.random(), 180 * Math.random()]
                        }
                    )
                ]
            }
        },
        setTargetLine(data) { // 折线图---平均值线
            const option = { //  线条一
                data: [],
                type: 'line',
                symbol: 'none',
                name: '应交数量',
                color: '#A2F07B',
                lineStyle: { // 线条颜色
                    color: '#A2F07B',
                    width: 3
                }
            }
            return { ...option, ...data }
        },
        setTJLine(data = {}) { // 折线图---统计线
            const option = { // 线条二
                data: [],
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
            return { ...option, ...data }
        },

        getTsReview() {
            this.TsReview = {
                yAxis: {
                    max: 200
                },
                xAxis: {
                    data: ['01月', '02月', '03月', '04月', '05月', '06月']
                },
                series: [// 一线+两柱状图
                    this.setBar({
                        name: '提交数量',
                        color: '#A2F07B', // 柱状色
                        data: [80, 122, 200, 123, 92, 51]
                    }),
                    this.setBar({
                        name: 'Review数量',
                        color: '#FFE021', // 柱状色
                        data: [205, 185, 164, 132, 170, 120]
                    })
                ]
            }
            /*
            默认测试数据
            this.TsReview = {
                series: [// 一线+两柱状图
                    this.setBarline({
                        name: '测试折线',
                        data: [10, 10, 10, 10, 10, 10]
                    }),
                    this.setBar({
                        name: '柱状测试1',
                        color: '#A2F07B', // 柱状色
                        data: [8, 2, 2, 3, 2, 1]
                    }),
                    this.setBar({
                        name: '柱状测试2',
                        color: '#FFE021', // 柱状色
                        data: [2, 1, 1, 1, 1, 1]
                    })
                ]
             }
            */
        },
        getRecord() {
            this.manager = {
                yAxis: {
                    max: 200
                },
                xAxis: {
                    data: ['06月', '07月', '08月', '09月', '10月', '11月']
                },
                series: [
                    this.setBarline({
                        name: '实际提交数量',
                        data: [130, 130, 130, 130, 130, 130]
                    }),
                    this.setBar({
                        name: '应交数量',
                        color: '#45AEFF', // 柱状色
                        data: [80, 122, 200, 123, 92, 51],
                        barWidth: 20
                    })

                ]
            }
        },
        getRegion() {
            this.region = {
                yAxis: {
                    max: 200
                },
                xAxis: {
                    data: ['06月', '07月', '08月', '09月', '10月', '11月']
                },
                series: [
                    this.setBarline({
                        name: '实际提交数量',
                        data: [130, 130, 130, 130, 130, 130]
                    }),
                    this.setBar({
                        name: '应交数量',
                        color: '#FFE021', // 柱状色
                        data: [80, 122, 200, 123, 92, 51],
                        barWidth: 20
                    })

                ]
            }
        },
        getManager() {
            this.record = {
                yAxis: {
                    max: 200
                },
                xAxis: {
                    data: ['06月', '07月', '08月', '09月', '10月', '11月']
                },
                series: [
                    this.setBarline({
                        name: '实际提交数量',
                        data: [130, 130, 130, 130, 130, 130]
                    }),
                    this.setBar({
                        name: '应交数量',
                        color: '#45AEFF', // 柱状色
                        data: [80, 122, 200, 123, 92, 51],
                        barWidth: 20
                    })

                ]
            }
        },
        setBarline(data = {}) {
            const option = {
                type: 'line',
                name: '默认标题',
                data: [],
                symbol: 'none', // 标记的图形
                symbolSize: 10, // 标记的大小
                label: { // 图形上的文本标签
                    normal: { show: false }
                },
                lineStyle: { // 线条样式。
                    normal: { color: '#A2F07B', width: 3 }
                },
                itemStyle: { // 折线拐点标志的样式。
                    normal: {
                        color: '#A2F07B', // 图例填充色
                        borderColor: '#ffffff', // 边框色
                        borderWidth: 1
                    }
                },
                smooth: false, // 是否平滑曲线显示
                yAxisIndex: 0 // 指定当前数据根据(yAxis)的数组索引，的y轴渲染折线图（注如果与其它内容差异过大会导致当前或其它显示看不到情况），
            }
            return { ...option, ...data }
        },
        setBar(data) {
            const option = {
                type: 'bar',
                name: '默认标题', // 系列名称，用于tooltip的显示，legend 的图例筛选
                data: [],
                color: '#A2F07B', // 柱状色
                barGap: '20%', // 不同系列的柱间距离
                barCategoryGap: '20%', // 同一系列的柱间距离
                animationEasing: 'quinticIn', // 初始动画的缓动效果
                itemStyle: {
                    barBorderRadius: [10, 10, 0, 0]
                },
                barWidth: 14
            }
            return { ...option, ...data }
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
