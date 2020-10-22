<!-- 地图 -->
<template>
  <div ref="myChartChina" class="map" style="backgroundColor:#15324d;width:100%;height:100%;" />
</template>

<script>
import echarts from 'echarts'
import provinces from './utils/mapName'
import { seriesMap } from './utils/series-map'
import geo from './utils/geo'
import visualMap from './utils/visualMap'
import resize from '@/components/echarts/mixins/resize'
export default {
    mixins: [resize],
    data() {
        return {
            chart: null,
            china: require('@/assets/json/monitoring/china.json') // 引入中国地图
        }
    },
    beforeDestroy() {
        if (!this.chart) return
        this.chart.dispose()
        this.chart = null
    },
    // 挂载完成
    mounted() {
        this.init()
    },
    methods: {
        redraw() {
            this.chart = echarts.init(this.$refs.myChartChina)
        },
        init() {
            const pieces = [ // 右侧坐标标注
                { min: 0, max: 50 },
                { min: 50, max: 100 },
                { min: 100, max: 150 },
                { min: 150, max: 200 },
                { min: 200, max: 250 }
            ]

            const hotData = provinces.filter(e => e.value) // 热力图

            const bubble = hotData.map(e => { // 气泡图
                return { value: e.coordinates, number: (Math.random() * 10).toFixed(0) }
            })

            // 1.初始化
            if (!this.chart) this.redraw()
            // 2.配置中国地图元信息
            // const mapName = this.china.features.map(item => {
            //     return {
            //         name: item.properties.name,
            //         value: provinces[provincesText.indexOf(item.properties.name)],
            //         zoom: 1
            //     }
            // })
            // console.log(mapName)

            // 3.绘制中国地图
            echarts.registerMap('china', this.china)

            const options = { // 地图配置
                geo, // 地理坐标系组件
                visualMap: visualMap(pieces), // 右下角配置
                series: seriesMap({ hotData, bubble })
            }

            this.chart.setOption(options) // 设置配置项
        }
    }
}
</script>

