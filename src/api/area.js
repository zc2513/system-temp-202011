// 区域计划
import request from '@/utils/request'
// 时间设置阶段查看

// 根据用户id获取区域

/**
 * @description 时间阶段    查看  （是否设置设置阶段）
 * @author zc2513
 * @date 2020-11-06
 * @export
 * @param {*} data
 * @returns
 */
export function getTmeLock(params) {
    return request({
        url: '/com.thundersoft.stage/fstStageTime/queryList',
        method: 'get',
        params
    })
}

/**
 * @description 时间阶段    模板阶段获取
 * @author zc2513
 * @date 2020-11-06
 * @export
 * @param {*} data
 * @returns
 */
export function getTempletList(params) {
    return request({
        url: '/com.thundersoft.stage/fstStageFieldTemplate/newList',
        method: 'get',
        params
    })
}

/**
 * @description 时间阶段    添加
 * @author zc2513
 * @date 2020-11-06
 * @export
 * @param {*} data
 * @returns
 */
export function addTimeStep(data) {
    return request({
        url: '/com.thundersoft.stage/fstStageTime/add',
        method: 'post',
        data
    })
}

/**
 * @description 阶段计划    添加
 * @author zc2513
 * @date 2020-11-06
 * @export
 * @param {*} data
 * @returns
 */
export function addStepPlan(data) {
    return request({
        url: '/com.thundersoft.stage/fstStageTimePlan/add',
        method: 'post',
        data
    })
}

/**
 * @description 阶段计划    编辑/修改
 * @author zc2513
 * @date 2020-11-06
 * @export
 * @param {*} data
 * @returns
 */
export function addStepEdit(data) {
    return request({
        url: '/com.thundersoft.stage/fstStageTimePlan/edit',
        method: 'put',
        data
    })
}

/**
 * @description 阶段计划 根据id查看
 * @author zc2513
 * @date 2020-11-06
 * @export
 * @param {*} params
 * @returns
 */
export function planlock(params) {
    return request({
        url: '/com.thundersoft.stage/fstStageTimePlan/queryById',
        method: 'get',
        params
    })
}

/**
 * @description 获取阶段列表
 * @author zc2513
 * @date 2020-11-06
 * @export
 * @param {*} params
 * @returns
 */
export function getPlanList(params) {
    return request({
        url: '/com.thundersoft.stage/fstStageTimePlan/list',
        method: 'get',
        params
    })
}
