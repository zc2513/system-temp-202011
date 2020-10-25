<template>
  <div :class="{'has-logo':showLogo}">
    <el-scrollbar wrap-class="tblyout-scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="isAccordion"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'

export default {
    components: { SidebarItem },
    computed: {
        ...mapGetters([
            'sidebar'
        ]),
        routes() {
            return this.$store.state.permission.routes
            // return this.$router.options.routes
        },
        activeMenu() {
            const route = this.$route
            const { meta, path } = route
            if (meta.activeMenu) { // 突出显示您设置的路径
                return meta.activeMenu
            }
            return path
        },
        showLogo() {
            return this.$store.state.settings.sidebarLogo
        },
        variables() {
            return variables
        },
        isCollapse() {
            return !this.sidebar.opened
        },
        isAccordion() {
            return this.$store.state.settings.isAccordion
        }
    }
}
</script>

<style lang="scss">
.tblyout-scrollbar-wrapper{
    .el-menu{ border: 0; background: #000;}
    .el-menu-item,.el-submenu__title{//多选一级设置与子集设置
        border-left: 3px solid transparent;
        // span{
        //     padding-left: 16px !important;
        // }
        .svg-icon {
            color: #B2BFD8;
            margin-right: 16px;
        }
        &:hover{
            background: #F7F7FF !important;
            color: #6666FF !important;
            border-left: 3px solid #6666FF;
            .svg-icon {
                color: #6666FF;
            }
        }
    }
   .nest-menu .el-menu-item{//修复子集与一级菜单名称不对齐问题
        padding-left: 50px !important;
    }

    .is-active>.el-submenu__title{// 选中定义--多选一级表头
        color: $menuActiveText !important;
    }
    .el-menu-item.is-active {// 选中定义--当前想子项设置
      color: $menuActiveText !important;
      background-color: $isActiveBg !important;
      border-left: 3px solid #6666FF;
      .svg-icon {
        color:$menuActiveText;
      }

    }
}

</style>
