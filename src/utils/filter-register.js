// 过滤器注册
import Vue from 'vue'

import * as filters from '@/utils/filter.js'

Object.keys(filters).forEach((key) => {
    Vue.filter(key, filters[key])
})

export default filters
