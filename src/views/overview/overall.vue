<template>
  <!-- 总体总览 -->
  <div class="overall">
    <echartLayout class="mt15" title="整体培养日程阶段展示图-北京">
      整体培养日程阶段展示图
    </echartLayout>
    <echartLayout class="mt15" title="应届生培训总人数">
      <div slot="title" class="ml15 f12" style="color:#5F6266;padding-top:3px;"> 更新时间：2020-09 07 12:09:57</div>
      应届生培训总人数
    </echartLayout>
  </div>
</template>

<script>
import echartLayout from './echartLayout'
export default {
    components: { echartLayout }
}
</script>

<style lang="scss" scoped>
.overall{
    .top{
        height: 415px;
    }
    .bottom{
        height: 518px;
    }
}

</style>
