import request from '@/utils/request'

const url = {
    add: 'com.thundersoft.mrg/fstMrgMonthly/add', // 应届生培养-mrg月报-添加',
    list: 'com.thundersoft.mrg/fstMrgMonthly/list', //  应届生培养-mrg月报-分页列表查询', /

    mgrQueryById: 'com.thundersoft.mrg/fstMrgMonthly/queryById', //  应届生培养-mrg月报-通过id查询, /

    delete: 'com.thundersoft.mrg/fstMrgMonthly/delete', //   应届生培养-mrg月报-通过id删除
    deleteBatch: 'com.thundersoft.mrg/fstMrgMonthly/deleteBatch' //  应届生培养-mrg月报-批量删除

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
    params.periodId = '1'
    return request({
        url: url.list,
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

export function deleteBatch(params) {
    return request({
        url: url.deleteBatch,
        method: 'delete',
        params
    })
}
