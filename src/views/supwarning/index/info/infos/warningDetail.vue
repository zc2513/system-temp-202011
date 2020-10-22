<template>
  <div class="warning">
    <!-- 招标公告/投标邀请 -->
    <div v-if="pageCode==='0009'">
      <p class="item-tit flsb flc-y"><span class="fls flc-y">业务指标：{{ PageData.WarnData.CheckContentName }}<span class="light" :class="PageData.WarnData.WarnLevel === 'Normal'?'green':(PageData.WarnData.WarnLevel === 'Warning')?'yellow':(PageData.WarnData.WarnLevel==='Error')?'red':''" /></span>
        <span class="detailBtn" @click="detail()">查看详情>></span>
      </p>
      <p class="item-tip" :class="PageData.WarnData.WarnLevel === 'Normal'?'greenBg':(PageData.WarnData.WarnLevel === 'Warning')?'yellowBg':(PageData.WarnData.WarnLevel==='Error')?'redBg':''">预警提示：{{ PageData.WarnData.Remark }}</p>
      <el-collapse v-model="activeNames">
        <el-collapse-item title="" name="1" class="collapseBG">
          <span slot="title" class="collapse-title"><span />{{ PageData.WarnData.CheckContentName }}</span>
          <el-row>
            <el-col :span="12"><span>招标公告URL：</span><em>{{ PageData.Data.Url }}</em></el-col>
            <el-col :span="12"><span>发布时间：</span><em>{{ PageData.Data.SDocGetEndTime }}</em></el-col>
          </el-row>
          <el-row>
            <el-col :span="12"><span>公告内容：</span><em /></el-col>
          </el-row>
          <p class="NoticeContent" v-html="PageData.Data.NoticeContent" />
        </el-collapse-item>
        <el-collapse-item title="" name="2" class="collapseBG">
          <span slot="title" class="collapse-title"><span />信息来源:</span>
          <msgSource :data-list="PageData.Data.DataSource" />
        </el-collapse-item>
      </el-collapse>
    </div>
    <div v-if="pageCode==='0002'">
      <p class="item-tit flsb flc-y">
        <span class="fls flc-y">业务指标：{{ PageData.WarnData.CheckContentName }}<span class="light" :class="PageData.WarnData.WarnLevel === 'Normal'?'green':(PageData.WarnData.WarnLevel === 'Warning')?'yellow':(PageData.WarnData.WarnLevel==='Error')?'red':''" /></span>
        <span class="detailBtn" @click="detail()">查看详情>></span>
      </p>
      <p class="item-tip" :class="PageData.WarnData.WarnLevel === 'Normal'?'greenBg':(PageData.WarnData.WarnLevel === 'Warning')?'yellowBg':(PageData.WarnData.WarnLevel==='Error')?'redBg':''">预警提示：{{ PageData.WarnData.Remark }}</p>
      <el-collapse v-model="activeNames">
        <el-collapse-item title="" name="1" class="collapseBG">
          <span slot="title" class="collapse-title"><span />{{ PageData.WarnData.CheckContentName }}</span>
          <el-row>
            <el-col :span="12"><span>招标文件获取开始时间：</span><em>{{ PageData.Data.Url }}</em></el-col>
            <el-col :span="12"><span>招标文件获取截止时间：</span><em>{{ PageData.Data.SDocGetEndTime }}</em></el-col>
          </el-row>
          <el-row>
            <el-col :span="12"><span>招标文件发售期：</span><em>{{ PageData.Data.SalePeriod }}天</em></el-col>
          </el-row>
        </el-collapse-item>
        <el-collapse-item title="" name="2" class="collapseBG">
          <span slot="title" class="collapse-title"><span />信息来源:</span>
          <msgSource :data-list="PageData.Data.DataSource" />
        </el-collapse-item>
      </el-collapse>
    </div>
    <div v-if="pageCode==='0003'">
      <p class="item-tit flsb flc-y">
        <span class="fls flc-y">业务指标：{{ PageData.WarnData.CheckContentName }}<span class="light" :class="PageData.WarnData.WarnLevel === 'Normal'?'green':(PageData.WarnData.WarnLevel === 'Warning')?'yellow':(PageData.WarnData.WarnLevel==='Error')?'red':''" /></span>
        <span class="detailBtn" @click="detail()">查看详情>></span>
      </p>
      <p class="item-tip" :class="PageData.WarnData.WarnLevel === 'Normal'?'greenBg':(PageData.WarnData.WarnLevel === 'Warning')?'yellowBg':(PageData.WarnData.WarnLevel==='Error')?'redBg':''">预警提示：{{ PageData.WarnData.Remark }}</p>
      <el-collapse v-model="activeNames">
        <el-collapse-item title="" name="1" class="collapseBG">
          <span slot="title" class="collapse-title"><span />{{ PageData.WarnData.CheckContentName }}</span>
          <el-row>
            <el-col :span="12"><span>招标文件获取开始时间：</span><em>{{ PageData.Data.SDocGetStartTime }}</em></el-col>
            <el-col :span="12"><span>招标文件获取截止时间：</span><em>{{ PageData.Data.SDocGetEndTime }}</em></el-col>
          </el-row>
          <el-row>
            <el-col :span="12"><span>投标文件递交截止时间：</span><em>{{ PageData.Data.SBidDocReferEndTime }}</em></el-col>
            <el-col :span="12"><span>投标文件递交方法：</span><em>{{ PageData.Data.BidDocReferMethod }}</em></el-col>
          </el-row>
        </el-collapse-item>
        <el-collapse-item title="" name="2" class="collapseBG">
          <span slot="title" class="collapse-title"><span />信息来源:</span>
          <msgSource :data-list="PageData.Data.DataSource" />
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
import msgSource from '@/views/supervise/pack/bidinfo/components/msgSource'
import { getWarnDetailForSection } from '@/api/supwarning'
export default {
    components: {
        msgSource
    },
    props: {
        listsData: {
            type: Object,
            default: _ => {}
        }
    },
    data() {
        return {
            activeNames: ['1', '2', '3'],
            pageCode: '',
            PageData: {}

        }
    },
    watch: {
        listsData: {
            handler(v) {
                this.init(v)
            },
            immediate: true
        }
    },
    methods: {
        init(data) {
            const { code, warningIds } = data
            getWarnDetailForSection({ warningIds }).then(res => {
                this.PageData = res.Data.map(e => {
                    e.Data.Data.DataSource = JSON.parse(e.Data.Data.DataSource)
                    return e.Data
                })[0]
                this.pageCode = code
            })
        },
        detail() {
            this.$router.push({ path: '/supervise/bidinfo', query: { SId: this.$route.query.SId, bidSectionCodes: this.$route.query.bidSectionCodes, pageType: 'bidding' }})
        }
    }
}
</script>
<style lang="scss" scoped>
@import './info.scss'
</style>
