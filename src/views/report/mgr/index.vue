<template>
  <!-- Mgr月报 -->
  <div class="coach">
    <z-header title="Mgr月报" class="mb15 bold" />
    <div class="box content">
      <el-row>
        <el-col :span="12">
          <span>地区</span> <span>{{ tsUserInfo.areaName }}</span>
        </el-col>
        <el-col :span="12">
          <span>Mgr</span> <span>{{ tsUserInfo.realName }}</span>
        </el-col>
      </el-row>
      <search @change="change" />
      <div>
        <el-button type="primary" class="ml20" @click="add">新建</el-button>
      </div>
      <div class="selectedTitle plr24 flc-y mt15 c-56 f14">
        已选择
        <span class="c-66f pl5 pr5"> 0 </span>项
        <span class="c-66f ml25 cursor">清空</span>
      </div>

      <z-table
        :titles="titles"
        :btns="btn"
        :lists="mgrlist"
        align="left"
        class="mt15"
        @sendVal="getVal"
      />
    </div>
    <z-page :total="baseParams.total" :page-size="baseParams.pageSize" :current-page="baseParams.pageNo" @pagesend="getPageData" @pagesizes="pagesizes" />

    <!-- 新增编辑页面 -->
    <addAsEdit ref="addAsEdit" :type="type" :title="diaTitle" @ok="init" />
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
import { mapState } from 'vuex'
import { list, deleteById } from '@/api/mgr'
import { parseTime } from '@/utils/filter'
import serachSave from '@/mixins/search'

export default {
    name: 'Mgr',
    components: { search, addAsEdit, lock },
    mixins: [serachSave],

    data() {
        return {
            diaTitle: '新建Mgr月报',
            titles: [
                { type: 'selection' },
                { name: '地区', data: 'areaName' },
                { name: '提交时间', data: 'createTime', type: 'time', time: '{y}-{m}-{d}' },
                { name: '汇报标题', data: 'monthReportName' }

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
            tsUserInfo: {},
            param: {},
            mgrlist: null,
            type: 1
        }
    },
    computed: {
        ...mapState('user', ['token', 'userInfo'])
    },
    created() {
        this.getPageUserInfo()
    },
    methods: {
        init() {
            console.log('user info mgr', this.userInfo)
            this.searchData.periodId = this.userInfo.defaultPeriodId
            const data = {
                ...this.baseParams,
                ...this.searchData
            }
            console.log('init 参数', data)
            this.loadData(data)
        },
        getVal(v) {
            console.log(v)
            const { type } = v
            if (type === '编辑') {
                this.diaTitle = type
                this.edit(v)
            }
            if (type === '删除') {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.delete(v)
                    this.$message.success('删除成功!')
                }).catch(() => {
                    this.$message.info('已取消删除')
                })
            }
            if (type === '详情') {
                this.view(v)
                // this.$refs.lock.show()
            }
        },
        // 新建辅导记录
        add(data) {
            var formInline = {
                monthReportName: 'Ts-Force' + parseTime(new Date(), '{y}年{m}月份月报'),
                monthReportContent: '',
                areaId: this.tsUserInfo.areaId,
                areaName: this.tsUserInfo.areaName,

                month: parseTime(new Date(), '{m}'),
                year: parseTime(new Date(), '{y}'),
                periodId: this.userInfo.defaultPeriodId,
                realname: this.userInfo.realname,
                userId: this.userInfo.id,
                username: this.userInfo.username,
                monthReportDate: new Date()
            }
            this.type = 1
            this.$refs.addAsEdit.show(formInline)
        },
        // 进入页面首先加载的内容
        getPageUserInfo() {
            this.value = new Date()
            const params = {
                userId: this.userInfo.id
            }
            getUserInfo(params).then(res => {
                if (res.success) {
                    this.tsUserInfo = res.result[0]
                    this.tsUserInfo.realName = this.userInfo.realname
                    this.tsUserInfo.userId = this.userInfo.id
                    this.tsUserInfo.userName = this.userInfo.username
                    this.searchData = {
                        userId: this.userInfo.id,
                        month: parseTime(new Date(), '{m}'),
                        year: parseTime(new Date(), '{y}'),
                        periodId: this.userInfo.defaultPeriodId

                    }
                    this.init()
                } else {
                    this.$message.error({ title: '查询失败', content: res.message })
                }
            })
        },
        loadData(data) {
            list(data).then(res1 => {
                if (res1.success === true) {
                    this.mgrlist = res1.result.records
                    this.baseParams.total = res1.result.total
                    console.log('编辑mgmgrlistir月报', this.mgrlist)
                }
            })
        },
        edit(v) {
            console.log('编辑mgir月报', v)
            var formInline = {

                monthReportName: v.data.monthReportName,
                areaName: v.data.areaName,
                //  startTime: new Date(),
                realname: v.data.realname,
                id: v.data.id,
                monthReportContent: v.data.monthReportContent,
                monthReportDate: parseTime(new Date(v.data.year + '-' + v.data.month + '-' + '01'), '{y}-{m}-{d}')

            }
            this.type = 2
            this.$refs.addAsEdit.show(formInline)
        },
        view(v) {
            var formInline = {

                monthReportName: v.data.monthReportName,
                areaName: v.data.areaName,
                //  startTime: new Date(),
                realname: v.data.realname,
                id: v.data.id,
                monthReportContent: v.data.monthReportContent,
                monthReportDate: parseTime(new Date(v.data.year + '-' + v.data.month + '-' + '01'), '{y}-{m}-{d}')
            }
            this.type = 3
            this.$refs.addAsEdit.show(formInline)
        },
        delete(v) {
            deleteById({ id: v.data.id }).then(res => {
                this.init()
            })
        },
        change(data) {
            console.log('查询查询', data)
            this.searchData.month = parseTime(data.time, '{m}')
            this.searchData.year = parseTime(data.time, '{y}')
            this.init()
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
