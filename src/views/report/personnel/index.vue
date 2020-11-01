<template>
  <!-- 人员状态 -->
  <div class="coach">
    <z-header title="人员状态" class="mb15 bold" />
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
export default {
    name: 'Mgr',
    components: { search, edit, lock },
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
