<template>
  <div>
    <el-row>
      <el-col v-for="(item, index) in weekPlan" :key="index" :span="6">
        <!-- <svg-icon icon-class="yewan" /> -->
        <div @click="open(item)" @mouseover="showPlan(item)">
          <el-row style="margin: 15px">
            <span style="color: red; font-size: 24px">第{{ item.week }}周</span>
            <span style="color: black"> {{ item.start }} ~ {{ item.end }} </span>
          </el-row>
          <el-row style="margin: 15px">
            <span>{{ item.count }}</span>
          </el-row>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
    name: 'WeekCalendar',
    components: {},
    props: {
        weekPlan: {
            type: Array,
            required: true,
            default: () => [
                { id: '1234', weekNo: 41, weekDateRange: '7月1日--7月7日', hasPlan: 0 },
                { id: '1234', weekNo: 41, weekDateRange: '7月1日--7月7日', hasPlan: 1 },
                { id: '1234', weekNo: 41, weekDateRange: '7月1日--7月7日', hasPlan: 1 },
                { id: '1234', weekNo: 41, weekDateRange: '7月1日--7月7日', hasPlan: 1 },
                { id: '1234', weekNo: 41, weekDateRange: '7月1日--7月7日', hasPlan: 0 },
                { id: '1234', weekNo: 41, weekDateRange: '7月1日--7月7日', hasPlan: 1 },
                { id: '1234', weekNo: 41, weekDateRange: '7月1日--7月7日', hasPlan: 1 },
                { id: '1234', weekNo: 41, weekDateRange: '7月1日--7月7日', hasPlan: 1 },
                { id: '1234', weekNo: 41, weekDateRange: '7月1日--7月7日', hasPlan: 1 },
                { id: '1234', weekNo: 41, weekDateRange: '7月1日--7月7日', hasPlan: 1 },
                { id: '1234', weekNo: 41, weekDateRange: '7月1日--7月7日', hasPlan: 1 },
                { id: '1234', weekNo: 41, weekDateRange: '7月1日--7月7日', hasPlan: 1 }
            ]
        },
        season: {
            type: Object,
            required: true,
            default: () => {
                return {
                    seasonNo: 3,
                    seasonString: '2020年10月-12月'
                }
            }
        },
        currentWeek: {
            type: String,
            required: true,
            default: '3'
        }
    },
    data() {
        return {}
    },
    methods: {
        open(e) {
            console.log('打开----------------------------------------')
            this.$emit('open', e)
        },
        showPlan(e) {
            // TODO
            // 换CSS
        }
    }
}
</script>
