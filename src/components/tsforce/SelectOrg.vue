
<template>
  <div>
    <div class="flc-y">
      <div class="f14" style="width:30px;">组别</div>
      <div class="ml20 mr30 ">
        <el-cascader
          ref="tree"
          v-model="selectorg"
          style="width:500px;"
          :options="areas"
          :props="{ expandTrigger: 'hover' }"
          @change="handleChange"
        />
      </div>
    </div>
  </div>
</template>

<script>

import { queryArearDeptGroupById } from '@/api/systemOrg'
import { mapState, mapGetters } from 'vuex'
export default {
    name: 'SelectStudent',
    props: {
        userId: {
            type: String,
            required: true,
            default: ''
        }

    },
    data() {
        return {
            areas: [],
            selectorg: [],
            selectOrgName: [],
            users: null,
            selectUser: null,
            selectNode: null
        }
    },
    computed: {
        ...mapState('user', ['token', 'userInfo']),
        ...mapGetters(['token'])
    },
    created() {
        console.log('查询用户', this.userInfo)
        this.getPageGroupInfo()
    },

    methods: {
        init() {
            this.areas = []
            this.getPageGroupInfo()
        },
        handleChange(value) {
            console.log('选择-------------', value)
            this.selectorg = value
            this.selectNode = this.$refs.tree.getCheckedNodes()
            console.log('选择-------------', this.selectNode)
            this.$emit('change', this.selectorg, this.selectOrgName, this.selectNode)
            this.selectOrgName = []
            // 读取组里边的应届生
        },
        getPageGroupInfo() {
            // const params = {
            //     userId: !this.userId ? this.userInfo.id : this.userId
            // } TODO 替换
            const params = {
                userId: 'e3517f1ca22245e897077a25b5a8c328'
            }
            console.log('当前用信息，注意是否为空：', this.userInfo)
            queryArearDeptGroupById(params).then(res => {
                console.log(' 返回的用户信息', res.result)
                if (res.success) {
                    console.log(' 返回的用户信息2222', res.result)
                    const userinfo = res.result
                    if (userinfo.length > 0) {
                        console.log(' 返回的用户信息233333222')
                        userinfo.forEach(element => {
                            var area = {
                                value: element.areaId,
                                label: element.areaName
                            }
                            console.log('区域1')
                            if (element.dept != null && element.dept.length > 0) {
                                area.children = []
                                element.dept.forEach(d => {
                                    var dept = {
                                        value: d.deptId,
                                        label: d.deptName
                                    }
                                    console.log('区域1')
                                    if (d.groupList != null && d.groupList.length > 0) {
                                        dept.children = []
                                        d.groupList.forEach(g => {
                                            console.log('区域1')
                                            dept.children.push(
                                                {
                                                    value: g.groupId,
                                                    label: g.groupName
                                                }
                                            )
                                        })
                                    }

                                    area.children.push(dept)
                                })
                            }
                            this.areas.push(area)
                            this.selectOrgName[0] = this.areas[0].label
                            this.selectorg[0] = this.areas[0].value
                            this.selectorg[1] = this.areas[0].children[0].value
                            this.selectOrgName[1] = this.areas[0].children[0].label
                            this.selectorg[2] = this.areas[0].children[0].children[0].value
                            this.selectOrgName[2] = this.areas[0].children[0].children[0].label
                            console.log('区域--------------------ffff---', this.areas, this.selectorg)
                            this.selectNode = this.areas[0]
                            this.$emit('change', this.selectorg, this.selectOrgName)
                        })
                    } else {
                        this.$message.error({ title: '查询失败', content: res.message })
                    }
                }
            })
        },
        seache() {
            this.$emit('change', this.selectorg, this.selectOrgName, this.selectNode)
        },

        reset() {
            this.selectorg = []
            this.selectorg[0] = this.areas[0].value
            this.selectOrgName[0] = this.areas[0].label

            this.selectorg[1] = this.areas[0].children[0].value
            this.selectOrgName[1] = this.areas[0].children[0].label

            this.selectorg[2] = this.areas[0].children[0].children[0].value
            this.selectOrgName[2] = this.areas[0].children[0].children[0].label
            this.selectNode = this.$refs.tree.getCheckedNodes()
            this.$emit('change', this.selectorg, this.selectOrgName, this.selectNode)
            console.log('区域-----------------------', this.areas, this.selectorg)
        }
    }
}
</script>
<style lang='scss'  scoped>
.header-search{
    color: #5F6266;
    padding: 15px 0;
    >div{
        height: 50px;
    }
    ::v-deep{
        .el-select,.el-cascader{
            width: 240px;
        }
    }
}
</style>
