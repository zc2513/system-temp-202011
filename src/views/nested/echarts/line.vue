
<template>
  <div :ref="id" style="height:98%;" />
</template>

<script>
const echarts = require('echarts/lib/echarts')
// 引入折线图等组件
require('echarts/lib/chart/line')
// 引入提示框和title组件，图例
require('echarts/lib/component/tooltip')
require('echarts/lib/component/legend')
import resize from './mixins/resize'
/**
 * @type 默认不传->空心圆  radius->时为南丁格尔图
 * */
export default {
    mixins: [resize],
    props: {
        id: {
            type: String,
            default: 'lineBox'
        },
        pieData: {
            type: Array,
            default: _ => []
        },
        width: {
            type: String,
            default: '100%'
        },
        height: {
            type: String,
            default: '100%'
        },
        type: { // radius 南丁格尔
            type: String,
            default: ''
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
        pieData: {
            handler(v) {
                if (!v.length) return
                if (this.chart && this.isRedraw) { // 每次重绘开启
                    this.chart.dispose()
                    this.chart = null
                }
                this.$nextTick(() => this.init())
            },
            immediate: true,
            deep: true
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
                this.$emit('sendPie', params.data)
            })
        },
        init() {
            if (!this.chart) this.redraw()
            const option = {
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: ['01月', '02月', '03月', '04月', '05月', '06月', '07月', '08月', '09月', '10月', '11月', '12月']
                },
                yAxis: {
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
                        lineStyle: {
                            // 使用深浅的间隔色
                            color: '#F4F7FA'
                        }
                    }

                },
                series: [{
                    data: [70, 80, 121, 134, 129, 130, 120, 108, 112, 121, 134, 129],
                    type: 'line',
                    itemStyle: { // 折线拐点标志的样式。
                        color: '#ccc'
                    },
                    lineStyle: { // 线条颜色
                        color: '#D697FF'
                    },
                    areaStyle: { //
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
                }]
            }

            this.chart.setOption(option, true)
        }
    }
}
</script>
