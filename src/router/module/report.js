/**
 * @description 工作汇报
 */

import Layout from '@/layout/tblyout.vue'

const report = {
    path: '/report',
    component: Layout,
    redirect: '/report/coach',
    meta: { title: '工作汇报', icon: 'report' },
    alwaysShow: true,
    children: [
        {
            path: 'freshGraduate',
            name: 'FreshGraduateRp',
            component: () => import('@/views/report/freshGraduate'),
            meta: { title: '应届生汇报', icon: '' }
        },
        {
            path: 'coach',
            name: 'Coach',
            component: () => import('@/views/report/coach'),
            meta: { title: '辅导记录', icon: '' }
        },
        {
            path: 'mgr',
            name: 'Mgr',
            component: () => import('@/views/report/mgr'),
            meta: { title: 'Mgr月报', icon: '' }
        },
        {
            path: 'personnel',
            name: 'Personnel',
            component: () => import('@/views/report/personnel'),
            meta: { title: '人员状态', icon: '' }
        },
        {
            path: 'meReport',
            name: 'MeReport',
            component: () => import('@/views/report/meReport'),
            meta: { title: '我的汇报', icon: '' }
        },
        {
            path: 'manager',
            name: 'Manager',
            component: () => import('@/views/report/manager'),
            meta: { title: '研发经理月报', icon: '' }
        }
    ]
}

export default report
