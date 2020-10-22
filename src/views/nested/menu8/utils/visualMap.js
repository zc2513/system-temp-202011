const options = { // 视觉映射组件
    type: 'piecewise',
    // splitNumber: 5, // 自动分割成几段 使用pieces模式无效
    // calculable: false, // 是否显示拖拽用的手柄 （手柄能拖拽调整选中范围） 使用pieces模式无效
    show: true, // 是否显示 visualMap-piecewise 组件。如果设置为 false，不会显示，但是数据映射的功能还存在。
    itemWidth: 20, // 图形的宽度
    itemHeight: 30, // 图形的高度
    itemGap: 0, // 每两个图元之间的间隔距离，单位为px。
    right: 0, // 接收百分比
    bottom: 0, // 接收百分比'10%'
    inRange: {
        color: ['rgba(85,168,243,.4)', '#55a8f3', '#1482e5', '#1c3fbf', '#070093']
    },
    seriesIndex: 0, // 指定取哪个系列的数据，即哪个系列的 series.data。默认取所有系列。
    pieces: [
        // { min: 0, max: 40 },
        // { min: 40, max: 80 },
        // { min: 80, max: 120 },
        // { min: 120, max: 160 },
        // { min: 160, max: 200 }
    ],
    textStyle: { // 设置文字颜色（Demo左下组件）
        color: '#eee'
    }
}

// 注： 如果连续型数据平均分段模式（即type=continuous）需指定min、max，如果不指定，则默认为 [0, 200] 默认平分为5段

export default function(pieces) {
    options.pieces = pieces
    return options
}
