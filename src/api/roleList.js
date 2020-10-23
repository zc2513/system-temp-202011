export default [{
    id: 30,
    RoleName: '管理员',
    Remark: '拥有部分权限 ',
    IsEnable: true,
    children: [{
        id: 101,
        authName: '监督设置 ',
        path: null,
        children: [{
            id: 110,
            authName: '监督节点设置 ',
            path: null,
            children: [{
                id: 113,
                authName: '修改',
                path: null
            }, {
                id: 114,
                authName: '增加',
                path: null
            }, {
                id: 115,
                authName: '删除',
                path: null
            }]
        }, {
            id: 120,
            authNam: '用户管理 ',
            path: null,
            children: [{
                id: 121,
                authName: '增加',
                path: null
            }]
        }]
    }]
}, {
    id: 40,
    RoleName: '超级管理员',
    Remark: '拥有全部权限 ',
    IsEnable: true,
    children: [{
        id: 102,
        authName: '系统管理 ',
        path: null,
        children: [{
            id: 130,
            authName: '角色管理 ',
            path: null,
            children: [{
                id: 131,
                authName: '增加',
                path: null
            }, {
                id: 132,
                authName: '修改',
                path: null
            }]
        }, {
            id: 140,
            authNam: '用户管理 ',
            path: null,
            children: [{
                id: 141,
                authName: '增加',
                path: null
            }, {
                id: 142,
                authName: '删除',
                path: null
            }]
        }]
    }]
}]
