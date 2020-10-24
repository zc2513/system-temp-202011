/**
 * @description 监督设置
 */

import Layout from '@/layout/tblyout.vue'

const setting = {
    path: '/setting',
    component: Layout,
    redirect: '/setting/nodes',
    meta: { title: '监督设置', icon: 'setting' },
    children: [
        {
            path: 'nodes',
            name: 'Nodes',
            component: () => import('@/views/setting/nodes/index'),
            meta: { title: '监督节点设置', icon: 'nodes' }
        },
        {
            path: 'content',
            name: 'Content',
            component: () => import('@/views/setting/content/index'),
            meta: { title: '检查内容设置', icon: 'content' }
        },
        {
            path: 'content/details',
            name: 'Details',
            hidden: true,
            component: () => import('@/views/setting/content/details/index'),
            meta: { title: '检查内容详情', activeMenu: '/setting/content' }
        },
        {
            path: 'nape',
            name: 'Nape',
            component: () => import('@/views/setting/nape/index'),
            meta: { title: '检查项设置', icon: 'nape' }
        }
    ]
}

export default setting
