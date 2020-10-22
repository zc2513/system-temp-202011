<!-- 地图 -->
<template>
  <div ref="myChartChina" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'

import { seriesMap, visualMap, provinces, geo } from './map/index'

import resize from './mixins/resize'
export default {
    mixins: [resize],
    props: {
        // hotData: { // 热力图
        //     type: Array,
        //     default: _ => {
        //         return provinces.filter(e => e.value)
        //     }
        // },
        // bubble: { // 气泡图
        //     type: Array,
        //     default: _ => {
        //         return provinces.filter(e => e.value).map(ele => {
        //             return { value: ele.coordinates, number: (Math.random() * 10).toFixed(0) }
        //         })
        //     }
        // },
        mapDatas: { // 地图相关数据
            type: Array,
            default: _ => {
                return provinces.filter(e => e.value).map(ele => {
                    return { value: ele.coordinates, number: (Math.random() * 10).toFixed(0) }
                })
            }
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
            china: require('./json/china.json'), // 引入中国地图
            bubble: [], // 气泡图
            hotData: []// 热力图
        }
    },
    watch: {
        mapDatas: {
            handler(v) {
                if (!v) return

                v = v.map(item => { // 返回地区与本地json地区数据混合
                    for (const el of provinces) {
                        if (item.ProvinceName.includes(el.name)) {
                            return { ...item, base: el, lg: el.coordinates }
                        }
                    }
                })

                this.bubble = v.filter(e => e.TodayIsAdded).map(item => { // 气泡
                    return { value: item.lg, number: item.BidSectionCount }
                })

                this.hotData = v.map(item => { // 热力值
                // code 用来传递下钻参数
                    return { code: item.base.code, value: item.BidSectionCount, name: item.ProvinceName }
                })

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
            this.chart = echarts.init(this.$refs.myChartChina)

            this.chart.on('click', item => { // 点击拿到当前图层series里面data的当前项数据，data不存在则为undefind
                // if (!item.data) return
                // console.log(item)
                // this.init(item.data)
                // echarts.init(this.$refs.myChartChina).dispose() // 清除上一次绘制的中国地图（防止死循环）
                // this.myChartChina = echarts.init(this.$refs.myChartChina) // 挂载地图实例
                // try {
                //     // 防止岛屿获取name/value失败的情况
                //     const { name, value } = $mod.data
                //     switch ($mod.data.zoom) {
                //         case 1: // 绘制城市地图
                //             this.rendCity(name, value)
                //             break
                //         case 2: // 绘制县区地图
                //             this.rendCounty(name, $mod.data.data.id)
                //             break
                //         case 3: // 最后一级、返回中国地图
                //             this.rendChina()
                //             break
                //     }
                // } catch (err) {
                //     this.rendChina() // 获取不到name/value、返回中国地图
                // }
            })
        },
        init(next) {
            // 1.初始化
            if (!this.chart) this.redraw()

            // 2.绘制地图
            let mapJson = require('./json/china.json')
            let registeName = 'china'
            if (next) { // 下钻
                registeName = '中国'
                mapJson = require(`./json/province/${next.code}.json`)
            }
            if (registeName === 'china') { // 处理返回
                this.$emit('input', false)
            } else {
                this.$emit('input', {})
            }
            echarts.registerMap(registeName, mapJson)

            // 3.地图配置
            const options = { // 地图配置
                geo: geo({ map: registeName, zoom: registeName === 'china' ? 1.1 : 0.95 }), // 地理坐标系组件
                visualMap: visualMap(this.pieces), // 右下角配置
                series: seriesMap({ mapParams: { data: this.hotData }, bubble: this.bubble })
            }

            // 4.设置配置
            this.chart.setOption(options) // 设置配置项
        }
    }
}
</script>

