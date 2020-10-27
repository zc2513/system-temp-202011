<template>
  <div>
    <el-row>
      <el-col v-for="(item, index) in months" :key="index" :span="8">
        <!-- <svg-icon icon-class="yewan" /> -->
        <div @click="open(item)" @mouseover="mouseover(item)">
          <el-row style="margin: 15px">
            <span style="color: red; font-size: 24px">{{ item.month }}月</span>
          </el-row>
          <slot name="content" :month="{ 'month':item}" />
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
        months: {
            type: Array,
            required: true,
            default: () => [
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
                { month: 12, hasPlan: 0 }
            ]
        },
        currentYear: {
            type: Object,
            required: true,
            default: () => {
                return {
                    year: 2020,
                    desc: '2020年'
                }
            }
        },
        currentMonth: {
            type: Number,
            required: true,
            default: 10
        }
    },
    data() {
        return {}
    },
    methods: {
        open(e) {
            console.log('年历-----鼠标点击========----------------------------------------')

            this.$emit('open', e)
        },
        mouseover(e) {
            console.log('年历-----鼠标移动过==============----------------------------------------')
            this.$emit('mouseover', e)
            // TODO
            // 换CSS
        }
    }
}
</script>
