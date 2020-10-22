// 项目监督
import request from '@/utils/request'
/**
 * @description 获取建设项目列表
 * @author yansimin
 * @date 2020-09-18
 * @export
 * @returns
 */

export function getProjectList(data) {
    return request({
        url: '/superviseCore/projectSuperviseSvc/getProjectList',
        method: 'post',
        data
    })
}

/**
 * @description 获取建设项目详情
 * @author yansimin
 * @date 2020-09-18
 * @export
 * @returns
 */

export function getProjectDetail(data) {
    return request({
        url: '/superviseCore/projectSuperviseSvc/getProjectDetail',
        method: 'post',
        data
    })
}

/**
 * @description 获取指定建设项目下的招标项目列表
 * @author yansimin
 * @date 2020-09-18
 * @export
 * @returns
 */

export function getTenProjectByProjList(data) {
    return request({
        url: '/superviseCore/projectSuperviseSvc/getTenProjectByProjList',
        method: 'post',
        data
    })
}

/**
 * @description 获取招标项目列表
 * @author yansimin
 * @date 2020-09-18
 * @export
 * @returns
 */

export function getTenProjectList(data) {
    return request({
        url: '/superviseCore/projectSuperviseSvc/getTenProjectList',
        method: 'post',
        data
    })
}

/**
 * @description 获取指定招标项目下的标段列表（招标项目详情）
 * @author yansimin
 * @date 2020-09-18
 * @export
 * @returns
 */

export function getBidSectionByTenProjList(data) {
    return request({
        url: '/superviseCore/projectSuperviseSvc/getBidSectionByTenProjList',
        method: 'post',
        data
    })
}

/**
 * @description 获取标段（包）详情
 * @author yansimin
 * @date 2020-09-18
 * @export
 * @returns
 */

export function getBidSectionDetail(data) {
    return request({
        url: '/superviseCore/projectSuperviseSvc/getBidSectionDetail',
        method: 'post',
        data
    })
}

/**
 * @description 获取指定标段（包）有数据的监督节点列表
 * @author yansimin
 * @date 2020-09-18
 * @export
 * @returns
 */

export function getNodeForBidSectionList(data) {
    return request({
        url: '/superviseCore/projectSuperviseSvc/getNodeForBidSectionList',
        method: 'post',
        data
    })
}

/**
 * @description 获取指定标段（包）的监督节点详情
 * @author yansimin
 * @date 2020-09-18
 * @export
 * @returns
 */

export function getNodeDetailForSection(data) {
    return request({
        url: '/superviseCore/projectSuperviseSvc/getNodeDetailForSection',
        method: 'post',
        data
    })
}
