<!-- 组件说明 -->
<template>
  <div class="hfull fl-y-sb">
    <header class="header-BT flsb mt10">
      <div class="fl1 flcc">
        对接平台：
        <span class="font-color">{{ ScreenSupervNet.EnabledDockPlatCount }}</span>
      </div>
      <div class="fl1 flcc">
        交易平台：
        <span class="font-color">{{ ScreenSupervNet.EnableTradePlatCount }}</span>
      </div>
    </header>
    <div class="hfull">
      <table class="wfull t-c hfull mt10">
        <tr>
          <td class="f14">交易平台名称</td>
          <td class="f14">累计已交互</td>
          <td class="f14">最新交互时间</td>
        </tr>
        <tr v-for="(item,index) in ScreenSupervNet.Top5Data" :key="index" class="f12">
          <td>{{ item.PlatName || '暂无数据暂无数据暂无暂无数据暂无数据暂无数据暂无数无数据暂无据暂无数据数据暂无数无数据暂无据暂无数据' }}</td>
          <td>
            <a style="color:#00ffff;" :href="item.src">{{ item.TotalEachCount || 0 }} 条</a>
          </td>
          <td>{{ item.LastEachTime || '无' }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import { getScreenSupervNet } from '@/api/monitoring'
export default {
    // 组件
    components: {},
    props: {
        top5data: { type: Array, default: (_) => [] } // Top5
    },
    data() {
        return {
            // 项目监督网络数据
            ScreenSupervNet: {
                EnabledDockPlatCount: '', // 对接平台
                EnableTradePlatCount: '', // 交易平台
                Top5Data: [] // /Top5数据
            }
        }
    },
    computed: {},
    watch: {},
    // 创建完成
    created() {},
    // 挂载完成
    mounted() {
        this.GetScreenSupervNet()
    },
    methods: {
        // 获取项目监督网络数据
        GetScreenSupervNet() {
            getScreenSupervNet({
                type: 0
            }).then((res) => {
                this.ScreenSupervNet.EnabledDockPlatCount =
                    res.Data.EnabledDockPlatCount
                this.ScreenSupervNet.EnableTradePlatCount =
                    res.Data.EnableTradePlatCount
                this.ScreenSupervNet.Top5Data = res.Data.Top5Data
            })
        }
    }
}
</script>
<style lang='scss' scoped>
.header-BT {
    background: url(../../../assets/imgs/monitoring/network-bg.png) no-repeat
        center;
    background-size: 100% 100%;
    height: 40px;
}
.font-color {
    color: #ff3300;
}
</style>
