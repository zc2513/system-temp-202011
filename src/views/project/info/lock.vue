<template>
  <!-- 详情/查看计划 -->
  <el-dialog
    custom-class="info-page"
    fullscreen
    width="30%"
    :modal="false"
    :visible.sync="dialogVisible"
    :show-close="false"
  >
    <div slot="title" class="info-page-title flc-y flsb">
      <div>查看计划</div>
      <div class="cursor" style="color:#6666FF;" @click="dialogVisible=false">返回</div>
    </div>
    <div class="info-page-content fl">
      <div>
        <div class="info-con-left">
          <h4 class="f18">基本信息</h4>
          <div class="con-item fl f14 mb25">
            <div>应届生</div>
            <div class="pl10">张三</div>
          </div>
          <div class="con-item fl f14 mb25">
            <div>计划类型</div>
            <div class="pl10">周计划</div>
          </div>
          <div class="con-item fl f14 mb25">
            <div>计划时间</div>
            <div class="pl10">2020年第47周</div>
          </div>
          <div class="con-item fl f14 mb15">
            <div>组别</div>
            <div class="pl10">成都 二部 第1小组</div>
          </div>
        </div>
      </div>

      <div class="info-con-right fl1 ml15 pb30">
        <z-header title="基础计划" />

        <div class="name-tag flc-y">
          <el-tag class="mr10" size="medium" effect="dark">标签一</el-tag>
          <el-tag class="mr10" size="medium" effect="plain">标签二</el-tag>
          <el-tag class="mr10" size="medium" effect="plain">标签三</el-tag>
          <el-tag class="mr10" size="medium" effect="plain">标签四</el-tag>
          <el-tag class="mr10 disabled" size="medium" effect="plain">标签五</el-tag>
        </div>

        <div class="student-info box">
          <SmallTitle title="技能类型">
            <div class="skill-tag">
              <el-tag class="mr15 c-5f" size="medium" effect="plain">标签一</el-tag>
              <el-tag class="mr15 c-5f" size="medium" effect="plain">标签一</el-tag>
              <el-tag class="mr15 c-5f" size="medium" effect="plain">标签一</el-tag>
            </div>
          </SmallTitle>
          <SmallTitle title="计划详情">
            <div>
              <h4 class="f22 t-c mt20 mb30">我是标题标题标题</h4>
              <div class="c-56 mb30">
                <p>(1)目标。这是计划的灵魂。计划就是为了完成一定任务而制订的。目标是计划产生的导因，也是计划奋斗方向。因此，计划应根据需要与可能，规定出在一定时间内所完成的任务和应达到的要求。任务和要求应该具体明确，有的还要定出数量、质量和时间要求。</p>
                <p>(2)措施。要明确何时实现目标和完成任务，就必须制定出相应的措施和办法，这是实现计划的保证。措施和方法主要指达到既定目标需要采取什么手段，动员哪些力量，创造什么条件，排除哪些困难等。总之，要根据客观条件，统筹安排，将“怎么做”写得明确具体，切实可行。</p>
                <p>(3)步骤。这是指执行计划的工作程序和时间安排。每项任务，在完成过程中都有阶段性，而每个阶段又有许多环节，它们之间常常是互相交错的。因此，订计划必须胸有全局，妥善安排，哪些先干，哪些后干，应合理安排。(1)目标。这是计划的灵魂。计划就是为了完成一定任务而制订的。目标是计划产生的导因，也是计划奋斗方向。因此，计划应根据需要与可能，规定出在一定时间内所完成的任务和应达到的要求。任务和要求应该具体明确，有的还要定出数量、质量和时间要求。</p>
                <p>(2)措施。要明确何时实现目标和完成任务，就必须制定出相应的措施和办法，这是实现计划的保证。措施和方法主要指达到既定目标需要采取什么手段，动员哪些力量，创造什么条件，排除哪些困难等。总之，要根据客观条件，统筹安排，将“怎么做”写得明确具体，切实可行。</p>
                <p>(3)步骤。这是指执行计划的工作程序和时间安排。每项任务，在完成过程中都有阶段性，而每个阶段又有许多环节，它们之间常常是互相交错的。因此，订计划必须胸有全局，妥善安排，哪些先干，哪些后干，应合理安排。</p>
              </div>
            </div>
          </SmallTitle>
          <SmallTitle title="计划评论" style="padding-bottom:50px;">
            <el-input
              v-model="textarea"
              type="textarea"
              placeholder="请输入内容"
              maxlength="500"
              rows="8"
              show-word-limit
            />
            <div class="t-r mt15">
              <el-button size="mini" type="primary">提交</el-button>
            </div>
          </SmallTitle>
          <div>
            评论区内容盒子
          </div>
        </div>

      </div>
    </div>
  </el-dialog>
</template>

<script>
import SmallTitle from './smallTitle'
export default {
    components: { SmallTitle },
    data() {
        return {
            dialogVisible: true
        }
    }
}
</script>

<style lang="scss">
.info-page{
    padding: 0 24px;
    background: #F5F7F9;
    .el-dialog__header,.el-dialog__body{  padding: 0; }
    .info-page-title{
        height: 72px;
        color:#4E5C7A;
    }
    .info-con-left{
        width: 336px;
        background: #FFFFFF;
        border-radius: 10px;
        padding: 24px;
        color: #303133;
        h4{
            height: 56px;
            line-height: 56px;
        }
        .con-item{
            >div:first-of-type{
                color: #5F6266;
                width: 60px;
            }
        }
    }
    .info-con-right{
        .name-tag{//标签
            height: 80px;
            .el-tag{
                border: 1px solid #E0E4EB;
                border-radius: 4px;
                color: #5F6266;
            }
            .el-tag--dark{
                color: #FFF;
            }
            .disabled{
                background: #F4F7FA;
                color: #909398;
            }
        }
        .student-info{
            padding-top: 40px;
            .skill-tag {
                .el-tag{
                    background: #F4F7FA;
                    border-radius: 4px;
                    color: #5F6266;
                    border: 0;
                }
            }
        }

    }
}
</style>
