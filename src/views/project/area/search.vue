<template>
  <el-form ref="ruleForm" :inline="true" :model="formInline" class="form-box">
    <!-- <el-form-item label="区域:" class="ml10" prop="time">
      <el-select v-model="formInline.department" placeholder="请选择部门">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item> -->
    <el-form-item v-if="verify.stageType === '2'" label="部门:" class="ml10" prop="departId">
      <el-select v-model="formInline.departId" placeholder="请选择部门">
        <el-option
          v-for="item in userInfo.dept"
          :key="item.deptId"
          :label="item.deptName"
          :value="item.deptId"
        />

      </el-select>
    </el-form-item>
    <el-form-item v-if="verify.stageType === '3'" class="ml10" prop="groups" label="组别:">
      <el-cascader
        ref="group"
        v-model="formInline.groups"
        :options="teams"
        placeholder="请选择组别"
        clearable
      />
    </el-form-item>

    <el-form-item label="提交人角色:" class="ml10" prop="role">
      <el-select v-model="formInline.role" placeholder="请选择提交人角色">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="提交人:" class="ml10" prop="person">
      <!-- <el-select v-model="formInline.person" placeholder="请选择提交人">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select> -->
      <el-input v-model="formInline.person" placeholder="请输入提交人姓名" />
    </el-form-item>
    <el-form-item label="计划标题:" class="ml10" prop="planTitle">
      <el-input v-model="formInline.planTitle" placeholder="请输入计划标题" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" class="ml20" @click="submitForm('ruleForm')">查询</el-button>
      <el-button type="primary" class="ml20" @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>

</template>

<script>
import { mapGetters } from 'vuex'

export default {
    props: {
        verify: {
            type: Object,
            default: () => { return {} }
        }

    },
    data() {
        return {
            formInline: {
                groups: '',
                departId: '',
                time: '',
                role: '',
                person: '',
                planTitle: ''
            },
            options: [
                { value: '管理员', label: '管理员' },
                { value: '总经理', label: '总经理' }

            ]

        }
    },
    computed: {
        ...mapGetters(['userInfo'])
    },
    watch: {
        type: {
            handler(val) {
                this.init()
            },
            immediate: true
        }
    },
    created() {
        this.init()
        this.teams = this.userInfo.dept.map(item => {
            return {
                value: item.deptId + '',
                label: item.deptName,
                children: item.groupList.map(e => {
                    return {
                        value: e.groupId + '',
                        label: e.groupName
                    }
                })
            }
        })
    },
    methods: {
        init() { // 初始化基本数据
            //  根据类型拿对应数据this.type

            Object.assign(this.formInline, this.verify)
        },
        submitForm(formName) {
            this.$emit('change', { ...this.formInline, ...this.verify })
        },
        resetForm(formName) {
            this.$emit('reset')
            this.$refs[formName].resetFields()
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
