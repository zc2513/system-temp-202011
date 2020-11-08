<template>
  <div class="area-cls">

    <el-tabs v-model="activeName" class="el-tabs-cls mb15" @tab-click="handleClick">
      <el-tab-pane
        v-for="item in iStepTimes"
        :key="item.id"
        :label="item.stageName"
        :name="item.id"
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
              <search :verify="planType" />
            </div>
          </z-header>

          <div v-if="tableData.length" class="plr24 mb30">
            <el-button
              size="mini"
              type="primary"
              @click="addPlan(item,'add')"
            >新建</el-button>
            <z-table :titles="titles" :btns="btn" :lists="tableData" align="left" class="mt15" @sendVal="getVal" />
          </div>
          <div v-else class="flcc c-66f" style="margin-top:200px;">
            <div style="margin-bottom:60px;" class="cursor" @click="addPlan(item,'add')">
              <z-circle size="120" color="#F4F7FA" class="mb20">
                <svg-icon icon-class="add" class="f30" style="color:#66f;" />
              </z-circle>
              <div class="wfull t-c">新建{{ item.stageName }}</div>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>

    <!-- 新增弹出层 -->
    <addOtjPlan ref="addOtjPlan" />
    <!-- 详情弹出层 -->
    <lock ref="lock" />
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

import { getTmeLock, getPlanList } from '@/api/area'
import { mapGetters } from 'vuex'
export default {
    name: 'Area',
    // eslint-disable-next-line vue/no-unused-components
    components: { search, addOtjPlan, planDrawer, lock },
    data() {
        return {
            activeName: '',
            objTag: '1',
            titles: [],
            tableData: [],
            btn: {
                title: '操作',
                btnlist: [
                    { con: '查看', type: 'text' }
                ]
            },
            iStepTimes: [], // 当前是否存在阶段时间设置信息
            planType: {}

        }
    },
    computed: {
        ...mapGetters(['userInfo'])
    },
    created() {
        this.init()
    },
    methods: {
        async init(val) {
            const data = {
                areaId: this.userInfo.areaId,
                periodId: this.userInfo.defaultPeriodId
            }
            await getTmeLock(data).then(res => {
                const { success, result } = res
                if (success) {
                    if (result.length) {
                        this.iStepTimes = result.filter(item => item.createTime.startsWith('2020-11-07 17:09:17')).slice(0, 5)
                        this.planType = this.iStepTimes[0]
                        this.activeName = this.iStepTimes[0].id // 初始化选中项
                        this.tableTitle(this.iStepTimes[0])
                    } else {
                        this.$router.push('areasetting')
                    }
                }
            })
            this.initTable()
        },
        initTable() {
            const baseParams = {
                areaId: this.userInfo.areaId,
                createUserId: this.userInfo.id,
                createRole: this.userInfo.realname
            }
            getPlanList(baseParams).then(res => {
                if (res.success) {
                    this.tableData = res.result.records
                    console.log('表格数据', res.result.records)
                }
            })
        },
        tableTitle() { // 表格数据处理
            // console.log(this.planType, 777777)
            const { isArea, isDept, isGroup } = this.planType
            console.log(isArea, isDept, isGroup, this.objTag, 12345)
            let titles = [
                { name: '计划标题', data: 'planTitle' },
                { name: '提交人角色', data: 'createRole' },
                { name: '提交人', data: 'createUser' },
                { name: '计划时间', data: 'createTime', type: 'time', time: '{y}-{m}-{d}' }
            ]
            if (isArea && this.objTag === '1') {
                titles = [{ name: '区域', data: 'areaName' }, ...titles]
            }
            if (isDept && this.objTag === '2') {
                titles = [{ name: '部门', data: 'areaName' }, ...titles]
            }
            this.titles = titles
        },
        addPlan(item, type) { // 新建/编辑---计划
            const data = {
                startTime: item.startTime,
                endTime: item.endTime,
                stageId: item.id,
                stageType: this.objTag,
                areaId: item.areaId,
                areaName: item.areaName,
                stageName: item.stageName }
            this.$refs.addOtjPlan.show(data, type)
        },
        getVal(res) {
            const { type, data } = res
            if (type === '查看') {
                this.$refs.lock.show()
            }
            console.log(data)
        },
        handleClick(id) {
            this.tableTitle(this.iStepTimes.filter(item => item.id === id)[0])
            this.initTable()
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
