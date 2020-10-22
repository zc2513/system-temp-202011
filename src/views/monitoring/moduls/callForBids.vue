<template>
  <!-- 项目招标情况 -->
  <div class="callForBids-box  hfull fl-y-sb">
    <div class="fl1">
      <pieBox :pie-data="CakeDatas" @sendPie="getPie" />
    </div>
    <div class="bottom fl-y-sa">
      <template v-for="item in ColumnDatas">
        <div :key="item.TermId" class="flsb">
          <div class="leftWith">{{ item.Name }}</div>
          <el-tooltip class="item" effect="light" :content="item.SectionCount+'个'" placement="top-start">
            <el-progress class="fl1 cursor" :show-text="false" :text-inside="true" :stroke-width="14" :percentage="item.Scale" @click.native="setPie(item)" />
          </el-tooltip>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { getClassifyReport } from '@/api/monitoring'
import pieBox from '@/components/echarts/pie'
export default {
    components: { pieBox },
    data() {
        return {
            CakeDatas: [], // 饼状图数据
            ColumnDatas: []// 进度条数据
        }
    },
    created() {
        this.init()
    },
    methods: {
        init(term = 0, type = 0) {
            const data = { type, term }
            getClassifyReport(data).then(res => {
                const { CakeDatas, ColumnDatas } = res.Data
                this.CakeDatas = CakeDatas.map(e => {
                    e.name = e.Name
                    e.value = e.SectionCount
                    return e
                })
                this.ColumnDatas = ColumnDatas
            })
        },
        // 获取饼状图信息
        getPie({ TermId }) {
            this.init(TermId)
        },
        // 设置饼状图信息
        setPie({ TermId }) {
            this.init(TermId)
        }
    }
}
</script>

<style lang="scss" scoped>
.callForBids-box{
    $progress-height :80px;
    .bottom{
        min-height:  $progress-height;
        max-height: 200px;
        >div{
            width: 100%;
        }
        .leftWith{
            max-width: 200px;
            min-width: 80px;
            padding: 0 10px;
            text-align: right;
            color: #FFF;
            font-weight: 700;
            font-size: 14px;
        }
        ::v-deep{
            .el-progress-bar__outer{
                background-color: #083A6B;
            }
        }
    }

}
</style>
