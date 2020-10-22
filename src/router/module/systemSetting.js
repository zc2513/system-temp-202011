/**
 * @description 系统管理
 */

import Layout from '@/layout'

const systemSetting = {
    path: '/systemSetting',
    component: Layout,
    redirect: '/systemSetting/platform',
    meta: { title: '系统设置', icon: 'systemSetting' },
    children: [
        {
            path: 'platform',
            name: 'Platform',
            component: () => import('@/views/systemSetting/platform/index'),
            meta: { title: '对接平台维护', icon: 'platform' }
        },
        {
            path: 'rank',
            name: 'Rank',
            component: () => import('@/views/systemSetting/rank'),
            meta: { title: '数量级别设置', icon: 'rank' }
        }
    ]
}

export default systemSetting
