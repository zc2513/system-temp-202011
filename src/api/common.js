// 公用接口
import request from '@/utils/request'

/**
 * @description 评论添加的
 * @author zc2513
 * @date 04/11/2020
 * @export
 * @param {*} data
 * @return {*}
 */
export function getRegionFullName(data) {
    return request({
        url: '/com.thundersoft.studentreport/fstFreshStudentReportComment/add',
        method: 'post',
        data
    })
}

/**
 * @description 通过用户ID查询 区域、部门、分组信息.
 * @author zc2513
 * @date 04/11/2020
 * @export
 * @param {*} params
 * @returns
 */
export function queryArearDeptGroupById(params) {
    return request({
        url: '/com.thundersoft.system/sysGroupInfo/queryArearDeptGroupById',
        method: 'get',
        params
    })
}

/**
 * @description 通过分组id查询用户id、账号、用户姓名.
 * @author zc2513
 * @date 04/11/2020
 * @export
 * @param {*} params
 * @returns
 */
export function queryUserBaseByGroupId(params) {
    return request({
        url: '/com.thundersoft.system/sysGroupInfo/queryUserBaseByGroupId',
        method: 'get',
        params
    })
}

