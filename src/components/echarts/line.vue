
<template>
  <div :ref="id" :style="{height:height,width:width}" />
</template>

<script>
const echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/line')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/legend')
import resize from './mixins/resize'
export default {
    mixins: [resize],
    props: {
        id: {
            type: String,
            default: 'lineBox'
        },
        list: {
            type: Array,
            default: _ => []
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
        width: {
            type: String,
            default: '100%'
        },
        height: {
            type: String,
            default: '100%'
        },
        isRedraw: { // 是否开启重绘
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            chart: null
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
            this.chart.on('click', (params) => {
                console.log('点击了拐角小圆点...')
                // this.$emit('send', params.data)
            })
        },
        init() {
            if (!this.chart) this.redraw()
            const option = {
                legend: {
                    orient: 'vertical',
                    right: 0,
                    icon: 'roundRect',
                    itemHeight: '8',
                    textStyle: { // 小图标字体颜色
                        color: '#5F6266'
                    }
                },
                xAxis: this.setXAxis(),
                yAxis: this.setYAxis(),
                series: this.series
                // [
                // { //  线条一
                //     data: [200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200],
                //     type: 'line',
                //     symbol: 'none',
                //     name: '应交数量',
                //     color: '#A2F07B',
                //     lineStyle: { // 线条颜色
                //         color: '#A2F07B',
                //         width: 3
                //     }
                // },
                // { // 线条二
                //     data: [70, 80, 121, 134, 129, 130, 120, 108, 112, 121, 134, 129],
                //     type: 'line',
                //     name: '实际提交数量',
                //     color: '#D697FF',
                //     itemStyle: { // 折线拐点标志的样式。
                //         color: '#ccc'
                //     },
                //     lineStyle: { // 线条颜色
                //         color: '#D697FF'
                //     },
                //     areaStyle: { // 区域颜色...渐变色
                //         color: {
                //             type: 'linear',
                //             x: 0,
                //             y: 0,
                //             x2: 0,
                //             y2: 1,
                //             colorStops: [{
                //                 offset: 0, color: '#f0daff' // 0% 处的颜色
                //             }, {
                //                 offset: 1, color: '#fefeff' // 100% 处的颜色
                //             }],
                //             global: false // 缺省为 false
                //         }
                //     }
                // }
                // ]
            }
            this.chart.setOption(option, true)
        },
        setXAxis(data) { // x轴相关
            data = this.xAxis
            const option = {
                type: 'category',
                boundaryGap: false,
                data: []
                // data: ['01月', '02月', '03月', '04月', '05月', '06月', '07月', '08月', '09月', '10月', '11月', '12月']
            }
            return { ...option, ...data }
        },

        setYAxis(data) { // y轴相关
            data = this.yAxis
            const option = {
                type: 'value',
                max: 300,
                axisLine: { // 轴线设置
                    show: false
                },
                axisTick: { // 刻度设置
                    show: false
                },
                axisLabel: { // 刻度相关标签设置
                    showMinLabel: false, // 是否显示最小刻度
                    color: '#5F6266'
                },
                splitLine: {
                    lineStyle: { // 使用深浅的间隔色---x方向线的颜色
                        color: '#F4F7FA'
                    }
                }
            }
            return { ...option, ...data }
        }
    }
}
</script>
