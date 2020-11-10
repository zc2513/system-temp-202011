<template>
  <!-- 表格布局框 -->
  <div class="box echarts-box fl-y-sb" :style="{height:height+'px'}">
    <h4 v-if="showTitle" class="f16 flc-y ">
      {{ title }} <slot name="title" />
    </h4>
    <div class="fl1 content">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
    name: 'EchartLyout',
    props: {
        title: {
            type: String,
            default: 'echarts图标题'
        },
        height: {
            type: [String, Number],
            default: 415
        },
        showTitle: {
            type: Boolean,
            default: true
        },
        flot: { // 是否定位标题
            type: Boolean,
            default: false
        }

    }
}
</script>

<style lang="scss" scoped>
.echarts-box{//整体培养日程
    padding: 40px 24px 0;
    h4{
        height: 22px;
        color: #303133;
    }
    .content{
        position: relative;
    }
}
</style>
