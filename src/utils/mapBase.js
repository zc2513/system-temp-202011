const geoCoordMap = { // 气泡
    '甘肃': [103.73, 36.03],
    '青海': [101.74, 36.56],
    '四川': [104.06, 30.67],
    '河北': [114.48, 38.03],
    '云南': [102.73, 25.04],
    '贵州': [106.71, 26.57],
    '湖北': [114.31, 30.52],
    '河南': [113.65, 34.76],
    '山东': [117, 36.65],
    '江苏': [118.78, 32.04],
    '安徽': [117.27, 31.86],
    '浙江': [120.19, 30.26],
    '江西': [115.89, 28.68],
    '福建': [119.3, 26.08],
    '广东': [113.23, 23.16],
    '湖南': [113, 28.21],
    '海南': [110.35, 20.02],
    '辽宁': [123.38, 41.8],
    '吉林': [125.35, 43.88],
    '黑龙江': [126.63, 45.75],
    '山西': [112.53, 37.87],
    '陕西': [108.95, 34.27],
    '台湾': [121.30, 25.03],
    '北京': [116.46, 39.92],
    '上海': [121.48, 31.22],
    '重庆': [106.54, 29.59],
    '天津': [117.2, 39.13],
    '内蒙古': [111.65, 40.82],
    '广西': [108.33, 22.84],
    '西藏': [91.11, 29.97],
    '宁夏': [106.27, 38.47],
    '新疆': [87.68, 43.77],
    '香港': [114.17, 22.28],
    '澳门': [113.54, 22.19]
}

// 定义全国省份的数组
const provinces = [
    'shanghai',
    'hebei',
    'shanxi',
    'neimenggu',
    'liaoning',
    'jilin',
    'heilongjiang',
    'jiangsu',
    'zhejiang',
    'anhui',
    'fujian',
    'jiangxi',
    'shandong',
    'henan',
    'hubei',
    'hunan',
    'guangdong',
    'guangxi',
    'hainan',
    'sichuan',
    'guizhou',
    'yunnan',
    'xizang',
    'shanxi1',
    'gansu',
    'qinghai',
    'ningxia',
    'xinjiang',
    'beijing',
    'tianjin',
    'chongqing',
    'xianggang',
    'aomen',
    'taiwan'
]

const provincesText = [
    '上海',
    '河北',
    '山西',
    '内蒙古',
    '辽宁',
    '吉林',
    '黑龙江',
    '江苏',
    '浙江',
    '安徽',
    '福建',
    '江西',
    '山东',
    '河南',
    '湖北',
    '湖南',
    '广东',
    '广西',
    '海南',
    '四川',
    '贵州',
    '云南',
    '西藏',
    '陕西',
    '甘肃',
    '青海',
    '宁夏',
    '新疆',
    '北京',
    '天津',
    '重庆',
    '香港',
    '澳门',
    '台湾'
]

// 各省热力值基数
const hotData = [{
    name: '北京',
    value: 0
},
{
    name: '天津',
    value: 0
},
{
    name: '上海',
    value: 0
},
{
    name: '河北',
    value: 0
},
{
    name: '河南',
    value: 0
},
{
    name: '云南',
    value: 0
},
{
    name: '辽宁',
    value: 0
},
{
    name: '黑龙江',
    value: 0
},
{
    name: '湖南',
    value: 0
},
{
    name: '安徽',
    value: 0
},
{
    name: '山东',
    value: 0
},
{
    name: '新疆',
    value: 0
},
{
    name: '江苏',
    value: 0
},
{
    name: '浙江',
    value: 0
},
{
    name: '江西',
    value: 0
},
{
    name: '湖北',
    value: 0
},
{
    name: '广西',
    value: 0
},
{
    name: '甘肃',
    value: 0
},
{
    name: '山西',
    value: 0
},
{
    name: '内蒙古',
    value: 0
},
{
    name: '陕西',
    value: 0
},
{
    name: '吉林',
    value: 0
},
{
    name: '福建',
    value: 0
},
{
    name: '贵州',
    value: 0
},
{
    name: '广东',
    value: 0
},
{
    name: '青海',
    value: 0
},
{
    name: '西藏',
    value: 0
},
{
    name: '四川',
    value: 0
},
{
    name: '宁夏',
    value: 0
},
{
    name: '海南',
    value: 0
},
{
    name: '重庆',
    value: 0
},
{
    name: '台湾',
    value: 0
},
{
    name: '香港',
    value: 0
},
{
    name: '澳门',
    value: 0
}
]
// 计算气泡经纬度
function convertData(data) {
    const newdata = data.map(item => {
        if (geoCoordMap[item.name]) {
            return {
                name: item.name,
                value: geoCoordMap[item.name].concat('')
            }
        }
    })
    return newdata
}
export {
    provinces,
    provincesText,
    hotData,
    convertData
}
