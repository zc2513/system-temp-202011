<template>
  <div>
    <el-row>
      <el-col v-for="(item, index) in weeks" :key="index" :span="6">
        <!-- <svg-icon icon-class="yewan" /> -->
        <div @click="open(item)" @mouseover="mouseover(item)">
          <el-row style="margin: 15px">
            <span style="color: red; font-size: 24px">第{{ item.week }}周</span>
            <span style="color: black"> {{ item.start }} ~ {{ item.end }} </span>
          </el-row>
          <slot name="content" :week="{ 'week':item}" />
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
        weeks: {
            type: Array,
            required: true,
            default: () => [
                { id: '1234', week: 41, start: '7月1日', end: '10月1日', count: 0 },
                { id: '1234', week: 42, start: '7月1日', end: '10月1日', count: 1 },
                { id: '1234', week: 43, start: '7月1日', end: '10月1日', count: 0 },
                { id: '1234', week: 44, start: '7月1日', end: '10月1日', count: 1 },
                { id: '1234', week: 45, start: '7月1日', end: '10月1日', count: 1 },
                { id: '1234', week: 46, start: '7月1日', end: '10月1日', count: 1 },
                { id: '1234', week: 47, start: '7月1日', end: '10月1日', count: 1 },
                { id: '1234', week: 48, start: '7月1日', end: '10月1日', count: 1 },
                { id: '1234', week: 49, start: '7月1日', end: '10月1日', count: 1 },
                { id: '1234', week: 50, start: '7月1日', end: '10月1日', count: 1 },
                { id: '1234', week: 51, start: '7月1日', end: '10月1日', count: 1 },
                { id: '1234', week: 52, start: '7月1日', end: '10月1日', count: 1 }
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
            console.log('周历------鼠标点击---------------------------------------')
            this.$emit('open', e)
        },
        mouseover(e) {
            console.log('周历-----鼠标移动过----------------------------------------')
            this.$emit('mouseover', e)
            // TODO
            // 换CSS
        }
    }
}
</script>
