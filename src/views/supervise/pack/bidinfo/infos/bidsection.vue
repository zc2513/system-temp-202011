<template>
  <!-- 节点6，招标公告/投标邀请 -->
  <div class="bgcolor-w project_ele">
    <el-collapse v-model="activeNames">
      <el-collapse-item title="" name="1" class="collapseBG">
        <span slot="title" class="collapse-title"><svg-icon icon-class="arrow591" />一、{{ data.NoticeName }}</span>
        <div class="child">
          <el-collapse v-model="activeNames_item">
            <el-collapse-item title="" name="a">
              <span slot="title" class="collapse-title"><span />1.招标公告基本信息</span>
              <el-row>
                <el-col :span="24"><span>招标项目编号：</span><em>{{ data.TenderProjectCode }}</em></el-col>
              </el-row>
              <el-row>
                <el-col :span="24"><span>招标项目名称：</span><em>{{ data.TenderProjectName }}</em></el-col>
              </el-row>
              <el-row>
                <el-col :span="24"><span>相关标段（包）编号：</span><em>{{ data.BidSectionCodes }}</em></el-col>
              </el-row>
              <el-row>
                <el-col :span="24"><span>相关标段（包）名称：</span><em>{{ data.BidSectionNames }}</em></el-col>
              </el-row>
              <el-row>
                <el-col :span="12"><span>招标编号：</span><em>{{ data.TenderCode }}</em></el-col>
                <el-col :span="12"><span>公告性质：</span><em>{{ anoncementXzType[data.NoticeNature] }}</em></el-col>
              </el-row>
              <el-row>
                <el-col :span="12"><span>公告类型：</span><em>{{ anoncementType[data.NoticeType] }}</em></el-col>
                <el-col :span="12"><span>公告发布时间：</span><em>{{ data.SNoticeSendTime }}</em></el-col>
              </el-row>
              <el-row>
                <el-col :span="12"><span>公告发布媒介：</span><em>{{ data.NoticeMedia }}</em></el-col>
                <el-col :span="12"><span>公告发布内容：</span><em /></el-col>
              </el-row>
              <p class="NoticeContent" v-html="data.NoticeContent" />
            </el-collapse-item>
            <el-collapse-item title="" name="b">
              <span slot="title" class="collapse-title"><span />2.招标文件获取信息</span>
              <el-row>
                <el-col :span="12"><span>招标文件获取开始时间：</span><em>{{ data.SDocGetStartTime }}</em></el-col>
                <el-col :span="12"><span>招标文件获取截止时间：</span><em>{{ data.SDocGetEndTime }}</em></el-col>
              </el-row>
              <el-row>
                <el-col :span="12"><span>招标文件获取方法：</span><em>{{ data.SDocGetEndTime }}</em></el-col>
              </el-row>
            </el-collapse-item>
            <el-collapse-item title="" name="c">
              <span slot="title" class="collapse-title"><span />3.投标文件递交信息</span>
              <el-row>
                <el-col :span="12"><span>投标文件递交截止时间：</span><em>{{ data.SBidDocReferEndTime }}</em></el-col>
                <el-col :span="12"><span>投标文件递交方法：</span><em>{{ data.BidDocReferMethod }}</em></el-col>
              </el-row>
              <el-row>
                <el-col :span="12"><span>是否允许联合体投标：</span><em>{{ data.SyndicatedFlag?'是':'否' }}</em></el-col>
                <el-col :span="12"><span>投标文件递交地址：</span><em>{{ data.BidUrl }}</em></el-col>
              </el-row>
            </el-collapse-item>
            <el-collapse-item title="" name="d">
              <span slot="title" class="collapse-title"><span />4.开标信息</span>
              <el-row>
                <el-col :span="12"><span>开标时间：</span><em>{{ data.SBidOpenTime }}</em></el-col>
                <el-col :span="12"><span>开标方式：</span><em>{{ data.BidOpenMethod }}</em></el-col>
              </el-row>
              <el-row>
                <el-col :span="12"><span>评标方法：</span><em>{{ data.QualType }}</em></el-col>
                <el-col :span="12"><span>是否延期开标：</span><em>{{ data.IsPostpone?'是':'否' }}</em></el-col>
              </el-row>
            </el-collapse-item>
            <el-collapse-item title="" name="e">
              <span slot="title" class="collapse-title"><span />5.招标人和招标代理机构信息</span>
              <el-row>
                <el-col :span="12"><span>招标人代码类型：</span><em>{{ bidcCodeType[data.TenderAgencyCodeType] }}</em></el-col>
                <el-col :span="12"><span>招标人代码：</span><em>{{ data.TendererCode }}</em></el-col>
              </el-row>
              <el-row>
                <el-col :span="12"><span>招标人名称：</span><em>{{ data.TendererName }}</em></el-col>
                <el-col :span="12"><span>招标人地址：</span><em>{{ data.TendererAddress }}</em></el-col>
              </el-row>
              <el-row>
                <el-col :span="12"><span>招标人联系人：</span><em>{{ data.TendererContactor }}</em></el-col>
                <el-col :span="12"><span>招标人联系电话：</span><em>{{ data.TendererPhoneNumber }}</em></el-col>
              </el-row>
              <el-row>
                <el-col :span="12"><span>招标人电子邮箱：</span><em>{{ data.TendererEmail }}</em></el-col>
                <el-col :span="12"><span>招标代理机构电子邮箱：</span><em>{{ data.TenderAgencyEmail }}</em></el-col>
              </el-row>
              <el-row>
                <el-col :span="12"><span>招标代理机构代码类型：</span><em>{{ bidcCodeType[data.TenderAgencyCodeType] }}</em></el-col>
                <el-col :span="12"><span>招标代理机构代码：</span><em>{{ data.TenderAgencyCode }}</em></el-col>
              </el-row>
              <el-row>
                <el-col :span="12"><span>招标代理机构联系人：</span><em>{{ data.TenderAgencyContactor }}</em></el-col>
                <el-col :span="12"><span>招标代理机构联系电话：</span><em>{{ data.TenderAgencyPhoneNumber }}</em></el-col>
              </el-row>
            </el-collapse-item>
            <el-collapse-item title="" name="f">
              <span slot="title" class="collapse-title"><span />6.其他</span>
              <el-row>
                <el-col :span="12"><span>其他内容：</span><em>{{ data.OtherContent }}</em></el-col>
                <el-col :span="12"><span>公告发布负责人：</span><em>{{ data.BulletinDuty }}</em></el-col>
              </el-row>
              <el-row>
                <el-col :span="12"><span>交易平台数据验证责任人：</span><em>{{ data.ExaminerName }}</em></el-col>
                <el-col :span="12"><span>提交时间：</span><em>{{ data.SNoticeSendTime }}</em></el-col>
              </el-row>
            </el-collapse-item>
            <el-collapse-item title="" name="g">
              <span slot="title" class="collapse-title"><span />7.附件</span>
              <table>
                <thead>
                  <tr>
                    <th class="wid50">附件名称</th>
                    <th>提交时间</th>
                    <th class="wid20">操作</th>
                  </tr>
                </thead>
                <tbody>
                  <template v-if="files.length">
                    <tr v-for="(item,key) in files" :key="key">
                      <td>{{ item.FileName }}</td>
                      <td>{{ item.TimeStr }}</td>
                      <td><a :href="item.Url" :download="item.FileName">下载</a></td>
                      <!-- <td>
                        <a :href="`${upfileUrl}/file/downfile?guid=${item.Guid}`" :download="item.FileName">下载</a>
                      </td> -->
                    </tr>
                  </template>
                  <tr v-else>
                    <td colspan="3">暂无数据</td>
                  </tr>
                </tbody>
              </table>
            </el-collapse-item>
            <el-collapse-item title="" name="h">
              <span slot="title" class="collapse-title"><span />8.信息来源</span>
              <msgSource :data-list="data.DataSource" />
            </el-collapse-item>
          </el-collapse>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import msgSource from '../components/msgSource'
export default {
    components: {
        msgSource
    },
    props: {
        infoDatas: {
            type: Object,
            default: _ => {}
        }
    },
    data() {
        return {
            activeNames: ['1'],
            activeNames_item: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'],
            data: null,
            files: [],
            anoncementType: { 1: '招标公告', 2: '资格预审公告', 9: '其他' }, // 公告类型
            anoncementXzType: { 1: '正常公告', 2: '变更公告', 3: '重发公告', 9: '其他' }, // 公告性质
            bidType: { 1: '自行招标', 2: '委托招标', 9: '其他' }, // 招标类型
            bidcCodeType: { 98: '组织机构代码', 97: '组织机构代码', 96: '组织机构代码' } // 代码类型
        }
    },
    computed: {
        ...mapState('settings', ['upfileUrl'])
    },
    created() {
        const { Files, Data } = this.infoDatas
        this.data = Data
        this.data.DataSource = JSON.parse(this.data.DataSource)
        this.files = Files
    }
}
</script>

<style lang="scss" scoped>
@import './info.scss'
</style>
