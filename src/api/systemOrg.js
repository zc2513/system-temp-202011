// 系统组织架构
import request from '@/utils/request'

const url = {
    queryArearDeptGroupById: 'com.thundersoft.system/sysGroupInfo/queryArearDeptGroupById',
    queryUserBaseByGroupId: 'com.thundersoft.system/sysGroupInfo/queryUserBaseByGroupId'
}
export function queryArearDeptGroupById(params) {
    return request({
        url: url.queryArearDeptGroupById,
        method: 'get',
        params
    })
}

export function queryUserBaseByGroupId(params) {
    return request({
        url: url.queryUserBaseByGroupId,
        method: 'get',
        params
    })
}
