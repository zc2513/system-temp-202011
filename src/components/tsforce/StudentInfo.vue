<template>
  <div>
    <el-card>
      <el-row> <span style="font-size:18px;bold; margin-top:16px;margin-bottom:16px">基本信息</span> </el-row>
      <el-row :gutter="20" style="margin: 14px">
        <el-col :span="10">
          <span style="font-size: 14px"> 姓名</span>
        </el-col>
        <el-col :span="14">
          <span style="font-size: 14px"> {{ tsUserInfo.realName }}</span>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin: 14px">
        <el-col :span="10">
          <span style="font-size: 14px"> 计划类型</span>
        </el-col>
        <el-col :span="14">
          <span style="font-size: 14px"> {{ type }}</span>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin: 14px">
        <el-col :span="10">
          <span style="font-size: 14px"> 计划时间</span>
        </el-col>
        <el-col :span="14">
          <span style="font-size: 14px"> {{ planTime }}</span>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin: 14px">
        <el-col :span="10">
          <span style="font-size: 14px"> 组别</span>
        </el-col>
        <el-col :span="14">
          <span style="font-size: 14px">
            {{ tsUserInfo.areaName }} {{ tsUserInfo.dept[0].deptName }}
            {{ tsUserInfo.dept[0].groupList[0].groupName }}
          </span>
        </el-col>
      </el-row>
    </el-card>

  </div>
</template>

<script>
import moment from 'moment'

export default {
    name: 'StudentInfo',
    components: {},
    props: {
        type: {
            type: String,
            required: true,
            default: '自定义计划'
        },
        planTime: {
            type: String,
            required: true,
            default: '2020年10月10日'
        },
        tsUserInfo: {
            type: Object,
            required: true

        }

    },
    data() {
        return {

            createDate: moment(new Date()).format('yyyy-MM-DD hh:mm:ss'),
            comments: [],
            url: {

            },
            model: {}

        }
    },
    created() {

    },
    methods: {

    }
}
</script>
