<template>
  <!-- 人员状态 -->
  <div class="coach">
    <z-header title="人员状态填报" class="mb15 bold" />
    <div class="box content">
      <search />
      <z-table
        :titles="titles"
        :btns="btn"
        :lists="tableData"
        align="left"
        class="mt15"
        @sendVal="getVal"
      />
    </div>
    <z-page :total="tableData.length" :page-size="baseParams.pageSize" :current-page="baseParams.pageNo" @pagesend="getPageData" @pagesizes="pagesizes" />

    <!-- 新增编辑页面 -->
    <edit ref="edit" :title="diaTitle" />
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

export default {
    name: 'Hr',
    components: { search, edit, lock },
    mixins: [serachSave],
    data() {
        return {
            diaTitle: '新建辅导记录',
            titles: [
                { name: '工号', data: 'stateCode' },
                { name: '姓名', data: 'producer' },
                { name: '组别', data: 'organizationName' },
                { name: '状态', data: 'orderSource' }
            ],
            tableData: datas.slice(0, 8),
            btn: {
                title: '操作',
                btnlist: [
                    { con: '编辑', type: 'text' }
                ]
            }
        }
    },

    created() {
        this.init()
    },
    methods: {
        getVal(v) {
            console.log(v)
            const { type } = v
            if (type === '编辑') {
                this.diaTitle = type
                this.addCoach('编辑')
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
            this.searchData.periodId = this.userInfo.defaultPeriodId
            const data = {
                ...this.baseParams,
                ...this.searchData
            }

            console.log('查询条件--------》', data)
        },

        // 新建辅导记录
        addCoach(data) {
            this.$refs.edit.show(data)
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
