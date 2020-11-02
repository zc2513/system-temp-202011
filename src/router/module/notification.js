/**
 * @description 通知管理
 */

import Layout from '@/layout/tblyout.vue'

const notification = {
    path: '/notification',
    component: Layout,
    redirect: '/notification/index',
    meta: { title: '通知管理', icon: 'notification' },
    alwaysShow: false,
    children: [
        {
            path: 'index',
            name: 'Project',
            component: () => import('@/views/notification/index'),
            meta: { title: '通知管理', icon: '' }
        }
    ]
}

export default notification
