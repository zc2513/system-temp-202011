<template>
  <!-- 节点4，资格预审公告 -->
  <div class="bidsection bgcolor-w project_ele">
    <el-collapse v-model="activeNames">
      <el-collapse-item :title="'一、'+data.NoticeName" name="1" class="collapseBG">
        <!-- <div class="item-one">
          <h6 class="tit">1.资格预审公告基本信息</h6>
          <div class="con">
            <div class="flsb item f-wrap">
              <p><span>招标项目编号：</span>{{ data.TenderProjectCode }}</p>
              <p><span>招标项目名称：</span>{{ data.TenderProjectName }}</p>
            </div>
            <div>
              <p><span>相关标段（包）编号：</span>{{ data.BidSectionCodes }}</p>
              <p><span>相关标段（包）名称：</span></p>
              <textarea id="" v-model=" data.BidSectionNames " name="" cols="30" rows="10" readonly="readonly" />
            </div>
            <div class="flsb item f-wrap">
              <p><span>招标编号：</span>{{ data.TenderCode }}</p>
              <p><span>公告性质：</span>{{ anoncementType[data.NoticeNature] }}</p>
              <p><span>公告类型：</span>{{ bidType[data.NoticeType] }}</p>
              <p><span>公告发布媒介：</span>{{ data.NoticeMedia }}</p>
              <p><span>公告发布时间：</span>{{ data.SNoticeSendTime }}</p>
              <p class="souse"><span>源URL：</span>
                {{ data.Url }}
              </p>
              <p class="wid100"><span>公告内容：</span></p>
            </div>
            <div class="bidd-dec">
              <p v-html="data.NoticeContent" />
            </div>
          </div>
        </div> -->
        <div class="child">
          <el-collapse v-model="activeNames_item">
            <el-collapse-item title="" name="a">
              <span slot="title" class="collapse-title"><span />1.资格预审公告基本信息</span>
              <el-row>
                <el-col :span="24"><span>招标项目编号：</span><em>{{ data.TenderProjectCode }}</em></el-col>
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
                <el-col :span="12"><span>公告性质：</span><em>{{ anoncementShiType[data.NoticeNature] }}</em></el-col>
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
              <span slot="title" class="collapse-title"><span />2.资格预审文件获取信息</span>
              <el-row>
                <el-col :span="12"><span>资格预审文件获取开始时间：</span><em>{{ data.SDocGetStartTime }}</em></el-col>
                <el-col :span="12"><span>资格预审文件获取截止时间：</span><em>{{ data.SDocGetEndTime }}</em></el-col>
              </el-row>
              <el-row>
                <el-col :span="12"><span>资格预审文件获取方法：</span><em>{{ data.DocGetMethod }}</em></el-col>
              </el-row>
            </el-collapse-item>
            <el-collapse-item title="" name="c">
              <span slot="title" class="collapse-title"><span />3.资格预审文件递交信息</span>
              <el-row>
                <el-col :span="12"><span>资格预审申请文件递交截止时间：</span><em>{{ data.SBidDocReferEndTime }}</em></el-col>
                <el-col :span="12"><span>资格预审申请文件递交方法：</span><em>{{ data.BidDocReferMethod }}</em></el-col>
              </el-row>
              <el-row>
                <el-col :span="12"><span>资格预审申请文件递交地址：</span><em>{{ data.BidUrl }}</em></el-col>
                <el-col :span="12"><span>是否允许联合体投标：</span><em>{{ data.SyndicatedFlag?'是':'否' }}</em></el-col>
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
                <el-col :span="12"><span>是否延期开标：</span><em>{{ data.IsPostpone }}</em></el-col>
              </el-row>
            </el-collapse-item>
            <el-collapse-item title="" name="e">
              <span slot="title" class="collapse-title"><span />5.资格预审人和招标代理机构信息</span>
              <el-row>
                <el-col :span="12"><span>招标人代码类型：</span><em>{{ tenderCodeType[data.TenderAgencyCodeType] }}</em></el-col>
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
                <el-col :span="12"><span>招标代理机构代码类型：</span><em>{{ tenderCodeType[data.TenderAgencyCodeType] }}</em></el-col>
                <el-col :span="12"><span>招标代理机构代码：</span><em>{{ data.TenderAgencyCode }}</em></el-col>
              </el-row>
              <el-row>
                <el-col :span="12"><span>招标代理机构名称：</span><em>{{ data.TenderAgencyName }}</em></el-col>
                <el-col :span="12"><span>招标代理机构地址：</span><em>{{ data.TenderAgencyAddress }}</em></el-col>
              </el-row>
              <el-row>
                <el-col :span="12"><span>招标代理机构联系人：</span><em>{{ data.TenderAgencyContactor }}</em></el-col>
                <el-col :span="12"><span>招标代理机构联系电话：</span><em>{{ data.TenderAgencyPhoneNumber }}</em></el-col>
              </el-row>
            </el-collapse-item>
          </el-collapse>
        </div>
        <!-- <div class="item-one">
          <h6 class="tit">5.资格预审人和招标代理机构信息</h6>
          <div class="con">
            <div class="flsb item f-wrap">
              <p><span>招标人代码类型：</span>{{ bidcCodeType[data.TenderCodeType] }}</p>
              <p><span>招标人代码：</span>{{ data.TendererCode }}</p>
              <p><span>招标人名称：</span>{{ data.TendererName }}</p>
              <p><span>招标人地址：</span>{{ data.TendererAddress }}</p>
              <p><span>招标人联系人：</span>{{ data.TendererContactor }}</p>
              <p><span>招标人联系电话：</span>{{ data.TendererPhoneNumber }}</p>
              <p><span>招标人电子邮箱：</span>{{ data.TendererEmail }}</p>
              <p><span>招标代理机构电子邮箱：</span>{{ data.TenderAgencyEmail }}</p>
              <p><span>招标代理机构代码类型：</span>{{ bidcCodeType[data.TenderAgencyCodeType] }}</p>
              <p><span>招标代理机构代码：</span>{{ data.TenderAgencyCode }}</p>
              <p><span>招标代理机构名称：</span>{{ data.TenderAgencyName }}</p>
              <p><span>招标代理机构地址：</span>{{ data.TenderAgencyAddress }}</p>
              <p><span>招标代理机构联系人：</span>{{ data.TenderAgencyContactor }}</p>
              <p><span>招标代理机构联系电话：</span>{{ data.TenderAgencyPhoneNumber }}</p>
            </div>
          </div>
        </div> -->
        <div class="item-one">
          <h6 class="tit">6.其他</h6>
          <div class="con">
            <div class="flsb item f-wrap">
              <p><span>其他内容：</span>{{ data.OtherContent }}</p>
              <p><span>公告发布负责人：</span>{{ data.BulletinDuty }}</p>
              <p><span>交易平台数据验证责任人：</span>{{ data.ExaminerName }}</p>
              <p><span>提交时间：</span>{{ data.SNoticeSendTime }}</p>
            </div>
          </div>
          <p>7.附件</p>
          <table>
            <thead>
              <tr>
                <th>附件名称</th>
                <th>提交时间</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <template v-if="files.length">
                <tr v-for="(item,key) in files" :key="key">
                  <td>{{ item.FileName }}</td>
                  <td>{{ item.TimeStr }}</td>
                  <td>
                    <a :href="`${upfileUrl}/file/downfile?guid=${item.Guid}`" :download="item.FileName">下载</a>
                  </td>
                </tr>
              </template>
              <tr v-else>
                <td colspan="3">暂无数据</td>
              </tr>
            </tbody>
          </table>
          <div class="item">
            <p class="mt20 mb10"><span>信息来源：</span></p>
            <el-timeline reverse>
              <el-timeline-item
                v-for="(activity, index) in data.DataSource"
                :key="index"
                :timestamp="activity.Time"
              >
                {{ activity.Name }}
              </el-timeline-item>
            </el-timeline>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    props: {
        infoDatas: {
            type: Object,
            default: _ => {}
        }
    },
    data() {
        return {
            activeNames: ['1', '2'],
            activeNames_item: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'],
            data: null,
            files: [],
            anoncementType: { 1: '招标公告', 2: '资格预审公告', 9: '其他' }, // 公告类型
            anoncementShiType: { 1: '正常', 2: '更正', 9: '其他' }, // 公告性质
            bidType: { 1: '自行招标', 2: '委托招标', 9: '其他' }, // 招标类型
            tenderCodeType: { 98: '组织机构编码', 97: '统一社会信用代码', 96: '其他一证一照代码', 95: '无组织机构代码，平台自行赋予代码', 90: '' } // 招标人代码代码类型
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
