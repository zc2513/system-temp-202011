import request from '@/utils/request'

const url = {
    addComment: 'com.thundersoft.studentreport/fstFreshStudentReportComment/add',
    list: 'com.thundersoft.studentreport/fstFreshStudentReportComment/listByReportId',
    add: 'com.thundersoft.studentreport/fstFreshStudentPlan/add',
    edit: '/yffmline/ykcity/edit',
    skillTypeList: 'com.thundersoft.studentreport/fstSkillType/list',
    zdylist: 'com.thundersoft.studentreport/fstFreshStudentPlan//queryListPlanInfo',
    getuserinfo: 'com.thundersoft.system/sysGroupInfo/queryArearDeptGroupById',
    queryListGroupCustom: 'com.thundersoft.studentreport/fstFreshStudentPlan/queryListGroupCustom',
    queryListGroupWeek: 'com.thundersoft.studentreport/fstFreshStudentPlan/queryListGroupWeek',
    queryListGroupMonth: 'com.thundersoft.studentreport/fstFreshStudentPlan/queryListGroupMonth'

}
/**
 * @description 加载评论
 * @author laozhu
 * @date 26/10/2020
 * @export
 * @param {*} data
 * @return {*}
 */
export function loadComment(params) {
    return request({
        url: url.list,
        method: 'get',
        params
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
export function getSkillType(params) {
    return request({
        url: url.skillTypeList,
        method: 'get',
        params
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

/**
 * @description 按获得某月自定义计划汇总
 * @author laozhu
 * @date 27/10/2020
 * @export
 * @param {*} data createType=1&createUserId=e9ca23d68d884d4ebb19d07889727dae &planUserId=e3517f1ca22245e897077a25b5a8c328&year=2020&month=10&day=22
 * @return {*}
 */
export function getSelfCutomPlan(params) {
    params.periodId = '1'
    return request({
        url: url.zdylist,
        method: 'get',
        params
    })
}
/**
 * @description 获得自定义计划月总
 * @author laozhu
 * @date 26/10/2020
 * @export
 * @param {*} data planType=3&createType=2&planUserId=e3517f1ca22245e897077a25b5a8c328&year=2020&month=10
 * @return {*}
 */
export function queryListGroupCustom(params) {
    params.periodId = '1'
    return request({
        url: url.queryListGroupCustom,
        method: 'get',
        params
    })
}
/**
 * @description 获得某个季度全部周的周计划汇总
 * @author laozhu
 * @date 27/10/2020
 * @export
 * @param {*} data ?planType=1&createUserId=e9ca23d68d884d4ebb19d07889727dae&year=2020&quarter=4
 * @return {*}
 */
export function queryListGroupWeek(params) {
    params.periodId = '1'
    return request({
        url: url.queryListGroupWeek,
        method: 'get',
        params
    })
}

/**
 * @description 获得某年的月计划汇总
 * @author laozhu
 * @date 27/10/2020
 * @export
 * @param {*} data  planType=2&createType=1&createUserId=e9ca23d68d884d4ebb19d07889727dae&planUserId&year=2020
 * @return {*}
 */
export function queryListGroupMonth(params) {
    params.periodId = '1'
    return request({
        url: url.queryListGroupMonth,
        method: 'get',
        params
    })
}
