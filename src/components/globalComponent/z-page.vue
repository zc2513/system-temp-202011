<template>
  <div class="block">
    <el-pagination
      :current-page="currentPage"
      :page-size="pageSize"
      :page-sizes="[10,20,50,100,200,500,1000]"
      layout="total ,sizes,prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
export default {
    props: {
        total: {
            type: Number,
            default: 0
        },
        pageSize: {
            type: Number,
            default: 10
        },
        currentPage: {
            type: Number,
            default: 1
        }
    },
    methods: {
        handleCurrentChange(val) {
            console.log('当前页：', val)
            this.$emit('pagesend', val)
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`)
            this.$emit('pagesizes', val)
        }
    }
}
</script>

<style scoped>
    .block{
        text-align: right;
    }
</style>
