<template>
  <div class="manager">
    <z-header title="研发经理月报" class="mb15" />

    <div class="box content">
      <search :user-id="userInfo.id" :type="1" @searche="search" @change="change" />
      <div>
        <el-button type="primary" class="ml20" @click="add">新建</el-button>
      </div>
      <!-- <div class="selectedTitle plr24 flc-y mt15 c-56 f14">
        已选择
        <span class="c-66f pl5 pr5"> 0 </span>项
        <span class="c-66f ml25 cursor">清空</span>
      </div> -->

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
    <addAsEdit ref="addAsEdit" :type="type" :areas="areas" :title="diaTitle" @ok="init" />
    <!-- 详情页面 -->
    <info ref="info" />
  </div>

</template>

<script>
import search from './search'
import addAsEdit from './addAsEdit'
import info from './info'
import datas from '@/assets/json/data'
import { getUserInfo } from '@/api/calendar'
import { mapState } from 'vuex'
import { completeForWarning } from '@/api/supwarning'
import { list, list1, eidt, deleteById } from '@/api/mgrMonthReport'
import { parseTime } from '@/utils/filter'
import serachSave from '@/mixins/search'

export default {
    name: 'Manager',
    components: { search, addAsEdit, info },
    mixins: [serachSave],
    computed: {
        ...mapState('user', ['token', 'userInfo'])
    },
    data() {
        return {
            diaTitle: '新建研发经理月报',
            titles: [
                // { type: 'selection' },
                { name: '序号', type: 'index' },
                { name: '组别', data: 'newGroupName' },
                { name: '提交时间', data: 'createTime', type: 'time', time: '{y}-{m}-{d}' },
                { name: '月报标题', data: 'monthReportName' }

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
            selectOrg: null,
            type: 1,
            areas: []
        }
    },
    watch: {
        selectOrg: {
            handler(val) {
                console.log('初始化查询----车出现----------xxxx', this.selectOrg)
                this.init()
            }
        }
    },
    created() {
        // this.init()
    },
    methods: {
        init() {
            console.log('user info mgr-------------->', this.userInfo)
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
                console.log('vvvvvvvvvvvv66666666666666v', v)
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
            }
        },
        // 新建月报记录
        add(data) {
            var formInline = {
                monthReportName: 'Ts-Force' + parseTime(new Date(), '{y}年{m}月份月报'),
                monthReportContent: '',
                month: parseTime(new Date(), '{m}'),
                year: parseTime(new Date(), '{y}'),
                periodId: this.userInfo.defaultPeriodId,
                realname: this.userInfo.realname,
                userId: this.userInfo.id,
                username: this.userInfo.username,
                status: '0',
                monthReportDate: new Date()
            }
            this.type = 1
            this.$refs.addAsEdit.show(formInline)
        },

        // 进入页面首先加载的内容

        loadData(data) {
            list1(data).then(res1 => {
                console.log('编辑经理查询结过月报', res1)
                if (res1.success === true) {
                    this.mgrlist = res1.result.records
                    this.mgrlist.forEach(val => {
                        val.newGroupName = val.areaName + ' ' + val.departName + ' ' + val.groupName
                    })
                    this.baseParams.total = res1.result.total
                }
            })
        },
        edit(v) {
            console.log('index-----------------月报', v)
            var data = v.data
            var formInline = {}
            Object.assign(formInline, data)
            formInline.newGroupName = v.data.areaName + '/' + v.data.departName + '/' + v.data.groupName
            this.type = 2
            this.$refs.addAsEdit.show(formInline, 2)
        },
        view(v) {
            var data = v.data
            var formInline = {}
            Object.assign(formInline, data)
            formInline.newGroupName = v.data.areaName + '/' + v.data.departName + '/' + v.data.groupName
            this.$refs.info.show(formInline)
        },
        delete(v) {
            deleteById({ id: v.data.id }).then(res => {
                this.init()
            })
        },
        change(data) {
            console.log('查询查询---------初始化-----', data)
            this.searchData.month = parseTime(data.time, '{m}')
            this.searchData.year = parseTime(data.time, '{y}')
            this.init()
        },
        search(selectorg, formInline, areas) {
            console.log('hello------------', selectorg, formInline, areas)
            this.selectOrg = selectorg
            this.searchData.groupId = this.selectOrg[2]
            this.areas = areas
            if (!(formInline.time === null || formInline.time === '')) {
                this.searchData.createTime = parseTime(formInline.time, '{y}-{m}-{d}')
            } else {
                this.searchData.createTime = null
            }

            this.init()
        }

    }
}
</script>

<style lang="scss" scoped>
.manager{
   .content{
       padding: 24px;
   }
   .selectedTitle{
        height: 48px;
        background: #F7F7FF;
   }
}
</style>
