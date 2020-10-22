import request from '@/utils/request'

/**
 * @description 获取用户列表
 * @author zc2513
 * @date 2020-09-12
 * @export
 * @returns
 */
export function getUserList(data) {
    return request({
        url: '/base/userSvc/getUserList',
        method: 'post',
        data
    })
}

/**
 * @description 新增用户
 * @author zc2513
 * @date 2020-09-12
 * @export
 * @returns
 */
export function addUser(data) {
    data = {
        'UserName': 'admin',
        'UserAcct': 'string',
        'NickName': '超级管理员',
        'PassWord': 123456,
        'Phone': 13645678489,
        'QQ': '918918',
        'Sex': true,
        'Email': 'qqyy@163.com',
        'IsLock': true,
        'CompanyId': 0,
        'LockNum': 0,
        'IdentityCode': 'string',
        'LinkAddress': 'string',
        'PostCode': 'string'
    }
    return request({
        url: '/base/userSvc/addUser',
        method: 'post',
        data
    })
}

/**
 * @description 更新用户信息
 * @author zc2513
 * @date 2020-09-12
 * @export
 * @returns
 */
export function updateUser(data) {
    return request({
        url: '/base/userSvc/updateUser',
        method: 'post',
        data
    })
}

/**
 * @description 删除用户
 * @author zc2513
 * @date 2020-09-12
 * @export
 * @returns
 */
export function deleteUserByIds(data) {
    return request({
        url: '/base/userSvc/deleteUserByIds',
        method: 'post',
        data
    })
}
