<template>
  <!-- 预警-中标候选人公示 -->
  <div class="warning">
    <el-collapse v-model="activeNames">
      <!-- 发布规范性 -->
      <div v-if="pageCode==='0010'">
        <p class="item-tit flsb flc-y">
          <span class="fls flc-y">业务指标：{{ PageData.WarnData.CheckItemName }}<span class="light" :class="PageData.WarnData.WarnLevel === 'Normal'?'green':(PageData.WarnData.WarnLevel === 'Warning')?'yellow':(PageData.WarnData.WarnLevel==='Error')?'red':''" /></span>
          <span class="detailBtn" @click="detail()">查看详情>></span>
        </p>
        <p class="item-tip" :class="PageData.WarnData.WarnLevel === 'Normal'?'greenBg':(PageData.WarnData.WarnLevel === 'Warning')?'yellowBg':(PageData.WarnData.WarnLevel==='Error')?'redBg':''">预警提示：{{ PageData.WarnData.Remark }}</p>
        <el-collapse v-model="activeNames">
          <el-collapse-item title="" name="1" class="collapseBG">
            <span slot="title" class="collapse-title"><span />{{ PageData.WarnData.CheckContentName }}</span>
            <el-row>
              <el-col :span="12"><span>公示开始时间：</span><em>{{ PageData.WinDatas[0].SPublicityStartTime }}</em></el-col>
              <el-col :span="12"><span>公示结束时间：</span><em>{{ PageData.WinDatas[0].SPublicityEndTime }}</em></el-col>
            </el-row>
            <el-row>
              <el-col :span="12"><span>公示有效期：</span><em>{{ PageData.WinDatas[0].PublicityDay }}天</em></el-col>
              <el-col :span="12"><span>发布时间：</span><em>{{ PageData.WinDatas[0].SNoticeSendTime }}</em></el-col>
            </el-row>
            <el-row>
              <el-col :span="12"><span>公示有效期：</span><em>{{ PageData.Data.PublicityDay }}天</em></el-col>
              <el-col :span="12"><span>发布时间：</span><em>{{ PageData.Data.SNoticeSendTime }}</em></el-col>
            </el-row>
            <el-row>
              <el-col :span="12"><span>公示URL：</span><em>{{ PageData.Data.Url }}</em></el-col>
            </el-row>
            <el-row>
              <el-col :span="12"><span>公示内容：</span><em /></el-col>
            </el-row>
            <p v-if="PageData.WinDatas[0].PublicityContent" class="NoticeContent" v-html="PageData.WinDatas[0].PublicityContent" />
            <el-collapse-item title="" name="2">
              <span slot="title" class="collapse-title"><span />信息来源</span>
              <msgSource :data-list="DataSource" />
            </el-collapse-item>
          </el-collapse-item>
        </el-collapse>
      </div>
      <!-- 中标候选人与招标人 -->
      <div v-if="pageCode==='0004'">
        <p class="item-tit flsb flc-y">
          <span class="fls flc-y">业务指标：{{ PageData.WarnData.CheckItemName }}<span class="light" :class="PageData.WarnData.WarnLevel === 'Normal'?'green':(PageData.WarnData.WarnLevel === 'Warning')?'yellow':(PageData.WarnData.WarnLevel==='Error')?'red':''" /></span>
          <span class="detailBtn" @click="detail()">查看详情>></span>
        </p>
        <p class="item-tip" :class="PageData.WarnData.WarnLevel === 'Normal'?'greenBg':(PageData.WarnData.WarnLevel === 'Warning')?'yellowBg':(PageData.WarnData.WarnLevel==='Error')?'redBg':''">预警提示：{{ PageData.WarnData.Remark }}</p>
        <el-collapse v-model="activeNames">
          <el-collapse-item title="" name="1">
            <span slot="title" class="collapse-title"><span />{{ PageData.WarnData.CheckContentName }}</span>
            <el-row>
              <el-col :span="12"><span>招标人名称：</span><em>{{ PageData.WinDatas[0].TendererName }}</em></el-col>
              <el-col :span="12"><span>招标人代码：</span><em>{{ PageData.WinDatas[0].TendererCode }}</em></el-col>
            </el-row>
            <el-row>
              <el-col :span="24"><span>累计招标的标段（包）：</span><em>{{ PageData.WinDatas[0].AgentSegCount }}个</em></el-col>
            </el-row>
            <el-row>
              <el-col :span="24"><span>中标候选人列表：</span><em /></el-col>
            </el-row>
            <table>
              <thead>
                <tr>
                  <th>序号</th>
                  <th>中标候选人排名</th>
                  <th>中标候选人名称</th>
                  <th>中标候选人代码</th>
                  <th>企业中标的该招标人招标的标段（包）数量</th>
                  <th>占总招标的比例</th>
                  <th>企业累计中标标段（包）数量</th>
                  <th>占总中标的比例</th>
                  <th>预警级别</th>
                  <th>相关性记录</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item,index) in PageData.WinDatas" :key="index">
                  <td>{{ index+1 }}</td>
                  <td>{{ item.WinCandidateOrder }}</td>
                  <td>{{ item.WinCandidateName }}</td>
                  <td>{{ item.WinCandidateCode }}</td>
                  <td>{{ item.TenBidCount }}</td>
                  <td>{{ item.TenBidScale*100 }}%</td>
                  <td>{{ item.WinSegBidCount }}</td>
                  <td>{{ item.TenWinBidScale*100 }}%</td>
                  <td><span class="light" :class="item.TenSameLevel === 'Normal'?'green':(item.TenSameLevel === 'Warning')?'yellow':(item.TenSameLevel==='Error')?'red':''" /></td>
                  <td>
                    <span :class="{'cursor':item.TenBidCount>0}" @click="geBiddertRelat(item.SId,item.TenBidCount)">{{ item.TenBidCount }}</span>
                  </td>
                </tr>
              </tbody>
            </table>
            <!-- <p v-if="PageData.NoticeContent" class="NoticeContent" v-html="PageData.Data.NoticeContent" /> -->
          </el-collapse-item>
          <el-collapse-item title="" name="2" class="collapseBG">
            <span slot="title" class="collapse-title"><span />信息来源</span>
            <msgSource :data-list="DataSource" />
          </el-collapse-item>
        </el-collapse>
      </div>
      <!-- 中标候选人与招标代理机构 -->
      <div v-if="pageCode==='0005'">
        <p class="item-tit flsb flc-y">
          <span class="fls flc-y">业务指标：{{ PageData.WarnData.CheckItemName }}<span class="light" :class="PageData.WarnData.WarnLevel === 'Normal'?'green':(PageData.WarnData.WarnLevel === 'Warning')?'yellow':(PageData.WarnData.WarnLevel==='Error')?'red':''" /></span>
          <span class="detailBtn" @click="detail()">查看详情>></span>
        </p>
        <p class="item-tip" :class="PageData.WarnData.WarnLevel === 'Normal'?'greenBg':(PageData.WarnData.WarnLevel === 'Warning')?'yellowBg':(PageData.WarnData.WarnLevel==='Error')?'redBg':''">预警提示：{{ PageData.WarnData.Remark }}</p>
        <el-collapse v-model="activeNames">
          <el-collapse-item title="" name="1">
            <span slot="title" class="collapse-title"><span />{{ PageData.WarnData.CheckContentName }}</span>
            <el-row>
              <el-col :span="12"><span>招标代理机构名称：</span><em>{{ PageData.WinDatas[0].TendererName }}</em></el-col>
              <el-col :span="12"><span>招标代理机构代码：</span><em>{{ PageData.WinDatas[0].TendererCode }}</em></el-col>
            </el-row>
            <el-row>
              <el-col :span="12"><span>累计代理的标段（包）：</span><em>{{ PageData.WinDatas[0].AgentSegCount }}个</em></el-col>
            </el-row>
            <el-row>
              <el-col :span="12"><span>中标候选人列表：</span><em /></el-col>
            </el-row>
            <table>
              <thead>
                <tr>
                  <th class="tit-bg">序号</th>
                  <th class="tit-bg">中标候选人排名</th>
                  <th class="tit-bg">中标候选人名称</th>
                  <th class="tit-bg">中标候选人代码</th>
                  <th class="tit-bg">企业中标的该招标代理机构代理的标段（包）数量</th>
                  <th class="tit-bg">占总代理的比例</th>
                  <th class="tit-bg">企业累计中标标段（包）数量</th>
                  <th class="tit-bg">占总中标的比例</th>
                  <th class="tit-bg">预警级别</th>
                  <th class="tit-bg">相关性记录</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item,index) in PageData.WinDatas" :key="index">
                  <td>{{ index+1 }}</td>
                  <td>{{ item.WinCandidateOrder }}</td>
                  <td>{{ item.WinCandidateName }}</td>
                  <td>{{ item.WinCandidateCode }}</td>
                  <td>{{ item.AgentBidCount }}</td>
                  <td>{{ item.AgentBidScale*100 }}%</td>
                  <td>{{ item.WinSegBidCount }}</td>
                  <td>{{ item.AgentWinBidScale*100 }}%</td>
                  <td><span class="light" :class="item.TenSameLevel === 'Normal'?'green':(item.TenSameLevel === 'Warning')?'yellow':(item.TenSameLevel==='Error')?'red':''" /></td>
                  <td>
                    <span :class="{'cursor':item.TenBidCount>0}" @click="geBiddertRelat(item.SId,item.TenBidCount)">{{ item.TenBidCount }}</span>
                  </td>
                </tr>
              </tbody>
            </table>
            <p v-if="PageData.WinDatas[0].NoticeContent" class="NoticeContent" v-html="PageData.WinDatas[0].NoticeContent" />
          </el-collapse-item>
          <el-collapse-item title="" name="2" class="collapseBG">
            <span slot="title" class="collapse-title"><span />信息来源</span>
            <msgSource :data-list="DataSource" />
          </el-collapse-item>
        </el-collapse>
      </div>
      <!-- 中标候选人相关性 -->
      <div v-if="pageCode==='0006'">
        <p class="item-tit flsb flc-y">
          <span class="fls flc-y">业务指标：{{ PageData.WarnData.CheckItemName }}<span class="light" :class="PageData.WarnData.WarnLevel === 'Normal'?'green':(PageData.WarnData.WarnLevel === 'Warning')?'yellow':(PageData.WarnData.WarnLevel==='Error')?'red':''" /></span>
          <span class="detailBtn" @click="detail()">查看详情>></span>
        </p>
        <p class="item-tip" :class="PageData.WarnData.WarnLevel === 'Normal'?'greenBg':(PageData.WarnData.WarnLevel === 'Warning')?'yellowBg':(PageData.WarnData.WarnLevel==='Error')?'redBg':''">预警提示：{{ PageData.WarnData.Remark }}</p>
        <el-collapse v-model="activeNames">
          <el-collapse-item title="" name="1">
            <span slot="title" class="collapse-title"><span />{{ PageData.WarnData.CheckContentName }}</span>
            <el-row>
              <el-col :span="12"><span>中标候选人列表：</span><em /></el-col>
            </el-row>
            <table>
              <thead>
                <tr>
                  <th rowspan="2" class="tit-bg">序号</th>
                  <th rowspan="2" class="tit-bg">中标候选人排名</th>
                  <th rowspan="2" class="tit-bg">中标候选人名称</th>
                  <th rowspan="2" class="tit-bg">累积标段（包）数量</th>
                  <th v-for="(item,index) in relative" :key="index" class="tit-bg" colspan="2">
                    {{ item.CandiName }}
                  </th>
                </tr>
                <tr>
                  <template v-for="(row,i) in relative">
                    <template>
                      <th :key="i" class="tit-bg">作为中标候选人的标段（包）数量 </th>
                    </template>
                    <template>
                      <th :key="i+100" class="tit-bg">相关性</th>
                    </template>
                  </template>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item,index) in relative" :key="index">
                  <td>{{ index+1 }}</td>
                  <td>{{ item.Sort }}</td>
                  <td>{{ item.CandiName }}</td>
                  <td>{{ item.WinBidCount }}</td>
                  <template v-for="(el,key) in item.Contrasts">
                    <template>
                      <td :key="key">{{ el.SameWinBidCount === -1?'--':el.SameWinBidCount }}</td>
                    </template>
                    <template>
                      <td :key="key+300" :class="{'cursor':Number(el.Relevance) >0}" @click="getSelfRalat(item.CandiCode,el.ContrastCandiCode,el.Relevance)">
                        <template v-if="el.WarnLevel">
                          <z-circle :warns="[{type:(el.WarnLevel=='Warning')?'d':(el.WarnLevel=='Error')?'c':(el.WarnLevel=='Normal')?'b':'a'}]" :size="15" />
                        </template>
                        <template v-else>
                          --
                        </template>
                      </td>
                    </template>
                  </template>
                </tr>
              </tbody>
            </table>
            <p v-if="PageData.WinDatas[0].NoticeContent" class="NoticeContent" v-html="PageData.WinDatas[0].NoticeContent" />
          </el-collapse-item>
          <el-collapse-item title="" name="2" class="collapseBG">
            <span slot="title" class="collapse-title"><span />信息来源</span>
            <msgSource :data-list="DataSource" />
          </el-collapse-item>
        </el-collapse>
      </div>
    </el-collapse>
    <!-- 相关性记录弹出层 -->
    <el-dialog :visible.sync="dialogTableVisible">
      <alertTable :list="alertDataMsg" />
    </el-dialog>
  </div>
