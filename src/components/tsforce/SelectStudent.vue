
<template>
  <div class="header-search flc-y flw">
    <div class="flc-y">
      <div class="f14" style="width:30px;">组别</div>
      <div class="ml20 mr30 ">
        <el-cascader
          ref="tree"
          v-model="selectorg"
          style="width:340px;"
          :options="areas"
          :props="{ expandTrigger: 'hover' }"
          @change="handleChange"
        />
      </div>
    </div>
    <div class="flc-y">
      <!-- <div class="f14" style="min-width:30px;">导师</div>
      <div class="ml20 mr30 group">
        666
        <el-select v-model="selectUser" placeholder="请选择导师">
          <el-option
            v-for="item in users"
            :key="item.id"
            :label="item.realname"
            :value="item.id"
          />
        </el-select>
      </div> -->
    </div>
    <div class="flc-y">
      <div class="f14" style="width:70px;">应届生姓名</div>
      <div class="ml20 mr30">
        <el-select v-model="selectUser" :multiple="mult" filterable placeholder="请输入姓名" @change="changeUser">
          <el-option
            v-for="(item,index) in users"
            :key="index"
            :label="item.realname"
            :value="item.id"
          />
        </el-select>
      </div>
    </div>
    <div v-if="showButton" class="f14 flc-y">
      <el-button size="mini" type="primary" @click="seache">查询</el-button>
      <el-button size="mini" type="primary" @click="reset">重置</el-button>
    </div>
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
            required: true,
            default: ''
        },
        showButton: {
            type: Boolean,
            required: true
        },
        mult: {
            type: Boolean,
            default: false
        },
        selected: {
            type: Boolean,
            default: true
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
        handleChange(value) {
            console.log('选择-------------', value)
            this.selectorg = value
            this.selectNode = this.$refs.tree.getCheckedNodes()
            console.log('选择-------------', this.selectNode)
            this.selectOrgName = []
            // 读取组里边的应届生
            this.queryUserBaseByGroupId(this.selectorg[2])
        },
        getPageGroupInfo() {
            this.value = new Date()
            const params = {
                userId: !this.userId ? this.userInfo.id : this.userId
            } // TODO 替换
            // const params = {
            //     userId: 'e3517f1ca22245e897077a25b5a8c328'
            // }
            console.log('当前用信息，注意是否为空：', this.userInfo)
            queryArearDeptGroupById(params).then(res => {
                if (res.success) {
                    const userinfo = res.result
                    if (userinfo.length > 0) {
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
                                    if (d.groupList != null && d.groupList.length > 0) {
                                        dept.children = []
                                        d.groupList.forEach(g => {
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
                            this.selectNode = this.areas[0]
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
                console.log('查到应届生没有', res)
                if (res.success) {
                    this.users = res.result
                    if (this.mult) {
                        this.selectUser = []
                        if (this.selected) {
                            this.selectUser[0] = this.users[0].id
                        }
                    } else {
                        this.selectUser = ''
                        if (this.selected) {
                            this.selectUser = this.users[0].id
                        }
                    }
                    this.changeUser()
                } else {
                    this.$message.error({ title: '查询失败', content: res.message })
                }
            })
        },
        seache() {
            // this.$emit('seache', this.selectorg, this.selectUser)
            var user = this.users.filter(e => {
                return e.id === this.selectUser
            })
            this.$emit('changeUser', this.selectorg, user[0], this.selectOrgName, this.selectNode, this.users.length)
        },
        changeUser(e) {
            var user = []
            if (!this.mult) {
                user = this.users.filter(e => {
                    return e.id === this.selectUser
                })
                this.$emit('changeUser', this.selectorg, user[0], this.selectOrgName, this.selectNode, this.users.length)
            } else {
                this.users.forEach(item => {
                    if (this.selectUser.includes(item.id)) {
                        user.push(item)
                    }
                })
                this.$emit('changeUser', this.selectorg, user, this.selectOrgName, this.selectNode, this.users.length)
            }
        },
        reset() {
            this.users = []
            this.selectorg = []
            this.selectorg[0] = this.areas[0].value
            this.selectOrgName[0] = this.areas[0].label

            this.selectorg[1] = this.areas[0].children[0].value
            this.selectOrgName[1] = this.areas[0].children[0].label

            this.selectorg[2] = this.areas[0].children[0].children[0].value
            this.selectOrgName[2] = this.areas[0].children[0].children[0].label

            this.queryUserBaseByGroupId(this.selectorg[2])
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
