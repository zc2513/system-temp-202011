<template>
  <div>
    <svg-icon icon-class="warning" class="f27" style="color:#F00;" />
    <search @search="querySearch" />
    <z-table @sendVal="getVal">
      <el-table-column label="插槽进入" align="center">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.total }}</span>
        </template>
      </el-table-column>
    </z-table>
    <z-page
      :total="200"
      :page-size="baseParams.size"
      :current-page="baseParams.page"
      @pagesend="getPageData"
      @pagesizes="pagesizes"
    />
  </div>
</template>
<script>
import search from './search'
export default {
    components: { search },
    data() {
        return {
            baseParams: { // 基础数据
                page: 1,
                size: 10
            },
            search: {// 查询条件

            }
        }
    },
    created() {
        this.init()
    },
    methods: {
        init(type) {
            // type 额外参数类型判断
            // 数据拼接使用解构或者watch+computed 进行
            const data = { ...this.baseParams, ...this.search }
            console.log('查询条件:', data)
        },
        getVal(val) {
            console.log(val)
        },
        getPageData(page) {
            this.baseParams.page = page
            // this.init()
        },
        pagesizes(size) {
            this.baseParams.page = 1
            this.baseParams.size = size
            // this.init()
        },
        querySearch(e) { // 搜索条件
            this.search = e
            // this.init()
        }
    }
}
</script>
