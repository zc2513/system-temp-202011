/* 暂时无用 */
export default {
    install(Vue, options) {
        Vue.directive('elps', {
            inserted: (el, binding, vnode) => {
                console.dir(el)
                console.dir(binding)
                setStyle(el, binding, vnode)
            }
        })
    }
}

function setStyle(el, binding, vnode) {
    const { arg = 20, value = 1 } = binding
    if (!value) return
    console.log(arg * value)
    el.style.height = arg * value + 'px'
    if (value === 1) {
        el.className = 'elps'
    } else {
        el.className = 'elpsMroe'
    }
}
