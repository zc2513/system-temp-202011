/**
 * @description 系统管理
 */

import Layout from '@/layout'

const system = {
    path: '/system',
    component: Layout,
    hidden: true,
    redirect: '/system/company',
    meta: { title: '系统管理', icon: 'system' },
    children: [
        {
            path: 'company',
            name: 'Company',
            component: () => import('@/views/system/company/index'),
            meta: { title: '机构管理', icon: 'company' }
        },
        {
            path: 'role',
            name: 'Role',
            component: () => import('@/views/system/role/index'),
            meta: { title: '角色管理', icon: 'role' }
        },
        {
            path: 'pageRoute',
            name: 'PageRoute',
            component: () => import('@/views/system/pageRoute/index'),
            meta: { title: '路由管理', icon: 'pageRoute' }
        }
    ]
}

export default system
