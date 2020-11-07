<template>
  <div class="area-cls">

    <el-tabs v-model="activeName" class="el-tabs-cls  mb15">
      <el-tab-pane
        v-for="item in iStepTimes"
        :key="item.id"
        :label="item.stageName"
        :name="item.stageName"
      >

        <div v-if="item.isArea || item.isDept || item.isGroup" class="obj-tag flc-y" style="height:70px;">
          <el-tag v-if="item.isArea" class="mr20 cursor" size="medium" :effect=" objTag === '1' ? 'dark':'plain'" @click="objTag='1'">区域计划</el-tag>
          <el-tag v-if="item.isDept" class="mr20 cursor" size="medium" :effect=" objTag === '2' ? 'dark':'plain'" @click="objTag='2'">部门计划</el-tag>
          <el-tag v-if="item.isGroup" class="mr20 cursor" size="medium" :effect=" objTag === '3' ? 'dark':'plain'" @click="objTag='3'">团队计划</el-tag>
        </div>

        <div class="main" :class="{'mt25':!(item.isArea || item.isDept || item.isGroup)}">
          <z-header is-line>
            <div slot="title" class="f14" style="color:#5F6266;">
              {{ item.stageName }}时间：{{ item.startTime | parseTime('{y}-{m}-{d}') }} ~ {{ item.endTime | parseTime('{y}-{m}-{d}') }}
            </div>
            <div v-if="tableData.length">
              <search
                :verify="{
                  isArea:item.isArea ,
                  isDept:item.isDept ,
                  isGroup:item.isGroup
                }"
                :type="activeName"
              />
            </div>
          </z-header>

          <div v-if="tableData.length" class="plr24 mb30">
            <el-button
              size="mini"
              type="primary"
              @click="addPlan(item)"
            >新建</el-button>
            <z-table :titles="titles" :btns="btn" :lists="tableData" align="left" class="mt15" @sendVal="getVal" />
          </div>
          <div v-else class="flcc c-66f" style="margin-top:200px;">
            <div style="margin-bottom:60px;" class="cursor" @click="addPlan(item)">
              <z-circle size="120" color="#F4F7FA" class="mb20">
                <svg-icon icon-class="add" class="f30" style="color:#66f;" />
              </z-circle>
              <div class="wfull t-c">新建{{ typeName }}</div>
            </div>
          </div>
        </div>
      </el-tab-pane></el-tabs>

    <div v-if="activeName==='OJT计划'" class="obj-tag flc-y" style="height:70px;">
      <el-tag class="mr20 cursor" size="medium" :effect=" objTag === '1' ? 'dark':'plain'" @click="objTag='1'">OJT区域计划</el-tag>
      <el-tag class="mr20 cursor" size="medium" :effect=" objTag === '2' ? 'dark':'plain'" @click="objTag='2'">OJT部门计划</el-tag>
      <el-tag class="mr20 cursor" size="medium" :effect=" objTag === '3' ? 'dark':'plain'" @click="objTag='3'">OJT团队计划</el-tag>
    </div>

    <!-- <div class="main" :class="{'isobj':activeName==='OJT计划'}">
      <z-header is-line>
        <div slot="title" class="f14" style="color:#5F6266;">
          {{ typeName }}时间：
        </div>
        <div v-if="tableData.length">
          <search :type="activeName" />
        </div>
      </z-header>

      <div v-if="tableData.length" class="plr24 mb30">
        <el-button size="mini" type="primary" @click="addPlan(activeName)">新建</el-button>
        <z-table :titles="titles" :btns="btn" :lists="tableData" align="left" class="mt15" @sendVal="getVal" />
      </div>
      <div v-else class="flcc c-66f" style="margin-top:200px;">
        <div style="margin-bottom:60px;" class="cursor" @click="addPlan(activeName)">
          <z-circle size="120" color="#F4F7FA" class="mb20">
            <svg-icon icon-class="add" class="f30" style="color:#66f;" />
          </z-circle>
          <div class="wfull t-c">新建{{ typeName }}</div>
        </div>
      </div>
    </div> -->

    <!-- 新增弹出层 -->
    <addOtjPlan ref="addOtjPlan" />
    <!-- 详情弹出层 -->
    <lock ref="lock" :type="typeName" />
    <planDrawer ref="planDrawer" />
  </div>
