<template>
  <!-- 项目交易主体 -->
  <div class="deal-box hfull flsb">
    <div class="fl1">
      <pieBox id="deal" :pie-data="CakeDatas" type="radius" />
    </div>
    <div class="right fl-y-sa">
      <div v-for="(item,index) in listdata" :key="index" class="flsb flc-y right-item">
        <div class="t-r f12">{{ item.name }}：</div>
        <div class="fl1">
          <countTo
            :style="{'color':!index ? '#00fff0' :'#f93f00'}"
            :start-val="0"
            :end-val="item.value || 0"
            :duration="4000"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getScreenTransSubject } from '@/api/monitoring'
import pieBox from '@/components/echarts/pie'
import countTo from 'vue-count-to'
export default {
    components: { pieBox, countTo },
    data() {
        return {
            CakeDatas: [],
            listdata: []
        }
    },
    created() {
        this.init()
    },
    methods: {
        init(type = 0) {
            const data = { type }
            getScreenTransSubject(data).then((res) => {
                for (const key in res.Data) {
                    if (key === 'TotalCount') {
                        res.Data['总数量'] = res.Data[key] // 在对象中添加了myId键名,并把当前key值赋值给了myId
                        delete res.Data[key] // 删除当前键名为id的属性
                    }
                    if (key === 'TodayCount') {
                        res.Data['今日新增'] = res.Data[key] // 在对象中添加了myId键名,并把当前key值赋值给了myId
                        delete res.Data[key] // 删除当前键名为id的属性
                    }
                    if (key === 'TenderCount') {
                        res.Data['招标人'] = res.Data[key] // 在对象中添加了myId键名,并把当前key值赋值给了myId
                        delete res.Data[key] // 删除当前键名为id的属性
                    }
                    if (key === 'AgentCount') {
                        res.Data['招标代理'] = res.Data[key] // 在对象中添加了myId键名,并把当前key值赋值给了myId
                        delete res.Data[key] // 删除当前键名为id的属性
                    }
                    if (key === 'BidderCount') {
                        res.Data['投标人'] = res.Data[key] // 在对象中添加了myId键名,并把当前key值赋值给了myId
                        delete res.Data[key] // 删除当前键名为id的属性
                    }
                }
                for (const key in res.Data) {
                    if (key === '总数量' || key === '今日新增') {
                        this.listdata.push({
                            name: key,
                            value: res.Data[key]
                        })
                    } else {
                        this.CakeDatas.push({
                            name: key,
                            value: res.Data[key]
                        })
                    }
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.deal-box {
    color: #fff;
    .right {
        width: 20%;
        min-width: 120px;
        .right-item {
            box-sizing: border-box;
            height: 40px;
            width: 100%;
            border-radius: 20px;
            background-image: url("../../../assets/imgs/monitoring/subtitle.png");
            > div:first-of-type {
                width: 80px;
            }
        }
    }
}
</style>
