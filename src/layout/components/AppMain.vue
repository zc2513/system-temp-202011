<template>
  <section class="app-main" :class="{'y-auto':fixedHeader}">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view :key="key" style="padding:12px;" />
      </keep-alive>
    </transition>
  </section>
</template>

<script>
export default {
    name: 'AppMain',
    props: {
        fixedHeader: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        cachedViews() {
            return this.$store.state.tagsView.cachedViews
        },
        key() {
            return this.$route.path
        }
    }
}
</script>

<style scoped lang="scss">
.app-main {
  height: 100%;
  /*50 = navbar  */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
}
.fixed-header+.app-main {
  padding-top: 50px;
}
.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 50 + 34 */
    min-height: calc(100vh - 84px);
  }
  .fixed-header+.app-main {
    padding-top: 84px;
  }
}

.y-auto{
    overflow: auto;
    @include scrollBar;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
