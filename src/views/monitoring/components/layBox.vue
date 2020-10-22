<template>
  <!-- 内容布局页 -->
  <div class="fl-y-sb hfull layBox" style="background: rgba(15, 46, 87, 0.29);">
    <div v-if="isTrue" class="mb5 header flc-y" :style="styles">
      <template v-if="iconName">
        <svg-icon class="ml15" :style="{'color':iconColor}" :icon-class="iconName" />
      </template>
      <template v-else>
        <img
          :src="require(`../../../assets/imgs/monitoring/${src}.png`)"
          height="50%"
          class="ml15"
          alt
        >
      </template>
      <span class="f16 bold ml15">{{ title }}</span>
    </div>
    <div class="fl1">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
    props: {
        isTrue: {
            type: Boolean,
            default: true
        },
        iconName: {
            type: String,
            default: ''
        },
        iconColor: {
            type: String,
            default: ''
        },
        title: {
            type: String,
            default: ''
        },
        styles: {
            type: Object,
            default: () => {
                return {
                    color: '#FFF'
                }
            }
        },
        src: {
            type: String,
            default: 'chart-TV'
        }
    }
}
</script>
<style lang='scss' scoped>
.layBox {
    padding: 10px;
    .header {
        background: url("../../../assets/imgs/monitoring/header-Wz.png")
            no-repeat;
        background-size: auto 100%;
        height: 40px;
    }
}
</style>
