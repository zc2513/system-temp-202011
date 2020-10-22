
<template>
  <div class="list-box">
    路由维护/页面权限
    <div class="fle mb10">
      <el-button size="mini" type="primary" class="mr20" @click="addPage">新增</el-button>
    </div>
    <div class="content-box">
      <z-table :titles="titles" :btns="btn" @sendVal="getVal" />
      <z-page :total="200" :page-size="baseParams.size" :current-page="baseParams.page" @pagesend="getPageData" @pagesizes="pagesizes" />
    </div>
    <el-dialog title="新增页面" width="60%" :visible.sync="dialogVisible">
      新增单位
    </el-dialog>
  </div>
</template>

<script>
import search from '@/mixins/search'
export default {
    name: 'PageRoute',
    mixins: [search],
    data() {
        return {
            titles: [
                { name: '标题', data: 'organizationName' },
                { name: 'icon', data: 'markCode' },
                { name: 'url', data: 'cName' },
                { name: '联系方式', data: 'markCode' }
            ],
            btn: {
                title: '操作',
                width: 130,
                btnlist: [
                    { con: '修改', type: 'info' },
                    // { con: '详情', type: 'primary' },
                    { con: '删除', type: 'warning', confirm: true }
                ]
            },
            dialogVisible: false
        }
    },
    methods: {
        getVal(val) {
            console.log(val)
        },
        addPage() {
            this.dialogVisible = true
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/styles/views/listLayout.scss';
</style>
