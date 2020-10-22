// 缓存时间 默认一天
const expire = 1 * 24 * 60 * 60 * 1000

// 本地存储
export function setStorage(name, data) {
    if (!name) name = 'Dict'

    const dataType = typeof data

    window.localStorage.setItem('time', Date.now())

    if (dataType === 'object') {
        window.localStorage.setItem(name, JSON.stringify(data))
    } else if (['number', 'string', 'boolean'].includes(dataType)) {
        window.localStorage.setItem(name, data)
    } else {
        console.warn('该类型不能用于本地存储')
    }
}

// 取出本地存储内容
export function getStorage(name = 'Dict') {
    const data = window.localStorage.getItem(name)
    const time = window.localStorage.getItem('time')
    if (data) {
        if ((Date.now() - time) > expire) {
            removeStorage(name)
            return ''
        } else {
            return JSON.parse(data)
        }
    } else {
        return ''
    }
}

// 删除本地存储
export function removeStorage(name = 'Dict') {
    window.localStorage.removeItem(name)
}
