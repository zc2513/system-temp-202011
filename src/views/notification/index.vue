<template>
  <div class="hfull notification-cls">
    <z-header title="通知管理" />
    <div class="box mt15 main">
      <div class="flcc" style="height:80%;">
        <div class="cursor">
          <z-circle size="120" color="#F4F7FA" class="mb20">
            <svg-icon icon-class="add" class="f30" style="color:#66f;" />
          </z-circle>
          <div class="t-c">添加通知</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'Notification'
}
</script>

<style lang="scss" scoped>
.notification-cls{
    .main{
        height: calc(100% - 110px);
    }
}
</style>
