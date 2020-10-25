<template>
  <div class="loginlayut green fl-y-sb">
    <div class="loginlayut-top flcc"> 人材培养管理系统 </div>
    <div class="fl1 fle">
      <div class="loginlayut-module flcc">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
</script>
<style lang="scss" scoped>
.loginlayut{
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: url('../../assets/imgs/login/login.png') no-repeat;
    background-size: cover;
    &-top{
        height: 56px;
        margin-top: 64px;
        font-size:40px;
        font-weight: 600;
        color: #FFF;
    }
    &-module{
        width: 50%;
        min-width: 400px;
        min-height: 500px;
    }
}
</style>
