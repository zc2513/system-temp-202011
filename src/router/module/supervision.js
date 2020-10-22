/**
 * @description 项目监督
 */
import Layout from '@/layout'

const supervise = {
    path: '/supervise',
    component: Layout,
    redirect: '/supervise/build',
    alwaysShow: true,
    meta: { title: '项目监督', icon: 'supervise' },
    children: [
        {
            path: 'build',
            name: 'build',
            component: () => import('@/views/supervise/build/index'),
            meta: { title: '建设项目监督', icon: 'build' }
        },
        {
            path: 'info',
            name: 'info',
            component: () => import('@/views/supervise/build/info/index'),
            meta: { title: '项目详情', icon: 'dashboard', 'activeMenu': '/supervise/build' },
            hidden: true
        },
        {
            path: 'bidding',
            name: 'bidding',
            component: () => import('@/views/supervise/bidding/index'),
            meta: { title: '招标项目监督', icon: 'bidding' }
        },
        {
            path: 'pack',
            name: 'pack',
            component: () => import('@/views/supervise/pack/index'),
            meta: { title: '标段（包）', icon: 'dashboard' },
            beforeEnter: (to, from, next) => {
                if (from.path === '/supervise/info') {
                    to.meta['activeMenu'] = '/supervise/build'
                } else {
                    if (to.query.pageType) {
                        to.meta['activeMenu'] = '/supervise/bidding'
                    } else {
                        to.meta['activeMenu'] = '/supervise/build'
                    }
                }
                next()
            },
            hidden: true
        },
        {
            path: 'bidinfo',
            name: 'Bidinfo',
            component: () => import('@/views/supervise/pack/bidinfo/index'),
            meta: { title: '标段详情', icon: 'dashboard', 'activeMenu': '/supervise/index' },
            beforeEnter: (to, from, next) => {
                if (to.query.pageType) {
                    to.meta['activeMenu'] = '/supervise/bidding'
                } else {
                    to.meta['activeMenu'] = '/supervise/build'
                }
                next()
            },
            hidden: true
        }
    ]
}

export default supervise
