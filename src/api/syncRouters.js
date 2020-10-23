export default [{
    id: 1,
    path: '/monitoring', // 菜单路径
    component: 'monitoring/index', // 前端组件
    name: 'Monitoring', // 缓存名称
    hidden: false, // 是否隐藏
    alwaysShow: false, // 是否始终显示
    redirect: false, // 重定向 输入框
    meta: {
        icon: 'monitoring', // 菜单图标 下拉
        title: '监督大屏', // 菜单名称
        roles: [], // 按钮权限 下拉多选
        noCache: false, // 是否缓存
        breadcrumb: true, // 是否在面包屑中显示
        activeMenu: '/monitoring', // 高亮显示项 下拉框
        affix: false // 固定标签
    }
},
{
    id: 2,
    path: '/setting',
    component: 'layout',
    name: 'Setting',
    hidden: false,
    alwaysShow: false,
    redirect: '/setting',
    meta: {
        icon: 'setting',
        title: '监督设置',
        roles: [],
        noCache: false,
        breadcrumb: true,
        activeMenu: false,
        affix: false
    },
    children: [{
        id: 21,
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
            activeMenu: '/setting/nodes',
            affix: false
        }
    },
    {
        id: 22,
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
            activeMenu: '/setting/content',
            affix: false
        }
    },
    {
        id: 23,
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
            activeMenu: '/setting/nape',
            affix: false
        }
    }
    ]
}
]
