<template>
  <!-- 消息查看 -->
  <div class="hfull notification-cls">
    <z-header title="消息查看" />

    <div class="box mt15 content">
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
            tableData: [],
            titles: [
                { name: '标题', data: 'stateCode' },
                { name: '发布人', data: 'producer' },
                { name: '发布时间', data: 'lastUpdateTime', type: 'time', time: '{y}-{m}-{d}' },
                { name: '阅读状态', data: 'producer' }
            ],
            btn: {
                title: '操作',
                btnlist: [
                    { con: '查看', type: 'text' }
                ]
            }
        }
    },
    created() {
        this.init()
    },
    methods: {
        init(type) {
            this.tableData = datas.slice(0, 1)
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
