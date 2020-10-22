// 地图配置
function mapConfig(mapName = '', cityNameList = '') {
    const option = {
        // 地图配置
        geo: { // GEO
            map: mapName,
            top: '10%', // 地图位置
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
            y: '65%',
            itemGap: 0, // 两端文字主体之间的距离，单位为px。
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
            seriesIndex: 0,
            pieces: []
        },
        series: [
            // 0
            {
                // 地图类型
                name: mapName,
                type: 'map',
                zoom: 1.2,
                mapType: mapName,
                nameMap: mapName,
                geoIndex: 0
                // 加载值
                // data: convertData(this.newInfo) // 地图
                //
            },
            // 热力图
            {
                type: 'map',
                geoIndex: 0
            }
        ]
    }
    return option
}
const scatter = {
    type: 'scatter',
    data: [],
    coordinateSystem: 'geo',
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
export {
    mapConfig,
    scatter
}
