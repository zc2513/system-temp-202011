import Vue from 'vue'

import '@/icons' // 字体图标
import '@/permission' // 权限
import './component-register' // 全局组件注册
import './filter-register' // 全局过滤器注册

import * as storage from './storage.js'

// 本地存储
Vue.prototype.$s = storage

