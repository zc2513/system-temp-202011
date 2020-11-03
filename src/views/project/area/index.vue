<template>
  <div class="area-cls">

    <el-tabs v-model="activeName" class="el-tabs-cls box mb15">
      <el-tab-pane label="远程学习计划" name="远程学习计划" />
      <el-tab-pane label="集训计划" name="集训计划" />
      <el-tab-pane label="实训计划" name="实训计划" />
      <el-tab-pane label="OJT计划" name="OJT计划" />
      <el-tab-pane label="正式入项计划" name="正式入项计划" />
    </el-tabs>

    <div v-if="activeName==='OJT计划'" class="obj-tag flc-y" style="height:70px;">
      <el-tag class="mr20 cursor" size="medium" :effect=" objTag === 'a' ? 'dark':'plain'" @click="objTag='a'">OJT区域计划</el-tag>
      <el-tag class="mr20 cursor" size="medium" :effect=" objTag === 'b' ? 'dark':'plain'" @click="objTag='b'">OJT部门计划</el-tag>
      <el-tag class="mr20 cursor" size="medium" :effect=" objTag === 'c' ? 'dark':'plain'" @click="objTag='c'">OJT团队计划</el-tag>
    </div>

    <div class="main" :class="{'isobj':activeName==='OJT计划'}">
      <z-header is-line>
        <div slot="title" class="f14" style="color:#5F6266;">
          {{ typeName }}时间：{{ time }}
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
    </div>

    <!-- 新增弹出层 -->
    <addOtjPlan ref="addOtjPlan" :title="typeName" />
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

export default {
    name: 'Area',
    // eslint-disable-next-line vue/no-unused-components
    components: { search, addOtjPlan, planDrawer, lock },
    data() {
        return {
            activeName: '远程学习计划',
            objTag: 'a',
            time: '2020年1月-2020年6月', // 判断是否显示新增时间段的关键 2020年1月-2020年6月
            titles: [],
            tableData: datas.slice(0, 5),
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
            let str = this.activeName
            if (this.activeName === 'OJT计划') {
                if (this.objTag === 'a') str = 'OJT区域计划'
                if (this.objTag === 'b') str = 'OJT部门计划'
                if (this.objTag === 'c') str = 'OJT团队计划'
            }
            this.tableTitle(str)
            return str
        }
    },
    created() {
        console.log(this.$route, 666)
        this.init(this.$route.params.istrue)
    },
    methods: {
        init(val) {
            const istrue = val
            // 1.请求数据 判断是否存在时间段 如果不存在则跳转时间段添加页面
            if (!istrue) { this.$router.push('areasetting') }
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
        addPlan() { // 新建计划
            this.$refs.addOtjPlan.show()
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
    .main{
        min-height: calc(100% - 110px);
        background: #ffffff;
        border-radius: 6px;
        &.isobj{
            min-height: calc(100% - 180px);
        }
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
