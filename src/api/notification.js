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
 * @description 通知添加接口
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
 * @description 通知添加接口
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
