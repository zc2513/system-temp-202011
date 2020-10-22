<template>
  <!-- 第二个节点，项目及招标项目 -->
  <div class="bgcolor-w project_ele">
    <el-collapse v-model="activeNames">
      <el-collapse-item title="" name="1" class="collapseBG">
        <span slot="title" class="collapse-title"><svg-icon icon-class="arrow591" />一、项目基本信息</span>
        <div class="child">
          <el-collapse v-model="activeNames_item1">
            <el-collapse-item title="" name="a">
              <span slot="title" class="collapse-title"><span />1.基本信息</span>
              <el-row>
                <el-col :span="24"><span>项目编号：</span><em>{{ Project.ProjectCode }}</em></el-col>
              </el-row>
              <el-row>
                <el-col :span="24"><span>项目名称：</span><em>{{ Project.ProjectName }}</em></el-col>
              </el-row>
              <el-row>
                <el-col :span="12"><span>项目所在行政区域：</span><em>{{ Project.RegionName }}</em></el-col>
                <el-col :span="12"><span>投资项目统一代码：</span><em>{{ Project.InvestProjectCode }}</em></el-col>
              </el-row>
              <el-row>
                <el-col :span="12"><span>项目行业分类：</span><em>{{ Project.IndustriesType }}</em></el-col>
                <el-col :span="12"><span>资金来源：</span><em>{{ Project.FundSource }}</em></el-col>
              </el-row>
              <el-row>
                <el-col :span="12"><span>项目规模：</span><em>{{ Project.ProjectScale }}</em></el-col>
              </el-row>
            </el-collapse-item>
            <el-collapse-item title="" name="g">
              <span slot="title" class="collapse-title"><span />2.信息来源</span>
              <msgSource :data-list="Project.DataSource" />
            </el-collapse-item>
          </el-collapse>
        </div>
      </el-collapse-item>
      <el-collapse-item title="二、招标项目基本信息" name="2">
        <span slot="title" class="collapse-title"><svg-icon icon-class="arrow591" />二、招标项目基本信息</span>
        <div class="child">
          <el-collapse v-model="activeNames_item2">
            <el-collapse-item title="" name="a">
              <span slot="title" class="collapse-title"><span />1.基本信息</span>
              <el-row>
                <el-col :span="12"><span>项目编号：</span><em>{{ TenProject.ProjectCode }}</em></el-col>
                <el-col :span="12"><span>招标项目编号：</span><em>{{ TenProject.TenderProjectCode }}</em></el-col>
              </el-row>
              <el-row>
                <el-col :span="12"><span>招标项目名称：</span><em>{{ TenProject.TenderProjectName }}</em></el-col>
                <el-col :span="12"><span>招标项目行业分类：</span><em>{{ TenProject.TenderProjectIndustriesType }}</em></el-col>
              </el-row>
              <el-row>
                <el-col :span="12"><span>招标项目所在行政区域：</span><em>{{ TenProject.RegionName }}</em></el-col>
                <el-col :span="12"><span>招标方式：</span><em>{{ bidWayCodeType[TenProject.TenderMode] }}</em></el-col>
              </el-row>
              <el-row>
                <el-col :span="12"><span>资格审查方式：</span><em>{{ TenProject.QulificationCheckMode }}</em></el-col>
                <el-col :span="12"><span>招标组织形式：</span><em>{{ bidOrganType[TenProject.TenderOrganizeForm] }}</em></el-col>
              </el-row>
              <el-row>
                <el-col :span="12"><span>招标人代码类型：</span><em>{{ tenderCodeType[TenProject.TenderCodeType] }}</em></el-col>
                <el-col :span="12"><span>招标人代码：</span><em>{{ TenProject.TendererCode }}</em></el-col>
              </el-row>
              <el-row>
                <el-col :span="12"><span>招标人名称：</span><em>{{ TenProject.TendererName }}</em></el-col>
                <el-col :span="12"><span>招标代理机构代码类型：</span><em>{{ tenderCodeType[TenProject.TenderAgencyCodeType] }}</em></el-col>
              </el-row>
              <el-row>
                <el-col :span="12"><span>招标代理机构代码：</span><em>{{ TenProject.TenderAgencyCode }}</em></el-col>
                <el-col :span="12"><span>招标代理机构名称：</span><em>{{ TenProject.TenderAgencyName }}</em></el-col>
              </el-row>
              <el-row>
                <el-col :span="12"><span>招标代理机构确定方式：</span><em>{{ TenProject.DeterminationOfBiddingAgency }}</em></el-col>
                <el-col :span="12"><span>招标代理机构确定方式说明：</span><em>{{ TenProject.DescriptionOfDeterminationMethodOfBiddingAgency }}</em></el-col>
              </el-row>
              <el-row>
                <el-col :span="12"><span>招标项目建立时间：</span><em>{{ TenProject.STenderProjectCreateTime }}</em></el-col>
                <el-col :span="12"><span>监督部门代码：</span><em>{{ TenProject.SupervisePlatCode }}</em></el-col>
              </el-row>
              <el-row>
                <el-col :span="12"><span>监督部门名称：</span><em>{{ TenProject.SuperviseDeptName }}</em></el-col>
                <el-col :span="12"><span>审核部门代码：</span><em>{{ TenProject.ApproveDeptCode }}</em></el-col>
              </el-row>
              <el-row>
                <el-col :span="12"><span>审核部门名称：</span><em>{{ TenProject.ApproveDeptName }}</em></el-col>
                <el-col :span="12"><span>申报责任人：</span><em>{{ TenProject.ReportDuty }}</em></el-col>
              </el-row>
              <el-row>
                <el-col :span="24"><span>招标内容与范围及招标方案说明：</span><em>{{ TenProject.TenderContent }}</em></el-col>
              </el-row>
            </el-collapse-item>
            <el-collapse-item title="" name="b">
              <span slot="title" class="collapse-title"><span />2.附件</span>
              <table>
                <thead>
                  <tr>
                    <th>附件名称</th>
                    <th>提交时间</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  <template v-if="infoDatas&&infoDatas.Files&&infoDatas.Files.length">
                    <tr v-for="(item,key) in infoDatas.Files" :key="key">
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
            </el-collapse-item>
            <el-collapse-item title="" name="c">
              <span slot="title" class="collapse-title"><span />3.信息来源</span>
              <msgSource :data-list="TenProject.DataSource" />
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
            activeNames_item1: ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
            activeNames_item2: ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
            Project: null,
            TenProject: null,
            bidOrganType: { 1: '自行招标', 2: '委托招标', 9: '其他' }, // 招标组织形式代码
            bidWayCodeType: { 1: '公开招标', 2: '邀请招标', 9: '其他' }, // 招标方式代码
            tenderCodeType: { 98: '组织机构编码', 97: '统一社会信用代码', 96: '其他一证一照代码', 95: '无组织机构代码，平台自行赋予代码', 90: '' } // 招标人代码代码类型
        }
    },
    watch: {
        infoDatas(newValue, oldValue) {
            console.log(newValue, 123)
        }
    },
    created() {
        this.Project = this.infoDatas.Project
        this.Project.DataSource = JSON.parse(this.Project.DataSource)
        this.TenProject = this.infoDatas.TenProject
        this.TenProject.DataSource = JSON.parse(this.TenProject.DataSource)
    }
}
</script>

<style lang="scss" scoped>
@import './info.scss'
</style>
