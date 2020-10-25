import lazyLoading from './lazyLoading.js'
export default (routers, data) => {
    generaMenu(routers, data)
}
// eslint-disable-next-line no-unused-vars
function generaMenu(routers, data) {
    data.forEach((item) => {
        const menu = Object.assign({}, item)
        if (menu.component.startsWith('layout')) {
            menu.component = lazyLoading('layout', 'tblyout')
        } else {
            menu.component = lazyLoading('views', menu.component)
        }
        if (!item.leaf) {
            menu.children = []
            if (item.children) {
                generaMenu(menu.children, item.children)
            }
        }
        routers.push(menu)
    })
}
