<template>
  <!-- 对接平台维护 -->
  <div class="list-box">
    <div class="content-box mb10">
      <search @sendSearch="getSearchData" />
    </div>
    <div class="content-box">
      <div class="fle mb10">
        <el-button size="mini" type="primary" class="mr20" @click="addPage">新增</el-button>
      </div>
      <z-table :titles="titles" :lists="tableData" :btns="btn" @sendVal="getVal" />
      <z-page :total="total" :page-size="baseParams.size" :current-page="baseParams.page" @pagesend="getPageData" @pagesizes="pagesizes" />
    </div>
    <el-dialog v-if="dialogType.status" :title="dialogType.title" :visible.sync="dialogType.status">
      <details-box v-if="dialogType.type==='info'" :info-id="dialogType.id" />
      <add v-else :page-type="dialogType.type" :info-id="dialogType.id" @closeDia="dialogType.status = false" />
    </el-dialog>
  </div>
</template>

<script>

import search from './search'
import searchQuery from '@/mixins/search'
import add from './add'
import detailsBox from './details'
import { getDockPlatList, enableDockPlat } from '@/api/systemSetting'
export default {
    name: 'Platform',
    components: { search, add, detailsBox },
    mixins: [searchQuery],
    data() {
        return {
            titles: [
                { name: '序号', type: 'index' },
                { name: '平台名称', data: 'Name' },
                { name: '平台编码', data: 'Code' },
                { name: '平台简称', data: 'SimpleName' },
                { name: '平台类型', data: 'PlatTypeName' },
                { name: '所在地区', data: 'RegionName' },
                { name: '对接日期', data: 'SBuildTime' },
                { name: '是否开启', data: 'IsEnable', type: 'switch' }
            ],
            btn: {
                title: '操作',
                width: 120,
                btnlist: [
                    { con: '编辑', type: 'info' },
                    { con: '详情', type: 'primary' }
                ]
            },
            dialogType: {
                status: false,
                title: '新增',
                id: null,
                type: 'add'
            }
        }
    },
    created() {
        this.init()
    },
    methods: {
        init() {
            const data = { ...this.baseParams, ...this.searchData }
            getDockPlatList(data).then(res => {
                const { Data, Total } = res.Data
                this.total = Total
                this.tableData = Data
            })
        },
        getVal({ type, data }) {
            if (type === '编辑') {
                this.dialogType = {
                    status: true,
                    title: '编辑',
                    id: data.SId,
                    type: 'edit'
                }
            }
            if (type === 'switch') {
                enableDockPlat({ id: data.SId, isEnable: data.IsEnable }).then(res => {
                    this.$message.success(data.IsEnable ? '已开启' : '已关闭')
                })
            }

            if (type === '详情') {
                this.dialogType = {
                    status: true,
                    title: '详情',
                    id: data.SId,
                    type: 'info'
                }
            }
        },
        addPage() {
            this.dialogType = {
                status: true,
                title: '新增',
                id: null,
                type: 'add'
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/styles/views/listLayout.scss';
</style>
