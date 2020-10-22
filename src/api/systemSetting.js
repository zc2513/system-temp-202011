
// /superviseBase/supervConfigSvc/getDockPlatList

// 系统设置
import request from '@/utils/request'

/**
 * @description 获取对接平台列表
 * @author zc2513
 * @date 2020-09-21
 * @export
 * @param {*} data
 * @returns
 */
export function getDockPlatList(data) {
    return request({
        url: '/superviseBase/supervConfigSvc/getDockPlatList',
        method: 'post',
        data
    })
}

/**
 * @description 新增/编辑对接平台
 * @author zc2513
 * @date 2020-09-21
 * @export
 * @param {*} data
 * @url {*} addDockPlat 新增 editDockPlat 编辑
 * @returns
 */
export function addDockPlat(data, url) {
    return request({
        url: `/superviseBase/supervConfigSvc/${url}`,
        method: 'post',
        data
    })
}

/**
 * @description 启用或关闭对接平台
 * @author zc2513
 * @date 2020-09-21
 * @export
 * @param {*} data
 * @returns
 */
export function enableDockPlat(data) {
    return request({
        url: '/superviseBase/supervConfigSvc/enableDockPlat',
        method: 'post',
        data
    })
}

/**
 * @description 获取对接平台详情
 * @author zc2513
 * @date 2020-09-21
 * @export
 * @param {*} data
 * @returns
 */
export function getDockPlatDetail(data) {
    return request({
        url: '/superviseBase/supervConfigSvc/getDockPlatDetail',
        method: 'post',
        data
    })
}

/**
 * @description 获取对接平台操作历史记录
 * @author zc2513
 * @date 2020-09-21
 * @export
 * @param {*} data
 * @returns
 */
export function getDockPlatHistoryList(data) {
    return request({
        url: '/superviseBase/supervConfigSvc/getDockPlatHistoryList',
        method: 'post',
        data
    })
}

/**
 * @description 获取所有数据等级
 * @author zc2513
 * @date 2020-09-21
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
 * @description 保存数据等级
 * @author zc2513
 * @date 2020-09-21
 * @export
 * @param {*} data
 * @returns
 */
export function saveDataLevel(data) {
    return request({
        url: '/superviseBase/supervConfigSvc/saveDataLevel',
        method: 'post',
        data
    })
}

