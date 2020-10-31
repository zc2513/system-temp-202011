
<template>
  <!-- 计划抽屉 -->
  <el-drawer
    :title="title"
    :visible.sync="drawer"
    class="drawer-box"
    size="640px"
  >
    <div v-if="title!=='计划说明'">
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
    </div>
    <div v-if="title==='计划说明'" class="c-5f f14" style="line-height:24px;">
      <p>设计说明书一、课题分析</p>
      <p>1、实训课题：机床购销合同洽谈（需方）</p>
      <p>2、背景条件：随着数控技术的发展以及国家对机床操作人员的需求量越来越大，车床也有了较快的发展。国内出现了许多机床制造厂和生产零部件的工厂，加快了人类现代化的进程。</p>
      <p>3、项目分析（1）洽谈目的及说明经过初步了解，目前在山西省境内只有一个机床生产商，公司名称是山西太原第一机床厂。据了解，这家工厂是国营单位，而且在国内信誉良好。</p>
      <p>本次我方代表的是山西机电职业技术学院，我方需要购进一台C6240普通车床，来填充数控实训中心，更好的方便学生实训和练习操作机床的能力。所以我方决定向太原第一机床厂购进一台C6240机床，</p>
      <p>洽谈的目的是借助这次交易建立起一种长期稳定的合作关系。（2）洽谈的基本内容经过分析，双方交易所涉及的项目主要有：产品名称、型号、生产厂家、数量、金额、交货期、质量要求、交货地点和方式、</p>
      <p>运输条件、验收标准、结算方法和期限，违约责任、合同纠纷的处理等。洽谈的关键项目及说明分析本次谈判中的谈判项目，我们认为是产品的价格，其理由如下:a产品价格关系到学校的根本利益。</p>
      <p>b目前市场价格不稳定，涨势难料，如果交货期过长，而在此期间价格的变动会很大，会引起不必要的麻烦，给我方造成不必要的损失。洽谈的重要项目和一般项目除价格外，我们估计还有些项目比较重要：</p>
      <p>a运输条件和运输费用。依交易惯例来讲，运输条件和运输费用应由我方自行解决。但应我方条件受限，所以请供方协助解决。所以运费、装卸费用、具体的运输时间以及送达地点等相关问题都需要商讨。</p>
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
            drawer: false,
            title: '计划1'
        }
    },
    methods: {
        show({ title }) {
            this.title = title
            this.drawer = true
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
            span:focus { outline: 0; }
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
