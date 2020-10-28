import request from '@/utils/request'
/**
 * 获取文件服务访问路径
 * @param avatar
 * @param subStr
 * @returns {*}
 */
export function getFileAccessHttpUrl(avatar, subStr) {
    if (!subStr) subStr = 'http'
    try {
        if (avatar && avatar.startsWith(subStr)) {
            return avatar
        } else {
            if (avatar && avatar.length > 0 && avatar.indexOf('[') === -1) {
                return window._CONFIG['staticDomainURL'] + '/' + avatar
            }
        }
    } catch (err) {
        return
    }
}
