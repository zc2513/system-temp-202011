<!-- 柱状图 -->
<template>
  <div :ref="id" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
import resize from '@/components/echarts/mixins/resize.js'
export default {
    mixins: [resize],
    props: {
        id: {
            type: String,
            default: 'projectRegion'
        },
        width: {
            type: String,
            default: '100%'
        },
        height: {
            type: String,
            default: '100%'
        },
        series: {
            type: Array,
            default: _ => []
        },
        xAxis: {
            type: Object,
            default: _ => { return {} }
        },
        yAxis: {
            type: Object,
            default: _ => { return {} }
        },
        legend: {
            type: Object,
            default: _ => { return {} }
        },
        tooltip: {
            type: Object,
            default: _ => { return {} }
        },
        isRedraw: { // 是否开启重绘
            type: Boolean,
            default: false
        }
    },
    watch: {
        series: {
            handler(v) {
                if (!v.length) return
                if (this.chart && this.isRedraw) { // 每次重绘开启
                    this.chart.dispose()
                    this.chart = null
                }
                this.$nextTick(() => this.init())
            },
            immediate: true
        }
    },
    mounted() {
        this.init()
    },
    beforeDestroy() {
        if (!this.chart) return
        this.chart.dispose()
        this.chart = null
    },
    methods: {
        redraw() { // 重绘
            this.chart = echarts.init(this.$refs[this.id])
        },
        init() {
            if (!this.chart) this.redraw()
            const option = {
                grid: { // 直角坐标系内绘图网格
                    show: false, // 是否显示直角坐标系网格
                    left: '3%',
                    right: '3%',
                    bottom: 10,
                    top: 100,
                    containLabel: true
                },
                legend: this.setLegend(),
                tooltip: this.setTooltip(),
                xAxis: this.setXAxis(),
                yAxis: this.setYAxis(),
                series: this.series
                // [// 一线+两柱状图
                //     {
                //         type: 'line',
                //         name: '中标金额',
                //         data: [10, 10, 10, 10, 10, 10],
                //         symbol: 'none', // 标记的图形
                //         symbolSize: 10, // 标记的大小
                //         label: { // 图形上的文本标签
                //             normal: { show: false }
                //         },
                //         lineStyle: { // 线条样式。
                //             normal: { color: '#A2F07B', width: 3 }
                //         },
                //         itemStyle: { // 折线拐点标志的样式。
                //             normal: {
                //                 color: '#A2F07B', // 图例填充色
                //                 borderColor: '#ffffff', // 边框色
                //                 borderWidth: 1
                //             }
                //         },
                //         smooth: false, // 是否平滑曲线显示
                //         yAxisIndex: 0 // 指定当前数据根据(yAxis)的数组索引，的y轴渲染折线图（注如果与其它内容差异过大会导致当前或其它显示看不到情况），
                //     },
                //     {
                //         type: 'bar',
                //         name: '项目数', // 系列名称，用于tooltip的显示，legend 的图例筛选
                //         data: [8, 2, 2, 3, 2, 1],
                //         color: '#A2F07B', // 柱状色
                //         barGap: '10%', // 不同系列的柱间距离
                //         barCategoryGap: '25%', // 同一系列的柱间距离
                //         animationEasing: 'quinticIn', // 初始动画的缓动效果
                //         itemStyle: {
                //             barBorderRadius: [7, 7, 0, 0]
                //         },
                //         barWidth: 14
                //     },
                //     {
                //         type: 'bar',
                //         name: '标段数',
                //         data: [2, 1, 1, 1, 1, 1],
                //         color: '#FFE021',
                //         barGap: '10%', // 不同系列的柱间距离
                //         barCategoryGap: '25%', // 同一系列的柱间距离
                //         animationEasing: 'quinticIn', // 初始动画的缓动效果
                //         itemStyle: {
                //             barBorderRadius: [7, 7, 0, 0]
                //         },
                //         barWidth: 14
                //     }

                // ]
            }
            this.chart.setOption(option, true)
        },
        setTooltip() {
            const option = { // 提示框组件
                show: true,
                trigger: 'axis', // 触发类型
                formatter: function(params) {
                    var str = ''
                    for (var i = 0; i < params.length; i++) {
                        if (params[i].seriesName !== '') {
                            str +=
                            params[i].name +
                            ':' +
                            params[i].seriesName +
                            params[i].value +
                            '<br/>'
                        }
                    }
                    return str
                }
            }
            return { ...option, ...this.tooltip }
        },
        setLegend() {
            const option = { // 图例组件
                show: true, // 是否显示图例
                orient: 'vertical',
                right: 0,
                icon: 'roundRect',
                textStyle: { color: '#5F6266' }, // 图例文字颜色
                inactiveColor: '#ccc' // 图例关闭时的颜色。
                // itemHeight: '8',
                // data: ['中标金额', '项目数', '标段数', '哈哈哈']// data 没有被指定，会自动从当前系列中获取。注：如果指定则当前项包含系列name才显示，否则不显示
            }
            return { ...option, ...this.legend }
        },
        setXAxis() { // x轴相关
            const option = { // 直角坐标系 grid 中的 x 轴
                type: 'category', // 类目轴 （值为value时则为数值轴，适用于连续数据）
                data: ['01月', '02月', '03月', '04月', '05月', '06月'],
                axisTick: {
                    show: false // 是否显示坐标轴刻度。
                },
                axisLabel: { // 刻度标签的相关设置。
                    textStyle: {
                        color: '#5F6266',
                        fontSize: 12
                    }
                },
                splitLine: { // 坐标轴在 grid 区域中的分隔线---默认数值轴显示，类目轴不显示。
                    show: false
                },
                axisPointer: { // 坐标轴指示器配置项。默认不显示。但是如果tooltip.trigger设置为'axis'或者tooltip.axisPointer.type设置为'cross'，则自动显示axisPointer。
                    type: 'shadow' // 鼠标滑过柱状的隐形 line/shadow/none
                },
                axisLine: {
                    show: false, // 是否显示坐标轴轴线。false（以下设置不生效）
                    lineStyle: { // 坐标轴线线的颜色。
                        color: '#000'
                    }
                }
            }
            return { ...option, ...this.xAxis }
        },
        setYAxis() { // y轴相关
            const option = {
                type: 'value',
                name: '', // （数量）
                nameTextStyle: { // name样式
                    color: '#CCCCCC', // 字体颜色
                    align: 'right', // 水平对齐方式
                    verticalAlign: 'bottom', // 垂直对齐方式
                    lineHeight: 30
                },
                axisLabel: { // 坐标轴刻度标签的相关设置。
                    formatter: '{value}',
                    margin: 15, // 刻度标签与轴线之间的距离。
                    textStyle: {
                        color: '#CCCCCC',
                        fontSize: 12
                    }
                },
                axisLine: { // Y相关样式
                    show: false, // 是否显示
                    lineStyle: {
                        color: 'red'
                    }
                },
                axisTick: { // 坐标轴刻度相关设置。
                    show: false// 是否显示坐标轴刻度。
                },
                splitLine: { // x方向分割线
                    show: true,
                    lineStyle: {
                        color: '#f4f7fa',
                        type: 'solid'
                    }
                }
            }
            return { ...option, ...this.yAxis }
        }
    }
}
// itemStyle 为兼容echarts2.x
</script>

