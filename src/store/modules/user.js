// eslint-disable-next-line no-unused-vars
import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import { Message } from 'element-ui'
import { getStorage } from '@/utils/storage'
// eslint-disable-next-line no-unused-vars
import sysRouter from '@/api/syncRouters'
const getDefaultState = () => {
    return {
        token: getToken(),
        roles: [],
        userInfo: getStorage('userInfo') || '',
        name: '',
        avatar: ''
    }
}

const state = getDefaultState()

const mutations = {
    RESET_STATE: (state) => {
        Object.assign(state, getDefaultState())
    },
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    SET_USER_INFO: (state, userInfo) => {
        state.userInfo = userInfo
    },
    SET_NAME: (state, name) => {
        state.name = name
    },
    SET_AVATAR: (state, avatar) => {
        state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
        state.roles = roles
    }
}

const actions = {
    // 登录
    login({ commit }, userInfo) {
        const { userName, password, captcha, checkKey } = userInfo
        return new Promise((resolve, reject) => {
            login({ username: userName.trim(), password, captcha, checkKey, remember_me: true }).then(response => {
                const { success, message, result } = response
                if (!success) return Message.error(message)
                const { token, userInfo } = result
                commit('SET_TOKEN', token)
                commit('SET_USER_INFO', userInfo)
                console.log('token', token)
                setToken(token)
                resolve(userInfo)
            }).catch(error => {
                reject(error)
            })
        })
    },

    // 获取用户信息
    getInfo({ commit, state, dispatch }) {
        return new Promise((resolve, reject) => {
            // dispatch('permission/generateRoutes', { roles: ['admin'], asyncRoutes: [] }, { root: true })
            // 1.拉去用户信息
            // 2.拉取用户路由权限
            // 3.拉取用户角色权限
            commit('SET_NAME', '张三')
            commit('SET_AVATAR', 'https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3646436076,201719204&fm=26&gp=0.jpg')
            commit('SET_ROLES', ['admin'])
            resolve({ asyncRoutes: [], roles: ['admin'] })
            // resolve({ asyncRoutes: sysRouter, roles: ['admin'] })

            // getInfo(state.token).then(response => {
            //     const { data } = response

            //     // 当前用户权限
            //     const { roles, asyncRoutes } = data

            //     // 异步路由请求
            //     // asyncRoutes = axios请求 异步路由获取
            //     const loadingInstance = Loading.service({
            //         lock: true,
            //         text: '路由加载中',
            //         spinner: 'el-icon-loading',
            //         background: 'rgba(0, 0, 0, 0.7)'
            //     })
            //     setTimeout(() => {
            //         loadingInstance.close()
            //         dispatch('permission/generateRoutes', { roles, asyncRoutes }, { root: true })
            //     }, 1000)

            //     if (!data) {
            //         return reject('Verification failed, please Login again.')
            //     }

            //     const { name, avatar } = data

            //     commit('SET_NAME', name)
            //     commit('SET_AVATAR', avatar)
            //     resolve(data)
            // }).catch(error => {
            //     reject(error)
            // })
        })
    },

    // 前端退出
    logout({ commit, dispatch, state }) {
        return new Promise((resolve, reject) => {
            dispatch('resetToken')
            resolve()
            // logout(state.token).then( async() => {
            //     await dispatch('resetToken')
            //     resolve()
            // }).catch(error => {
            //     reject(error)
            // })
        })
    },

    // 移除登录标记
    resetToken({ commit }) {
        return new Promise(resolve => {
            removeToken() // 先删除令牌***
            resetRouter() // 清除路由
            commit('RESET_STATE')
            resolve()
        })
    },
    seText({ commit }, val = '') {
        console.log('我被触发了' + val)
        setTimeout(() => {
            commit('SET_USER_INFO', { key: '我被更改了' + val })
        }, 5000)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}

