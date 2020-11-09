
// demo页面
import Layout from '@/layout/tblyout.vue'
const demo = {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    hidden: false,
    name: 'Nested',
    meta: { title: '嵌套路由', icon: 'nested', noCache: true },
    children: [
        {
            path: 'menu1',
            component: () => import('@/views/nested/menu1/index'), // Parent router-view
            name: 'Menu1',
            meta: { title: '菜单一' },
            children: [
                {
                    path: 'menu1-1',
                    component: () => import('@/views/nested/menu1/menu1-1'),
                    name: 'Menu1-1',
                    meta: { title: '菜单1.1' }
                },
                {
                    path: 'menu1-2',
                    component: () => import('@/views/nested/menu1/menu1-2'),
                    name: 'Menu1-2',
                    meta: { title: '菜单1.2' },
                    children: [
                        {
                            path: 'menu1-2-1',
                            component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                            name: 'Menu1-2-1',
                            meta: { title: '菜单1.2.1' }
                        },
                        {
                            path: 'menu1-2-2',
                            component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                            name: 'Menu1-2-2',
                            meta: { title: '菜单1.2.2' }
                        }
                    ]
                },
                {
                    path: 'menu1-3',
                    component: () => import('@/views/nested/menu1/menu1-3'),
                    name: 'Menu1-3',
                    meta: { title: '菜单1.3' }
                }
            ]
        },
        {
            path: 'menu2',
            component: () => import('@/views/nested/menu2/index'),
            name: 'Menu2',
            meta: { title: '表格分页案例' }
        },
        {
            path: 'menu3',
            component: () => import('@/views/nested/menu3/index'),
            name: 'Menu3',
            redirect: '/nested/menu3/index',
            meta: { title: '列表页面' },
            children: [
                {
                    path: 'index',
                    component: () => import('@/views/nested/menu3/list/index'),
                    name: 'list',
                    meta: { title: '列表详情配置', breadcrumb: false }
                },
                {
                    path: 'info',
                    component: () => import('@/views/nested/menu3/list/info'),
                    name: 'Info',
                    meta: { title: '详情页面', activeMenu: '/nested/menu3/index' },
                    hidden: true
                }
            ]
        },
        {
            path: 'menu4',
            component: () => import('@/views/nested/menu4/index'),
            name: 'Menu4',
            meta: { title: '组件案例' }
        },
        {
            path: 'menu5',
            component: () => import('@/views/nested/menu5/index'),
            name: 'Menu5',
            meta: { title: 'echars' }
        },
        {
            path: 'echarts',
            component: () => import('@/views/nested/echarts/xline'),
            name: 'Echarts',
            meta: { title: '水平柱状图' }
        },
        {
            path: 'line',
            component: () => import('@/views/nested/echarts/line'),
            name: 'Line',
            meta: { title: '折线图' }
        },
        {
            path: 'bar',
            component: () => import('@/views/nested/echarts/bar'),
            name: 'Bar',
            meta: { title: '柱状图' }
        },
        {
            path: 'simulation',
            component: () => import('@/views/nested/showEcharts/line'),
            name: 'simulationLine',
            meta: { title: '折线图数据模拟' }
        }
    ]
}

export default demo
