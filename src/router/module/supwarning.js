/**
 * @description 监督预警
 */
import Layout from '@/layout'

const supwarning = {
    path: '/supwarning',
    component: Layout,
    redirect: '/supwarning/index',
    meta: { title: '监督预警', icon: 'supwarning' },
    children: [
        {
            path: 'index',
            name: 'Supwarning',
            component: () => import('@/views/supwarning/index'),
            meta: { title: '监督预警', icon: 'list', breadcrumb: false, activeMenu: '/supwarning' },
            hidden: true
        },
        {
            path: 'index/packList',
            name: 'packList',
            component: () => import('@/views/supwarning/index/packList'),
            meta: { title: '招标项目详情', icon: 'dashboard', activeMenu: '/supwarning' },
            hidden: true
        },
        {
            path: 'info',
            name: 'supwarningInfo',
            hidden: true,
            component: () => import('@/views/supwarning/index/info'),
            beforeEnter: (to, from, next) => {
                if (from.matched.length) {
                    to.meta['activeMenu'] = from.matched[0].path
                } else {
                    if (to.query.pageType === 'statement') {
                        to.meta['activeMenu'] = '/statement'
                    } else {
                        to.meta['activeMenu'] = to.matched[0].path
                    }
                }
                next()
            },
            meta: { title: '标段详情', icon: 'dashboard' }
        }
    ]
}

export default supwarning
