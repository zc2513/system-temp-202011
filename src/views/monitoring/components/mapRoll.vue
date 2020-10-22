<!-- 弹幕滚动 -->
<template>
  <div class="mapRoll flcc" @mousemove="handle($event)" @mouseout="handle()">
    <div v-show="title" class="title-top" v-text="title" />
    <div v-show="title" class="sign" />
    <vue-seamless-scroll :data="bidDynamicList" class="title-list" :class-option="optionSingleHeight">
      <ul class="item">
        <li v-for="(item,index) in bidDynamicList" :key="index" class="fl wfull">
          <span>{{ item.ProvinceName || 'null' }}</span>
          <span>{{ item.BidSectionName || '未获取到标题' }}</span>
          <span>{{ item.PlatName || '未获取到平台' }}</span>
          <span>{{ item.TimeStr || 'null' }}</span>
        </li>
      </ul>
    </vue-seamless-scroll>
  </div>
</template>

<script>
import vueSeamlessScroll from 'vue-seamless-scroll'
export default {
    components: { vueSeamlessScroll },
    props: {
        bidDynamicList: { type: Array, default: (_) => [] }
    },
    data() {
        return { title: null }
    },
    computed: {
        optionSingleHeight() { return { singleHeight: 23, waitTime: 2500, limitMoveNum: 3 } }
    },
    methods: {
        handle(e) {
            e ? (e.target.tagName == 'SPAN' ? this.title = e.target.innerHTML : null) : this.title = false
        }
    }
}
</script>

<style lang='scss' scoped>
.mapRoll {
    position: absolute;
    bottom: 0;
    // width: 73%;
    width: 430px;
    background: #032663;
    height: 75px;
    .title-top {
        width: 94%;
        min-height: 20px;
        background: #1d67ff;
        position: absolute;
        bottom: 56px;
        left: 12px;
        font-size: 12px;
        line-height: 20px;
        text-align: center;
        border-radius: 3px;
    }
    .title-list {
        width: 100%;
        height: 50px;
        padding: 0 10px;
        position: absolute;
        bottom: 0;
        left: 0;
        border-top: 1px solid #0e78cb;
        overflow: hidden;
        cursor: pointer;
        font-size: 12px;
        color: #a4aab8;
        background: #032663;
        .item {
            li {
                justify-content: space-between;
                span {
                    overflow: hidden; //超出的文本隐藏
                    text-overflow: ellipsis; //溢出用省略号显示
                    white-space: nowrap; //溢出不换行
                    margin-right: 5px;
                    width: 50%;
                    padding: 5px 0;
                }
                span:first-child,
                span:last-child {
                    display: inline-block;
                    width: 50px;
                    min-width: 50px;
                    margin-right: 0;
                }
            }
        }
    }
    // 三角指示
    .sign {
        width: 0px;
        height: 0px;
        border-top: 5px solid #1d67ff;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        position: absolute;
        top: 19px;
        background: transparent;
    }
}
</style>
