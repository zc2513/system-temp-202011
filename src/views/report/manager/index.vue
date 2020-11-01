<template>
  <div class="manager">
    <z-header title="研发经理月报" class="mb15" />

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
    <info ref="info" />
  </div>

</template>

<script>
import search from './search'
import addAsEdit from './addAsEdit'
import info from './info'
import datas from '@/assets/json/data'
export default {
    name: 'Manager',
    components: { search, addAsEdit, info },
    data() {
        return {
            diaTitle: '新建应届生培养月报',
            titles: [
                { type: 'selection' },
                { name: '月报标题', data: 'producer' },
                { name: '组别', data: 'producer' },
                { name: '提交时间', data: 'lastUpdateTime', type: 'time', time: '{y}-{m}-{d}' }
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
                this.$refs.info.show()
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
