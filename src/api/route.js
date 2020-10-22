// 页面路由维护
import request from '@/utils/request'

/**
 * @description 添加路由
 * @author zc2513
 * @date 2020-09-12
 * @export
 * @param {*} data
 * @returns
 */
export function addRoute(data) {
    return request({
        url: '/base/userSvc/addRight',
        method: 'post',
        data
    })
}

/**
 * @description 获取路由列表
 * @author zc2513
 * @date 2020-09-12
 * @export
 * @param {*} data
 * @returns
 */
export function getRoutes(data) {
    return request({
        url: '/base/userSvc/getRightModel',
        method: 'post',
        data
    })
}

/**
 * @description 更新路由表
 * @author zc2513
 * @date 2020-09-12
 * @export
 * @param {*} data
 * @returns
 */
export function updateRoutes(data) {
    return request({
        url: '/base/userSvc/updateRight',
        method: 'post',
        data
    })
}

// /base/userSvc/loadRightList
// /base/userSvc/getRolesByUserId
// /base/userSvc/getRightByRoleIds
// /base/userSvc/setUserRole
// /base/userSvc/deleteRightbyIds
