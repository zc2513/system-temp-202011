import request from '@/utils/request'

const url = {
    add: 'com.thundersoft.counselor/fstCounselorRecord/add', // 应届生培养-辅导员记录-添加',
    list: 'com.thundersoft.counselor/fstCounselorRecord/queryList', // 应届生培养-辅导员记录-列表查询',

    coachQueryById: 'com.thundersoft.counselor/fstCounselorRecord/queryById', // 应届生培养-辅导员记录-通过id查询',

    delete: 'com.thundersoft.counselor/fstCounselorRecord/delete' // 应届生培养-辅导员记录-通过id删除', DELETE

}

/**
 * @description 增加应届生辅导记录
 * @author laozhu
 * @date 01/11/2020
 * @export
 * @param {*} data
 * @return {*}
 */
export function saveCoach(data) {
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
export function listCoach(params) {
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
export function coachQueryById(params) {
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
export function deleteCoach(params) {
    return request({
        url: url.delete,
        method: 'delete',
        params
    })
}

