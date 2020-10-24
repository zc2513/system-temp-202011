<template>
  <div>
    <el-dialog title="设置权限" :visible.sync="dialogRights" :before-close="closedialogRights">
      <el-tree
        ref="tree"
        :data="treeList"
        show-checkbox
        node-key="id"
        default-expand-all
        :default-checked-keys="checkedKeysList"
        :props="defaultProps"
      />
      <div slot="footer">
        <el-button @click="closedialogRights">取消</el-button>
        <el-button type="primary" @click="editRights">确定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import rights from '@/api/rights'
// import { setRoleRight } from '@/api/roles'
export default {
    data() {
        return {
            dialogRights: false,
            treeList: [],
            rightsList: [],
            defaultProps: {
                label: 'authName',
                children: 'children'
            },
            checkedKeysList: [], // 已选中的权限id数组
            currRoleId: -1
        }
    },
    methods: {
        //   修改权限
        async editRights() {
            // 获取全选id的数组arr1 getCheckedKeys()
            const arr1 = this.$refs.tree.getCheckedKeys()
            // 获取半选id的数组arr2 getHalfCheckedKeys()
            const arr2 = this.$refs.tree.getHalfCheckedKeys()
            const arr = [...arr1, ...arr2]
            console.log('全选Id', arr1)
            console.log('半选选Id', arr2)
            console.log(arr)
            // setRoleRight({ roleId: this.currRoleId, rightsId: arr }).then(res => {
            //     if (res.data.Code !== 200) {
            //         this.$message.error(res.data.Msg)
            //     } else {
            //         this.$message.success(res.data.Msg)
            //     }
            // })
            // 更新视图
            this.$parent.initList()
            // 关闭对话框
            this.dialogRights = false
        },
        // 打开弹框显示所有权限和该角色选中的权限
        showSetRights(role) {
            this.checkedKeysList = []
            console.log(role)
            this.dialogRights = true
            this.currRoleId = role.id
            this.treeList = rights
            console.log(this.treeList)
            const arrtemp2 = [] // 获取该角色已选中的权限id
            role.children.forEach(item1 => {
                arrtemp2.push(item1.id)
                item1.children.forEach(item2 => {
                    arrtemp2.push(item2.id)
                    item2.children.forEach(item3 => {
                        arrtemp2.push(item3.id)
                    })
                })
            })
            console.log(arrtemp2)
            this.checkedKeysList = arrtemp2
        },
        closedialogRights() {
            this.checkedKeysList = []
            this.dialogRights = false
        }
    }
}
</script>
<style lang="scss" scoped>

</style>
