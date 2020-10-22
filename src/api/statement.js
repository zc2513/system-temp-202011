// 监督报表
import request from '@/utils/request'
/**
 * @description 获取监督报表列表
 * @author yansimin
 * @date 2020-09-24
 * @export
 * @returns
 */

export function getItemReportList(data) {
    return request({
        url: '/superviseCore/superviseReportSvc/getItemReportList',
        method: 'post',
        data
    })
}

/**
 * @description 获取检查项包含列表
 * @author yansimin
 * @date 2020-09-24
 * @export
 * @returns
 */

export function getSectionForCheckItemList(data) {
    return request({
        url: '/superviseCore/superviseReportSvc/getSectionForCheckItemList',
        method: 'post',
        data
    })
}

