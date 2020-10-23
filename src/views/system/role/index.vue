<template>
  <div class="list-box">
    <search @sendSearch="getSearchData" />
    <div class="content-box mt10">
      <div class="fle mb10">
        <el-button size="mini" type="primary" class="mr20" @click="openAddOrEdit(1)">新增</el-button>
      </div>
      <el-table :data="tableData" stripe highlight-current-row class="mb20">
        <el-table-column label="序号" type="index" align="center" />
        <el-table-column label="角色名称" prop="RoleName" align="center" />
        <el-table-column label="角色描述" prop="Remark" align="center" />
        <el-table-column label="启用/禁用" align="center">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.IsEnable" active-color="#409EFF" inactive-color="#ccc" @change="isUse(scope.row)" />
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="openAddOrEdit(2, scope.row)">修改</el-button>
            <el-button size="mini" type="primary" @click="setRoles(scope.row)">权限设置</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <z-page :total="total" :page-size="baseParams.size" :current-page="baseParams.page" @pagesend="getPageData" @pagesizes="pagesizes" />
    </div>
    <addFrom ref="roleFormDialog" />
    <rightsTree ref="rightsTree" />
  </div>
</template>

<script>
import addFrom from './add'
import rightsTree from './rightsTree'
import search from './search'
import searchQuery from '@/mixins/search'
import roleList from '@/api/roleList'
// enableCheckItem
// import { getRoleList, deleteRoleByIds } from '@/api/roles'
export default {
    name: 'Role',
    components: { addFrom, search, rightsTree },
    mixins: [searchQuery],
    data() {
        return {
            tableData: [],
            value: false,
            dialogVisible: false
        }
    },
    created() {
        this.initList()
    },
    methods: {
        // 更新列表
        initList() {
            this.tableData = roleList
            // const data = { ...this.baseParams, ...this.searchData }
            // getRoleList(data).then((res) => {
            //     const { Total, Data } = res.Data
            //     this.tableData = Data
            //     this.total = Total
            // })
        },
        // 打开新增或修改弹框
        openAddOrEdit(type, row) {
            this.$refs.roleFormDialog.open(type, row)
        },
        // 启用和禁用
        isUse(row) {
            console.log(row)
            // 调用修改状态接口，提交修改的状态
            // enableCheckItem({ id: row.id, isEnable: row.IsEnable })
        },
        // 删除角色
        handleDelete(row) {
            console.log(row.id)

            // deleteRoleByIds({ Id: row.id }).then((res) => {
            //     if (res.data.msg !== 200) return false
            //     this.$message.success(res.data.msg)
            // })
        },
        setRoles(row) {
            this.$refs.rightsTree.showSetRights(row)
        }
    }
}
</script>

<style lang="scss" scoped>
 @import '@/styles/views/listLayout.scss';
</style>
