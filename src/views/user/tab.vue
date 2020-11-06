<template>
  <div class="login-tab">
    <h4 class="flcc">系统选择</h4>
    <div class="online left  " @click="goToTab(1)" />
    <div class="online right  " @click="goToTab(2)" />
  </div>
</template>

<script>

// 目前缺少自动跳转与类型选择接口
export default {
    name: 'LoginTab',
    methods: {
        goToTab(id) {
            if (id === 1) {
                const loading = this.$loading({
                    lock: true,
                    text: '应届生培养管理系统数据加载中,请稍等...',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                })
                setTimeout(() => {
                    this.$router.push({
                        path: '/overview'
                    })
                    loading.close()
                }, 2000)
            } else {
                this.$message('暂无在线系统')
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.login-tab{
    width: 420px;
    height: 500px;
    color: #FFF;
    h4{
        font-size: 32px;
        font-family: Helvetica;
        font-weight: 400;
    }
    .online{
        margin-top: 30px;
        width: 420px;
        height: 200px;
        cursor: pointer;
        &.left{ background: url('../../assets/imgs/login/thisyear.png') no-repeat center center; }
        &.right{ background: url('../../assets/imgs/login/online.png') no-repeat center center; }
        &:hover{ transform: scale(1.1);}
    }
}

</style>
