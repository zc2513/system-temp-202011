<template>
  <el-form ref="ruleForm" :inline="true" :model="formInline" class="form-box flc-y">

    <el-form-item class="ml10" prop="time">
      <select-student ref="selectStu" :user-id="userId" :show-button="false" :selected="false" :mult="false" @changeUser="changeUser" />
    </el-form-item>
    <el-form-item label="辅导时间:" class="ml10" prop="time">
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
import SelectStudent from '@/components/tsforce/SelectStudent.vue'

export default {
    components: {
        SelectStudent
    },
    props: {
        type: {
            type: [String, Number],
            default: 1
        },
        userId: {
            type: String,
            default: 'e9ca23d68d884d4ebb19d07889727dae'
        }
    },
    data() {
        return {
            formInline: {
                group: '',
                time: '',
                person: ''
            },
            selectOrg: null,
            options: [
                { value: '选项1', label: '黄金糕' },
                { value: '选项2', label: '双皮奶' },
                { value: '选项3', label: '蚵仔煎' }
            ]
        }
    },
    watch: {
        type: {
            handler(val) {
                this.inin()
            },
            immediate: true
        }
    },
    methods: {
        inin() { // 初始化基本数据
            //  根据类型拿对应数据this.type
        },
        submitForm(formName) {
            this.$emit('change', { selectOrg: this.selectOrg, startTime: this.formInline.time })
        },
        resetForm(formName) {
            this.$refs[formName].resetFields()
            this.$refs.selectStu.reset()
        },
        changeUser(selectorg, selectUser, selectOrgName, selectNode, userCount) {
            this.selectOrg = {
                selectorg, selectUser, selectOrgName, selectNode, userCount
            }
            // console.log('选中的用户组织架构与用户', selectOrg)
            // if (selectOrgName.length > 0) {
            //     // this.form.planUser = selectUser.realname
            //     // this.form.planUserId = selectUser.userId
            //     // this.form.areaId = selectorg[0]
            //     // this.form.areaName = selectOrgName[0]
            //     // this.form.departId = selectorg[1]
            //     // this.form.departName = selectOrgName[1]
            //     this.groupId = selectorg[2]
            //     // this.form.groupName = selectOrgName[2]
            //     this.orgName = selectOrgName[0] + '/' + selectOrgName[1] + '/' + selectOrgName[2]
            // } else {
            //     // this.form.planUser = selectUser.realname
            //     // this.form.planUserId = selectUser.userId
            //     // this.form.areaId = selectorg[0]
            //     // this.form.areaName = selectNode[0].parent.parent.label
            //     // this.form.departId = selectorg[1]
            //     // this.form.departName = selectNode[0].parent.label
            //     this.groupId = selectorg[2]
            //     // this.form.groupName = selectNode[0].label
            //     this.orgName = selectNode[0].parent.parent.label + '/' + selectNode[0].parent.label + '/' + selectNode[0].label
            // }

            console.log('选中的用户组织架构与用户----------', this.selectOrg)
            this.$emit('change', this.selectOrg)
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
