<template>
  <div class="OJT-cls">

    <div class="box header flsb">
      <div class="hfull flc-y left">
        <div class="tab-title hfull fl">
          <div class="hfull cursor flc-y" :class="{'active':isTabActive===1}" @click="isTabActive=1"> 集训计划 </div>
          <div class="hfull cursor flc-y" :class="{'active':isTabActive===2}" @click="isTabActive=2"> 实训计划 </div>
          <div class="hfull cursor flc-y" :class="{'active':isTabActive===3}" @click="isTabActive=3"> OJT计划 </div>
        </div>
      </div>
    </div>

    <div v-if="isTabActive===3" class="obj-tag flc-y plr24" style="height:70px;">
      <el-tag class="mr20 cursor" size="medium" :effect=" objTag === 'a' ? 'dark':'plain'" @click="objTag='a'">OJT区域计划</el-tag>
      <el-tag class="mr20 cursor" size="medium" :effect=" objTag === 'b' ? 'dark':'plain'" @click="objTag='b'">OJT部门计划</el-tag>
      <el-tag class="mr20 cursor" size="medium" :effect=" objTag === 'c' ? 'dark':'plain'" @click="objTag='c'">OJT团队计划</el-tag>
    </div>

    <div v-if="isTabActive && time" class="box mt15">
      <z-header>
        <div slot="title" class="f14" style="color:#5F6266;">
          OJT{{ typeName }}计划时间段：{{ time }}
        </div>
        <div v-if="tableData.length">
          <search :type="isTabActive" />
        </div>
      </z-header>
      <div v-if="tableData.length" class="plr24 mb30">
        <el-button size="mini" type="primary" @click="addPlan(isTabActive)">新建</el-button>
        <z-table :titles="titles" :btns="btn" :lists="tableData" align="left" class="mt15" @sendVal="getVal" />
      </div>
      <div v-else class="flcc" style="height:660px;color:#66f;">
        <div style="margin-bottom:60px;" class="cursor" @click="addPlan(isTabActive)">
          <z-circle size="120" color="#F4F7FA" class="mb20">
            <svg-icon icon-class="add" class="f30" style="color:#66f;" />
          </z-circle>
          <div class="wfull t-c">新建{{ typeName }}计划</div>
        </div>
      </div>
    </div>

    <div v-else class="mt15 box flcc" style="height:734px;color:#66f;">
      <div style="margin-bottom:60px;" @click="addTime">
        <z-circle size="120" color="#F4F7FA" class="mb20 cursor">
          <svg-icon icon-class="add" class="f30" style="color:#66f;" />
        </z-circle>
        <div class="wfull t-c">请先定制时间段</div>
      </div>
    </div>

    <!-- 新增弹出层 -->
    <addOtjPlan ref="addOtjPlan" :type="isTabActive" :obj-tag="objTag" />
    <!-- 详情弹出层 -->
    <lock ref="lock" :type="isTabActive" />
    <!-- 新增时间段 -->
    <addTime ref="addTime" />
    <planDrawer ref="planDrawer" />
  </div>
</template>

<script>
import search from './search'
import addOtjPlan from './addOtjPlan'
import planDrawer from './planDrawer'
import addTime from './addTime'
import lock from './lock'
// eslint-disable-next-line no-unused-vars
import datas from '@/assets/json/data'

export default {
    name: 'Area',
    components: { search, addOtjPlan, planDrawer, lock, addTime },
    data() {
        return {
            objTag: 'a',
            isTabActive: 1,
            time: '2020年1月-2020年6月', // 判断是否显示新增时间段的关键 2020年1月-2020年6月
            titles: [],
            tableData: datas,
            btn: {
                title: '操作',
                btnlist: [
                    { con: '查看', type: 'text' }
                ]
            }
        }
    },
    computed: {
        typeName() {
            let str = '集训'
            if (this.isTabActive === 2) {
                str = '实训'
            }
            if (this.isTabActive === 3) {
                if (this.objTag === 'a') str = '区域'
                if (this.objTag === 'b') str = '部门'
                if (this.objTag === 'c') str = '团队'
            }
            return str
        }
    },
    watch: {
        isTabActive: {
            handler(val) {
                if (!val) return
                if (val === 3) {
                    this.objTag = 'a'
                }
                this.titles = this.tableTitle(val)
            },
            immediate: true
        },
        objTag: {
            handler(val) {
                console.log(val)
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
        },
        addTime() { // 新增时间段
            this.$refs.addTime.show()
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
            }
        }
    }
    .obj-tag{//标签
        height: 80px;
        .el-tag{
            border: 1px solid #E0E4EB;
            border-radius: 4px;
            color: #5F6266;
        }
        .el-tag--dark{
            color: #FFF;
        }
        .disabled{
            background: #F4F7FA;
            color: #909398;
        }
    }
}

</style>
