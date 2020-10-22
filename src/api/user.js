import request from '@/utils/request'

/**
 * @description 用户登录
 * @author zc2513
 * @date 2020-09-12
 * @export
 * @param {*} data
 * @returns
 */
export function login(data) {
    return request({
        url: '/base/userSvc/login',
        method: 'post',
        data
    })
}

/**
 * @description 获取用户信息
 * @author zc2513
 * @date 2020-09-12
 * @export
 * @param {*} token
 * @returns
 */
export function getInfo(token) {
    return request({
        url: '/base/userSvc/getUserModel',
        method: 'get',
        params: { token }
    })
}

export function logout() {
    return request({
        url: '/vue-admin-template/user/logout',
        method: 'post'
    })
}

/**
 * @description 鉴权
 * @author zc2513
 * @date 2020-09-12
 * @export
 * @returns
 */
export function authToken() {
    return request({
        url: '/auth/token',
        method: 'post'
    })
}

/**
 * @description 修改用户密码
 * @author zc2513
 * @date 2020-09-12
 * @export
 * @returns
 */
export function updateUserPassword(data) {
    return request({
        url: '/base/userSvc/updateUserPassword',
        method: 'post',
        data
    })
}

