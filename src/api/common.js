// 公用接口
import request from '@/utils/request'

/**
 * @description 获取年
 * @author zc2513
 * @date 2020-09-19
 * @export
 * @param {*} data
 * @returns
 */
export function getDicYear(data) {
    return request({
        url: '/superviseBase/baseSvc/getDicYear',
        method: 'get',
        data
    })
}

/**
 * @description 获取行业门类字典
 * @author zc2513
 * @date 2020-09-19
 * @export
 * @param {*} data
 * @returns
 */
export function getDicIndustryClass() {
    return request({
        url: '/superviseBase/baseSvc/getDicIndustryClass',
        method: 'get'
    })
}

/**
 * @description 获取平台类型
 * @author zc2513
 * @date 2020-09-19
 * @export
 * @param {*} data
 * @returns
 */
export function getPlatTypeList() {
    return request({
        url: '/superviseBase/baseSvc/getPlatTypeList',
        method: 'get'
    })
}

/**
 * @description 获取省
 * @author zc2513
 * @date 2020-09-19
 * @export
 * @param {*} data
 * @returns
 */
export function getRegionList(data) {
    return request({
        url: '/superviseBase/baseSvc/getRegionList',
        method: 'post',
        data
    })
}

/**
 * @description 获取市
 * @author zc2513
 * @date 2020-09-19
 * @export
 * @param {*} data
 * @returns
 */
export function getRegionFullName(data) {
    return request({
        url: '/superviseBase/baseSvc/getRegionFullName',
        method: 'post',
        data
    })
}

/**
 * @description 项目进度列表
 * @author zc2513
 * @date 2020-09-19
 * @export
 * @param {*} data
 * @returns
 */
export function getProjProgressList(data) {
    return request({
        url: '/superviseBase/baseSvc/getProjProgressList',
        method: 'get',
        data
    })
}

