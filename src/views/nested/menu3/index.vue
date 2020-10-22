
<template>
  <div>
    <router-view />

    <vue-seamless-scroll :data="listData" :class-option="optionSingleHeight" class="seamless-warp red">
      <ul class="item">
        <li v-for="(item,key) in listData" :key="key*Math.random()" class="flsb">
          <span class="title" v-text="item.title" /><span class="date" v-text="item.date" />
        </li>
      </ul>
    </vue-seamless-scroll>

    <div class="test-style f20 bold mt30">
      <div class="h4 flcc">滚动样式与标题测试</div>
      <div>666</div>
      <div>666</div>
      <div>666</div>
      <div>666</div>
      <div>666</div>
      <div>666</div>
    </div>
    <properview ref="properview" :list="{name:555}" @subPre="subPre" />
    <proviwe ref="proviwe" />
    <el-button type="text" @click="properview">点击打开 Dialog</el-button>
  </div>
</template>

<script>
import vueSeamlessScroll from 'vue-seamless-scroll'
import properview from './mode/properview'
import proviwe from './mode/proviwe'
export default {
    components: { vueSeamlessScroll, properview, proviwe },
    data() {
        return {
            listData: [
                {
                    'title': '无缝滚动第一行无缝滚动第一行',
                    'date': '2017-12-16'
                }, {
                    'title': '无缝滚动第二行无缝滚动第二行',
                    'date': '2017-12-16'
                }
            ]
        }
    },
    computed: {
        optionSingleHeight() {
            return {
                singleHeight: 30,
                waitTime: 1000,
                limitMoveNum: 2
            }
        }
    },
    methods: {
        properview() {
            this.$refs.properview.show('饭到啦就放大啦就发')
        },
        subPre() {
            this.$refs.proviwe.show('fdasfdafdafdafdas')
        }
    }
}
</script>

<style lang="scss" scoped>
    .seamless-warp {
        height: 100px;
        overflow: hidden;
        .item{
            li{
                height: 30px;
            }
        }
    }
    .test-style{
    width: 100%;
    height: 200px;
    background-color: $light-blue;
    color:$red;
    overflow-y: auto;
    @include scrollBar;
    >div{
        height: 40px;
        line-height: 40px;
        margin: 5px 0;
        background-color: #e2e2e2;
    }
    .h4{
        height: 50px;
        font-size: 30px;
        color: #666;
        background-color: #fff;
    }
}
</style>
