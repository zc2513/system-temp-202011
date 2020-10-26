<template>
  <div class="hfull fl-y-sb">
    <div>
      数字动态:
      <countTo class="act" :start-val="startVal" :end-val="endVal" :duration="2000" />
    </div>

    <div>
      警告样式：(可点击)
      <z-circle attr-data="2331" :warns="warns" @getVal="getV($event)" />
    </div>

    <div>
      省市级联： <el-cascader v-model="code" :options="citys" />
    </div>

    <div class="flsb flc-y">
      <div> 本地icon下拉框：</div>
      <selectIcon v-model="iconText" class="fl1" />
    </div>

    <div class="pan-btn blue-btn">发多少</div>

    <div>
      <p class="date">当前时间：{{ date|parseTime('{y}年{m}月{d} 星期{a} {h}:{i}:{s}') }}</p>
    </div>
  </div>
</template>

<script>
import countTo from 'vue-count-to'
import selectIcon from '@/components/selectIcon'
export default {
    components: { countTo, selectIcon },
    data() {
        return {
            code: '',
            citys: require('@/assets/json/citys.json'),
            startVal: 0,
            endVal: 3000,
            warns: [{ num: 0, type: 'a' },
                { num: 1, type: 'b' },
                { num: 8, type: 'd' }],
            date: new Date(),
            iconText: ''
        }
    },
    watch: {
        iconText(v) {
            this.$message.info(this.iconText || '取消选中')
        }
    },
    created() {
        setInterval(() => { // 实时日期
            this.date = new Date()
        }, 1000)
    },
    methods: {
        getV(e) {
            for (const item of this.warns) {
                if (e === item) {
                    console.log(e)
                    e.type = 'd'
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.act{
    color: #F00;
    font-size: 40px;
}
</style>
