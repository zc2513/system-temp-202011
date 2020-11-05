<template>
  <el-form ref="ruleForm" :inline="true" :model="formInline" class="form-box">
    <el-form-item class="ml10" prop="group">
      <el-cascader
        ref="tree"
        v-model="selectorg"
        style="width:500px;"
        :options="areas"
        :props="{ expandTrigger: 'hover' }"
        @change="handleChange"
      />
    </el-form-item>
    <el-form-item label="提交时间" class="ml10 flc-y" prop="time">
      <el-date-picker
        v-model="formInline.time"
        type="date"
        placeholder="请选择时间"
      />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" class="ml20" @click="submitForm('ruleForm')">查询</el-button>
      <el-button type="primary" class="ml20" @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { queryArearDeptGroupById } from '@/api/systemOrg'
import { mapState } from 'vuex'
export default {
    components: {

    },
    props: {
        type: {
            type: [String, Number],
            default: 1
        },
        userId: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            formInline: {
                group: '',
                time: '',
                person: ''
            },
            selectOrgName: [],
            areas: [],
            selectorg: []

        }
    },
    computed: {
        ...mapState('user', ['token', 'userInfo'])
    },
    watch: {
        type: {
            handler(val) {
                this.init()
            },
            immediate: true
        }
        // selectOrg: {
        //     handler(val) {
        //         console.log('初始化查询----车出现----------xxxx', this.selectOrg)
        //         this.init()
        //     },
        //     immediate: true
        // }
    },
    created() {
        // this.init()
    },
    methods: {

        init() {
            this.areas = []
            //  根据类型拿对应数据this.type
            console.log('初始化查询--------------xxxx', this.selectOrg)
            this.getPageGroupInfo()
        },
        handleChange(value) {
            console.log('选择-------------', value)
            this.selectorg = value
            this.selectNode = this.$refs.tree.getCheckedNodes()
            console.log('选择-------------', this.selectNode)
            // this.$emit('change', this.selectorg, this.selectOrgName, this.selectNode)
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
                        })
                        this.selectNode = this.areas[0]
                        console.log('区域--------------------ffff---', this.areas)

                        this.$emit('searche', this.selectorg, this.formInline)
                    } else {
                        this.$message.error({ title: '查询失败', content: res.message })
                    }
                }
            })
        },

        submitForm(formName) {
            this.$emit('searche', this.selectorg, this.formInline)
        },
        resetForm(formName) {
            this.$refs[formName].resetFields()
            this.init()
        }

    }
}
</script>

<style lang="scss" scoped>
.form-box{

    border-radius: 15px;
    background-color: #fff;
    padding:20px 0px;
    ::v-deep{
        .el-form-item__label{
            color: #5F6266;
            font-weight: 400;
        }
        .el-date-editor,.el-select{
            // width: 280px;
        }
    }

}
</style>
