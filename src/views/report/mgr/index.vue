<template>
  <!-- Mgr月报 -->
  <div class="coach">
    <z-header title="辅导记录" class="mb15 bold" />
    <div class="box content">
      <search />
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
    <addAsEdit ref="addAsEdit" :title="diaTitle" />
    <!-- 详情页面 -->
    <lock ref="lock" />
  </div>
</template>

<script>

import search from './search'
import addAsEdit from './addAsEdit'
import lock from './lock'
import datas from '@/assets/json/data'
export default {
    name: 'Mgr',
    components: { search, addAsEdit, lock },
    data() {
        return {
            diaTitle: '新建辅导记录',
            titles: [
                { type: 'selection' },
                { name: '工号', data: 'stateCode' },
                { name: '应届生姓名', data: 'producer' },
                { name: '组别', data: 'producer' },
                { name: '辅导时间', data: 'lastUpdateTime', type: 'time', time: '{y}-{m}-{d}' }
            ],
            tableData: datas.slice(0, 8),
            btn: {
                title: '操作',
                btnlist: [
                    { con: '详情', type: 'text' },
                    { con: '编辑', type: 'text' },
                    { con: '删除', type: 'text', style: { color: '#FF5633' }}
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
            this.$refs.addAsEdit.show(data)
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
