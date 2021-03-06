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
            name: 'notification',
            component: () => import('@/views/notification/index'),
            meta: { title: '通知管理', icon: '' }
        },
        {
            path: 'info',
            name: 'NotificationInfo',
            hidden: true,
            component: () => import('@/views/notification/info'),
            meta: { title: '通知详情', icon: '' }
        },
        {
            path: 'list',
            name: 'NotificationList',
            hidden: true,
            component: () => import('@/views/notification/list'),
            meta: { title: '消息列表', icon: '' }
        }
    ]
}

export default notification
