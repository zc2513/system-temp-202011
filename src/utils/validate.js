
/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
    return /^(https?:|mailto:|tel:)/.test(path)
}

/*
验证-登录 临时使用
 */
export function validUsername(str) {
    const valid_map = ['admin', 'editor']
    return valid_map.indexOf(str.trim()) >= 0
}

/* 合法uri*/
export function validateURL(textval) {
    const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
    return urlregex.test(textval)
}

/**
 * @description 小写字母验证
 * @author zc2513
 * @date 2020-09-13
 * @export
 * @param {*} str
 * @returns
 */
export function validateLowerCase(str) {
    const reg = /^[a-z]+$/
    return reg.test(str)
}

/**
 * @description 大写字母验证
 * @author zc2513
 * @date 2020-09-13
 * @export
 * @param {*} str
 * @returns
 */
export function validateUpperCase(str) {
    const reg = /^[A-Z]+$/
    return reg.test(str)
}

/**
 * @description 大小写字母验证
 * @author zc2513
 * @date 2020-09-13
 * @export
 * @param {*} str
 * @returns
 */
export function validatAlphabets(str) {
    const reg = /^[A-Za-z]+$/
    return reg.test(str)
}

