// 监督节点设置
import request from '@/utils/request'
/**
 * @description 获取监督节点列表
 * @author yansimin
 * @date 2020-09-17
 * @export
 * @returns
 */

export function getSuperviseNodeList(data) {
    return request({
        url: '/superviseBase/supervConfigSvc/getSuperviseNodeList',
        method: 'post',
        data
    })
}
/**
 * @description 新增监督节点
 * @author yansimin
 * @date 2020-09-17
 * @export
 * @returns
 */

export function addSuperviseNode(data) {
    return request({
        url: '/superviseBase/supervConfigSvc/addSuperviseNode',
        method: 'post',
        data
    })
}

/**
 * @description 编辑监督节点详情
 * @author yansimin
 * @date 2020-09-17
 * @export
 * @returns
 */

export function editSuperviseNode(data) {
    return request({
        url: '/superviseBase/supervConfigSvc/editSuperviseNode',
        method: 'post',
        data
    })
}

/**
 * @description 获取监督节点详情
 * @author yansimin
 * @date 2020-09-17
 * @export
 * @returns
 */

export function getSuperviseNodeDetail(data) {
    return request({
        url: '/superviseBase/supervConfigSvc/getSuperviseNodeDetail',
        method: 'post',
        data
    })
}

/**
 * @description 编辑监督启动关闭
 * @author yansimin
 * @date 2020-09-17
 * @export
 * @returns
 */

export function enableSuperviseNode(data) {
    return request({
        url: '/superviseBase/supervConfigSvc/enableSuperviseNode',
        method: 'post',
        data
    })
}

/**
 * @description 编辑监督上移下移
 * @author yansimin
 * @date 2020-09-17
 * @export
 * @returns
 */

export function moveSuperviseNode(data) {
    return request({
        url: '/superviseBase/supervConfigSvc/moveSuperviseNode',
        method: 'post',
        data
    })
}

// 检查项设置
/**
 * @description 获取检查项列表
 * @author yansimin
 * @date 2020-09-17
 * @export
 * @returns
 */

export function getCheckItemList(data) {
    return request({
        url: '/superviseBase/supervConfigSvc/getCheckItemList',
        method: 'post',
        data
    })
}
/**
 * @description 新增检查项
 * @author yansimin
 * @date 2020-09-17
 * @export
 * @returns
 */

export function addCheckItem(data) {
    return request({
        url: '/superviseBase/supervConfigSvc/addCheckItem',
        method: 'post',
        data
    })
}

/**
 * @description 获取检查项详情
 * @author yansimin
 * @date 2020-09-17
 * @export
 * @returns
 */

export function getCheckItemDetail(data) {
    return request({
        url: '/superviseBase/supervConfigSvc/getCheckItemDetail',
        method: 'post',
        data
    })
}

/**
 * @description 编辑检查项详情
 * @author yansimin
 * @date 2020-09-17
 * @export
 * @returns
 */

export function editCheckItem(data) {
    return request({
        url: '/superviseBase/supervConfigSvc/editCheckItem',
        method: 'post',
        data
    })
}

/**
 * @description 编辑检查项启动关闭
 * @author yansimin
 * @date 2020-09-17
 * @export
 * @returns
 */

export function enableCheckItem(data) {
    return request({
        url: '/superviseBase/supervConfigSvc/enableCheckItem',
        method: 'post',
        data
    })
}

// 检查内容设置
/**
 * @description 获取检查内容列表
 * @author yansimin
 * @date 2020-09-17
 * @export
 * @returns
 */

export function getCheckContentList(data) {
    return request({
        url: '/superviseBase/supervConfigSvc/getCheckContentList',
        method: 'post',
        data
    })
}
/**
 * @description 新增检查内容
 * @author yansimin
 * @date 2020-09-17
 * @export
 * @returns
 */

export function addCheckContent(data) {
    return request({
        url: '/superviseBase/supervConfigSvc/addCheckContent',
        method: 'post',
        data
    })
}

/**
 * @description 获取检查内容详情
 * @author yansimin
 * @date 2020-09-17
 * @export
 * @returns
 */

export function getCheckContentDetail(data) {
    return request({
        url: '/superviseBase/supervConfigSvc/getCheckContentDetail',
        method: 'post',
        data
    })
}

/**
 * @description 编辑检查内容详情
 * @author yansimin
 * @date 2020-09-17
 * @export
 * @returns
 */

export function editCheckContent(data) {
    return request({
        url: '/superviseBase/supervConfigSvc/editCheckContent',
        method: 'post',
        data
    })
}

/**
 * @description 编辑检查内容启动关闭
 * @author yansimin
 * @date 2020-09-17
 * @export
 * @returns
 */

export function enableCheckContent(data) {
    return request({
        url: '/superviseBase/supervConfigSvc/enableCheckContent',
        method: 'post',
        data
    })
}

/**
 * @description 获取所有监督节点列表，用于下拉框
 * @author yansimin
 * @date 2020-09-17
 * @export
 * @returns
 */

export function getAllSuperviseNodeList(data) {
    return request({
        url: '/superviseBase/supervConfigSvc/getAllSuperviseNodeList',
        method: 'post',
        data
    })
}

/**
 * @description 获取所有检查项列表，用于下拉框
 * @author yansimin
 * @date 2020-09-17
 * @export
 * @returns
 */

export function getAllCheckItemList(data) {
    return request({
        url: '/superviseBase/supervConfigSvc/getAllCheckItemList',
        method: 'post',
        data
    })
}
/**
 * @description 获取所有检查项列表，用于下拉框
 * @author yansimin
 * @date 2020-09-17
 * @export
 * @returns
 */

export function getCheckContentEnum(data) {
    return request({
        url: '/superviseBase/supervConfigSvc/getCheckContentEnum',
        method: 'post',
        data
    })
}

/**
 * @description 获取检查内容参数详情
 * @author yansimin
 * @date 2020-09-18
 * @export
 * @returns
 */

export function getCheckContentParamList(data) {
    return request({
        url: '/superviseBase/supervConfigSvc/getCheckContentParamList',
        method: 'post',
        data
    })
}

/**
 * @description 设置检查内容参数
 * @author yansimin
 * @date 2020-09-18
 * @export
 * @returns
 */

export function editCheckContentParam(data) {
    return request({
        url: '/superviseBase/supervConfigSvc/editCheckContentParam',
        method: 'post',
        data
    })
}
