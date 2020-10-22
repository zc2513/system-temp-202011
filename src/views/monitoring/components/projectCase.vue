<!-- 项目执行情况 -->
<template>
  <div class="projectCase">
    <table class="wfull">
      <tr>
        <td />
        <td>未开始</td>
        <td>进行中</td>
        <td>已完成</td>
      </tr>
      <tr>
        <td>总 数 量</td>
        <td>{{ SectionProgress.NoStartCount }}</td>
        <td>{{ SectionProgress.GoingCount }}</td>
        <td>{{ SectionProgress.FinishCount }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
// 导入
// import xx from 'path;

export default {
    // 组件
    components: {},
    data() {
        return {}
    },
    computed: {},
    watch: {},
    // 创建完成
    created() {},
    // 挂载完成
    mounted() {},
    methods: {}
}
</script>
<style scoped>
</style>
