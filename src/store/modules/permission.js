// 权限控制
import { constantRoutes } from '@/router'
import menuUtils from '@/utils/menuUtils'

/**
 * 使用meta.role确定当前用户是否具有权限
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
    if (route.meta && route.meta.roles) {
        return roles.some(role => route.meta.roles.includes(role))
    } else {
        return true
    }
}

/**
 * 递归过滤异步路由表
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
    const res = []

    routes.forEach(route => {
        const tmp = { ...route }
        if (hasPermission(roles, tmp)) {
            if (tmp.children) {
                tmp.children = filterAsyncRoutes(tmp.children, roles)
            }
            res.push(tmp)
        }
    })

    return res
}

const state = {
    routes: [], // 基础+异步
    addRoutes: []// 异步路由
}

const mutations = {
    SET_ROUTES: (state, routes) => {
        state.addRoutes = routes
        state.routes = constantRoutes.concat(routes)
    }
}

const actions = {
    generateRoutes({ commit }, { asyncRoutes, roles }) {
        console.log(asyncRoutes, 123)
        return new Promise(resolve => {
            // let accessedRoutes
            // if (roles.includes('admin')) {
            //     accessedRoutes = asyncRoutes || []
            // } else { // 非超级管理员 路由过滤处理
            //     accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
            // }
            // 将路由处理成vue-router所需格式
            // eslint-disable-next-line no-unused-vars
            const arr = []
            menuUtils(arr, asyncRoutes)
            commit('SET_ROUTES', arr)
            resolve(arr)
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
