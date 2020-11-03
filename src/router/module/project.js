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
            path: 'area',
            name: 'Area',
            component: () => import('@/views/project/area/index'),
            meta: { title: '区域计划', icon: '' }
        },
        {
            path: 'ojt',
            name: 'OJT',
            component: () => import('@/views/project/OJT/index'),
            meta: { title: 'OJT计划', icon: '' }
        },
        {
            path: 'tutor',
            name: 'Tutor',
            component: () => import('@/views/project/basePlan'),
            meta: { title: '基础计划', icon: '' }
        },
        {
            path: 'demo',
            name: 'demo',
            component: () => import('@/views/project/demo'),
            meta: { title: 'demo', icon: '' }
        },
        {
            path: 'areasetting',
            name: 'AreaSetting',
            component: () => import('@/views/project/area/setting'),
            meta: { title: '区域计划设置', icon: '' }
        }

        // {
        //     path: 'me',
        //     name: 'Me',
        //     component: () => import('@/views/project/me'),
        //     meta: { title: '我的计划', icon: '' }
        // },
        // {
        //     path: 'meCustomization',
        //     name: 'MeCustomization',
        //     component: () => import('@/views/project/meCustomization'),
        //     meta: { title: '我的定制计划', icon: '' }
        // }
    ]
}

export default project
