
<template>
  <!-- 常用标题定义 -->
  <div class="header-layout box">
    <div class="header-title flc-y">
      <slot name="title">{{ title }}</slot>
    </div>
    <div>
      <slot />
    </div>
  </div>
</template>

<script>
export default {
    name: 'ZHeader',
    props: {
        title: {
            type: String,
            default: '研发经理月报'
        }
    }
}
</script>

<style lang="scss" scoped>
.header-layout{
    padding: 0 24px;
    .header-title{
        font-weight: 500;
        height: 70px;
        color: #303133;
    }
}
</style>
