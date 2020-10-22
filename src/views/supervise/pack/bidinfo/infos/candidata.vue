<template>
  <!-- 中标候选人公示 -->
  <div class="bgcolor-w project project_ele">
    <el-collapse v-model="activeNames">
      <el-collapse-item title="" name="1">
        <span slot="title" class="collapse-title"><svg-icon icon-class="arrow591" />一、中标候选人公示</span>
        <div class="child">
          <el-collapse v-model="activeNames_item">
            <el-collapse-item title="" name="a">
              <span slot="title" class="collapse-title"><span />1.中标候选人公示基本信息</span>
              <el-row>
                <el-col :span="24"><span>招标项目编号：</span><em>{{ data.Bulletin.TenderProjectCode }}</em></el-col>
              </el-row>
              <el-row>
                <el-col :span="24"><span>招标项目名称：</span><em>{{ data.Bulletin.TenderProjectName }}</em></el-col>
              </el-row>
              <el-row>
                <el-col :span="24"><span>相关标段（包）编号：</span><em>{{ data.Bulletin.BidSectionCodes }}</em></el-col>
              </el-row>
              <el-row>
                <el-col :span="24"><span>相关标段（包）名称：</span><em>{{ data.Bulletin.BidSectionNames }}</em></el-col>
              </el-row>
              <el-row>
                <el-col :span="12"><span>公示开始时间：</span><em>{{ data.Bulletin.SPublicityStartTime }}</em></el-col>
                <el-col :span="12"><span>公示结束时间：</span><em>{{ data.Bulletin.SPublicityEndTime }}</em></el-col>
              </el-row>
              <el-row>
                <el-col :span="12"><span>公示发布时间：</span><em>{{ data.Bulletin.SNoticeSendTime }}</em></el-col>
                <el-col :span="12"><span>公示发布媒介：</span><em>{{ data.Bulletin.NoticeMedia }}</em></el-col>
              </el-row>
              <el-row>
                <el-col :span="12"><span>公示发布责任人：</span><em>{{ data.Bulletin.BulletinDuty }}</em></el-col>
              </el-row>
            </el-collapse-item>
            <el-collapse-item title="" name="b">
              <span slot="title" class="collapse-title"><span />2.中标候选人</span>
              <table>
                <thead>
                  <tr>
                    <th>中标候选人排名</th>
                    <th>中标候选人名称</th>
                    <th>投标报价（元）</th>
                    <th>金额币种</th>
                    <th>费率</th>
                    <th>质量</th>
                    <th>评标情况</th>
                    <th>工期/交货期/服务期</th>
                    <th class="width15">更多内容</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item,index) in data.WinData" :key="index">
                    <td>{{ item.WinCandidateOrder }}</td>
                    <td>{{ item.WinCandidateName }}</td>
                    <td>{{ item.BidPrice }}</td>
                    <td>{{ item.PriceCurrency === '156'?'人民币':'其他' }}</td>
                    <td>{{ item.Rate }}</td>
                    <td>{{ item.Quality }}</td>
                    <td>{{ item.EvaluationStatus }}</td>
                    <td>{{ item.TimeLimit }}</td>
                    <td>--</td>
                  </tr>
                </tbody>
              </table>
            </el-collapse-item>
            <el-collapse-item title="" name="c">
              <span slot="title" class="collapse-title"><span />3.其他</span>
              <el-row>
                <el-col :span="12"><span>提出异议的渠道和方式：</span><em>{{ data.Bulletin.ObjectionMethod }}</em></el-col>
                <el-col :span="12"><span>交易平台数据验证责任人：</span><em>{{ data.Bulletin.ExaminerName }}</em></el-col>
              </el-row>
              <el-row>
                <el-col :span="12"><span>提交时间：</span><em>{{ data.Bulletin.SNoticeSendTime }}</em></el-col>
                <el-col :span="12"><span>其他内容：</span><em>{{ data.Bulletin.OtherContent }}</em></el-col>
              </el-row>
            </el-collapse-item>
            <el-collapse-item title="" name="d">
              <span slot="title" class="collapse-title"><span />4.附件</span>
              <table>
                <thead>
                  <tr>
                    <th>附件名称</th>
                    <th>提交时间</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  <template v-if="data.Files.length">
                    <tr v-for="(item, index) in data.Files" :key="index">
                      <td> {{ item.FileName }} </td>
                      <td> {{ item.TimeStr }} </td>
                      <td><a :href="item.Url" :download="item.FileName">下载</a></td>
                    </tr>
                  </template>
                  <tr v-else>
                    暂无数据
                  </tr>
                </tbody>
              </table>
            </el-collapse-item>
            <el-collapse-item title="" name="e">
              <span slot="title" class="collapse-title"><span />5.信息来源</span>
              <msgSource :data-list="data.Bulletin.DataSource" />
            </el-collapse-item>
          </el-collapse>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
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
            activeNames: ['1', '2'],
            activeNames_item: ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
            data: {}
        }
    },
    created() {
        this.data = this.infoDatas
        this.data.Bulletin.DataSource = JSON.parse(this.data.Bulletin.DataSource)
        console.log(this.data)
    }
}
</script>

<style lang="scss" scoped>
.project{
    padding:10px 15px;
    h5{
        font-size: 13px;
        padding:10px 0;
    }
    .con{
        border-bottom: 1px solid #999999;
        padding-bottom: 20px;
        margin-bottom: 10px;
    }
}
@import './info.scss'
</style>

