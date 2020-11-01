
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
          <div class="c-5f">计划标题</div>
          <div class="ml15">{{ plan.title }}</div>
        </div>
        <div class="flc-y drawer-base f14">
          <div class="c-5f">应届生</div>
          <div class="ml15">{{ plan.planUser }}</div>
        </div>
        <div class="flc-y drawer-base f14">
          <div class="c-5f">制定人</div>
          <div class="ml15">{{ plan.createUser }}</div>
        </div>
        <div class="flc-y drawer-base f14">
          <div class="c-5f">计划类型</div>
          <div class="ml15">{{ title }}</div>
        </div>
        <div class="flc-y drawer-base f14">
          <div class="c-5f">计划时间</div>
          <div class="ml15">{{ planTime }}</div>
        </div>
      </smallTitle>

      <smallTitle title-left="12" class="mt30" title="技能类型">
        <div class="skill-tag">
          <el-tag v-for="(tag, key) in plan.skillType" :key="key" class="mr15 c-5f" size="medium" effect="plain">{{ tag }}</el-tag>

        </div>
      </smallTitle>

      <smallTitle title-left="12" class="mt30" title="计划详情" />
      <div>
        <h4 class="t-c f20 mt20">{{ plan.title }}</h4>
        <div class="c-5f f14 mt25" style="line-height:24px;">
          <p v-html="plan.planContent" />
        </div>
      </div>
      <!-- <smallTitle title-left="12" class="mt30" title="计划评论" />
      <div>
        <commentList ref="commentList" :reportid="plan.id" />
      </div> -->
    </div>

  </el-drawer>
</template>

<script>
import { parseTime } from '@/utils/filter'
import commentList from '@/components/commentList'

import smallTitle from '../component/smallTitle'
export default {
    name: 'PlankDrawer',
    components: { smallTitle, commentList },
    data() {
        return {
            drawer: false,
            title: '',
            plan: null,
            planTime: ''
        }
    },
    methods: {
        init() {
            switch (this.plan.planType) {
                case 1:
                    this.title = '周计划'
                    this.planTime = this.plan.year + '年第' + this.plan.week + '周（' + this.plan.weekStart + '~' + this.plan.weekEnd + ')'
                    break
                case 2:
                    this.title = '月计划'
                    this.planTime = this.plan.year + '年' + this.plan.month + '月'
                    break
                case 3:
                    this.title = '自定义计划'
                    this.planTime = parseTime(this.plan.startDate, '{y}年{m}月{d}日') + '~' + parseTime(this.plan.endDate, '{y}年{m}月{d}日')
                    break
                default:
            }
        },
        show(data) {
            this.plan = data.plan
            console.log('计划---------------------》', this.plan)
            this.init()
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
