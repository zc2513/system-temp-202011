<template>
  <!-- 项目执行情况 -->
  <div class="wfull hfull flc-y">
    <table class="wfull t-c" style="height:80%;">
      <tr class="is-active">
        <td />
        <td>未开始</td>
        <td>进行中</td>
        <td>已完成</td>
      </tr>
      <tr>
        <td>总 数 量</td>
        <td>
          <countTo
            class="f20 font-color"
            :start-val="0"
            :end-val="executeData.NoStartCount || 0"
            :duration="4000"
          />
        </td>
        <td>
          <countTo
            class="f20 font-color"
            :start-val="0"
            :end-val="executeData.GoingCount || 0"
            :duration="4000"
          />
        </td>
        <td>
          <countTo
            class="f20 font-color"
            :start-val="0"
            :end-val="executeData.FinishCount || 0"
            :duration="4000"
          />
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { getSectionProgress } from '@/api/monitoring'
import countTo from 'vue-count-to'
export default {
    components: { countTo },
    data() {
        return {
            executeData: {}
        }
    },
    created() {
        this.init()
    },
    methods: {
        init() {
            getSectionProgress({ type: 0 }).then((res) => {
                this.executeData = res.Data
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.is-active {
    border-bottom: 1px solid #093c6c;
}
.font-color {
    color: #00fff0;
}
</style>
