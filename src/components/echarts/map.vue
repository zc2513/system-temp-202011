<!-- 地图 -->
<template>
  <div ref="myChartChina" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'

import { seriesMap, visualMap, geo } from './map/index'

import resize from './mixins/resize'
export default {
    mixins: [resize],
    props: {
        mapDatas: { // 地图相关数据
            type: Array,
            default: _ => []
        },
        pieces: { // 右侧坐标标注
            type: Array,
            default: _ => [
                { min: 0, max: 50 },
                { min: 50, max: 100 },
                { min: 100, max: 150 },
                { min: 150, max: 200 },
                { min: 200, max: 250 }
            ]
        },
        width: {
            type: String,
            default: '100%'
        },
        height: {
            type: String,
            default: '100%'
        }
    },
    data() {
        return {
            chart: null,
            bubble: [], // 气泡图
            hotData: [], // 热力图
            registeName: 'china',
            mapJson: require('./json/city/100000.json')
        }
    },
    watch: {
        mapDatas: {
            handler(v) {
                if (!v.length) return
                this.$nextTick(() => this.init())
            },
            immediate: true
        }
    },
    beforeDestroy() {
        if (!this.chart) return
        this.chart.dispose()
        this.chart = null
    },
    methods: {
        redraw() {
            // 1.挂载实例
            this.chart = echarts.init(this.$refs.myChartChina)
            // 2.绑定事件
            this.chart.on('click', $mod => { // 点击拿到当前图层series里面data的当前项数据，data不存在则为undefind
            // 2.1 非空（后期需要提示用户该区域没有数据-无法下钻）
                if (!$mod.data || !$mod.data.code) return
                this.init($mod.data)
            })
        },
        init(next) {
            // 1.是否未挂载实例
            if (!this.chart) this.redraw()
            // 下钻静态资源加载及数据请求
            if (next) {
                this.registeName = '中国'
                this.mapJson = require(`./json/city/${next.code}.json`)
                this.$parent.init(next.code)
                this.$emit('input', next.code)
                return
            }

            // 2.初始化地图
            echarts.registerMap(this.registeName, this.mapJson)

            // 处理地理坐标参数配置项
            const json = echarts.getMap(this.registeName).geoJson.features
            this.getMapJson(json)

            // 3.地图配置
            const options = { // 地图配置
                geo: geo({ map: this.registeName, zoom: this.registeName === 'china' ? 1.1 : 0.95 }), // 地理坐标系组件
                visualMap: visualMap(this.pieces), // 右下角配置
                series: seriesMap({ mapParams: { data: this.hotData }, bubble: this.bubble })
            }
            // 4.设置配置
            this.chart.setOption(options) // 设置配置项
        },

        getMapJson(json) { // 获取地理坐标系&&处理显示数据
            // 1.提取经纬度及省市区编码
            const nowCitys = json.map(item => {
                const { id: code, properties: { cp, name }} = item
                return { code, cp, name }
            })

            // 2.返回地区与本地json地区数据混合
            const newData = []
            for (let item of nowCitys) {
                for (const el of this.mapDatas) {
                    if (item.code === el.RegionCode) item = { ...item, ...el }
                }
                newData.push(item)
            }

            // 3. 过滤气泡数据
            this.bubble = newData.filter(e => e.TodayIsAdded).map(item => {
                return { value: item.cp, number: item.BidSectionCount }
            })

            // 4.过滤热力值数据
            this.hotData = newData.map(item => {
                return {
                    code: item.code, // 查找文件名
                    value: item.BidSectionCount,
                    name: item.name
                }
            })
        }

    }
}
</script>

