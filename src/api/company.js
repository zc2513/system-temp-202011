// 机构、公司
import request from '@/utils/request'

/**
 * @description 添加机构/公司
 * @author zc2513
 * @date 2020-09-12
 * @export
 * @param {*} data
 * @returns
 */
export function addCompany(data) {
    return request({
        url: '/base/userSvc/addCompany',
        method: 'post',
        data
    })
}

/**
 * @description 更新/更改(机构/公司)信息
 * @author zc2513
 * @date 2020-09-12
 * @export
 * @param {*} data
 * @returns
 */
export function updateCompany(data) {
    return request({
        url: '/base/userSvc/updateCompany',
        method: 'post',
        data
    })
}

/**
 * @description 获取(机构/公司)列表信息
 * @author zc2513
 * @date 2020-09-12
 * @export
 * @param {*} data
 * @returns
 */
export function getCompanyList(data) {
    return request({
        url: '/base/userSvc/getCompanyList',
        method: 'post',
        data
    })
}

/**
 * @description 未知
 * @author zc2513
 * @date 2020-09-12
 * @export
 * @param {*} data
 * @returns
 */
export function getCompanyModel(data) {
    return request({
        url: '/base/userSvc/getCompanyModel',
        method: 'post',
        data
    })
}

/**
 * @description 删除(机构/公司)
 * @author zc2513
 * @date 2020-09-12
 * @export
 * @param {*} data
 * @returns
 */
export function deleteCompanyByIds(data) {
    return request({
        url: '/base/userSvc/deleteCompanyByIds',
        method: 'post',
        data
    })
}

/**
 * @description 未知
 * @author zc2513
 * @date 2020-09-12
 * @export
 * @param {*} data
 * @returns
 */
export function auditUser(data) {
    return request({
        url: '/base/userSvc/auditUser',
        method: 'post',
        data
    })
}

