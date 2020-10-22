<template>
  <div class="overall-box" style="padding:30px;">
    列表页面 // 全局抛出样式测试
    <el-button type="success" size="mini" @click="$router.push('/nested/menu3/info')">详情</el-button>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.overall-box{
    background: $light-blue;
}
</style>
