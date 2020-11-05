<template>
  <!-- 组别到人筛选级联框 -->
  <el-cascader
    v-model="selDatas"
    class="ground-person-cls"
    :show-all-levels="false"
    :options="options"
    :props="{lazy: true,lazyLoad,multiple: true,emitPath: false}"
    @change="getkey"
  />
</template>

<script>

import { queryArearDeptGroupById, queryUserBaseByGroupId } from '@/api/common'

import { mapState } from 'vuex'
export default {
    props: {
        value: {
            type: [Array, String],
            default: _ => []
        }
    },
    data() {
        return {
            options: [],
            selDatas: ['2']
        }
    },
    computed: {
        ...mapState('user', ['userInfo'])
    },
    watch: {
        value: {
            handler(v) {
                // 回显暂无处理....
            },
            immediate: true
        }
    },
    created() {
        this.init()
    },
    methods: {
        init() {
            queryArearDeptGroupById({ userId: this.userInfo.id }).then(res => {
                if (res.code === 200) {
                    this.options = res.result.map(item => {
                        return {
                            value: item.areaId,
                            label: item.areaName,
                            children: item.dept.map(ele => {
                                return {
                                    value: ele.deptId,
                                    label: ele.deptName,
                                    children: ele.groupList.map(e => {
                                        return {
                                            value: e.groupId,
                                            label: e.groupName
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            })
        },
        lazyLoad(node, resolve) { // 行业分类 加载项
            const { level, value } = node
            if (level === 3) {
                queryUserBaseByGroupId({ groupId: value }).then(res => {
                    if (res.code === 200) {
                        resolve(res.result.map(item => {
                            return {
                                value: item.id,
                                label: item.realname,
                                leaf: true
                            }
                        }))
                    } else {
                        this.$message.error(res.message || '未返回错误状态')
                    }
                })
            } else {
                resolve()
            }
        },
        getkey(e) {
            this.$emit('input', e.join(','))
        }
    }
}
</script>

<style lang="scss" scoped>
.ground-person-cls{
    width: 100%;
}
</style>
