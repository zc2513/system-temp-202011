<template>
  <div class="OJT-cls">

    <div class="box header flsb">
      <div class="hfull flc-y left">
        <div class="tab-title hfull fl">
          <div class="hfull cursor flc-y" :class="{'active':isTabActive===1}" @click="isTabActive=1"> OJT区域计划 </div>
          <div class="hfull cursor flc-y" :class="{'active':isTabActive===2}" @click="isTabActive=2"> OJT部门计划 </div>
          <div class="hfull cursor flc-y" :class="{'active':isTabActive===3}" @click="isTabActive=3"> OJT团队计划 </div>
        </div>
      </div>
    </div>

    <div v-if="isTabActive" class="box mt15">
      <z-header>
        <div slot="title" class="f14" style="color:#5F6266;">
          OJT区域计划时间段：2020年1月-2020年6月
        </div>
        <div>
          <search :type="isTabActive" />
        </div>
      </z-header>
      <div class="plr24">
        <el-button size="mini" type="primary" @click="addPlan(isTabActive)">新建</el-button>
        <z-table :titles="titles" :btns="btn" align="left" class="mt15" @sendVal="getVal" />
      </div>
    </div>

    <!-- 未选择区域时的默认样式 -->
    <div v-if="isTabActive==='error'" class="mt15 box flcc" style="height:734px;color:#66f;">
      地区接口人还未制定OJT计划时间段，暂时无法制定计划！
    </div>
    <div v-if="isTabActive==='error'" class="mt15 box flcc" style="height:734px;color:#66f;">
      地区接口人还未制定OJT计划时间段，暂时无法制定计划！
    </div>

    <!-- 新增弹出层 -->
    <addOtjPlan ref="addOtjPlan" :type="isTabActive" />
    <!-- 详情弹出层 -->
    <lock ref="lock" :type="isTabActive" />
    <planDrawer ref="planDrawer" />
  </div>
</template>

<script>
import search from './search'
import addOtjPlan from './addOtjPlan'
import planDrawer from './planDrawer'
import lock from './lock'
export default {
    name: 'OJT',
    components: { search, addOtjPlan, planDrawer, lock },
    data() {
        return {
            isTabActive: 1,
            titles: [],
            btn: {
                title: '操作',
                btnlist: [
                    { con: '查看', type: 'text' }
                ]
            }
        }
    },
    watch: {
        isTabActive: {
            handler(val) {
                if (!val) return
                this.titles = this.tableTitle(val)
            },
            immediate: true
        }
    },
    methods: {
        tableTitle(type) { // 表格数据处理
            let titles = [
                { name: '计划标题', data: 'cName' },
                { name: '提交人职级', data: 'stateCode' },
                { name: '提交人', data: 'producer' },
                { name: '计划时间', data: 'lastUpdateTime', type: 'time', time: '{y}-{m}-{d} ~ {h}:{i}:{s}' }
            ]
            if (type === 1) {
                titles = [{ name: '区域', data: 'organizationName' }, ...titles]
            }
            if (type === 2) {
                titles = [{ name: '部门', data: 'organizationName' }, ...titles]
            }
            if (type === 3) {
                titles = [{ name: '团队', data: 'organizationName' }, ...titles]
            }
            return titles
        },
        addPlan() { // 新建计划
            this.$refs.addOtjPlan.show()
        },
        getVal(res) {
            const { type, data } = res
            if (type === '查看') {
                this.$refs.lock.show()
            }
            console.log(type)
            console.log(data)
        }

    }
}
</script>

<style lang="scss" scoped>
.OJT-cls{
    .header{ //顶部
        height: 70px;
        color: #5F6266;
        .left{ padding-left: 24px; }
        .right{ padding-right: 48px; }
        .tab-title{//顶部选中项
            >div{
                border-bottom: 3px solid transparent ;
                margin-right: 40px;
                &.active{
                    border-bottom-color: #6666FF;
                }
                &:nth-child(n+2){
                    position: relative;
                    &::after{
                        content: '>>';
                        position: absolute;
                        font-size: 12px;
                        left: -27px;
                        top: 27px;
                    }
                }
            }
        }
    }
}

</style>
