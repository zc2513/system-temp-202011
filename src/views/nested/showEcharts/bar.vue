<template>
  <!-- 折线图组件数据模拟 -->
  <div class="hfull">
    <bar />
  </div>
</template>

<script>
import bar from '@/components/echarts/bar'
export default {
    components: { bar },
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

</style>
