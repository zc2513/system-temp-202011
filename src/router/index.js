import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
// import Layout from '@/layout'
import Layout from '@/layout/tblyout.vue'
import { system, demo, project, report, courseware, notification } from './module/index'

/**
 * hidden: true                   如果设置为真，项目将不会显示在侧边栏中(默认为假)
 * alwaysShow: true               是否始终显示根菜单，没有设置alwaysShow则当项目有一个以上的子路径时,它将变成嵌套模式，否则不会显示根菜单
 * redirect: noRedirect           如果设置了noRedirect将不会在面包屑中重定向
 * name:'router-name'             缓存关键
 * meta : {
    roles: ['admin','editor']    控制页面角色
    title: 'title'               在侧边栏和面包屑中显示的名称(推荐设置)
    icon: 'svg-name'/'el-icon-x' 图标显示在侧边栏中
    breadcrumb: false            面包屑设置：(默认为true)，如果设置为false，则不再面包屑中显示
    activeMenu: '/example/list'  如果设置路径，侧栏将突出显示您设置的路径
    noCache: true                如果设置为true，页面将不会被缓存(默认false)
    affix: true                  如果设置为true tags-view将固定标签，刷新后保存 (默认为false)
  }
 */

/**
 * 无权限的基本页面
 * path 支持http/s地址
 * constantRoutes
 * 无权限要求的配置数据，所以路由用户均可访问
 */

export const constantRoutes = [
    {
        path: '/redirect',
        component: Layout,
        hidden: true,
        children: [
            {
                path: '/redirect/:path*',
                component: () => import('@/views/redirect/index')
            }
        ]
    },
    {
        path: '/demo',
        component: () => import('@/views/nested/demo/index'),
        hidden: true
    },
    {
        path: '/login',
        component: () => import('@/views/user/index'),
        hidden: true,
        children: [
            {
                path: '',
                name: 'Tab',
                component: () => import('@/views/user/tab')
            },
            {
                path: 'index',
                name: 'Login',
                component: () => import('@/views/user/login')
            }
        ]
    },

    {
        path: '/404',
        component: () => import('@/views/404'),
        hidden: true
    },
    {
        path: '/',
        redirect: '/overview'
    },
    {
        path: '/overview',
        component: Layout,
        redirect: '/overview/index',
        children: [
            {
                path: 'index',
                name: 'Overview',
                component: () => import('@/views/overview/index'),
                meta: { title: '培训情况概览', icon: 'overview' }
            }
        ]
    },
    project,
    report,
    courseware,
    system,
    notification,
    demo
    // { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
    // mode: 'history',
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // 重置路由
}

export default router
