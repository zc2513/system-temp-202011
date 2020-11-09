<template>
  <!-- 人员状态 -->
  <div class="coach">
    <z-header title="人员状态填报" class="mb15 bold" />
    <div class="box content">
      <search :user-id="userInfo.id" :type="1" @searche="search" @change="change" />
      <z-table
        :titles="titles"
        :btns="btn"
        :lists="stus"
        align="left"
        class="mt15"
        @sendVal="getVal"
      />
    </div>
    <z-page :total="baseParams.total" :page-size="baseParams.pageSize" :current-page="baseParams.pageNo" @pagesend="getPageData" @pagesizes="pagesizes" />

    <!-- 新增编辑页面 -->
    <edit ref="edit" :title="diaTitle" @ok="init" />
    <!-- 详情页面 -->
    <lock ref="lock" />
  </div>
</template>

<script>

import search from './search'
import edit from './edit'
import lock from './lock'
import datas from '@/assets/json/data'
import serachSave from '@/mixins/search'
import { list } from '@/api/studentState'

import { mapState } from 'vuex'

export default {
    name: 'Hr',
    components: { search, edit, lock },
    mixins: [serachSave],
    data() {
        return {
            diaTitle: '新建辅导记录',
            titles: [
                { name: '工号', data: 'username' },
                { name: '姓名', data: 'realname' },
                { name: '组别', data: 'groupName' },
                { name: '状态', data: 'status' }
            ],
            tableData: datas.slice(0, 8),
            selectOrg: null,
            stus: [],
            btn: {
                title: '操作',
                btnlist: [
                    { con: '编辑', type: 'text' }
                ]
            }
        }
    },
    computed: {
        ...mapState('user', ['token', 'userInfo'])
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
    },
    methods: {
        getVal(v) {
            console.log(v)
            const { type } = v
            if (type === '编辑') {
                this.edit(v)
            }
            if (type === '删除') {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message.success('删除成功!')
                }).catch(() => {
                    this.$message.info('已取消删除')
                })
            }
            if (type === '详情') {
                this.$refs.lock.show()
            }
        },
        init() {
            const data = {
                ...this.baseParams,
                ...this.searchData
            }

            console.log('查询条件--------》', data)
            this.loadData(data)
        },

        loadData(data) {
            list(data).then(res1 => {
                console.log('人员清单', res1)
                if (res1.success === true) {
                    this.stus = res1.result.records
                    // this.stus.forEach(val => {
                    //     val.newGroupName = val.areaName + ' ' + val.departName + ' ' + val.groupName
                    // })
                    this.baseParams.total = res1.result.total
                }
            })
        },
        edit(v) {
            console.log('index-----------------月报', v)
            var data = v.data
            var formInline = {}
            Object.assign(formInline, data)
            // formInline.newGroupName = v.data.areaName + '/' + v.data.departName + '/' + v.data.groupName
            this.type = 2
            this.$refs.edit.show(formInline, 2)
        },
        change(data) {
            console.log('查询查询---------初始化-----', data)

            this.init()
        },
        search(selectorg, formInline, areas) {
            console.log('hello------------', selectorg, formInline, areas)
            this.selectOrg = selectorg
            this.searchData.groupId = this.selectOrg[2]
            this.areas = areas

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
}
</style>
