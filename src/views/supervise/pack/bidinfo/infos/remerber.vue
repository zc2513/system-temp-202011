<template>
  <!-- 原本属于第四个节点，招标预审公告的表格样式 -->
  <div class="bgcolor-w annoncement">
    <el-collapse v-model="activeNames">
      <el-collapse-item title="一.xxx工程一标段预审资格公告" name="1" class="collapseBG">
        <table>
          <thead>
            <tr>
              <th colspan="4" class="tab-l tit-bg-puer">1.资格预审的基本信息</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="tit-bg">相关标段（包）编号</td>
              <td colspan="3"> {{ data.BidSectionCodes }}</td>
            </tr>
            <tr>
              <td class="tit-bg">相关标段（包）名称</td>
              <td colspan="3">{{ data.BidSectionNames }}</td>
            </tr>
            <tr>
              <td class="tit-bg">招标编号</td>
              <td>{{ data.TenderProjectCode }}</td>
              <td class="tit-bg">公告性质</td>
              <td>{{ data.TenderCodeType }}</td>
            </tr>
            <tr>
              <td class="tit-bg">公告类型</td>
              <td>{{ data.TenderCodeType }}</td>
              <td class="tit-bg">发布媒介</td>
              <td />
            </tr>
            <tr>
              <td class="tab-td-w tit-bg">源URL</td>
              <td class="tab-td-w" />
              <td class="tab-td-w tit-bg" />
              <td class="tab-td-w" />
            </tr>
            <tr>
              <td class="tit-bg">公告内容</td>
              <td colspan="3" />
            </tr>
            <tr>
              <td class="tit-bg">其他内容</td>
              <td colspan="3" />
            </tr>
            <tr>
              <td class="tit-bg">公告发布时间</td>
              <td />
              <td class="tit-bg">公告发布责任人</td>
              <td />
            </tr>
          </tbody>
        </table>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
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
            Project: null,
            TenProject: null
        }
    },
    created() {
        this.data = this.infoDatas
    }
}
</script>

<style lang="scss" scoped>
.annoncement {
  padding: 10px 15px;
}
table tr td{
    text-align: left;
}
@import './info.scss'
</style>
