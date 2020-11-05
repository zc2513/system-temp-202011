<template>
  <!-- 消息发布 -->
  <div class="hfull notification-cls">
    <z-header title="消息发布" />

    <div class="box mt15 content">
      <div v-if="!tableData.length" class="flcc" style="height:500px;">
        <div class="cursor" @click="addSave('add')">
          <z-circle size="120" color="#F4F7FA" class="mb20">
            <svg-icon icon-class="add" class="f30" style="color:#66f;" />
          </z-circle>
          <div class="t-c">添加通知</div>
        </div>
      </div>

      <div v-else>
        <search />
        <div class="mb15">
          <el-button type="primary" class="ml20" @click="addSave('add')">新建</el-button>
        </div>
        <el-table :data="tableData">
          <el-table-column prop="titile" label="标题" />
          <el-table-column prop="createBy" label="创建人" />
          <el-table-column prop="createTime" label="创建时间" />
          <el-table-column label="发布状态">
            <template slot-scope="{row}">
              <div>
                {{ row.sendStatus }} {{ row.sendStatus_dictText }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150">
            <template slot-scope="{row}">
              <el-button type="text" size="mini" @click="check(row)">查看</el-button>
              <el-button v-if="row.sendStatus==='0'" type="text" size="mini" @click="addSave('edit', row )">编辑</el-button>
              <el-button v-if="row.sendStatus==='0'" type="text" size="mini" @click="delItemMenu( row)">发布</el-button>
            </template>
          </el-table-column>
        </el-table>
        <z-page :total="total" />
      </div>
    </div>

    <add ref="add" />
  </div>
</template>

<script>
import search from './search'
import add from './add'

import { getList } from '@/api/notification'
import searchJs from '@/mixins/serch'
export default {
    name: 'Notification',
    components: { add, search },
    mixins: [searchJs],
    data() {
        return {

        }
    },
    created() {
        this.init()
    },
    methods: {
        init() {
            const data = {
                ...this.baseData,
                ...this.querySearch
            }
            getList(data).then(res => {
                const { total, records } = res.result
                this.total = total
                this.tableData = records
                console.log(records)
            })
        },
        addSave(type, data) {
            this.$refs.add.show(type, data)
        },
        check(row) { // 查看
            this.$router.push({
                path: 'info',
                query: {
                    id: row.id
                }
            })
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
