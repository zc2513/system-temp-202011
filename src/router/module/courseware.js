/**
 * @description 优秀课件
 */

import Layout from '@/layout/tblyout.vue'

const courseware = {
    path: '/courseware',
    component: Layout,
    redirect: '/courseware/onece',
    meta: { title: '优秀课件', icon: 'courseware' },
    alwaysShow: true,
    children: [
        {
            path: 'onece',
            name: 'Onece',
            component: () => import('@/views/courseware/index'),
            meta: { title: '优秀课件', icon: '' }
        }
    ]
}

export default courseware
