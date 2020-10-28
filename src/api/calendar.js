import request from '@/utils/request'

const url = {
    calendarInfo: 'com.thundersoft.system/sysPerpetualCalendar/getDateInfo',
    getuserinfo: 'com.thundersoft.system/sysGroupInfo/queryArearDeptGroupById'

}
/**
 * @description 获取应届生在系统中的区域，部门 分组等信息
 * @author laozhu
 * @date 27/10/2020
 * @export
 * @param {*} data
 * @return {*}
 */
export function getUserInfo(params) {
    return request({
        url: url.getuserinfo,
        method: 'get',
        params
    })
}

/**
 * @description 获得某天的日历信息,包括当前周序号及开始日期结束日期
 * @author laozhu
 * @date 27/10/2020
 * @export
 * @param {*} data
 * @return {*}
 */
export function getCalendarInfo(params) {
    return request({
        url: url.calendarInfo,
        method: 'get',
        params
    })
}

