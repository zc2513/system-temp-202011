<template>
  <div>
    <!-- 项目及招标项目 -->
    <project-box v-if="pageCode==='JD002'" :info-datas="childrenData" />

    <!-- 标段（包） -->
    <bidBag v-if="pageCode==='JD003'" :info-datas="childrenData" />

    <!-- 资格预审公告 -->
    <annoncement v-if="pageCode==='JD004'" :info-datas="childrenData" />

    <!-- 招标公告/投标邀请  -->
    <bidsection v-if="pageCode==='JD006'" :info-datas="childrenData" />

    <!-- 中标候选人公示 -->
    <candidata v-if="pageCode==='JD011'" :info-datas="childrenData" />

    <!-- 中标结果公示  -->
    <bidResult v-if="pageCode==='JD012'" :info-datas="childrenData" />
  </div>
</template>

<script>
import { getNodeDetailForSection } from '@/api/supervise'
import projectBox from './project'
import bidBag from './bidBag'
import annoncement from './annoncement'
import bidsection from './bidsection'
import candidata from './candidata'
import bidResult from './bidResult'
export default {
    components: {
        projectBox, annoncement, bidsection,
        bidBag,
        candidata,
        bidResult
    },
    props: {
        nowNode: {
            type: Object,
            default: _ => {}
        }
    },
    data() {
        return {
            pageCode: '',
            childrenData: null
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
        init({ NodeCode, clientHeight }) { // 获取节点详情
            this.pageCode = false
            this.childrenData = null
            const data = {
                bidSectionCode: this.$route.query.bidSectionCodes,
                nodeCode: NodeCode
            }
            getNodeDetailForSection(data).then(res => {
                this.childrenData = res.Data
                this.pageCode = NodeCode
                console.log(this.pageCode)
                this.$nextTick(() => {
                    if (!clientHeight) return
                    document.getElementsByClassName('app-main')[0].scrollTop = clientHeight
                })
            })
        }
    }
}
</script>

<style lang="sass" scoped>

</style>
