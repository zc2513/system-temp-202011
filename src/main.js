import Vue from 'vue'
import 'babel-polyfill'
import 'normalize.css/normalize.css'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss'

import App from './App'
import store from './store'
import router from './router'

import '@/utils'

Vue.use(ElementUI, { size: 'small', zIndex: 3000 })

Vue.config.productionTip = false

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})
