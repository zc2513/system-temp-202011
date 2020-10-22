/**
 * @description 监督网络
 */

import Layout from '@/layout'

const network = {
    path: '/network',
    component: Layout,
    children: [
        {
            path: '',
            name: 'Network',
            component: () => import('@/views/network/index'),
            meta: { title: '监督网络', icon: 'network' }
        }
    ]
}

export default network
