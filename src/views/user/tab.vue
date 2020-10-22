<template>
  <div class="login-tab">
    <h4 class="flcc">系统选择</h4>
    <div class="online left  " @click="goToTab(1)" />
    <div class="online right  " @click="goToTab(2)" />
  </div>
</template>

<script>
export default {
    name: 'Tab',
    methods: {
        goToTab(id) {
            this.$router.push({
                path: '/login/index',
                query: { id }
            })
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
