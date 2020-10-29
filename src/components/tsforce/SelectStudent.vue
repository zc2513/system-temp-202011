
<template>
  <div>
    <el-row style="padding:10px">
      <el-col :span="2">导师</el-col>
      <el-col :span="4">
        <div class="block">
          <el-cascader
            ref="tree"
            v-model="selectorg"
            :options="areas"
            size="medium"
            :props="{ expandTrigger: 'hover' }"
            @change="handleChange"
          />
        </div>
      </el-col>
      <el-col :span="8">
        <span>选择的区域/部门/小组：{{ selectOrgName }}</span>
      </el-col>
      <el-col :span="2">应届生</el-col>
      <!-- <el-col :span="4">
        <div class="block">
          <el-cascader
            v-model="value"
            :options="options"
            size="medium"
            :props="{ expandTrigger: 'hover' }"
            @change="handleChange"
          />
        </div>
      </el-col> -->
      <el-col :span="4"> <el-button>查询</el-button></el-col>
    </el-row>

  </div>
</template>

<script>

import { getUserInfo } from '@/api/calendar'
import { queryArearDeptGroupById } from '@/api/systemOrg'
import { mapState, mapGetters } from 'vuex'
export default {
    name: 'SelectStudent',
    props: {
        userId: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            areas: [],
            selectorg: [],
            selectOrgName: ''
        }
    },
    computed: {
        ...mapState('user', ['token', 'userInfo']),
        ...mapGetters(['token'])
    },
    created() {
        console.log('查询用户', this.userInfo)
        this.getPageUserInfo()
    },

    methods: {
        handleChange(value) {
            console.log('选择-------------', value)
            this.selectorg = value
            var node = this.$refs.tree.getCheckedNodes()
            console.log('选择-------------', this.$refs.tree.getCheckedNodes())
            this.selectOrgName = ''
            this.selectOrgName = node.parant.label + '/' + node.parant.label + '/' + node.label
        },
        getPageUserInfo() {
            this.value = new Date()
            // const params = {
            //     userId: !this.userId ? this.userInfo.id : this.userId
            // } TODO 替换
            const params = {
                userId: 'e3517f1ca22245e897077a25b5a8c328'
            }
            console.log('当前用信息，注意是否为空：', this.userInfo)
            getUserInfo(params).then(res => {
                console.log(' 返回的用户信息', res.result)
                if (res.success) {
                    console.log(' 返回的用户信息2222', res.result)
                    const userinfo = res.result
                    // if (userinfo.length > 0) {
                    //     console.log(' 返回的用户信息233333222')
                    //     userinfo.forEach(element => {
                    //         var area = {
                    //             value: element.areaId,
                    //             label: element.areaName
                    //         }
                    //         console.log('区域1')
                    //         if (element.dept != null && element.dept.length > 0) {
                    //             element.dept.forEach(d => {
                    //                 var dept = {
                    //                     value: d.deptId,
                    //                     label: d.deptName
                    //                 }
                    //                 console.log('区域1')
                    //                 if (d.groupList != null && d.groupList.length > 0) {
                    //                     d.groupList.forEach(g => {
                    //                         console.log('区域1')
                    //                         dept.push(
                    //                             {
                    //                                 value: g.groupId,
                    //                                 label: g.groupName
                    //                             }
                    //                         )
                    //                     })
                    //                 }
                    //                 area.push(dept)
                    //             })
                    //         }
                    //         this.areas.push(area)
                    //         console.log('区域', this.areas)
                    //     })
                    // } else {
                    //     this.$message.error({ title: '查询失败', content: res.message })
                    // }

                    if (userinfo != null) {
                        console.log(' 返回的用户信息233333222')
                        var area = {
                            value: userinfo.areaId,
                            label: userinfo.areaName
                        }
                        console.log('区域1')
                        if (userinfo.dept != null && userinfo.dept.length > 0) {
                            area.children = []
                            userinfo.dept.forEach(d => {
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
                        this.selectOrgName = this.areas[0].label + '/'
                        this.selectorg[0] = this.areas[0].value
                        this.selectorg[1] = this.areas[0].children[0].value
                        this.selectOrgName += this.areas[0].children[0].label + '/'
                        this.selectorg[2] = this.areas[0].children[0].children[0].value
                        this.selectOrgName += this.areas[0].children[0].children[0].label

                        console.log('区域', this.areas, this.selectorg)
                    } else {
                        this.$message.error({ title: '查询失败', content: res.message })
                    }
                }
            })
        }
    }
}
</script>
<style lang='scss'  scoped>
 .block{
     width: 400px;
 }
</style>
