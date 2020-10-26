import request from '@/utils/request'

const url = {
    addComment: 'com.thundersoft.studentreport/fstFreshStudentReportComment/add',
    list: 'com.thundersoft.studentreport/fstFreshStudentReportComment/listByReportId',
    add: 'com.thundersoft.studentreport/fstFreshStudentPlan/add',
    edit: '/yffmline/ykcity/edit',
    skillTypeList: 'com.thundersoft.studentreport/fstSkillType/list',
    zdylist: 'com.thundersoft.studentreport/fstFreshStudentPlan//queryListPlanInfo',
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
        data,
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
        data,
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
        data,
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
        data,
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
        data,
    })
}
