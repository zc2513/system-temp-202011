import Vue from 'vue'
import Vuex from 'vuex'
const path = require('path')
import getters from './getters'

Vue.use(Vuex)

const moduleFiles = require.context('./modules/', true, /\.js$/)
const modules = moduleFiles.keys().reduce((modules, key) => {
    modules[path.basename(key, '.js')] = moduleFiles(key).default
    return modules
}, {})

const store = new Vuex.Store({
    modules,
    getters
})

export default store
