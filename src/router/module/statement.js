/**
 * @description 监督报表
 */

import Layout from '@/layout'

const network = {
    path: '/statement',
    component: Layout,
    // redirect: '/statement/index',
    meta: { title: '监督报表', icon: 'statement' },
    children: [
        {
            path: '',
            name: 'Statement',
            component: () => import('@/views/statement/index'),
            meta: { title: '监督报表', breadcrumb: false }
        },
        {
            path: 'info',
            name: 'StatementInfo',
            component: () => import('@/views/statement/info'),
            hidden: true,
            meta: { title: '详情列表', activeMenu: '/statement' }
        }
    ]
}

export default network
