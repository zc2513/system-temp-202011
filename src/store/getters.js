const getters = {
    sidebar: state => state.app.sidebar,
    device: state => state.app.device,
    roles: state => state.user.roles,
    addRouters: state => state.permission.addRoutes,
    token: state => state.user.token,
    avatar: state => state.user.avatar,
    name: state => state.user.name
}
export default getters