</template>

<script>
import search from './search'
import addOtjPlan from './addOtjPlan'
import planDrawer from './planDrawer'
import lock from './lock'
// eslint-disable-next-line no-unused-vars
import datas from '@/assets/json/data'

// eslint-disable-next-line no-unused-vars
import { getTmeLock, getPlanList } from '@/api/area'
import { mapGetters } from 'vuex'
export default {
    name: 'Area',
    // eslint-disable-next-line vue/no-unused-components
    components: { search, addOtjPlan, planDrawer, lock },
    data() {
        return {
            activeName: '远程学习计划',
            objTag: '1',
            time: '2020年1月-2020年6月', // 判断是否显示新增时间段的关键 2020年1月-2020年6月
            titles: [],
            tableData: [] || datas.slice(0, 5),
            btn: {
                title: '操作',
                btnlist: [
                    { con: '查看', type: 'text' }
                ]
            },
            iStepTimes: []// 当前是否存在阶段时间设置信息
        }
    },
    computed: {
        ...mapGetters(['userInfo']),
        typeName() {
            let str = this.activeName
            if (this.activeName === 'OJT计划') {
                if (this.objTag === '1') str = 'OJT区域计划'
                if (this.objTag === '2') str = 'OJT部门计划'
                if (this.objTag === '3') str = 'OJT团队计划'
            }
            this.tableTitle(str)
            return str
        }
    },
    created() {
        this.init()
    },
    methods: {
        init(val) {
            const data = {
                areaId: this.userInfo.areaId,
                periodId: this.userInfo.defaultPeriodId
            }
            getTmeLock(data).then(res => {
                const { success, result } = res
                if (success) {
                    if (result.length) {
                        this.iStepTimes = result.filter(item => item.createTime.startsWith('2020-11-07 17:09:17')).slice(0, 5)
                        this.activeName = this.iStepTimes[0].stageName // 初始化选中项
                        console.log(this.iStepTimes)
                    } else {
                        this.$router.push('areasetting')
                    }
                }
            })
        },
        tableTitle(type) { // 表格数据处理
            let titles = [
                { name: '计划标题', data: 'cName' },
                { name: '提交人角色', data: 'stateCode' },
                { name: '提交人', data: 'producer' },
                { name: '计划时间', data: 'lastUpdateTime', type: 'time', time: '{y}-{m}-{d} ~ {h}:{i}:{s}' }
            ]
            if (type === '远程学习计划' || type === '集训计划') {
                titles = [{ name: '区域', data: 'organizationName' }, ...titles]
            }
            if (type === '实训计划' || type === 'OJT区域计划' || type === '正式入项计划' || type === 'OJT部门计划' || type === 'OJT团队计划') {
                titles = [{ name: '组别', data: 'organizationName' }, ...titles]
            }
            this.titles = titles
        },
        addPlan(item) { // 新建计划
            const data = {
                startTime: item.startTime,
                endTime: item.endTime,
                stageId: item.id,
                stageType: this.objTag,
                areaId: item.areaId,
                areaName: item.areaName,
                stageName: item.stageName }
            this.$refs.addOtjPlan.show(data)
        },
        getVal(res) {
            const { type, data } = res
            if (type === '查看') {
                this.$refs.lock.show()
            }
            console.log(data)
        }

    }
}
</script>

<style lang="scss" scoped>
@import '@/styles/views/tabs-box.scss';
.area-cls{
    height: 100%;
    .el-tabs-cls{
        height: calc(100% - 24px);
    }
    ::v-deep{
        .el-tabs__header{
            background-color: #fff;
            border-radius: 6px;
        }
        .el-tabs__content{
            height: calc(100% - 68px);
            .el-tab-pane{
                height: 100%;
            }
        }
    }
    .main{
        min-height: 100%;
        background: #ffffff;
        border-radius: 6px;
        // &.isobj{
        //     min-height: calc(100% - 180px);
        // }
    }
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
