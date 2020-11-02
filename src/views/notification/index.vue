<template>
  <!-- 通知管理 -->
  <div class="hfull notification-cls">
    <z-header title="通知管理" />

    <div class="box mt15 content">
      <div v-if="!tableData.length" class="flcc" style="height:500px;">
        <div class="cursor" @click="addSave">
          <z-circle size="120" color="#F4F7FA" class="mb20">
            <svg-icon icon-class="add" class="f30" style="color:#66f;" />
          </z-circle>
          <div class="t-c">添加通知</div>
        </div>
      </div>

      <div v-else>
        <search />
        <div>
          <el-button type="primary" class="ml20" @click="addSave">新建</el-button>
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
    </div>

    <add ref="add" />
  </div>
</template>

<script>
import search from './search'
import add from './add'
import datas from '@/assets/json/data'
export default {
    name: 'Notification',
    components: { add, search },
    data() {
        return {
            tableData: [1],
            titles: [
                { type: 'selection' },
                { name: '工号', data: 'stateCode' },
                { name: '应届生姓名', data: 'producer' },
                { name: '辅导时间', data: 'lastUpdateTime', type: 'time', time: '{y}-{m}-{d}' },
                { name: '发布状态', data: 'producer' }
            ],
            btn: {
                title: '操作',
                btnlist: [
                    { con: '查看', type: 'text' },
                    { con: '编辑', type: 'text' },
                    { con: '删除', type: 'text', style: { color: '#FF5633' }}
                ]
            }
        }
    },
    created() {
        this.init()
    },
    methods: {
        init(type) {
            if (type) {
                this.tableData = datas.slice(0, 1)
            }
            // 拉取页面初始化数据
        },
        addSave() {
            this.$refs.add.show()
        },
        getVal(v) {
            const { type } = v
            if (type === '编辑') {
                //
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
            if (type === '查看') {
                //
                this.$router.push({
                    path: 'info'
                })
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.notification-cls{
    .content{
        padding: 24px;
        margin-bottom: 20px;
        min-height: calc(100% - 110px);
    }
    .selectedTitle{
        height: 48px;
        background: #F7F7FF;
    }
}
</style>
