import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/auth'
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false })

const whiteList = ['/login']

router.beforeEach(async(to, from, next) => {
    NProgress.start()

    document.title = getPageTitle(to.meta.title)

    const hasToken = getToken()

    if (hasToken) {
        if (to.path === '/login') {
            next({ path: '/' })
            NProgress.done()
        } else {
            if (store.getters.roles.length) { // 判断当前用户是否已拉取完user_info信息
                next()
            } else {
                store.dispatch('user/getInfo').then(res => { // 拉取user_info
                    store.dispatch('permission/generateRoutes', res).then(syncRouter => { // 根据roles权限生成可访问的路由表
                        console.log(syncRouter, 6666)
                        router.addRoutes(syncRouter) // 动态添加可访问路由表
                        next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,设置replace: true，这样导航就不会留下历史记录
                    })
                }).catch((err) => {
                    console.log('出现异常', err)
                    store.dispatch('logout').then(async() => {
                        await store.dispatch('user/resetToken')
                        Message.error(err)
                        next(`/login?redirect=${to.path}`)
                        NProgress.done()
                    })
                })
            }
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            next()
        } else {
            next(`/login?redirect=${to.path}`)
            NProgress.done()
        }
    }
})

router.afterEach(() => {
    NProgress.done()
})
