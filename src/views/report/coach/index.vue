<template>
  <!-- 辅导记录 -->
  <div class="coach">
    <z-header title="辅导记录" class="mb15 bold" />
    <div class="box content">
      <search :user-id="userInfo.userId" @change="seache" />
      <div>
        <el-button type="primary" class="ml20" @click="addCoach">新建</el-button>
      </div>
      <div class="selectedTitle plr24 flc-y mt15 c-56 f14">
        已选择
        <span class="c-66f pl5 pr5"> 0 </span>项
        <span class="c-66f ml25 cursor">清空</span>
      </div>

      <z-table
        :titles="titles"
        :btns="btn"
        :lists="tableData"
        align="left"
        class="mt15"
        @sendVal="getVal"
      />
    </div>

    <!-- 新增编辑页面 -->
    <addAsEdit ref="addAsEdit" :type="type" :title="diaTitle" @ok="loadCocah" />
    <!-- 详情页面 -->
    <lock ref="lock" />
  </div>
</template>

<script>

import search from './search'
import addAsEdit from './addAsEdit'
import lock from './lock'
import datas from '@/assets/json/data'
import { getUserInfo } from '@/api/calendar'
import { parseTime } from '@/utils/filter'
import { mapState, mapGetters } from 'vuex'

import { saveCoach, listCoach, coachQueryById, deleteCoach } from '@/api/coach'
export default {
    name: 'Coach',
    components: { search, addAsEdit, lock },
    data() {
        return {
            diaTitle: '新建辅导记录',
            titles: [
                { type: 'selection' },
                { name: '工号', data: 'stateCode' },
                { name: '应届生姓名', data: 'realname' },
                { name: '组别', data: 'newGroupName' },
                { name: '辅导时间', data: 'startTime' }
            ],
            tableData: datas.slice(0, 8),
            btn: {
                title: '操作',
                btnlist: [
                    { con: '详情', type: 'text' },
                    { con: '编辑', type: 'text' },
                    { con: '删除', type: 'text', style: { color: '#FF5633' }}
                ]
            },
            tsUserInfo: null,
            type: 1,
            params: {}

        }
    },
    computed: {
        ...mapState('user', ['token', 'userInfo']),
        ...mapGetters(['token'])
    },
    watch: {
        groupId() {
            //  this.valueId = this.value
            this.loadCocah()
        }
    },
    created() {
        // this.getPageUserInfo()
    },
    methods: {
        getVal(v) {
            console.log(v)
            const { type } = v
            if (type === '编辑') {
                this.diaTitle = type
                this.editCoach(v)
            }
            if (type === '删除') {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    console.log('here', v)
                    this.deleteCoach(v)
                    this.$message.success('删除成功!')
                }).catch(() => {
                    this.$message.info('已取消删除')
                })
            }
            if (type === '详情') {
                this.viewCoach(v)
                // this.$refs.lock.show()
            }
        },
        // 进入页面首先加载的内容
        loadCocah() {
            console.log('当前用信息，注意是否为空：', this.userInfo, this.params)

            listCoach(this.params).then(res => {
                console.log(' 返回的用户信息-------------------------', res.result)
                if (res.success) {
                    console.log('返回结果', res)
                    this.tableData = res.result
                    this.tableData.forEach(val => {
                        val.newGroupName = val.areaName + ' ' + val.departName + ' ' + val.groupName
                        val.startTime = parseTime(val.startTime, '{y}-{m}-{d}')
                    })
                } else {
                    this.$message.error({ title: '查询失败', content: res.message })
                }
            })
        },
        // 新建辅导记录
        addCoach() {
            var formInline = {

                content: '',
                areaId: '',
                areaName: '',

                departId: '',

                departName: '',
                endTime: '',
                // fstCounselorRecordStudentVOList	[...]
                groupId: '',
                groupName: '',

                periodId: '1',
                periodName: '',
                realname: this.userInfo.realname,
                startTime: new Date(),
                status: '0',
                updateTime: '',
                userId: this.userInfo.id,
                username: this.userInfo.username
            }
            this.type = 1
            this.$refs.addAsEdit.show(formInline)
        },
        editCoach(v) {
            var formInline = {

                content: v.data.content,

                //  startTime: new Date(),
                realname: v.data.realname,
                id: v.data.id,
                groupName: v.data.areaName + ' ' + v.data.departName + ' ' + v.data.groupName,
                startTime: v.data.startTime

            }
            this.type = 2
            this.$refs.addAsEdit.show(formInline)
        },
        viewCoach(v) {
            var formInline = {

                content: v.data.content,

                //  startTime: new Date(),
                realname: v.data.realname,
                id: v.data.id,
                groupName: v.data.areaName + ' ' + v.data.departName + ' ' + v.data.groupName,
                startTime: v.data.startTime

            }
            this.type = 3
            this.$refs.addAsEdit.show(formInline)
        },
        deleteCoach(v) {
            deleteCoach({ id: v.data.id }).then(res => {
                console.log('res--------------------', res)
                this.loadCocah()
            })
        },
        seache(data) {
            console.log('参数-------辅导', data)
            this.params = {
                areaId: data.selectorg[0],
                departId: data.selectorg[1],
                groupId: data.selectorg[2],
                startTime: data.startTime,
                userId: data.selectUser ? data.selectUser.id : null
            }
            this.loadCocah()
        }
    }
}
</script>

<style lang="scss" scoped>
.coach{
   .content{
       padding: 24px;
   }
   .selectedTitle{
        height: 48px;
        background: #F7F7FF;
   }
}
</style>
