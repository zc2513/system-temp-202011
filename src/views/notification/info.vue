<template>
  <div class="fullScreen-layout">
    详情页面

    <div>
      <el-button type="primary" @click="$router.go(-1)">返回</el-button>
    </div>
  </div>
</template>

<script>
export default {
    name: 'NotificationInfo',
    created() {
        this.$store.dispatch('app/toggleLeft', 0)
    },
    beforeDestroy() {
        this.$store.dispatch('app/toggleLeft', 1)
    },
    methods: {
    }
}
</script>

<style lang="scss" scoped>
.fullScreen-layout{

}
</style>
