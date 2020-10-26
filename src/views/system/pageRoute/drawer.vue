
<template>
  <el-drawer
    :before-close="closeDrawer"
    :modal-append-to-body="false"
    :with-header="false"
    :visible.sync="drawerVisible"
    custom-class="drawBox"
  >
    <div class="title"> {{ drawTitle || '暂无设置' }} </div>
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="el-form-wrapper">
      <el-form-item label="菜单类型:">
        <el-radio-group v-model="ruleForm.level">
          <el-radio :label="1">一级菜单</el-radio>
          <el-radio :label="2">子菜单</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="菜单名称:" prop="meta.title">
        <el-input v-model="ruleForm.meta.title" autofocus />
      </el-form-item>
      <el-form-item v-if="ruleForm.level === 2" label="上级菜单:" prop="lastMenuId">
        <selectTree
          :props="props"
          :options="menuList"
          :value="ruleForm.lastMenuId"
          :clearable="isClearable"
          :accordion="isAccordion"
          @getValue="getValue($event)"
        />
      </el-form-item>
      <el-form-item label="前端组件:" prop="component">
        <el-input v-model="ruleForm.component" />
      </el-form-item>
      <el-form-item label="菜单路径:" prop="path">
        <el-input v-model="ruleForm.path" />
      </el-form-item>
      <el-form-item label="缓存名称:" prop="name">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item label="重定向:" prop="redirect">
        <el-input v-model="ruleForm.redirect" />
      </el-form-item>
      <el-form-item label="高亮显示项:" prop="meta.activeMenu">
        <el-input v-model="ruleForm.meta.activeMenu" />
      </el-form-item>
      <el-form-item label="菜单图标:" prop="meta.icon">
        <selectIcon v-model="ruleForm.meta.icon" />
      </el-form-item>
      <el-form-item label="按钮权限:" prop="meta.roles">
        <el-select v-model="ruleForm.meta.roles" multiple placeholder="请选择按钮">
          <el-option
            v-for="item in rolesList"
            :key="item.sid"
            :label="item.label"
            :value="item.sid"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="是否隐藏:" prop="hidden">
        <el-switch
          v-model="ruleForm.hidden"
          active-text="是"
          inactive-text="否"
          active-color="#1890ff"
          inactive-color="#ccc"
          class="tablescope"
        />
      </el-form-item>
      <el-form-item label="是否始终显示:" prop="alwaysShow">
        <el-switch
          v-model="ruleForm.alwaysShow"
          active-text="是"
          inactive-text="否"
          active-color="#1890ff"
          inactive-color="#ccc"
          class="tablescope"
        />
      </el-form-item>
      <el-form-item label="是否缓存:" prop="meta.noCache">
        <el-switch
          v-model="ruleForm.meta.noCache"
          active-text="是"
          inactive-text="否"
          active-color="#1890ff"
          inactive-color="#ccc"
          class="tablescope"
        />
      </el-form-item>
      <el-form-item label="面包屑显示:" prop="meta.breadcrumb">
        <el-switch
          v-model="ruleForm.meta.breadcrumb"
          active-text="是"
          inactive-text="否"
          active-color="#1890ff"
          inactive-color="#ccc"
          class="tablescope"
        />
      </el-form-item>
      <el-form-item label="固定标签:" prop="meta.affix">
        <el-switch
          v-model="ruleForm.meta.affix"
          active-text="是"
          inactive-text="否"
          active-color="#1890ff"
          inactive-color="#ccc"
          class="tablescope"
        />
      </el-form-item>
      <el-form-item>
        <div class="flsa">
          <el-button class="w-50" @click="closeDrawer()">关闭</el-button>
          <el-button class="w-50" type="primary" @click="submitForm('ruleForm')">确定</el-button>
        </div>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<script>
import selectTree from './selectTree'
import selectIcon from '@/components/selectIcon'
export default {
    name: 'Drawer',
    components: { selectTree, selectIcon },
    data() {
        return {
            drawerVisible: false,
            drawTitle: '',
            ruleForm: {
                level: 1, // 菜单类型
                component: '', // 前端组件
                lastMenuId: 0, // 上级菜单
                path: '', // 菜单路径
                name: '', // 缓存名称
                redirect: '', // 重定向
                hidden: false, // 是否隐藏
                alwaysShow: false, // 是否始终显示
                meta: {
                    icon: '', // 菜单图标
                    title: '', // 菜单名称
                    roles: [], // 按钮权限
                    noCache: false, // 是否缓存
                    breadcrumb: true, // 是否在面包屑中显示
                    activeMenu: '', // 高亮显示项
                    affix: false // 固定标签
                }
            },
            rules: {
                'meta.title': [
                    { required: true, message: '请输入菜单名称', trigger: ['change', 'input'] }
                ],
                lastMenuId: [
                    { required: true, message: '请选择上级菜单', trigger: 'change' }
                ],
                component: [
                    { required: true, message: '请输入前端组件', trigger: 'blur' }
                ],
                path: [
                    { required: true, message: '请输入菜单路径', trigger: 'blur' }
                ]
            },
            rolesList: [
                { sid: '1', label: '增加' },
                { sid: '2', label: '删除' },
                { sid: '3', label: '修改' },
                { sid: '4', label: '查询' },
                { sid: '5', label: '详情' }],
            menuList: [],
            isClearable: true, // 可清空（可选）
            isAccordion: true, // 可收起（可选）
            props: { // 配置项（必选）
                value: 'id',
                label: 'name',
                children: 'children'
                // disabled:true
            }
        }
    },

    methods: {
        // 取值
        getValue(value) {
            this.ruleForm.lastMenuId = value
            console.log(this.ruleForm.lastMenuId)
        },
        formatter(row) {
            return row.state ? '是' : '否'
        },
        openDrawer(type, row, menuList) {
            this.menuList = menuList
            this.drawTitle = type === 1 ? '新增' : '编辑'
            this.drawerVisible = true
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (!valid) return
                console.log(this.ruleForm)
                if (this.drawTitle === '新增') {
                    // addRouter({ model: this.ruleForm }).then((res) => {
                    //     this.$parent.init()
                    //     this.drawerVisible = false
                    // })
                    this.menuList.unshift(this.ruleForm) // 添加数据
                    this.drawerVisible = false
                } else {
                    // editRouter({ model: this.ruleForm }).then((res) => {
                    //     this.$parent.init()
                    //     this.drawerVisible = false
                    // })
                }
            })
        },
        closeDrawer() {
            this.$refs.ruleForm.resetFields()
            this.drawerVisible = false
            // console.log(this.$refs.ruleForm)
            // this.$refs.ruleForm.resetFields()
        }
    }
}
</script>

<style lang="scss" scoped>
.drawBox{
    .title{
        height: 50px;
        padding: 0 20px;
        font-weight: 500;
        display: flex;
        align-items: center;
        border-bottom:1px solid #e8e8e8;
    }
    .el-form-wrapper{
        padding: 10px 20px 0;
        ::v-deep{
            .el-select{//多选框
                width:100%;
             }
            .tablescope{//switch
                .el-switch__label--left {
                    position: relative;
                    left: 50px;
                    color: #fff;
                    z-index: -1111;
                }
                .el-switch__core{
                    width: 50px !important;
                }
                .el-switch__label--right {
                    position: relative;
                    right: 50px;
                    color: #fff;
                    z-index: -1111;
                }
                .el-switch__label--right.is-active {
                    z-index: 1111;
                    color: #fff !important;
                }
                .el-switch__label--left.is-active {
                    z-index: 1111;
                    color: #fff !important;
                }

            }
        }
    }
}

</style>
