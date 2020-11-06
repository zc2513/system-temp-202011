import request from '@/utils/request'

const url = {
    add: 'com.thundersoft.fm/fstFmMonthly/add', // 应届生培养-一线经理月报-添加,
    list: 'com.thundersoft.fm/fstFmMonthlyUserMerits/queryList', //  应届生培养-一线经理月报，人员绩效-列表查询', /
    list1: 'com.thundersoft.fm/fstFmMonthly/list', //  应届生培养-一线经理月报-分页列表查询

    delete: 'com.thundersoft.fm/fstFmMonthly/delete', //   应届生培养-一线经理月报-通过id删除 /com.thundersoft.fm/fstFmMonthly/delete

    edit: 'com.thundersoft.fm/fstFmMonthlyUserMerits/edit', // 应届生培养-一线经理月报，人员绩效-编辑
    editMonth: 'com.thundersoft.fm/fstFmMonthly/edit' // 应届生培养-一线经理月报-编辑'

}

/**
 * @description 增加应届生辅导记录
 * @author laozhu
 * @date 01/11/2020
 * @export
 * @param {*} data
 * @return {*}
 */
export function save(data) {
    return request({
        url: url.add,
        method: 'post',
        data
    })
}

/**
 * @description 查询辅导记录
 * @author laozhu
 * @date 28/10/2020
 * @export
 * @param {*}
 * @return {*}
 */
export function list(params) {
    return request({
        url: url.list,
        method: 'get',
        params
    })
}

export function list1(params) {
    return request({
        url: url.list1,
        method: 'get',
        params
    })
}

/**
 * @description 根据查询辅导记录
 * @author laozhu
 * @date 28/10/2020
 * @export
 * @param {*}
 * @return {*}
 */
export function queryById(params) {
    return request({
        url: url.coachQueryById,
        method: 'get',
        params
    })
}

/**
 * @description 按删除辅导记录
 * @author laozhu
 * @date 28/10/2020
 * @export
 * @param {*} params year=2020&quarter=4&userGroupId=2&userId=e9ca23d68d884d4ebb19d07889727dae
 * @return {*}
 */
export function deleteById(params) {
    return request({
        url: url.delete,
        method: 'delete',
        params
    })
}

/**
 * @description 编辑mgr月报
 * @author laozhu
 * @date 04/11/2020
 * @export
 * @param {*} params
 * @return {*}
 */
export function edit(data) {
    return request({
        url: url.edit,
        method: 'put',
        data
    })
}

export function editMonth(data) {
    return request({
        url: url.editMonth,
        method: 'put',
        data
    })
}

