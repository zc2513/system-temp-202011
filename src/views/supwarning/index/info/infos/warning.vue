<template>
  <div>
    <div v-if="listsData" class="content-box">
      <p class="tit f12 mb5"><i class="el-icon-info mr10 ml10" style="color:#e63538;" />当前存在 <em>{{ listsData.Total }}</em>  条预警</p>
      <z-table :titles="titles" border :btns="btn" :lists="listsData.Data" @sendVal="getVal" />
    </div>
  </div>
</template>

<script>
import { ignoreForWarning, completeForWarning } from '@/api/supwarning'
export default {
    props: {
        listsData: {
            type: Object,
            default: _ => {}
        }
    },
    data() {
        return {
            warningNum: 0,
            titles: [
                { name: '序号', type: 'index' },
                { name: '监督节点', data: 'NodeName' },
                { name: '检查内容', data: 'CheckContentName' },
                { name: '预警说明', data: 'Remark' },
                { name: '预警级别', data: 'warns', type: 'light' },
                { name: '预警时间', data: 'SWarnTime' },
                { name: '处理状态', data: 'DoneState' }
            ],
            btn: {
                title: '操作',
                width: 130,
                btnlist: [
                    { con: '忽略', type: 'text' },
                    { con: '下达指令', type: 'text' },
                    { con: '标记完成', type: 'text' }
                ]
            }
        }
    },
    methods: {
        getVal(val) {
            if (val.type === '忽略') {
                this.$confirm('确定忽略当前预警?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    ignoreForWarning({ warningId: val.data.SId }).then(res => {
                        if (res.Code === '200') {
                            this.$message({
                                type: 'success',
                                message: '忽略成功!'
                            })
                            for (const item of this.listsData.Data) {
                                if (item === val.data) {
                                    this.$set(item, 'DoneState', '已忽略')
                                    this.$set(item.warns[0], 'type', 'b')
                                }
                            }
                        }
                    })
                }).catch(() => {
                })
            } else if (val.type === '标记完成') {
                this.$confirm('确定将当前预警标记为完成状态?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    completeForWarning({ warningId: val.data.SId }).then(res => {
                        if (res.Code === '200') {
                            this.$message({
                                type: 'success',
                                message: '标记完成!'
                            })
                            for (const item of this.listsData.Data) {
                                if (item === val.data) {
                                    this.$set(item, 'DoneState', '标记完成')
                                    this.$set(item.warns[0], 'type', 'b')
                                }
                            }
                        }
                    })
                }).catch(() => {
                })
            } else if (val.type === '下达指令') {
                this.$message({
                    type: 'success',
                    message: '功能待开发!'
                })
            } else if (val.type === '行') {
                this.$parent.firstdata = {
                    code: val.data.CheckContentCode,
                    warningIds: [val.data.SId]
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.content-box{
    margin-top: 10px;
    // width: 94%;
    // margin: 0 auto;
    .tit{
        color: #333;
        width: 100%;
        line-height: 38px;
        height: 38px;
        background: inherit;
        background-color: #fbdcdc;
        box-sizing: border-box;
        border-radius: 0px;
        -moz-box-shadow: none;
        -webkit-box-shadow: none;
        box-shadow: none;
        em{
            font-style: normal;
            color:$red;
        }
    }

    ::v-deep{
        .el-table thead tr th{
            background-color: #ecf0f4;
        }
        .el-table td, .el-table th.is-leaf,.el-table--border, .el-table--group{
            border-color: #dadfde;
        }
        .el-table--border::after, .el-table--group::after, .el-table::before{
            background-color: #dadfde;
        }
    }
}
@import '@/styles/views/listLayout.scss';
</style>
