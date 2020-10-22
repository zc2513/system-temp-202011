// 大屏展示
import request from '@/utils/request'

/**
 * @description 获取项目执行情况
 * @author cmh
 * @date 2020-09-21
 * @export
 * @param {*} data
 * @returns
 */
export function getSectionProgress(data) {
    return request({
        url: '/superviseBase/screenSvc/getSectionProgress',
        method: 'post',
        data
    })
}

/**
 * @description 获取项目网络分析
 * @author cmh
 * @date 2020-09-21
 * @export
 * @param {*} data
 * @returns
 */
export function getScreenSupervNet(data) {
    return request({
        url: '/superviseBase/screenSvc/getScreenSupervNet',
        method: 'post',
        data
    })
}
/**
 * @description 获取各省份今年/累计的标段数量
 * @author cmh
 * @date 2020-09-21
 * @export
 * @param {*} data
 * @returns
 */
export function getScreenStatisReport(data) {
    return request({
        url: '/superviseBase/screenSvc/getScreenStatisReport',
        method: 'post',
        data
    })
}

/**
 * @description 获取项目监督预警
 * @author cmh
 * @date 2020-09-21
 * @export
 * @param {*} data
 * @returns
 */
export function getScreenWarn(data) {
    return request({
        url: '/superviseBase/screenSvc/getScreenWarn',
        method: 'post',
        data
    })
}

/**
 * @description 获取招标动态
 * @author cmh
 * @date 2020-09-22
 * @export
 * @param {*} data
 * @returns
 */
export function getBidDynamicList(data) {
    return request({
        url: '/superviseBase/screenSvc/getBidDynamicList',
        method: 'post',
        data
    })
}

/**
 * @description 获取项目招标情况
 * @author cmh
 * @date 2020-09-22
 * @export
 * @param {*} data
 * @returns
 */
export function getScreenProvinceSectionReport(data) {
    return request({
        url: '/superviseBase/screenSvc/getScreenProvinceSectionReport',
        method: 'post',
        data
    })
}

/**
 * @description 获取地图图例
 * @author cmh
 * @date 2020-09-22
 * @export
 * @param {*} data
 * @returns
 */
export function getDataLevelList(data) {
    return request({
        url: '/superviseBase/supervConfigSvc/getDataLevelList',
        method: 'post',
        data
    })
}
/**
 * @description 获取地区水利工程项目招标
 * @author cmh
 * @date 2020-09-23
 * @export
 * @param {*} data
 * @returns
 */
export function getScreenRegionBid(data) {
    return request({
        url: '/superviseBase/screenSvc/getScreenRegionBid',
        method: 'post',
        data
    })
}

/**
 * @description 获取项目招标
 * @author cmh
 * @date 2020-09-22
 * @export
 * @param {*} data
 * @returns
 */
export function getClassifyReport(data) {
    return request({
        url: '/superviseBase/screenSvc/getClassifyReport',
        method: 'post',
        data
    })
}

/**
 * @description 交易主体
 * @author cmh
 * @date 2020-09-22
 * @export
 * @param {*} data
 * @returns
 */
export function getScreenTransSubject(data) {
    return request({
        url: '/superviseBase/screenSvc/getScreenTransSubject',
        method: 'post',
        data
    })
}
