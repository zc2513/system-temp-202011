<!-- flex布局大屏展示 -->
<template>
  <div class="monitorings pl10 pr10 pb10 fl-y-sb">
    <header class="flsb">
      <btnList />
    </header>
    <div class="fl1 flsb content">
      <div class="fl-y-sb hfull content-left">
        <div>
          <layBox title="项目执行情况" src="chart-TV">
            <execute />
          </layBox>
        </div>
        <div class="mt10 mb10 fl1">
          <layBox title="项目招标情况" src="chart-Tb">
            <callForBids />
          </layBox>
        </div>
        <div>
          <layBox title="项目监督网路" src="chart-Jk">
            <network />
          </layBox>
        </div>
      </div>
      <div class="ml10 mr10 fl1 fl-y-sb content-center">
        <div class="top fl1">
          <layBox :is-true="false" style="background:transparent">
            <mapBox />
          </layBox>
        </div>
        <div class="botton mt10">
          <layBox title="地区水利工程招标" src="chart-Wz">
            <!-- 地区水利工程招标项目 -->
            <callForBidsBar />
          </layBox>
        </div>
      </div>
      <div class="fl fl-y-sb content-right">
        <div class="top">
          <layBox title="项目交易主体" src="chart-Person">
            <deal />
          </layBox>
        </div>
        <div class="fl1">
          <layBox title="项目监督预警" src="chart-Dp">
            <earlyWarning />
          </layBox>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import btnList from './components/btnList' // 头部按钮
import layBox from './components/layBox'
import mapBox from './moduls/mapBox'
import deal from './moduls/deal'
import callForBids from './moduls/callForBids'
import execute from './moduls/execute'
import callForBidsBar from './moduls/callForBidsBar'
import earlyWarning from './moduls/earlyWarning'
import network from './moduls/network' // 项目监督网络
export default {
    components: {
        layBox,
        btnList,
        mapBox,
        deal,
        callForBids,
        network,
        callForBidsBar,
        execute,
        earlyWarning
    }
}
</script>
<style lang='scss' scoped>
.monitorings {
    box-sizing: border-box;
    background-color: #fff;
    height: 100%;
    width: 100%;
    overflow: hidden;
    color: #fff;
    background: url(../../assets/imgs/monitoring/bg.png) no-repeat;
    background-size: 100% calc(100vh + 30px); //背景图上移
    background-position: 0 -30px;
    header {
        height: 6.8%;
        background: url(../../assets/imgs/monitoring/header.png);
        background-size: 100% calc(100% + 12px);
        background-position: 0 -12px;
    }
    .content {
        //主体部分
        > div:nth-child(odd) {
            width: 26.06%;
        }

        &-left > div {
            //左侧盒子
            &:first-of-type {
                height: 21.75%;
            }
            &:last-of-type {
                height: 38.84%;
            }
        }
        &-center {
            width: 47.88%;
            .botton {
                height: 30%;
            }
        }
        &-right .top {
            height: 35%;
        }
    }
}
</style>
