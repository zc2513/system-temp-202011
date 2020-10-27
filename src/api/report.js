import request from '@/utils/request'

const url = {
    addComment: 'com.thundersoft.studentreport/fstFreshStudentReportComment/add',
    list: 'com.thundersoft.studentreport/fstFreshStudentReportComment/listByReportId',
    add: 'com.thundersoft.studentreport/fstFreshStudentPlan/add',
    edit: '/yffmline/ykcity/edit',
    skillTypeList: 'com.thundersoft.studentreport/fstSkillType/list',
    zdylist: 'com.thundersoft.studentreport/fstFreshStudentPlan//queryListPlanInfo',
    getuserinfo: 'com.thundersoft.system/sysGroupInfo/queryArearDeptGroupById',
    zdygroup: 'com.thundersoft.studentreport/fstFreshStudentPlan/queryListGroupCustom',
    calendarInfo: 'com.thundersoft.system/sysPerpetualCalendar/getDateInfo',
    weeklistgroup: 'com.thundersoft.studentreport/fstFreshStudentPlan/queryListGroupWeek',
    monthlistgroup: 'com.thundersoft.studentreport/fstFreshStudentPlan/queryListGroupMonth'

}
/**
 * @description 加载评论
 * @author laozhu
 * @date 26/10/2020
 * @export
 * @param {*} data
 * @return {*}
 */
export function loadComment(data) {
    return request({
        url: url.list,
        method: 'get',
        data
    })
}

/**
 * @description 增加评论
 * @author laozhu
 * @date 26/10/2020
 * @export
 * @param {*} data
 * @return {*}
 */
export function addPlanComment(data) {
    return request({
        url: url.addComment,
        method: 'post',
        data
    })
}

/**
 * @description 保存自定义计划
 * @author laozhu
 * @date 26/10/2020
 * @export
 * @param {*} data
 * @return {*}
 */
export function saveSelfPlan(data) {
    return request({
        url: url.add,
        method: 'post',
        data
    })
}

/**
 * @description 获取技能类别
 * @author laozhu
 * @date 26/10/2020
 * @export
 * @return {*}
 */
export function getSkillType(data) {
    return request({
        url: url.skillTypeList,
        method: 'get',
        data
    })
}
/**
 * @description 获得自定义计划
 * @author laozhu
 * @date 26/10/2020
 * @export
 * @param {*} data
 * @return {*}
 */
export function getSelfPlan(data) {
    return request({
        url: url.zdylist,
        method: 'get',
        data
    })
}

// 自定义计划模块

/**
 * @description 获取应届生在系统中的区域，部门 分组等信息
 * @author laozhu
 * @date 27/10/2020
 * @export
 * @param {*} data
 * @return {*}
 */
export function getUserInfo(data) {
    return request({
        url: url.getuserinfo,
        method: 'get',
        data
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
export function getCalendarInfo(data) {
    return request({
        url: url.calendarInfo,
        method: 'get',
        data
    })
}

/**
 * @description 按获得某月自定义计划汇总
 * @author laozhu
 * @date 27/10/2020
 * @export
 * @param {*} data
 * @return {*}
 */
export function getSelfCutomPlan(data) {
    return request({
        url: url.zdygroup,
        method: 'get',
        data
    })
}

/**
 * @description 获得某个季度全部周的周计划汇总
 * @author laozhu
 * @date 27/10/2020
 * @export
 * @param {*} data
 * @return {*}
 */
export function getWeekPlanGroup(data) {
    return request({
        url: url.weeklistgroup,
        method: 'get',
        data
    })
}

/**
 * @description 获得某年的月计划汇总
 * @author laozhu
 * @date 27/10/2020
 * @export
 * @param {*} data
 * @return {*}
 */
export function getMonthPlanGroup(data) {
    return request({
        url: url.monthlistgroup,
        method: 'get',
        data
    })
}
