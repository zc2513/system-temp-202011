<template>
  <div class="list-box">
    角色管理666
    <div class="fle mb10">
      <el-button size="mini" type="primary" class="mr20" @click="addRole">新增</el-button>
    </div>
    <div class="content-box">
      <el-table :data="tableData" stripe highlight-current-row class="mb20">
        <el-table-column label="序号" type="index" align="center" />
        <el-table-column label="角色名称" align="center">
          <template slot-scope="{row}">
            <span style="margin-left: 10px">{{ row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="角色描述" align="center">
          <template slot-scope="{row}">
            {{ row.remake }}
          </template>
        </el-table-column>
        <el-table-column label="启用/禁用" align="center">
          <template slot-scope="{row}">
            <el-switch v-model="row.isUse" active-color="#409EFF" inactive-color="#ccc" @click="isUse(row)" />
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
            <el-button size="mini" type="primary" @click="setRoles(scope.$index, scope.row)">权限设置</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <z-page :total="200" :page-size="baseParams.size" :current-page="baseParams.page" @pagesend="getPageData" @pagesizes="pagesizes" />
    </div>
    <el-dialog title="新增角色" width="500px" :visible.sync="dialogVisible">
      <addFrom />
    </el-dialog>

  </div>
</template>

<script>
import addFrom from './add'
export default {
    name: 'Role',
    components: { addFrom },
    data() {
        return {
            baseParams: {
                page: 1,
                size: 10
            },
            value: false,
            dialogVisible: false,
            tableData: [{
                name: '超级管理员',
                remake: '拥有所有权限',
                isUse: true
            }, {
                name: '管理员',
                remake: '拥有部分功能',
                isUse: false
            }]
        }
    },
    methods: {
        isUse(val) {
            console.log(val)
        },
        handleEdit(index, row) {
            console.log(index, row)
        },
        handleDelete(index, row) {
            console.log(index, row)
        },
        addRole() { // 新增角色
            this.dialogVisible = true
        },
        getPageData(page) {
            this.baseParams.page = page
        },
        pagesizes(size) {
            this.baseParams.page = 1
            this.baseParams.size = size
        },
        setRoles(index, row) {
            console.log('设置权限')
        }
    }
}
</script>

<style lang="scss" scoped>
 @import '@/styles/views/listLayout.scss';
</style>
