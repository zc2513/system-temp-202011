<template>
  <div>
    <div ref="infoBox">
      <div class="infoBox">
        <div class="w90 lh30">
          <div class="Ttitle">{{ data.BidSectionName }}</div>
          <p class="subtitle">（标段（包）编号：{{ data.BidSectionCode }})</p>
        </div>
      </div>
      <div class="infoBox mt5">
        <div class="w90 lh30 f14">
          <titleStyle :line="false" text="概要信息" />
          <el-row>
            <el-col
              :offset="2"
              :span="11"
            ><span>项目名称:</span>{{ data.ProjectName }}</el-col>
            <el-col :span="11"><span>投资项目统一代码:</span>{{ data.InvestProjectCode || '无' }}</el-col>
          </el-row>
          <el-row>
            <el-col
              :offset="2"
              :span="11"
            ><span>招标项目名称:</span>{{ data.TenderProjectName }}</el-col>
            <el-col :span="11"><span>招标项目编号:</span>{{ data.TenderProjectCode }}</el-col>
          </el-row>
          <el-row>
            <el-col
              :offset="2"
              :span="11"
            ><span>招标人:</span>{{ data.TendererName }}</el-col>
            <el-col :span="11"><span>所在地区:</span>{{ data.RegionName }}</el-col>
          </el-row>
          <el-row>
            <el-col
              :offset="2"
              :span="11"
            ><span>直接监督单位:</span>{{ data.SuperviseDeptName }}</el-col>
            <el-col :span="11"><span>标段建立时间:</span>{{ data.SSegCreateTime }}</el-col>
          </el-row>
        </div>
      </div>
      <div class="infoBox mt2">
        <div class="w90 roundBox lh30">
          <title-style
            :line="false"
            text="监督节点"
          />
          <div class="wireframe">
            <ul class="flsb">
              <!-- 新增 - 图例标识说明 -->
              <div class="legend flcc">
                <span><i style="background:#42b983" />节点已完成</span>
                <span><i />节点无数据</span>
              </div>
              <!-- -------------------------- -->
              <li
                v-for="(item,index) in nodes"
                v-if="index<10"
                :key="index"
                class="fl-y-sb flc-y"
              >
                <div
                  :class="{'cursor':item.IsData}"
                  @click="getNode(item)"
                >
                  <z-circle
                    :warns="[{type:(item.IsData)?'b':'a'}]"
                    :size="15"
                  />
                </div>
                <span>{{ item.NodeName }}</span>
              </li>
            </ul>
            <ul class="flsb fl-x-rvs">
              <li
                v-for="(item,index) in nodes"
                v-if="index>9"
                :key="index"
                class="fl-y-sb flc-y"
              >
                <div
                  :class="{'cursor':item.IsData}"
                  @click="getNode(item)"
                >
                  <z-circle
                    :warns="[{type:(item.IsData)?'b':'a'}]"
                    :size="15"
                  />
                </div>
                <span>{{ item.NodeName }}</span>
              </li>
            </ul>
          </div>
          <!-- 老代码下线 -->
          <!-- <div class="fl ml20">
          <div class="flc-y mr20">
            <i class="mr10 green" /><span class="nodetype">节点有数据</span>
          </div>
          <div class="flc-y">
            <i class="mr10" /><span class="nodetype">节点无数据</span>
          </div>
        </div> -->
        </div>
      </div>
    </div>

    <div v-if="nowNode" class="infoBox mt2">
      <title-style :line="false" text="监督详情" />
      <node-infos id="info" :now-node="nowNode" />
    </div>
  </div>
</template>

<script>
import titleStyle from './components/titleStyle'
import nodeInfos from './infos'
import { getNodeForBidSectionList, getBidSectionDetail } from '@/api/supervise'
export default {
    components: { nodeInfos, titleStyle },
    data() {
        return {
            data: {}, // 概述信息
            nodes: [], // 节点信息
            nowNode: null
        }
    },
    created() {
        this.init()
    },
    methods: {
        init() {
            // 获取页面详情
            getBidSectionDetail({ id: this.$route.query.SId }).then(res => {
                this.data = res.Data
            })
            // 获取节点信息
            getNodeForBidSectionList({ bidSectionCode: this.$route.query.bidSectionCodes }).then(res => {
                this.nodes = res.Data
                const nowNode = res.Data.filter(e => e.IsData)
                if (nowNode.length) this.nowNode = nowNode.pop()
            })
        },
        // 获取节点
        getNode(item) {
            if (!item.IsData) return
            item.clientHeight = this.$refs.infoBox.clientHeight
            this.nowNode = item
        }

    }
}
</script>
<style lang="scss" scoped>
.infoBox {
    background-color: #fff;
    padding: 10px 15px 10px;
    font-size: 12px;
    .el-row {
        color: #666666;
        line-height: 26px;
        span {
            text-align-last: justify;
            display: inline-block;
            width: 140px;
            padding-right: 12px;
            color: #000000;
            font-size: 14px;
        }
    }
    .Ttitle {
        text-align: center;
        font-size: 26px;
        line-height: 40px;
        margin: 10px 0 0;
    }
    .subtitle {
        font-size: 16px;
        text-align: center;
        color: #999999;
        line-height: 1.2;
    }
    .allTable {
        margin-right: 300px;
        margin-bottom: 50px;
    }
    .w90 {
        width: 98%;
        margin: 0 auto;
    }
    .wireframe {
        border: solid 2px #dddddd;
        border-left: none;
        border-top-right-radius: 50px;
        border-bottom-right-radius: 50px;
        position: relative;
        height: 100px;
        margin: 72px 30px 70px 100px;
        font-size: 14px;
        .legend {
            width: 206px;
            height: 30px;
            border: 1px solid #42b983;
            position: absolute;
            right: 0;
            top: -70px;
            border-radius: 50px;
            overflow: hidden;
            color: #666666;
            span {
                display: inline-block;
                width: 48%;
                height: 100%;
                text-align: center;
                i {
                    display: inline-block;
                    width: 10px;
                    height: 10px;
                    margin-right: 5px;
                    border-radius: 50%;
                    background: #cccccc;
                }
            }
        }
        &::before {
            content: "开始";
            color: #999999;
            position: absolute;
            left: -34px;
            top: -17px;
        }
        &::after {
            content: "结束";
            color: #999999;
            position: absolute;
            left: -34px;
            bottom: -15px;
        }
        ul:nth-child(1) {
            position: relative;
            height: 50px;
            top: -9px;
            padding: 0 25px;
        }
        ul:nth-child(2) {
            position: relative;
            height: 50px;
            bottom: -39px;
            padding: 0 25px;
        }
        li {
            em {
                width: 15px;
                height: 15px;
            }
        }
    }
}
</style>
