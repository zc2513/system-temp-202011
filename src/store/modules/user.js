// eslint-disable-next-line no-unused-vars
import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import { Message } from 'element-ui'
// eslint-disable-next-line no-unused-vars
import sysRouter from '@/api/syncRouters'
const getDefaultState = () => {
    return {
        token: getToken(),
        name: '',
        avatar: '',
        roles: []
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
    SET_USER_INFO:(state, userInfo) => {
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
        const { userName, password,verify,checkKey } = userInfo
        console.log("登录表单信息",commit)
        return new Promise((resolve, reject) => {
            commit('SET_TOKEN', 999)
            setToken(999)
            resolve()              
            login({ username: userName.trim(), password: password ,captcha:verify,checkKey:checkKey,remember_me:true}).then(response => {
                console.log("登录返回结果",response)
                 if( response.success == false){
                     Message.error(response.message)
                    
                 }
                const { result } = response
                
                console.log("登录返回结果data",result)
                commit('SET_TOKEN', result.token)
                commit('SET_USER_INFO',result.userInfo)
                setToken(data.token)
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },

    // 获取用户信息
    getInfo({ commit, state, dispatch }) {
        return new Promise((resolve, reject) => {
            // dispatch('permission/generateRoutes', { roles: ['admin'], asyncRoutes: [] }, { root: true })
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
            resetRouter()
            commit('RESET_STATE')
            resolve()
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}

