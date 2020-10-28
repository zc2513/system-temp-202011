import request from '@/utils/request'

const url = {
    addComment: 'com.thundersoft.studentreport/fstFreshStudentReportComment/add',
    queryListGroupDay: 'com.thundersoft.studentreport/fstFreshStudentReport/queryListGroupDay',
    queryListGroupWeek: 'com.thundersoft.studentreport/fstFreshStudentReport/queryListGroupWeek',
    queryListGroupMonth: 'com.thundersoft.studentreport/fstFreshStudentReport/queryListGroupMonth'
}

/**
 * @description 按月应届生每天日志提交汇总
 * @author laozhu
 * @date 28/10/2020
 * @export
 * @param {*} params year=2020&month=10&userGroupId=1&userId=e9ca23d68d884d4ebb19d07889727dae
 * @return {*}
 */
export function queryListGroupDay(params) {
    return request({
        url: url.queryListGroupDay,
        method: 'get',
        params
    })
}

/**
 * @description 按季度统计周报
 * @author laozhu
 * @date 28/10/2020
 * @export
 * @param {*} params year=2020&quarter=4&userGroupId=2&userId=e9ca23d68d884d4ebb19d07889727dae
 * @return {*}
 */
export function queryListGroupWeek(params) {
    return request({
        url: url.queryListGroupWeek,
        method: 'get',
        params
    })
}

/**
 * @description 按月统计月报
 * @author laozhu
 * @date 28/10/2020
 * @export
 * @param {*} params year=2020&userGroupId=1&userId=e9ca23d68d884d4ebb19d07889727dae
 * @return {*}
 */
export function queryListGroupMonth(params) {
    return request({
        url: url.queryListGroupMonth,
        method: 'get',
        params
    })
}
