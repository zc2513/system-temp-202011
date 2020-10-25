/**
 * @description 优秀课件
 */

import Layout from '@/layout/tblyout.vue'

const courseware = {
    path: '/courseware',
    component: Layout,
    redirect: '/courseware/index',
    meta: { title: '优秀课件', icon: 'courseware' },
    alwaysShow: true,
    children: [
        {
            path: 'index',
            name: 'Project',
            component: () => import('@/views/courseware/index'),
            meta: { title: '监督节点设置', icon: '' }
        }
    ]
}

export default courseware
