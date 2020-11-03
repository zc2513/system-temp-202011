
<template>
  <!-- 常用标题定义 -->
  <div class="header-layout box">
    <div class="header-title flc-y" :class="{'isLine':isLine}">
      <slot name="title">{{ title }}</slot>
    </div>
    <div class="con">
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
        },
        isLine: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style lang="scss" scoped>
.header-layout{
    padding: 1px;
    .con{
        padding: 0 24px;
    }
    .header-title{
        padding: 0 24px;
        font-weight: 500;
        height: 70px;
        color: #303133;
        &.isLine{
            border-bottom: 1px solid #f4f7fa;
        }
    }
}
</style>
