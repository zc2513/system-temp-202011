<template>
  <div :ref="id" class="flc-y" :style="{height:height,width:width}" />
</template>

<script>
const echarts = require('echarts/lib/echarts')
// 引入折线图等组件
require('echarts/lib/chart/pie')
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
            default: 'chartBox'
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
    beforeDestroy() {
        if (!this.chart) return
        this.chart.dispose()
        this.chart = null
    },
    methods: {
        redraw() { // 重绘
            this.chart = echarts.init(this.$refs[this.id])
            this.chart.on('click', (params) => {
                console.log(params.data.SectionCount)
                this.$emit('sendPie', params.data)
            })
        },
        init() {
            if (!this.chart) this.redraw()
            const option = {
                tooltip: this.setTooltip(),
                legend: {
                    orient: 'vertical',
                    left: 10,
                    textStyle: { color: '#FFF' },
                    data: this.pieData.map(e => e.Name)
                },
                series: [
                    {
                        type: 'pie',
                        radius: [this.type ? '0' : '50%', '70%'],
                        avoidLabelOverlap: false,
                        label: {
                            show: !!this.type,
                            position: this.type ? 'outside' : 'center'
                        },
                        color: ['#55A8F3', '#20C8DB', '#1373FE'],
                        emphasis: {
                            label: { // 椭圆中间字体显示
                                show: true,
                                fontSize: '14',
                                fontWeight: 'bold'
                            }
                        },
                        labelLine: { // 引导线
                            show: !!this.type,
                            smooth: true
                        },
                        roseType: this.type || '',
                        data: this.pieData
                    }
                ]
            }
            this.chart.setOption(option, true)
        },
        setTooltip() { // 设置提示语
            const allocation = {
                trigger: 'item',
                formatter: function(params) {
                    const { data } = params
                    const str = `<div> 
                                <div>标段：${data.SectionCount}</div>
                                <div>金额：${data.WinTotalPrice}</div>
                            </div> `
                    return str
                }
            }
            if (this.type) delete allocation.formatter
            return allocation
        }
    }
}
</script>
