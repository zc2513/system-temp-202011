<template>
  <div>
    <warning :lists-data="childrenData" class="infoBox" />
    <div class="infoBox mt2">
      <title-style text="监督预警详情" class="w90" :line="false" />
      <div class="pt20">
        <warningDetail v-if="pageName === '招标公告/投标邀请'" class="mt20" :lists-data="firstdata" />
        <warnBidAnoncement v-if="pageName === '资格预审公告'" class="mt20" :lists-data="firstdata" />
        <!-- 中标候选人预警 -->
        <warnBidPeople v-if="pageName === '中标候选人公示'" class="mt20" :lists-data="firstdata" />
        <!-- 中标结果预警 -->
        <warnResult v-if="pageName === '中标结果公示'" class="mt20" :lists-data="firstdata" />
      </div>
    </div>
  </div>
</template>

<script>
import { getWarnListForBidSection } from '@/api/supwarning'
import warning from './warning'
import warningDetail from './warningDetail'
import warnBidAnoncement from './warnBidAnoncement'
import warnBidPeople from './warnBidPeple'
import warnResult from './warnResult'
import titleStyle from '../components/titleStyle'
export default {
    components: {
        warning,
        warningDetail,
        warnBidAnoncement,
        warnBidPeople,
        warnResult,
        titleStyle
    },
    props: {
        nowNode: {
            type: Object,
            default: _ => {}
        }
    },
    data() {
        return {
            childrenData: null,
            pageName: '',
            firstdata: {}
        }
    },
    watch: {
        nowNode: {
            handler(v) {
                if (!v) return
                this.init(v)
            },
            immediate: true
        }
    },
    methods: {
        init({ NodeName, NodeCode }) { // 获取节点详情
            console.log(NodeName, NodeCode)
            this.childrenData = null
            this.bidSectionCode = this.$route.query.bidSectionCodes
            const data = {
                bidSectionCode: this.$route.query.bidSectionCodes,
                nodeCode: NodeCode
            }
            getWarnListForBidSection(data).then(res => {
                res.Data.Data.map(e => {
                    const warns = []
                    if (e.WarnLevel === 'Error') warns.push({ num: 0, type: 'c' })
                    if (e.WarnLevel === 'Warning') warns.push({ num: 0, type: 'd' })
                    if (e.WarnLevel === 'Normal') warns.push({ num: 0, type: 'b' })
                    if (e.DoneState === 'Finish') { e.DoneState = '标记完成' } else if (e.DoneState === 'None') { e.DoneState = '已忽略' } else { e.DoneState = '' }
                    e.warns = warns
                    return e
                })
                this.childrenData = res.Data
                this.firstdata = {
                    code: this.childrenData.Data[0].CheckContentCode || '',
                    warningIds: [this.childrenData.Data[0].SId] || ''
                }
                this.pageName = NodeName
                console.log(this.childrenData.Data[0].SId)
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.infoBox{
    background-color: #fff;
    padding: 10px 15px 10px;
    font-size: 12px;
}
.w90 {
        width: 98%;
        margin: 0 auto;
    }
</style>
