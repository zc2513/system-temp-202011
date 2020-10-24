
<template>
  <div class="list-box">
    路由维护/页面权限 ------------
    <div class="fle mb10">
      <el-button
        size="mini"
        type="primary"
        class="mr20"
        @click="addOrEdit(1)"
      >新增</el-button>
    </div>
    <div class="content-box">
      <el-table
        :data="tableData"
        style="width: 100%;margin-bottom: 20px;"
        row-key="id"
        align="center"
        default-expand-all
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      >
        <el-table-column prop="meta.title" label="菜单名称" width="130px" />
        <el-table-column prop="component" label="前端组件" />
        <el-table-column prop="path" label="菜单路径" />
        <el-table-column prop="name" label="缓存名称" />
        <el-table-column prop="hidden" label="是否隐藏" :formatter="formatter" />
        <el-table-column prop="alwaysShow" label="是否始终显示" :formatter="formatter" />
        <el-table-column prop="redirect" label="重定向" />
        <el-table-column prop="meta.icon" label="菜单图标" />
        <el-table-column prop="meta.roles" label="按钮权限" />
        <el-table-column prop="meta.noCache" label="是否缓存" :formatter="formatter" />
        <el-table-column prop="meta.breadcrumb" label="是否在面包屑中显示" :formatter="formatter" />
        <el-table-column prop="meta.activeMenu" label="高亮显示项" />
        <el-table-column prop="meta.affix" label="固定标签" :formatter="formatter" />
        <el-table-column align="right" label="操作" width="150px">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="addOrEdit(2,scope.$index, scope.row)"
            >编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button>
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
        },
        formatter(row) {
            if (row.state === true) {
                return '是'
            } else {
                return '否'
            }
        },
        addOrEdit(type, row) {
            this.$refs.drawer.openDrawer(type, row, this.tableData)
        }
    }
}
</script>

<style lang="scss" scoped>
@import "@/styles/views/listLayout.scss";
::v-deep .el-drawer__header {
    border-bottom: 1px solid #e8e8e8 !important;
    padding: 10px 20px !important;
    margin-bottom: 0;
}
::v-deep .tablescope {
    .el-switch__label--left {
        position: relative;
        left: 50px;
        color: #fff;
        z-index: -1111;
    }
    .el-switch__core {
        width: 50px !important;
    }
    .el-switch__label--right {
        position: relative;
        right: 50px;
        color: #fff;
        z-index: -1111;
    }
    .el-switch__label--right.is-active {
        z-index: 1111;
        color: #fff !important;
    }
    .el-switch__label--left.is-active {
        z-index: 1111;
        color: #fff !important;
    }
}

::v-deep :focus {
    outline: 0;
}
.el-form-wrapper {
    padding: 10px;
    .el-form {
        border: 1px solid rgb(233, 233, 233);
        padding: 15px 15px 15px 0;
    }
}
</style>
