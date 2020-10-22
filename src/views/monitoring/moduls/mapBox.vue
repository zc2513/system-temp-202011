<template>
  <!-- 地图模块 -->
  <div class="hfull mapmodules">

    <addUp class="mapmodules-top wfull" :screen-statis-report="ScreenStatisReport" />

    <mapBox ref="map" v-model="isChian" :pieces="pieces" :map-datas="mapDatas" />

    <div v-if="isChian" class="goBackMap" title="返回" @click="goBackMap">
      <svg-icon icon-class="mapBack" class="cursor" />
    </div>

    <mapRoll :bid-dynamic-list="BidDynamicList" />

  </div>
</template>

<script>
import mapRoll from './../components/mapRoll' // 地图字幕
import addUp from './../components/addUp' // 数据统计

// 地图
import mapBox from '@/components/echarts/map'

import { getDataLevelList, getScreenProvinceSectionReport, getScreenStatisReport, getBidDynamicList } from '@/api/monitoring'

export default {
    components: {
        mapBox,
        mapRoll,
        addUp
    },
    data() {
        return {
            BidDynamicList: [],
            ScreenStatisReport: {}, // 各省份今年/累计的标段数量
            pieces: [], // 刻度
            mapDatas: [], // 地图相关数据 （热力值，气泡）
            isChian: false
        }
    },
    created() {
        this.init()
    },
    methods: {
        init() {
            getDataLevelList({ type: 0 }).then(res => { // 刻度
                this.pieces = res.Data.map(element => {
                    return { min: element.BeginNum, max: element.EndNum }
                })
            })

            getScreenProvinceSectionReport({ type: 0 }).then(res => { // 要显示的气泡数据及热力区域
                this.mapDatas = res.Data
            })

            getBidDynamicList({ pageIndex: 1, pageSize: 10 }).then(res => { // 获取招标动态
                this.BidDynamicList = res.Data.Data
            })

            getScreenStatisReport({ type: 1 }).then(res => { // 获取各省份今年/累计的标段数量
                this.ScreenStatisReport = res.Data
            })
        },
        goBackMap() {
            console.log(this.$refs.map)
        }
    }
}
</script>
<style lang="scss"  scoped>
.mapmodules {
    position: relative;
    &-top {
        height: 50px;
        position: absolute;
        z-index: 10;
    }
    .goBackMap{
        position: absolute;
        top: 70px;
        color: #ccc;
        :hover{
            font-size: 20px;
        }
    }
}
</style>
