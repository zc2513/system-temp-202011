import Vue from 'vue'
import path from 'path'
import SvgIcon from '@/components/SvgIcon'

Vue.component('svg-icon', SvgIcon)

const req = require.context('./svg', false, /\.svg$/)

const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)

// svg名称集合
export const svgNames = req.keys().map(e => path.basename(e, '.svg'))
