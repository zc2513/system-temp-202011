<template>
  <!-- 培训情况概览 -->
  <div class="overview pb15">
    <div class="box header flsb">
      <div class="hfull flc-y left">
        <div class="tab-title hfull fl">
          <div class="hfull cursor flc-y" :class="{'active':searchData.isTabActive===1}" @click="searchData.isTabActive=1"> 总体概览 </div>
          <div class="hfull cursor flc-y" :class="{'active':searchData.isTabActive===2}" @click="searchData.isTabActive=2 "> 各地区概览 </div>
        </div>
      </div>
      <div class="hfull f14 flc-y right">
        <span class="mr15">TS-Force届数</span>
        <el-select v-model="searchData.selectVal" placeholder="请选择届数">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
    </div>

    <div v-if="searchData.isTabActive===1">
      <!-- 总体概览 -->
      <overall />
    </div>
    <div v-if="searchData.isTabActive===2">
      <!-- 各地区概览 -->
      <district />
    </div>
  </div>
</template>

<script>
import overall from './overall'
import district from './district'
export default {
    name: 'Overview',
    components: { overall, district },
    data() {
        return {
            searchData: { // 查询条件
                isTabActive: 1,
                selectVal: ''
            },
            options: [
                { value: '001', label: '2020届' },
                { value: '002', label: '2019届' }
            ]
        }
    }

}
</script>

<style lang="scss" scoped>
.overview{
    .header{ //顶部
        height: 70px;
        color: #5F6266;
        .left{
            padding-left: 24px;
        }
        .right{
            padding-right: 48px;
        }
        .tab-title{//顶部选中项
            >div{
                border-bottom: 3px solid transparent ;
                margin-right: 40px;
                &.active{
                    border-bottom-color: #6666FF;
                }
            }
        }
    }
}

</style>
