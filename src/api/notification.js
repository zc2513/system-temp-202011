// 通知模块
import request from '@/utils/request'

/**
 * @description 通知添加接口
 * @author zc2513
 * @date 2020-11-05
 * @export
 * @param {*} data
 * @returns
 */
export function add(data) {
    return request({
        url: '/sys/annountCement/add',
        method: 'post',
        data
    })
}

/**
 * @description 通知列表
 * @author zc2513
 * @date 2020-11-05
 * @export
 * @param {*} params
 * @returns
 */
export function getList(params) {
    return request({
        url: '/sys/annountCement/list',
        method: 'get',
        params
    })
}

/**
 * @description 通知详情
 * @author zc2513
 * @date 2020-11-05
 * @export
 * @param {*} params
 * @returns
 */
export function getInfo(params) {
    return request({
        url: '/sys/annountCement/queryById',
        method: 'get',
        params
    })
}

/**
 * @description 通知发布
 * @author zc2513
 * @date 2020-11-05
 * @export
 * @param {*} params
 * @returns
 */
export function doReleaseData(params) {
    return request({
        url: '/sys/annountCement/doReleaseData',
        method: 'get',
        params
    })
}

/**
 * @description 通知列表全
 * @author zc2513
 * @date 2020-11-05
 * @export
 * @param {*} params
 * @returns
 */
export function listByUser(params) {
    return request({
        url: '/sys/annountCement/listByUser',
        method: 'get',
        params
    })
}

/**
 * @description 通知列表全
 * @author zc2513
 * @date 2020-11-05
 * @export
 * @param {*} params
 * @returns
 */
export function list(params) {
    return request({
        url: '/sys/sysAnnouncementSend/list',
        method: 'get',
        params
    })
}

/**
 * @description 一键已读
 * @author zc2513
 * @date 2020-11-05
 * @export
 * @param {*} params
 * @returns
 */
export function readAll(data) {
    return request({
        url: '/sys/sysAnnouncementSend/readAll',
        method: 'put',
        data
    })
}
