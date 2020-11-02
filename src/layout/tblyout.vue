<template>
  <div class="education-layout">

    <tbHeadre />

    <div class="main flsb">
      <div v-if="sidebar.opened" class="nav-bar">
        <div class="flcc navLogo">
          <img src="@/assets/imgs/layout/navLogo.png" alt="">
        </div>
        <Sidebar class="nav-slide" />
      </div>
      <div class="main-content fl1" :class="{'noPadding':!sidebar.opened}">
        <AppMain />
      </div>
    </div>

  </div>
</template>

<script>
import tbHeadre from './tblyout/header'
import AppMain from './tblyout/AppMain'
import Sidebar from './tblyout/Sidebar'

export default {
    name: 'Layout',
    components: {
        tbHeadre, AppMain, Sidebar
    },
    computed: {
        sidebar() {
            return this.$store.state.app.sidebar
        },
        device() {
            return this.$store.state.app.device
        },
        fixedHeader() {
            return this.$store.state.settings.fixedHeader
        },
        classObj() {
            return {
                hideSidebar: !this.sidebar.opened,
                openSidebar: this.sidebar.opened,
                withoutAnimation: this.sidebar.withoutAnimation,
                mobile: this.device === 'mobile'
            }
        }
    },
    methods: {
        handleClickOutside() {
            this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
        }
    }
}
</script>

<style lang="scss" scoped>
.education-layout{
    height: 100%;
    background: #f4f7fa;
    overflow: hidden;
    .main{
        box-sizing: border-box;
        height: calc(100% - 72px);
        .nav-bar{//导航部分
            background: #FFF;
            width: 240px;
            margin: 24px 16px 24px 24px;
            .navLogo{ height: 102px; }
            .nav-slide{
                overflow-y: auto;
                height: calc(100% - 102px);
                &::-webkit-scrollbar { width: 0px; }
            }
        }
        .main-content{//内容部分
            overflow-y: auto;
            padding: 24px 24px 0 0;
        }
        .noPadding{
            padding: 0;
        }

    }
}

</style>
