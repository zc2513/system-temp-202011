// 监督预警
import request from '@/utils/request'
/**
 * @description 获取监督预警列表
 * @author yansimin
 * @date 2020-09-21
 * @export
 * @returns
 */

export function getWarnTenProjectList(data) {
    return request({
        url: '/superviseCore/superviseWarnSvc/getWarnTenProjectList',
        method: 'post',
        data
    })
}

/**
 * @description 获取预警标段列表
 * @author yansimin
 * @date 2020-09-21
 * @export
 * @returns
 */

export function getWarnBidSectionList(data) {
    return request({
        url: '/superviseCore/superviseWarnSvc/getWarnBidSectionList',
        method: 'post',
        data
    })
}

/**
 * @description 获取预警标段详情
 * @author yansimin
 * @date 2020-09-21
 * @export
 * @returns
 */

export function getWarnListForBidSection(data) {
    return request({
        url: '/superviseCore/superviseWarnSvc/getWarnListForBidSection',
        method: 'post',
        data
    })
}

/**
 * @description 忽略当前预警
 * @author yansimin
 * @date 2020-09-21
 * @export
 * @returns
 */

export function ignoreForWarning(data) {
    return request({
        url: '/superviseCore/superviseWarnSvc/ignoreForWarning',
        method: 'post',
        data
    })
}

/**
 * @description 标记完成当前预警
 * @author yansimin
 * @date 2020-09-21
 * @export
 * @returns
 */

export function completeForWarning(data) {
    return request({
        url: '/superviseCore/superviseWarnSvc/completeForWarning',
        method: 'post',
        data
    })
}

/**
 * @description 当前预警详情
 * @author yansimin
 * @date 2020-09-21
 * @export
 * @returns
 */
getWinningBidderRelat
export function getWarnDetailForSection(data) {
    return request({
        url: '/superviseCore/superviseWarnSvc/getWarnDetailForSection',
        method: 'post',
        data
    })
}

/**
 * @description 招标人招标机构相关性
 * @author yansimin
 * @date 2020-09-21
 * @export
 * @returns
 */
export function getWinningBidderRelat(data) {
    return request({
        url: '/superviseCore/superviseWarnSvc/getWinningBidderRelat',
        method: 'post',
        data
    })
}
/**
 * @description 中标候选人相关性
 * @author yansimin
 * @date 2020-09-21
 * @export
 * @returns
 */
export function getWinningSelfRelat(data) {
    return request({
        url: '/superviseCore/superviseWarnSvc/getWinningSelfRelat',
        method: 'post',
        data
    })
}
