// 文件上传/下载/删除 接口
import request from '@/utils/request'

/**
 * @description 文件上传 / 支持多传
 * @author zc2513
 * @date 05/11/2020
 * @export
 * @param {*} data  {files}
 * @return {*}
 */
export function uploadFile(data) {
    return request({
        url: '/oss/file/upload',
        method: 'post',
        data
    })
}

/**
 * @description 文件删除接口（单文件）
 * @author zc2513
 * @date 05/11/2020
 * @export
 * @param {*} params {id}
 * @return {*}
 */
export function deleteFile(params) {
    return request({
        url: '/oss/file/delete',
        method: 'delete',
        params
    })
}

/**
 * @description 文件批量删除接口
 * @author zc2513
 * @date 05/11/2020
 * @export
 * @param {*} params {ids}
 * @return {*}
 */
export function deletesFile(params) {
    return request({
        url: '/oss/file/deletes',
        method: 'delete',
        params
    })
}

/**
 * @description 文件查询接口
 * @author zc2513
 * @date 05/11/2020
 * @export
 * @param {*} params {id}
 * @return {*}
 */
export function queryFile(params) {
    return request({
        url: '/oss/file/queryById',
        method: 'get',
        params
    })
}

/**
 * @description 文件批量查询接口
 * @author zc2513
 * @date 05/11/2020
 * @export
 * @param {*} params {ids}
 * @return {*}
 */
export function queryFiles(params) {
    return request({
        url: '/oss/file/queryByIds',
        method: 'get',
        params
    })
}

/**
 * @description 文件下载
 * @author zc2513
 * @date 05/11/2020
 * @export
 * @param {*} params {id}
 * @return {*}
 */
export function downloadFile(params) {
    return request({
        url: '/file/download',
        method: 'get',
        params
    })
}
