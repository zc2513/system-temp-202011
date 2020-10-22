<!-- 地图统计数据&&时间 -->
<template>
  <div class="addup statistical wfull hfull">
    <div class="statistical-time wfull flcc">
      <div>
        <img width="90%" src="@/assets/imgs/monitoring/info-left.png" alt>
      </div>
      <div class="time-content">{{ date|parseTime('{y}年{m}月{d} 星期{a} {h}:{i}:{s}') }}</div>
      <div class="t-r">
        <img width="90%" src="@/assets/imgs/monitoring/info-right.png" alt>
      </div>
    </div>
    <div class="statistical-content pt20 hfull flsb f14">
      <div class="left fl1 flcc">
        <div class="fl-y-sa hfull bdr">
          <div>
            <countTo :start-val="0" :end-val="screenStatisReport.ProvinceCount || 0" />
          </div>
          <div>地区</div>
        </div>
        <div class="fl-y-sa hfull bdr">
          <div>
            <countTo :start-val="0" :end-val="screenStatisReport.PlatCount || 0" />
          </div>
          <div>平台</div>
        </div>
        <div class="fl-y-sa hfull bdr">
          <div>
            <countTo :start-val="0" :end-val="screenStatisReport.ProjectCount || 0" />
          </div>
          <div>建设项目</div>
        </div>
        <div class="fl-y-sa hfull bdr">
          <div>
            <countTo :start-val="0" :end-val="screenStatisReport.TenProjectCount || 0" />
          </div>
          <div>招标项目</div>
        </div>
        <div class="fl-y-sa hfull bdr">
          <div>
            <countTo :start-val="0" :end-val="screenStatisReport.SectionCount || 0" />
          </div>
          <div>标段(包)</div>
        </div>
        <div class="fl-y-sa hfull">
          <div>
            <countTo
              :start-val="0"
              :end-val="Number(screenStatisReport.TotalAmount) || 0"
            />
            <!-- <span class="f12">万元</span> -->
          </div>
          <div>金额/万元</div>
        </div>
      </div>
      <div class="right fl">
        <div
          :class="{'active':active===1}"
          class="w-50 cursor hfull flcc"
          @click="Active(1)"
        >本年度</div>
        <div
          :class="{'active':active===2}"
          class="w-50 cursor hfull flcc"
          @click="Active(2)"
        >累计</div>
      </div>
    </div>
  </div>
</template>

<script>
import countTo from 'vue-count-to'
export default {
    components: { countTo },
    props: {
        screenStatisReport: { type: Object, default: () => {} } // 各省份今年/累计的标段数量
    },
    data() {
        return {
            active: 1,
            date: new Date() // 时间
        }
    },
    created() {
        setInterval(() => {
            // 实时日期
            this.date = new Date()
        }, 1000)
    },
    methods: {
        Active(n) {
            if (n === this.active) return
            this.active = n
            this.$emit('getAddup', n)
        }
    }
}
</script>
<style lang="scss" scoped>
.statistical {
    position: relative;
    &-time {
        position: absolute;
        transform: translate(0, -50%);
        .time-content {
            min-width: 230px;
        }
    }
    &-content {
        box-sizing: border-box;
        .left {
            > div {
                width: 15%;
                max-width: 90px;
                min-width: 66px;
                border-right: 2px solid #5cdcdf;
                &:last-of-type {
                    border: 0;
                }
            }
        }
        .right {
            width: 150px;
            min-width: 95px;
            height: 100%;
            overflow: hidden;
            border-radius: 25px;
            border: 2px solid #5cdcdf;
            background-color: #60656c;
            > div {
                &:first-of-type {
                    border-right: 2px solid #5cdcdf;
                }
                &:hover {
                    background-color: #1d67ff;
                }
            }
            .active {
                background: #1d67ff;
            }
        }
    }
}
</style>

