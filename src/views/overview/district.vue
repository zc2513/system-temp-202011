<template>
  <!-- 地区概览 -->
  <div class="overview-district">
    <div class="flc-y" style="height:80px;">
      <div>地区</div>
      <div>地区</div>
      <div>地区</div>
      <div>地区</div>
    </div>

    <echartLayout title="整体培养日程阶段展示图-北京">
      折线图
    </echartLayout>

    <div class="list-main flsb flw">
      <echartLayout :show-title="false" height="318">
        <div class="flot-box">
          <div class="title">总人数折线图-北京</div>
          <div class="time">2020-06～2020-11</div>
        </div>
      </echartLayout>
      <echartLayout :show-title="false" height="318">
        <div class="flot-box">
          <div class="title">TS-Force日报提交情况-北京</div>
          <div class="time">2020-06～2020-11</div>
        </div>
      </echartLayout>
      <echartLayout :show-title="false" height="318">
        <div class="flot-box">
          <div class="title">TS-Force日报Review情况-北京</div>
          <div class="time">2020-06～2020-11</div>
        </div>
      </echartLayout>
      <echartLayout :show-title="false" height="318">
        <div class="flot-box">
          <div class="title">辅导员辅导记录提交情况-北京</div>
          <div class="time">2020-06～2020-11</div>
        </div>
      </echartLayout>
      <echartLayout :show-title="false" height="318">
        <div class="flot-box">
          <div class="title">一线经理月报提交情况-北京</div>
          <div class="time">2020-06～2020-11</div>
        </div>
      </echartLayout>
      <echartLayout :show-title="false" height="318">
        <div class="flot-box">
          <div class="title">地区月报提交情况-北京</div>
          <div class="time">2020-06～2020-11</div>
        </div>
      </echartLayout>
    </div>
  </div>
</template>

<script>
import echartLayout from './echartLayout'
export default {
    components: { echartLayout }
}
</script>

<style lang="scss" scoped>
.overview-district{
    .list-main{//
        margin: 16px 0;
        >div{
            width: calc(50% - 8px);
            margin-bottom: 16px;
            &:nth-child(even){  margin-left: 16px; }
        }
        .flot-box{
            position: absolute;
            background-color: #fff;
            .time{
                padding-top: 9px;
                font-size: 12px;
                color: #5F6266;
            }
        }
    }
}
</style>
