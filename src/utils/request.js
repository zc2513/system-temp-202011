import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API
    // withCredentials: true,
    // timeout: 5000
})

service.interceptors.request.use(
    config => {
        if (store.getters.token) {
            config.headers['X-Token'] = getToken()
        }
        return config
    },
    error => {
        console.log(error)
        return Promise.reject(error)
    }
)

service.interceptors.response.use(response => {
    const res = response.data
    if (!res.success) {
        Message.error(res.message || '错误信息不详（接口未返回）')
        return Promise.reject(new Error(res.message || 'Error'))
    } else {
        return res
    }
}, error => {
    Message.error(showStatus(error.response.status))
    return Promise.reject(error)
})

export default service

const showStatus = (code) => {
    let message = ''
    switch (code) {
        case 400: message = '请求错误(400)'; break
        case 401: message = '未授权，请重新登录(401)'; break
        case 403: message = '拒绝访问(403)'; break
        case 404: message = '请求出错(404),未找到文件'; break
        case 408: message = '请求超时(408)'; break
        case 500: message = '服务器错误(500)'; break
        case 501: message = '服务未实现(501)'; break
        case 502: message = '网络错误(502)'; break
        case 503: message = '服务不可用(503)'; break
        case 504: message = '网络超时(504)'; break
        case 505: message = 'HTTP版本不受支持(505)'; break
        default: message = `连接出错(${code})!`
    }
    return `${message}，请检查网络或联系管理员！`
}
