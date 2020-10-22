<template>
  <div class="list-box">
    组织机构管理
    <div class="fle mb10">
      <el-button size="mini" type="primary" class="mr20" @click="addCompany">新增</el-button>
    </div>
    <div class="content-box">
      <z-table :titles="titles" :btns="btn" @sendVal="getVal" />
      <z-page :total="200" :page-size="baseParams.size" :current-page="baseParams.page" @pagesend="getPageData" @pagesizes="pagesizes" />
    </div>
    <el-dialog title="新增单位" width="60%" :visible.sync="dialogVisible">
      新增单位
    </el-dialog>
  </div>
</template>

<script>
export default {
    name: 'Company',
    data() {
        return {
            baseParams: {
                page: 1,
                size: 10
            },
            titles: [
                { name: '机构名称', data: 'organizationName' },
                { name: '账号', data: 'markCode' },
                { name: '负责人', data: 'cName' },
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
        addCompany() {
            this.dialogVisible = true
        },
        getPageData(page) {
            this.baseParams.page = page
        },
        pagesizes(size) {
            this.baseParams.page = 1
            this.baseParams.size = size
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/styles/views/listLayout.scss';
</style>
