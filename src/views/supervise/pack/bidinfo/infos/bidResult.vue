<template>
  <div class="bgcolor-w project project_ele">
    <!-- 监督节点详情节点12，中标结果 -->
    <el-collapse v-model="activeNames">
      <el-collapse-item title="" name="1">
        <span slot="title" class="collapse-title"><svg-icon icon-class="arrow591" />一、中标结果公示</span>
        <div class="child">
          <el-collapse v-model="activeNames_item">
            <el-collapse-item title="" name="a">
              <span slot="title" class="collapse-title"><span />1.中标结果公示基本信息</span>
              <el-row>
                <el-col :span="24"><span>招标项目编号：</span><em>{{ data.TenderProjectCode }}</em></el-col>
              </el-row>
              <el-row>
                <el-col :span="24"><span>招标项目名称：</span><em>{{ data.TenderProjectName }}</em></el-col>
              </el-row>
              <el-row>
                <el-col :span="24"><span>相关标段（包）编号：</span><em>{{ data.BidSectionCode }}</em></el-col>
              </el-row>
              <el-row>
                <el-col :span="24"><span>相关标段（包）名称：</span><em>{{ data.BidSectionNames }}</em></el-col>
              </el-row>
              <el-row>
                <el-col :span="24"><span>源URL：</span><em>{{ data.Url }}</em></el-col>
              </el-row>
              <el-row>
                <el-col :span="12"><span>招标编号：</span><em>{{ data.TenderProjectCode }}</em></el-col>
                <el-col :span="12"><span>公示类型：</span><em>{{ anoncementShiType[data.NoticeNature] }}</em></el-col>
              </el-row>
              <el-row>
                <el-col :span="12"><span>公示发布时间：</span><em>{{ data.SNoticeSendTime }}</em></el-col>
                <el-col :span="12"><span>公示发布媒介：</span><em>{{ data.NoticeMedia }}</em></el-col>
              </el-row>
              <el-row>
                <el-col :span="12"><span>公示内容：</span><em /></el-col>
              </el-row>
              <p class="NoticeContent" v-html="data.NoticeContent" />
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
                  <template v-if="file.length">
                    <tr v-for="(item, index) in file" :key="index">
                      <td> {{ item.FileName }} </td>
                      <td> {{ item.TimeStr }} </td>
                      <td><a :href="item.Url" :download="item.FileName">下载</a></td>
                      <!-- <td><a :href="item.Url.replace('/file/', '/api/file/')" :download="item.FileName">下载</a></td> -->
                    </tr>
                  </template>
                  <tr v-else>
                    暂无数据
                  </tr>
                </tbody>
              </table>
            </el-collapse-item>
            <el-collapse-item title="" name="e">
              <span slot="title" class="collapse-title"><span />3.信息来源</span>
              <msgSource :data-list="data.DataSource" />
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
            data: {},
            DataSource: [],
            anoncementShiType: { 1: '正常', 2: '更正', 9: '其他' } // 公告类型
        }
    },
    created() {
        this.data = this.infoDatas.Data
        this.file = this.infoDatas.Files
        this.data.DataSource = JSON.parse(this.data.DataSource)
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

