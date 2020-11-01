<!-- 详情小标题（带左侧竖线） -->
<template>
  <div class="student-info box">
    <div class="small-title flc-y">
      <div class="f18 small-title-text fl" :style="{padding:`0 ${titleLeft}px`}">
        {{ title }}
        <slot name="addTitle" />
      </div>
    </div>
    <div :style="{padding:`0 ${Number(titleLeft)+4}px`}">
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
        },
        titleLeft: {
            type: [String, Number],
            default: 24
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
        border-left: 4px solid #66f;
    }
}
</style>
