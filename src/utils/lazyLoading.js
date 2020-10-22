export default (base, name) => resolve => require([`@/${base}/${name}.vue`], resolve)
// export default (name) => () => import(`@/views/${name}`)
