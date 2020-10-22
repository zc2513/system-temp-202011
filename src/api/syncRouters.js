export default [
    {
        path: '/monitoring',
        component: 'monitoring/index',
        name: 'Monitoring',
        hidden: false,
        alwaysShow: false,
        redirect: false,
        meta: {
            icon: 'monitoring',
            title: '监督大屏',
            roles: [],
            noCache: false,
            breadcrumb: true,
            activeMenu: false,
            affix: false
        }
    },
    {
        path: '/setting',
        component: 'layout',
        name: 'Setting',
        hidden: false,
        alwaysShow: false,
        redirect: '/setting/nodes',
        meta: {
            icon: 'setting',
            title: '监督设置',
            roles: [],
            noCache: false,
            breadcrumb: true,
            activeMenu: false,
            affix: false
        },
        children: [
            {
                path: '/setting/nodes',
                component: 'setting/nodes/index',
                name: 'Nodes',
                hidden: false,
                alwaysShow: false,
                redirect: false,
                meta: {
                    icon: 'nodes',
                    title: '监督节点设置',
                    roles: [],
                    noCache: false,
                    breadcrumb: true,
                    activeMenu: false,
                    affix: false
                }
            },
            {
                path: '/setting/content',
                component: 'setting/content/index',
                name: 'Content',
                hidden: false,
                alwaysShow: false,
                redirect: false,
                meta: {
                    icon: 'content',
                    title: '检查内容设置',
                    roles: [],
                    noCache: false,
                    breadcrumb: true,
                    activeMenu: false,
                    affix: false
                }
            },
            {
                path: '/setting/nape',
                component: 'setting/nape/index',
                name: 'Nape',
                hidden: false,
                alwaysShow: false,
                redirect: false,
                meta: {
                    icon: 'nape',
                    title: '检查项设置',
                    roles: [],
                    noCache: false,
                    breadcrumb: true,
                    activeMenu: false,
                    affix: false
                }
            }
        ]
    },
    {
        path: '/network',
        component: 'layout',
        name: 'NetworkLayout',
        hidden: false,
        alwaysShow: false,
        redirect: '/network/index',
        meta: {
            icon: 'monitoring',
            title: '监督大屏',
            roles: [],
            noCache: false,
            breadcrumb: true,
            activeMenu: false,
            affix: false
        },
        children: [
            {
                path: '/network/index',
                name: 'Network',
                component: 'network/index',
                meta: {
                    icon: 'network',
                    title: '监督网络',
                    roles: [],
                    noCache: false,
                    breadcrumb: true,
                    activeMenu: false,
                    affix: false
                }
            }
        ]
    }
]
