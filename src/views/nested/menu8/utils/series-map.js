/**
 * @des 系列列表-地图配置
 * @description 中国地图(地图配置/气泡图配置)
 * @author zc2513
 * @date 2020-09-29
 * @export
 * @param {*} hotData
 * @returns
 */
export function seriesMap({ hotData, bubble }) {
    return [typeMap(hotData), typeScatter(bubble)]
}

// 地图配置
function typeMap(data) {
    return {
        // name: '中国',//地图标题
        type: 'map',
        // zoom: 1.2,
        // mapType: '中国',
        // nameMap: '中国',
        geoIndex: 0,
        data // 热力图
    }
}

// 气泡图配置
function typeScatter(bubble) {
    return {
        type: 'scatter',
        data: bubble || [// 数据的几种格式
            [108.95, 34.27],
            { value: [118.78, 32.04], number: '值' },
            { value: [115.89, 28.68], label: {/* 自定义标签样式，仅对该数据项有效 */}, itemStyle: {/* 自定义特殊 itemStyle，仅对该数据项有效 */}}
        ],
        coordinateSystem: 'geo', //* *根据地理坐标系管理
        symbol: 'pin', // 气泡类型
        symbolSize: 40, // 气泡显示大小
        label: {
            normal: {
                show: true,
                formatter: function(params) {
                    const { data } = params
                    return data.number || ''
                },
                textStyle: { color: '#fff' }
            }
        },
        itemStyle: { // 气泡图层设置（背景/样式）
            normal: {
                color: '#F62157'
            }
        }
    }
}

