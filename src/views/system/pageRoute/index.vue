
<template>
  <div class="list-box">
    菜单管理 ------------
    <div class="fle mb10">
      <el-button size="mini" type="primary" class="mr20" @click="addOrEdit(1)">新增</el-button>
    </div>
    <div class="content-box">
      <el-table
        :data="tableData"
        row-key="path"
        border
        :tree-props="{children: 'children', hasChildren: true}"
      >
        <el-table-column align="left" prop="meta.title" label="菜单名称" />
        <el-table-column align="center" prop="meta.icon" label="菜单图标" />
        <el-table-column align="center" prop="path" label="菜单路径" />
        <el-table-column align="center" prop="hidden" label="是否隐藏" :formatter="formatter" />
        <el-table-column align="center" prop="alwaysShow" label="是否始终显示" :formatter="formatter" />
        <el-table-column align="center" prop="meta.noCache" label="是否缓存" :formatter="formatter" />
        <el-table-column align="center" prop="meta.breadcrumb" label="是否在面包屑中显示" :formatter="formatter" />
        <el-table-column align="center" prop="meta.affix" label="固定标签" :formatter="formatter" />
        <el-table-column align="center" label="操作" width="150">
          <template slot-scope="scope">
            <el-button size="mini" @click="addOrEdit(2,scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <z-page
        :total="200"
        :page-size="baseParams.size"
        :current-page="baseParams.page"
        @pagesend="getPageData"
        @pagesizes="pagesizes"
      />
    </div>
    <drawer ref="drawer" />

  </div>
</template>

<script>
import search from '@/mixins/search'
import menuList from '@/api/syncRouters'
import drawer from './drawer'
export default {
    name: 'PageRoute',
    components: { drawer },
    mixins: [search],
    data() {
        return {
            tableData: menuList
        }
    },
    watch: {
        tableData(newValue) {
            this.$nextTick(() => {
                this.$s.setStorage('router', newValue)
            })
        }
    },
    created() {
        this.init()
    },
    mounted() {
        if (this.$s.getStorage('router')) {
            console.log(this.$s.getStorage('router'))
            this.tableData = this.$s.getStorage('router')
        }
    },
    methods: {
        init() {
            this.tableData = menuList
            console.log(this.tableData, 666666)
        },
        formatter(row) {
            return row.state ? '是' : '否'
        },
        addOrEdit(type, row) {
            this.$refs.drawer.openDrawer(type, row, this.tableData)
        }
    }
}
</script>

<style lang="scss" scoped>
@import "@/styles/views/listLayout.scss";
</style>
