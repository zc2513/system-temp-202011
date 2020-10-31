<!-- 详情小标题（带左侧竖线） -->
<template>
  <div class="student-info box">
    <div class="small-title flc-y">
      <div class="f18 small-title-text">{{ title }}</div>
    </div>
    <div class="pl25 pr25">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
    name: 'SmallTitle',
    props: {
        title: {
            type: String,
            default: '技能类型'
        }
    }
}
</script>

<style lang="scss" scoped>
.small-title{
    height: 56px;
    background: #FFFFFF;
    border-radius: 10px;
    &-text{
        padding: 0 24px;
        border-left: 4px solid #66f;
    }
}
</style>
