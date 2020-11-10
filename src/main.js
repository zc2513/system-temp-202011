import Vue from 'vue'
import 'babel-polyfill'
import 'normalize.css/normalize.css'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss'

// import VueSocketIO from 'vue-socket.io'

import App from './App'
import store from './store'
import router from './router'
import './directive'
import '@/utils'
Vue.use(ElementUI, { size: 'small', zIndex: 3000 })

Vue.config.productionTip = false

// Vue.use(new VueSocketIO({
//     debug: true,
//     connection: 'http://metinseylan.com:1992',
//     vuex: {
//         store,
//         actionPrefix: 'SOCKET_',
//         mutationPrefix: 'SOCKET_'
//     },
//     options: { path: '/my-app/' } // Optional options
// }))

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})
