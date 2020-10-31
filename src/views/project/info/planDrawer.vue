
<template>
  <!-- 计划抽屉 -->
  <el-drawer
    :title="title"
    :visible.sync="drawer"
    class="drawer-box"
    size="640px"
  >
    <smallTitle title-left="12" title="基本信息">
      <div class="flc-y drawer-base f14">
        <div class="c-5f">应届生</div>
        <div class="ml15">张三</div>
      </div>
      <div class="flc-y drawer-base f14">
        <div class="c-5f">计划类型</div>
        <div class="ml15">自定义计划</div>
      </div>
      <div class="flc-y drawer-base f14">
        <div class="c-5f">计划时间</div>
        <div class="ml15">2020年10月23日～2020年12月30日</div>
      </div>
    </smallTitle>

    <smallTitle title-left="12" class="mt30" title="技能类型">
      <div class="skill-tag">
        <el-tag class="mr15 c-5f" size="medium" effect="plain">标签一</el-tag>
        <el-tag class="mr15 c-5f" size="medium" effect="plain">标签一</el-tag>
        <el-tag class="mr15 c-5f" size="medium" effect="plain">标签一</el-tag>
      </div>
    </smallTitle>

    <smallTitle title-left="12" class="mt30" title="计划详情" />
    <div>
      <h4 class="t-c f20 mt20">我是标题标题标题</h4>
      <div class="c-5f f14 mt25" style="line-height:24px;">
        <div>(1)目标。这是计划的灵魂。计划就是为了完成一定任务而制订的。目标是计划产生的导因，也是计划奋斗方向。因此，计划应根据需要与可能，规定出在一定时间内所完成的任务和应达到的要求。任务和要求应该具体明确，有的还要定出数量、质量和时间要求。</div>
        <div>(2)措施。要明确何时实现目标和完成任务，就必须制定出相应的措施和办法，这是实现计划的保证。措施和方法主要指达到既定目标需要采取什么手段，动员哪些力量，创造什么条件，排除哪些困难等。总之，要根据客观条件，统筹安排，将“怎么做”写得明确具体，切实可行。</div>
        <div>(1)步骤。这是指执行计划的工作程序和时间安排。每项任务，在完成过程中都有阶段性，而每个阶段又有许多环节，它们之间常常是互相交错的。因此，订计划必须胸有全局，妥善安排，哪些先干，哪些后干，应合理安排。</div>
        <div>(2)目标。这是计划的灵魂。计划就是为了完成一定任务而制订的。目标是计划产生的导因，也是计划奋斗方向。因此，计划应根据需要与可能，规定出在一定时间内所完成的任务和应达到的要求。任务和要求应该具体明确，有的还要定出数量、质量和时间要求。</div>
      </div>
    </div>
  </el-drawer>
</template>

<script>
import smallTitle from './smallTitle'
export default {
    name: 'PlankDrawer',
    components: { smallTitle },
    data() {
        return {
            drawer: true,
            title: '计划1'
        }
    }
}
</script>
<style lang='scss' scoped>
.drawer-box{
    ::v-deep{
        .el-drawer__header{
            height: 54px;
            padding: 0 24px;
            border-bottom: 1px solid #e0e4eb;
            margin: 0;
        }
        .el-drawer__body{
            padding: 32px 24px 24px;
            overflow-y: auto;
        }
    }
    .drawer-base{
        color: #303133;
         margin-bottom: 16px;
        >div:first-of-type{
            width: 60px;
        }
    }
    .skill-tag {
        .el-tag{
            background: #F4F7FA;
            border-radius: 4px;
            color: #5F6266;
            border: 0;
        }
    }
}
</style>
