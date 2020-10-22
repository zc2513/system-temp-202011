/* eslint-disable no-useless-escape */
/* 联系方式验证 */
export function phoneValidate(rule, value, callback) {
    const phoneReg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/
    const regEnN = /[`~!@#$%^&*()_+""''<>?:'{},.\/'[\]]/im
    const regCnN = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im
    const startReg = /^1/
    const rtrim = /^\S*$/
    const chineseReg = /^[0-9]+$/
    if (!chineseReg.test(value)) {
        callback(new Error('必须数字'))
    } else {
        if (rtrim.test(value)) {
            if (startReg.exec(value)) {
                if (value.length < 11 || value.length > 11) {
                    callback(new Error('长度' + value.length + '位,长度不对'))
                } else {
                    setTimeout(() => {
                        if (phoneReg.test(value)) {
                            if (regEnN.test(value) || regCnN.test(value)) {
                                callback(new Error('不能包含特殊字符'))
                            } else {
                                callback()
                            }
                        } else {
                            callback(new Error('手机号格式不正确'))
                        }
                    }, 30)
                }
            } else {
                if (value.indexOf('-') !== -1) {
                    const telReg = /([0-9]{3,4}-)?[0-9]{7,8}/
                    if (telReg.test(value)) {
                        const str1 = value.substr(0, value.indexOf('-'))
                        const str2 = value.substr(value.indexOf('-') + 1, value.length)
                        if (str1.length === 3 || str1.length === 4) {
                            if (str1.length === 4) {
                                if (str2.length === 7 || str2.length === 8) {
                                    callback()
                                } else {
                                    callback(new Error('固话长度错误'))
                                }
                            } else if (str1.length === 3 && str2.length !== 8) {
                                callback(new Error('固话长度错误'))
                            } else {
                                if (regEnN.test(value) || regCnN.test(value)) {
                                    callback(new Error('不能包含特殊字符'))
                                } else {
                                    callback()
                                }
                            }
                        } else {
                            callback(new Error('区号长度错误'))
                        }
                    } else {
                        callback(new Error('固话格式不正确'))
                    }
                } else {
                    callback(new Error('请在区号后面加-'))
                }
            }
        } else {
            callback(new Error('不能包含空格'))
        }
    }
}
/* 身份证号 */
export function IDcardValidate(rule, value, callback) {
    if (isIDcardFun(value)) {
        callback()
    } else {
        callback(new Error('身份证号格式不正确'))
    }
}
/* 特殊字符 */
export function specialCharValidate(rule, value, callback) {
    const regEn = /[`~!@#$%^&*()_+<>?:'{},.\/'[\]]/im
    const regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im
    if (regEn.test(value) || regCn.test(value)) {
        callback(new Error('不能包含特殊字符'))
    } else {
        callback()
    }
}

/* 验证合法url */
export function validateURL(rule, value, callback) {
    const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
    if (urlregex.test(value)) {
        callback()
    } else {
        callback(new Error('请输入合法的url地址'))
    }
}

/* 姓名 */
export function fullNameValidate(rule, value, callback) {
    const chineseReg = /^[\u4e00-\u9fa5]{2,4}$/
    if (!chineseReg.test(value)) {
        callback(new Error('姓名必须为2到4位中文'))
    } else {
        callback()
    }
}
/* 企业名称 */
export function companyNameValidate(rule, value, callback) {
    const chineseReg = /^[\u4e00-\u9fa5]{2,25}$/
    if (!chineseReg.test(value)) {
        callback(new Error('必须为中文'))
    } else {
        callback()
    }
}
/* 社会统一信用代码 */
export function creditCodeValidate(rule, value, callback) {
    // const reg = /^(?![0-9]+$)(?![A-Z]+$)(?![a-z]+$)[0-9A-Za-z]{15,18}$/
    const reg = /^[a-z0-9]+$/i
    const length = value.length
    if (length > 18 || length < 15) {
        callback(new Error('长度' + length + '位,长度不对'))
    } else {
        if (reg.test(value)) {
            callback()
        } else {
            callback(new Error('15-18位英文或数字组合'))
        }
    }
}
/* 地址 */
export function addressValidate(rule, value, callback) {
    const chineseReg = /^[0-9]+.?[0-9]*$/
    if (chineseReg.test(value)) {
        callback(new Error('不能全为数字，请重输入！'))
    } else {
        callback()
    }
}
/* 纯数字 */
export function pureNumbersValidate(rule, value, callback) {
    const chineseReg = /^[0-9]+$/
    if (!chineseReg.test(value)) {
        callback(new Error('必须数字'))
    } else {
        callback()
    }
}
/* 数字 */
export function NumbersValidate(rule, value, callback) {
    const chineseReg = /^\d+(\.\d+)?$/
    if (!chineseReg.test(value)) {
        callback(new Error('必须数字'))
    } else {
        callback()
    }
}
/* 金额验证 */
export function moneyValidate(rule, value, callback) {
    const chineseReg = /^[0-9]+$/
    if (!chineseReg.test(value)) {
        callback(new Error('必须数字'))
    } else {
        callback()
    }
}

// 浏览器监识别
export function getBrowserInfo() {
    const ua = navigator.userAgent.toLocaleLowerCase()
    let browserType = null
    let browserVersion
    if (ua.match(/msie/) != null || ua.match(/trident/) != null) {
        browserType = 'IE'
        browserVersion =
        ua.match(/msie ([\d.]+)/) != null
            ? ua.match(/msie ([\d.]+)/)[1]
            : ua.match(/rv:([\d.]+)/)[1]
    }
    return { browserType, browserVersion }
}

export function isIDcardFun(sId) { // ---身份证验证
    const aCity = {
        11: '北京',
        12: '天津',
        13: '河北',
        14: '山西',
        15: '内蒙古',
        21: '辽宁',
        22: '吉林',
        23: '黑龙江',
        31: '上海',
        32: '江苏',
        33: '浙江',
        34: '安徽',
        35: '福建',
        36: '江西',
        37: '山东',
        41: '河南',
        42: '湖北',
        43: '湖南',
        44: '广东',
        45: '广西',
        46: '海南',
        50: '重庆',
        51: '四川',
        52: '贵州',
        53: '云南',
        54: '西藏',
        61: '陕西',
        62: '甘肃',
        63: '青海',
        64: '宁夏',
        65: '新疆',
        71: '台湾',
        81: '香港',
        82: '澳门',
        91: '国外'
    }
    var iSum = 0
    if (!/^\d{17}(\d|x)$/i.test(sId)) return false
    sId = sId.replace(/x$/i, 'a')
    if (aCity[parseInt(sId.substr(0, 2))] === null) return false
    var sBirthday = sId.substr(6, 4) + '-' + Number(sId.substr(10, 2)) + '-' + Number(sId.substr(12, 2))
    var d = new Date(sBirthday.replace(/-/g, '/'))
    if (sBirthday !== d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()) {
        return false
    }
    for (var i = 17; i >= 0; i--) {
        iSum += (Math.pow(2, i) % 11) * parseInt(sId.charAt(17 - i), 11)
    }
    if (iSum % 11 !== 1) return false

    // return aCity[parseInt(sId.substr(0, 2))] + ',' + sBirthday + ',' + (sId.substr(16, 1) % 2 ? '男' : '女')
    return true
}

// 百分比验证
export function percentage(rule, value, callback) {
    const reg = /^(100|[1-9]?\d(\.\d\d?\d?)?)%$/
    if (!value) {
        callback()
    }
    if (reg.test(value)) {
        callback()
    } else {
        callback(new Error('必须为百分比'))
    }
}

