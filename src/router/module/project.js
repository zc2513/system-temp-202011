/**
 * @description 工作计划
 */

import Layout from '@/layout/tblyout.vue'

const project = {
    path: '/project',
    component: Layout,
    redirect: '/project/freshGraduate',
    meta: { title: '工作计划', icon: 'project' },
    alwaysShow: true,
    children: [

        {
            path: 'freshGraduate',
            name: 'FreshGraduate',
            component: () => import('@/views/project/freshGraduate'),
            meta: { title: '应届生计划', icon: '' }
        },
        {
            path: 'ojt',
            name: 'Ojt',
            component: () => import('@/views/project/ojt'),
            meta: { title: 'OJT计划', icon: '' }
        },
        {
            path: 'tutor',
            name: 'Tutor',
            component: () => import('@/views/project/tutor'),
            meta: { title: '导师计划', icon: '' }
        },
        {
            path: 'tutorCustomization',
            name: 'TutorCustomization',
            component: () => import('@/views/project/tutorCustomization'),
            meta: { title: '导师定制计划', icon: '' }
        },
        {
            path: 'me',
            name: 'Me',
            component: () => import('@/views/project/me'),
            meta: { title: '我的计划', icon: '' }
        },
        {
            path: 'meCustomization',
            name: 'MeCustomization',
            component: () => import('@/views/project/meCustomization'),
            meta: { title: '我的定制计划', icon: '' }
        }
    ]
}

export default project
