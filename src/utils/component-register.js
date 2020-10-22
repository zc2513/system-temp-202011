import Vue from 'vue'
const path = require('path')
const files = require.context('@/components/globalComponent', false, /\.vue$/)

files.keys().forEach(key => {
    const name = path.basename(key, '.vue')
    Vue.component(name, files(key).default || files(key))
})

