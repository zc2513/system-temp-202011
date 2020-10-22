<!-- header顶部操作按钮 -->
<template>
  <div class="flsb wfull" style="margin-top:1px;">
    <div class="fl">
      <div class="ml20  cursor f14 right-button pl20 flcc pr20  left-button" type="text" @click="$store.dispatch('user/logout');$router.push('/login')">退 出</div>
      <div>
        <el-tooltip class="item" effect="dark" :content="isFullscreen ? '取消全屏':'全屏'" placement="bottom">
          <svg-icon class="ml15 cursor screenfull f24" :icon-class="isFullscreen ? 'offScreenFull':'screenfull' " @click="clickFullscreen" />
        </el-tooltip>
      </div>
    </div>
    <div class="fl mr20 pr20">
      <div
        v-for="(item,index) in routeList"
        :key="index"
        class="right-button cursor f14 flcc pl10 pr10 ml10"
        @click="$router.push({ path: item.route })"
      >
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script>
import screenfull from 'screenfull'
export default {
    data() {
        return {
            routeList: [
                { route: 'supervise/build', name: '项目监督' },
                { route: 'network', name: '监督网络' },
                { route: 'supwarning/index', name: '监督预警' },
                { route: 'setting/nodes', name: '监督配置' }
            ],
            isFullscreen: false // vuex预备属性-暂时无用
        }
    },
    methods: {
        clickFullscreen() {
            if (!screenfull.isEnabled) {
                this.$message({
                    message: 'you browser can not work',
                    type: 'warning'
                })
                return false
            }
            this.isFullscreen = !screenfull.isFullscreen
            screenfull.toggle()
        }
    }
}
</script>
<style lang='scss' scoped>
.right-button{
    color:rgb(0, 255, 240);
    height: 25px;
    border: 1px solid transparent;
    &:hover{
        color: #FFF;
        border: 1px solid $light-blue;
    }
}
.left-button{
    border: 1px solid rgb(0, 255, 240);
}
.screenfull{
    color: rgb(0, 255, 240);
    &:hover{
        color: $light-blue;
    }
}
</style>
