import request from '@/utils/request'

const url = {
    list: 'com.thundersoft.system/sysGroupInfo/queryUserBaseByGroupIdList', //  通过分组id查询用户id、账号、用户姓名、分组名 、状态 /
    // edit: 'com.thundersoft.system/sys/user/frozenBatch' // 批量更新状态
    edit: 'sys/user/frozenBatch' // 批量更新状态

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