</template>

<script>
import alertTable from '../components/alertTable'
import msgSource from '@/views/supervise/pack/bidinfo/components/msgSource'
import { getWarnDetailForSection, getWinningBidderRelat, getWinningSelfRelat } from '@/api/supwarning'
// import searchQuery from '@/mixins/search'
export default {
    // mixins: [searchQuery],
    components: {
        alertTable,
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
            activeNames: ['1', '2', '3', '4'],
            PageData: {},
            pageCode: '',
            titles: [],
            relative: [],
            alertDataMsg: [],
            btn: false,
            warningId: '',
            dialogTableVisible: false,
            DataSource: []// 数据来源
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
            const { code, warningIds } = data // 相关参数
            this.warningId = warningIds
            if (code === '0006') {
                getWarnDetailForSection({ warningIds }).then(res => {
                    if (res.Data) {
                        this.relative = res.Data[0].Data.Data.WinDatas
                    }
                })
            }
            getWarnDetailForSection({ warningIds }).then(res => {
                if (res.Data) {
                    const { Data, SourceId, WarnData } = res.Data[0].Data
                    this.pageCode = code
                    let { BullData, WinDatas } = Data
                    if (!WinDatas && Data instanceof Object) {
                        WinDatas = [Data]
                        BullData = JSON.parse(Data.DataSource)
                    } else {
                        BullData = JSON.parse(BullData.DataSource)
                    }
                    this.DataSource = BullData
                    this.PageData = {
                        WarnData, BullData, WinDatas, SourceId
                    }
                }
            })
        },
        // 与招标机构,招标人的相关性
        geBiddertRelat(SId, num) {
            if (num === 0) return
            const data = {
                'winCandidateId': SId,
                'pageIndex': 1,
                'pageSize': 10,
                'warningId': this.warningId[0]
            }
            getWinningBidderRelat(data).then(res => {
                const alertDataMsg = res.Data.Data
                alertDataMsg.forEach(element => {
                    if (element.TenderMode === 1) element.TenderMode = '公开招标'
                    if (element.TenderMode === 2) element.TenderMode = '邀请招标'
                    if (element.TenderMode === 9) element.TenderMode = '其他'
                })
                this.alertDataMsg = alertDataMsg
                this.dialogTableVisible = true
            })
        },
        // 中标候选人相关记录相关性
        getSelfRalat(winCandidateId, conCandidateId, open) {
            console.log(winCandidateId, conCandidateId, open)
            if (Number(open) > 0) return this.$message.warning('待开发')
            const data = {
                'winCandidateId': winCandidateId,
                'conCandidateId': conCandidateId,
                'pageIndex': 1,
                'pageSize': 10
            }
            getWinningSelfRelat(data).then(res => {
            })
        },
        detail() {
            this.$router.push({ path: '/supervise/bidinfo', query: { SId: this.$route.query.SId, bidSectionCodes: this.$route.query.bidSectionCodes, pageType: 'bidding' }})
        }
    }
}
</script>
<style lang="scss" scoped>
@import './info.scss';
</style>
