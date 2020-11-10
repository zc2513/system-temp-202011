<template>
  <!-- 总体总览 -->
  <div class="overall">
    <echartLayout class="mt15" title="整体培养日程阶段展示图-北京">
      整体培养日程阶段展示图
    </echartLayout>
    <echartLayout class="mt15" title="应届生培训总人数">
      <div slot="title" class="ml15 f12" style="color:#5F6266;padding-top:3px;"> 更新时间：2020-09 07 12:09:57</div>
      <xline id="totalPerson" :legend="totalPerson.legend" :x-axis="totalPerson.xAxis" :y-axis="totalPerson.yAxis" :series="totalPerson.series" />
    </echartLayout>
  </div>
</template>

<script>
import echartLayout from './echartLayout'
import xline from '@/components/echarts/line'
export default {
    components: { echartLayout, xline },
    data() {
        return {
            totalPerson: { // 总人数折线图
                legend: {},
                xAxis: {},
                yAxis: {},
                series: []
            }
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
            this.totalPerson = {
                legend: {
                    show: false
                },
                xAxis: {
                    data: ['01月', '02月', '03月', '04月', '05月', '06月', '07月', '08月', '09月', '10月', '11月', '12月']
                },
                yAxis: {
                    max: 200
                },
                series: [
                    this.setTJ()
                ]
            }
        },
        setTJ() {
            return { // 线条二
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
        }
    }
}
</script>

<style lang="scss" scoped>
.overall{
    .top{
        height: 415px;
    }
    .bottom{
        height: 518px;
    }
}

</style>
