// 地理坐标系组件
const baseOptions = {
    type: 'map',
    map: 'china',
    roam: true, // 平移 缩放
    top: '10%', // 地图位置
    aspectScale: 0.8,
    zoom: 1.1,
    label: { // 当前地区的文字及高亮设置...（文本设置）
        normal: {
            show: true,
            textStyle: {
                color: '#fff'
            }
        },
        emphasis: {
            show: true,
            color: '#00F',
            fontWeight: 'bold'
        }
    },
    itemStyle: { // 地图样式背景，边线及各个模块高亮设置（地图图层设置）
        normal: { // 默认
            areaColor: '#121F49',
            borderColor: '#27fcfe'
        },
        emphasis: { // hover地图高亮
            show: false
            // areaColor: '#0F0'
        }
    },
    regions: [// 隐藏配置
        {
            name: '南海诸岛',
            itemStyle: { normal: { opacity: 0 }},
            label: { show: false }
        }
    ]
}

export default function(params = {}) {
    return { ...baseOptions, ...params }
}
