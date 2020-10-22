// 角色列表
import request from '@/utils/request'

/**
 * @description 添加角色
 * @author zc2513
 * @date 2020-09-12
 * @export
 * @param {*} data
 * @returns
 */
export function addRole(data) {
    return request({
        url: '/base/userSvc/addRole',
        method: 'post',
        data
    })
}

/**
 * @description 修改角色
 * @author zc2513
 * @date 2020-09-12
 * @export
 * @param {*} data
 * @returns
 */
export function updateRole(data) {
    return request({
        url: '/base/userSvc/updateRole',
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
export function getRoleModel(data) {
    return request({
        url: '/base/userSvc/getRoleModel',
        method: 'post',
        data
    })
}

/**
 * @description 获取角色列表
 * @author zc2513
 * @date 2020-09-12
 * @export
 * @param {*} data
 * @returns
 */
export function getRoleList(data) {
    return request({
        url: '/base/userSvc/getRoleList',
        method: 'post',
        data
    })
}

/**
 * @description 删除角色
 * @author zc2513
 * @date 2020-09-12
 * @export
 * @param {*} data
 * @returns
 */
export function deleteRoleByIds(data) {
    return request({
        url: '/base/userSvc/deleteRoleByIds',
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
export function setRoleRight(data) {
    return request({
        url: '/base/userSvc/setRoleRight',
        method: 'post',
        data
    })
}

