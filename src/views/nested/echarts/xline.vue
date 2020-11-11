
<template>
  <div :ref="id" style="height:98%;" />
</template>

<script>
const echarts = require('echarts/lib/echarts')
// 引入折线图等组件
require('echarts/lib/chart/bar')
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
                tooltip: {
                    trigger: 'axis',
                    axisPointer: { // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                legend: {
                    data: ['无辅导', '远程学习阶段', '入职集训阶段', 'OJT阶段', '正式进入项目']
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        data: ['01月', '02月', '03月', '04月', '05月', '06月', '07月', '08月', '09月', '10月', '11月', '12月']
                    },
                    {
                        show: false,
                        type: 'value',
                        min: '1',
                        max: '365'
                    }
                ],
                yAxis: {
                    type: 'category',
                    data: ['上海', '天津', '重庆', '西安', '武汉', '南京', '深圳', '大连', '沈阳', '成都', '北京']
                },
                series: [
                    {
                        name: '无辅导',
                        type: 'bar',
                        color: '#C2CCF2',
                        stack: '总量',
                        label: {
                            show: true,
                            position: 'insideRight'
                        },
                        data: [31, 22, 33, 44, 55, 66, 90],
                        xAxisIndex: 1
                    },
                    {
                        name: '远程学习阶段',
                        type: 'bar',
                        color: '#45AEFF',
                        stack: '总量',
                        label: {
                            show: true,
                            position: 'insideRight'
                        },
                        data: [20, 21, 21, 21, 21, 21, 21],
                        xAxisIndex: 1
                    },
                    {
                        name: '入职集训阶段',
                        type: 'bar',
                        color: '#61F8DB',
                        stack: '总量',
                        label: {
                            show: true,
                            position: 'insideRight'
                        },
                        data: [31, 31, 31, 31, 31, 31, 31],
                        xAxisIndex: 1
                    },
                    {
                        name: 'OJT阶段',
                        type: 'bar',
                        color: '#FFE021',
                        stack: '总量',
                        label: {
                            show: true,
                            position: 'insideRight'
                        },
                        data: [41, 41, 41, 41, 41, 41, 41],
                        xAxisIndex: 1
                    },
                    {
                        name: '正式进入项目',
                        type: 'bar',
                        color: '#D697FF',
                        stack: '总量',
                        label: {
                            show: true,
                            position: 'insideRight'
                        },
                        data: [81, 81, 81, 81, 81, 81, 81],
                        xAxisIndex: 1
                    }
                ]
            }
            this.chart.setOption(option, true)
        }
    }
}
</script>
