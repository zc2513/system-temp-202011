
<template>
  <div>
    <el-row>
      <el-col :span="2">导师</el-col>
      <el-col :span="4">

        <el-cascader
          ref="tree"
          v-model="selectorg"
          :options="areas"
          size="medium"
          :props="{ expandTrigger: 'hover' }"
          @change="handleChange"
        />

      </el-col>
      <el-col :span="8">
        <span>选择的区域/部门/小组：{{ selectOrgName }}</span>
      </el-col>
      <el-col :span="1">应届生</el-col>
      <el-col :span="4">

        <el-select v-model="selectUser" multiple placeholder="请选择">
          <el-option
            v-for="item in users"
            :key="item.id"
            :label="item.realname"
            :value="item.id"
          />
        </el-select>

      </el-col>
      <el-col :span="1"> <el-button @click="seache">查询</el-button></el-col>
    </el-row>

  </div>
</template>

<script>

import { queryArearDeptGroupById, queryUserBaseByGroupId } from '@/api/systemOrg'
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
            selectOrgName: '',
            users: null,
            selectUser: []
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
        handleChange(value) {
            console.log('选择-------------', value)
            this.selectorg = value
            var node = this.$refs.tree.getCheckedNodes()
            console.log('选择-------------', node)
            this.selectOrgName = ''
            this.selectOrgName = node[0].parent.parent.label + '/' + node[0].parent.label + '/' + node[0].label
            // 读取组里边的应届生
            this.queryUserBaseByGroupId(this.selectorg[2])
        },
        getPageGroupInfo() {
            this.value = new Date()
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
                            this.selectOrgName = this.areas[0].label + '/'
                            this.selectorg[0] = this.areas[0].value
                            this.selectorg[1] = this.areas[0].children[0].value
                            this.selectOrgName += this.areas[0].children[0].label + '/'
                            this.selectorg[2] = this.areas[0].children[0].children[0].value
                            this.selectOrgName += this.areas[0].children[0].children[0].label
                            console.log('区域', this.areas, this.selectorg)
                            this.queryUserBaseByGroupId(this.selectorg[2])
                        })
                    } else {
                        this.$message.error({ title: '查询失败', content: res.message })
                    }
                }
            })
        },
        queryUserBaseByGroupId(groupId) {
            const params = {
                groupId: groupId
            }
            // dd
            queryUserBaseByGroupId(params).then(res => {
                console.log(' 根据组号找应届生信息', res.result)
                if (res.success) {
                    console.log(' 返回的用户信息2222', res.result)
                    this.users = res.result
                    this.selectUser = []
                    this.selectUser[0] = this.users[0].id
                } else {
                    this.$message.error({ title: '查询失败', content: res.message })
                }
            })
        },
        seache() {
            this.$emit('seache', this.selectorg, this.selectUser)
        }
    }
}
</script>
<style lang='scss'  scoped>
 .block{
     width: 400px;
 }
</style>
