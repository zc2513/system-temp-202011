<template>
  <div id="container" style="width100%;height:100%;" />
</template>

<script>
// 引入基本模板
const echarts = require('echarts/lib/echarts')

// 引入折线图等组件
require('echarts/lib/chart/pie')

// 引入提示框和title组件，图例
require('echarts/lib/component/tooltip')
// require('echarts/lib/component/title')
require('echarts/lib/component/legend')
import resize from './resize'
export default {
    mixins: [resize],
    data() {
        return {
            chart: null
        }
    },
    beforeDestroy() {
        if (!this.chart) {
            return
        }
        this.chart.dispose()
        this.chart = null
    },
    mounted() {
        this.init()
    },
    methods: {
        init() {
            this.chart = echarts.init(document.getElementById('container'))
            const option = {
                tooltip: {
                    trigger: 'item',
                    formatter: function(params) {
                        // let res = params[0].axisValue
                        // for (let i = 0, l = params.length; i < l; i++) {
                        //     var percentage = i > 0 ? params[0].value == 0 ? '0.00%' : ((params[i].value / params[0].value) * 100).toFixed(2) + '%' : ''
                        //     res += '<br/>' + params[i].marker + params[i].seriesName + ' : ' + params[i].value + '  ' + percentage
                        // }
                        // return res
                        console.log(params)
                    }

                },
                legend: {
                    orient: 'vertical',
                    left: 10,
                    data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
                },
                series: [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius: ['50%', '70%'],
                        avoidLabelOverlap: false,
                        label: {
                            show: false,
                            position: 'center'
                        },
                        color: ['red', 'orange', 'yellow'],
                        emphasis: {
                            label: {
                                show: true,
                                fontSize: '30',
                                fontWeight: 'bold'
                            }
                        },
                        labelLine: {
                            show: false
                        },
                        data: [
                            { value: 335, name: '直接访问', id: 30, progess: { steep1: 20, steep2: 50, steep3: 80 }},
                            { value: 310, name: '邮件营销', id: 50, progess: { steep1: 30, steep2: 60, steep3: 40 }},
                            { value: 234, name: '联盟广告', id: 80, progess: { steep1: 50, steep2: 20, steep3: 90 }}
                        ]
                    }
                ]
            }
            this.chart.on('click', (params) => {
                const { name, data } = params
                // console.log(params.name, params.data)
                this.$emit('sendPie', { name, data })
            })
            this.chart.setOption(option, true)
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
