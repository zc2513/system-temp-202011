<!-- 项目监督预警 -->
<template>
  <table class="wfull hfull earlyWarning">
    <thead>
      <tr class="first">
        <th class="jcx font-active" rowspan="2">检查项</th>
        <th class="font-active">监督预警标段数</th>
      </tr>
      <tr class="first">
        <th class="warns-box flsa">
          <span
            v-for="(item,index) in spanColor"
            :key="index"
            :style="{'background':item}"
          />
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(items,index) in earlyWarnings" :key="index">
        <td style="text-align:left" class="jcx">{{ items.CheckItemName }}</td>
        <td class="warns-box flsa flc-y hfull">
          <div>{{ items.RedCount }}</div>
          <div>{{ items.YellowCount }}</div>
          <div>{{ items.GreenCount }}</div>
        </td>
      </tr>
      <div v-if="!earlyWarnings.length" class="emty flcc">
        暂无数据
      </div>
    </tbody>

  </table>
</template>

<script>
import { getScreenWarn } from '@/api/monitoring'
export default {
    data() {
        return {
            earlyWarnings: [],
            spanColor: ['#FF3400', '#FF9A34', '#009A66']
        }
    },
    created() {
        this.init()
    },
    methods: {
        init() {
            getScreenWarn({ type: 0 }).then((res) => {
                this.earlyWarnings = res.Data
            })
        }
    }
}
</script>
<style lang='scss' scoped>
.earlyWarning {
    position: relative;
    font-size: 12px;
    .first {
        height: 25px;
    }
    thead {
        border-bottom: 1px solid #164d82;
    }
    .jcx {
        border-right: 1px solid #164d82;
    }
    .warns-box {
        span {
            width: 20px;
            height: 20px;
            border-radius: 50%;
        }
        min-width: 112px;
    }
    .emty{
        position: absolute;
        width: 100%;
        height: 100%;
    }
}
.font-active {
    color: #00fff0;
    font-weight: 100;
    font-size: 14px;
}
</style>
