<template>
  <!-- 节点2，标段（包） -->
  <div class="bgcolor-w project_ele">
    <el-collapse v-model="activeNames">
      <el-collapse-item title="" name="1" class="collapseBG">
        <span slot="title" class="collapse-title"><svg-icon icon-class="arrow591" />标段（包）</span>
        <div class="child">
          <el-collapse v-model="activeNames_item">
            <el-collapse-item title="" name="a">
              <span slot="title" class="collapse-title"><span />一、标段（包）基本信息</span>
              <el-row>
                <el-col :span="24"><span>标段（包）编号：</span><em>{{ data.BidSectionCode }}</em></el-col>
              </el-row>
              <el-row>
                <el-col :span="24"><span>标段（包）名称：</span><em>{{ data.BidSectionName }}</em></el-col>
              </el-row>
              <el-row>
                <el-col :span="24"><span>标段（包）分类：</span><em>{{ data.BidSectionClassifyCode }}</em></el-col>
              </el-row>
              <el-row>
                <el-col :span="24"><span>标段（包）内容：</span><em>{{ data.BidSectionContent }}</em></el-col>
              </el-row>
              <el-row>
                <el-col :span="12"><span>标段合同估算价：</span><em>{{ data.ContractReckonPrice }}</em></el-col>
                <el-col :span="12"><span>标段合同估算价币种：</span><em>{{ data.CurrencyCode }}</em></el-col>
              </el-row>
              <el-row>
                <el-col :span="12"><span>投标人资格条件：</span><em>{{ data.BiddingEligibility }}</em></el-col>
              </el-row>
            </el-collapse-item>
            <el-collapse-item title="" name="b">
              <span slot="title" class="collapse-title"><span />二、信息来源</span>
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
            activeNames: ['1'],
            activeNames_item: ['a', 'b']
        }
    },
    created() {
        this.data = this.infoDatas
        this.data.DataSource = JSON.parse(this.data.DataSource)
    }
}
</script>

<style lang="scss" scoped>
@import './info.scss'
</style>
