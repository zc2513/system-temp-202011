<!-- 柱状图 -->
<template>
  <div :ref="id" :style="{height:height,width:width}">
    <div class="wfull hfull flcc" style="color:#FFF;">暂无数据</div>
  </div>
</template>

<script>
import echarts from 'echarts'
import resize from './mixins/resize.js'
export default {
    mixins: [resize],
    props: {
        id: {
            type: String,
            default: 'projectRegion'
        },
        width: {
            type: String,
            default: '100%'
        },
        height: {
            type: String,
            default: '100%'
        },
        barData: {
            type: Object,
            default: _ => {}
        }
    },
    watch: {
        barData: {
            handler(v) {
                if (!v) return
                this.$nextTick(() => this.init(v || {}))
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
        init(v) {
            if (!this.chart) this.chart = echarts.init(this.$refs[this.id])
            const option = this.setOption(v)
            this.chart.setOption(option)
        },

        setOption({ setGrid = {}, setLegend, setTooltip, setXAxis, setYAxis, setSeries = [] }) {
            const Option = {
                grid: this.setGrid(),
                legend: this.setLegend(setLegend),
                tooltip: this.setTooltip(setTooltip),
                xAxis: this.setXAxis(setXAxis),
                yAxis: this.setYAxis(setYAxis),
                series: this.setSeries(setSeries)
            }
            return Option
        },

        setGrid(config = {/* 其它配置*/}) { // 直角坐标系内绘图网格
            const setting = {
                show: false, // 是否显示直角坐标系网格
                left: '4%',
                right: '4%',
                bottom: 0,
                top: '20%',
                containLabel: true
            }
            return { ...setting, ...config }
        },

        setLegend(config = {/* 其它配置*/}) { // 图例组件
            const setting = {
                show: true, // 是否显示图例
                icon: 'circle',
                textStyle: { color: '#fff' }, // 图例文字颜色
                inactiveColor: '#ccc' // 图例关闭时的颜色。
                // data: ['中标金额', '项目数', '标段数', '哈哈哈']// data 没有被指定，会自动从当前系列中获取。注：如果指定则当前项包含系列name才显示，否则不显示
            }
            return { ...setting, ...config }
        },

        setTooltip(config = {/* 其它配置*/}) { // 提示框组件
            const setting = {
                show: true,
                trigger: 'axis', // 触发类型
                formatter: function(params) {
                    var str = ''
                    for (var i = 0; i < params.length; i++) {
                        if (params[i].seriesName !== '') {
                            str +=
                        params[i].name +
                        ':' +
                        params[i].seriesName +
                        params[i].value +
                        '<br/>'
                        }
                    }
                    return str
                }
            }
            return { ...setting, ...config }
        },

        setXAxis(params = [/* setting结构，只需要传入data与需要配置的配置项*/]) { // 直角坐标系 grid 中的 x 轴
            const setting = {
                type: 'category', // 类目轴 （值为value时则为数值轴，适用于连续数据）
                data: ['假数据', '未接收到数据', '广东', '河北', '吉林', '内蒙'],
                axisTick: {
                    show: false // 是否显示坐标轴刻度。
                },
                axisLabel: { // 刻度标签的相关设置。
                    textStyle: {
                        color: '#FFFFFF',
                        fontSize: 12
                    }
                },
                splitLine: { // 坐标轴在 grid 区域中的分隔线---默认数值轴显示，类目轴不显示。
                    show: false
                },
                axisPointer: { // 坐标轴指示器配置项。默认不显示。但是如果tooltip.trigger设置为'axis'或者tooltip.axisPointer.type设置为'cross'，则自动显示axisPointer。
                    type: 'shadow' // 鼠标滑过柱状的隐形 line/shadow/none
                },
                axisLine: {
                    show: false, // 是否显示坐标轴轴线。false（以下设置不生效）
                    lineStyle: { // 坐标轴线线的颜色。
                        color: '#000'
                    }
                }
            }
            return !params.length ? [setting] : params.map(item => {
                return { ...setting, ...item }
            })
        },

        setYAxis(params) { // 直角坐标系 grid 中的 Y 轴
            params = params || [{ name: '(数量)' }, { name: '(金额/万)' }]
            return params.map((item, key) => {
                const setting = { // 默认值指向问题 暂时放入内部
                    type: 'value',
                    name: '(数量)',
                    nameTextStyle: { // name样式
                        color: '#CCCCCC', // 字体颜色
                        align: 'right', // 水平对齐方式
                        verticalAlign: 'bottom', // 垂直对齐方式
                        lineHeight: 30
                    },
                    axisLabel: { // 坐标轴刻度标签的相关设置。
                        formatter: '{value}',
                        margin: 15, // 刻度标签与轴线之间的距离。
                        textStyle: {
                            color: '#CCCCCC',
                            fontSize: 12
                        }
                    },
                    axisLine: { // Y相关样式
                        show: false, // 是否显示
                        lineStyle: {
                            color: 'red'
                        }
                    },
                    axisTick: { // 坐标轴刻度相关设置。
                        show: false// 是否显示坐标轴刻度。
                    },
                    splitLine: { // x方向分割线
                        show: true,
                        lineStyle: {
                            color: 'rgba(8,36,69,1)',
                            type: 'dashed'
                        }
                    }
                }
                if (key === 1) { // 默认修改值 如果传入相关配置则会被覆盖
                    setting.nameTextStyle.align = 'left'
                    setting.splitLine.lineStyle.color = 'rgba(255,255,255,0.2)'
                }
                return { ...setting, ...item }
            })
        },

        setSeries(params) { // 系列数组处理
            if (!params.length) {
                return [this.setBar(), this.setLine(), this.setBar({ name: '项目数', data: [6, 4, 1, 3, 2, 5], color: '#666' })]
            }
            return params.map(item => {
                if (item.type === 'line') {
                    return this.setLine(item)
                }
                if (item.type === 'bar') {
                    return this.setBar(item)
                }
            })
        },

        setBar(params = {/* setting结构，只需要传入data与需要配置的配置项*/}) { // 柱状图series
            const setting = {
                type: 'bar',
                name: '项目数', // 系列名称，用于tooltip的显示，legend 的图例筛选
                data: [3, 2, 2, 3, 2, 1],
                color: '#00F', // 柱状色
                barGap: '10%', // 不同系列的柱间距离
                // barCategoryGap: '25%', // 同一系列的柱间距离
                animationEasing: 'quinticIn' // 初始动画的缓动效果
            }
            return { ...setting, ...params }
        },

        setLine(params = {/* setting结构，只需要传入data与需要配置的配置项*/}) { // 线状图series
            const setting = {
                type: 'line',
                name: '中标金额', // 系列名称
                data: [622435, 82000, 76007, 300000, 100000, 50000],
                symbol: 'circle', // 标记的图形
                symbolSize: 10, // 标记的大小
                label: { // 图形上的文本标签
                    normal: { show: false }
                },
                lineStyle: { // 线条样式。
                    normal: { color: '#FFF', width: 1 }
                },
                itemStyle: { // 折线拐点标志的样式。
                    normal: {
                        color: '#FFF', // 填充色
                        borderColor: '#FFF', // 边框色
                        borderWidth: 1
                    }
                },
                smooth: false, // 是否平滑曲线显示
                yAxisIndex: 1 // 指定当前数据根据(yAxis)的数组索引，的y轴渲染折线图（注如果与其它内容差异过大会导致当前或其它显示看不到情况），
            }
            return { ...setting, ...params }
        }
    }
}
// itemStyle 为兼容echarts2.x
</script>

