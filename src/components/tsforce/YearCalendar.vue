<template>
  <div>
    <el-row>
      <el-col :span="8" v-for="(item, index) in monthPlan" :key="index">
        <!-- <svg-icon icon-class="yewan" /> -->
        <div @click="open(item)" @mouseover="showPlan(item)">
          <el-row style="margin: 15px">
            <span style="color: red; font-size: 24px">{{ item.month }}月</span>
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
  props: {
    monthPlan: {
      type: Array,
      required: true,
      default: [
        { month: 1, hasPlan: 2 },
        { month: 2, hasPlan: 0 },
        { month: 3, hasPlan: 2 },
        { month: 4, hasPlan: 2 },
        { month: 5, hasPlan: 1 },
        { month: 6, hasPlan: 2 },
        { month: 7, hasPlan: 3 },
        { month: 8, hasPlan: 0 },
        { month: 9, hasPlan: 3 },
        { month: 10, hasPlan: 1 },
        { month: 11, hasPlan: 1 },
        { month: 12, hasPlan: 0 },
      ],
    },
    currentYear: {
      type: Object,
      required: true,
      default: {
        year: 2020,
        desc: '2020年',
      },
    },
    currentMonth: {
      type: Number,
      required: true,
      default: 10,
    },
  },
  components: {},
  data() {
    return {}
  },
  methods: {
     open(e) {
      this.$emit('open', e)
    },
    showPlan(e) {
      //TODO
      //换CSS
    },
  },
}
</script>