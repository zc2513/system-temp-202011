<!-- 地图组件 -->
<template>
  <div ref="myChartChina" class="map" style="width:100%;height:100%;" />
</template>

<script>
import { convertData, provinces, provincesText } from '@/utils/mapBase'
import echarts from 'echarts'
export default {
    // 组件
    components: {},
    props: {
        hotData: { type: Array, default: () => {} }, // 各省地图热力值数据
        newInfo: { type: Array, default: () => {} }, // 最新推送数据（气泡）
        pieces: { type: Array, default: () => [] } // 图例数据
    },
    data() {
        return {
            myChartChina: null, // 地图实例
            option: {
                // 地图配置
                geo: {
                    map: '',
                    top: '5%', // 地图位置
                    zoom: 1.1,
                    label: {
                        normal: {
                            show: true,
                            textStyle: {
                                color: '#fff'
                            }
                        },
                        emphasis: {
                            show: false
                            // areaColor: "#00FFFF",
                        }
                    },
                    // 地图地图样式
                    itemStyle: {
                        // 默认
                        normal: {
                            areaColor: '#134C60',
                            borderColor: '#27fcfe'
                        },
                        // 高亮
                        emphasis: {
                            show: false
                        }
                    }
                },
                // 右下角配置
                visualMap: {
                    type: 'piecewise',
                    padding: [0, 0],
                    show: true,
                    itemWidth: 20,
                    itemHeight: 30,
                    x: '82%',
                    y: '70%',
                    itemGap: -3, // 两端文字主体之间的距离，单位为px。
                    calculable: true, // 是否显示拖拽用的手柄（手柄能拖拽调整选中范围）
                    textStyle: {
                        // 设置文字颜色（Demo左下组件）
                        color: '#eee'
                    },
                    color: [
                        '#070093',
                        '#1c3fbf',
                        '#1482e5',
                        '#55a8f3',
                        'rgba(85,168,243,.4)'
                    ],
                    seriesIndex: 0, //
                    pieces: ''
                },
                series: [
                    {
                        // 地图类型
                        type: 'map',
                        zoom: 1.1,
                        mapType: 'mapName',
                        nameMap: 'mapName',
                        geoIndex: 0,

                        // 加载值
                        data: '' // 地图
                    },
                    // 热力图
                    {
                        type: 'map',
                        geoIndex: 0
                    },
                    // 气泡
                    {
                        name: '',
                        type: 'scatter',
                        coordinateSystem: 'geo',
                        data: '',
                        symbol: 'pin', // 气泡类型
                        symbolSize: 40, // 气泡显示大小
                        label: {
                            normal: {
                                show: true,
                                formatter: '{@[2]}', // 将集合中序号为2的显示在气泡上，默认为1{x,y,val}
                                textStyle: {
                                    color: '#fff'
                                }
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: '#F62157' // 标志颜色
                            }
                        }
                    }
                ]
            }
        }
    },
    computed: {},
    watch: {
    // 监听数据改变（临时，需要对接websocket）
        newInfo: {
            handler(newVal, oldVal) {
                // 热力图实时更新
                //   this.option.series[1].data = this.hotData; // 实时刷新热力图
                // 气泡实时推送
                this.option.series[2].data = convertData(this.newInfo) // 处理经纬度  //实时通知气泡展示
                this.myChartChina.setOption(this.option) // 设置配置项
            },
            deep: true
        }
    },
    // 创建完成
    created() {},
    // 挂载完成
    mounted() {
    // 初始化地图
    // this.rendChina();
    // 地图宽高自适应
        window.onresize = () => {
            this.myChartChina.resize()
        }
    },
    methods: {
    // 模拟websocket推送数据
        test() {},
        // 推送数据结束 > 删除气泡展示
        deleteTooltip() {
            this.option.series[2].data = convertData(this.newInfo)
            this.myChartChina.setOption(this.option) // 设置配置项
        },
        // 挂载Eachrts实例（配置、监听click事件）
        renderMap(mapName, cityNameList) {
            // 绑定监听事件
            // this.myChartChina.on('click', $mod => {
            //     console.log($mod)
            //     echarts.init(this.$refs.myChartChina).dispose() // 清除上一次绘制的中国地图（防止死循环）
            //     this.myChartChina = echarts.init(this.$refs.myChartChina) // 挂载地图实例
            //     try {
            //         // 防止岛屿获取name/value失败的情况
            //         const { name, value } = $mod.data
            //         switch ($mod.data.zoom) {
            //             case 1: // 绘制城市地图
            //                 this.rendCity(name, value)
            //                 break
            //             case 2: // 绘制县区地图
            //                 this.rendCounty(name, $mod.data.data.id)
            //                 break
            //             case 3: // 最后一级、返回中国地图
            //                 this.rendChina()
            //                 break
            //         }
            //     } catch (err) {
            //         this.rendChina() // 获取不到name/value、返回中国地图
            //     }
            // })
            //   此处代码暂时模拟数据改变，非正式！
            this.option.geo.map = mapName
            this.option.series[0].name = mapName
            this.option.series[0].mapType = mapName
            this.option.series[0].nameMap = mapName
            this.option.series[0].data = cityNameList
            this.option.series[1].mapType = mapName
            this.option.series[1].data = this.hotData
            this.option.series[2].data = convertData(this.newInfo)
            // 针对海南放大
            if (mapName === '海南') {
                [
                    this.option.series[0].center,
                    this.option.series[0].layoutCenter,
                    this.option.series[0].layoutSize
                ] = [[109.844902, 19.0392], ['50%', '50%'], '300%']
            } else {
                // 非显示海南时，将设置的参数恢复默认值
                this.option.series[0].center = this.option.series[0].layoutCenter = this.option.series[0].layoutSize =
          ''
            }
            this.myChartChina.setOption(this.option) // 设置配置项
        },
        // 注册中国地图
        rendChina(data) {
            this.myChartChina = echarts.init(this.$refs.myChartChina)
            this.option.visualMap.pieces = this.pieces
            const china = require('@/assets/json/monitoring/china.json') // 引入中国地图
            const mapName = []
            // 配置中国地图元信息
            china.features.forEach(item => {
                const name = item.properties.name
                const value = provinces[provincesText.indexOf(item.properties.name)]
                // 城市名称信息：名称 城市编码 层级
                mapName.push({ name, value, zoom: 1 })
            })
            // 注册
            echarts.registerMap('中国', china)
            // 绘制中国地图
            this.renderMap('中国', mapName)
        },
        // 绘制市级地图
        rendCity(name, value) {
            // name  中文名，如：陕西
            // value 拼音名，如：shanxi
            const cityData = require(`@/assets/json/monitoring/province/${value}.json`) // 引入通过zoom：1 对应的市级地图
            echarts.registerMap(name, cityData) // 绘制通过zoom：1 对应的市级地图
            // 配置市级地图元信息
            const countyName = []
            cityData.features.forEach(county => {
                countyName.push({
                    name: county.properties.name,
                    value: null,
                    data: county,
                    parent: value,
                    zoom: 2
                })
            })
            // 加载地图
            this.renderMap(name, countyName)
        },
        // 绘制县区地图
        rendCounty(name, value) {
            // name  中文名，如：西安
            // value 县区编码，如：000222
            try {
                Promise.resolve(
                    require(`@/assets/json/monitoring/city/${value}.json`)
                ).then(res => {
                    echarts.registerMap(name, res) // 绘制县级地图
                    // 配置县级数据（主力是zoom 区别最后一层）
                    const endName = []
                    res.features.forEach(item => {
                        endName.push({
                            name: item.properties.name,
                            value: null,
                            data: item,
                            zoom: 3
                        })
                    })
                    // 县区名称配置
                    this.renderMap(name, endName)
                })
            } catch (err) {
                this.rendChina()
            }
        }
    // ---------------------------
    }
}
</script>
<style lang="scss" scoped>
</style>
