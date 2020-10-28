<template>
  <!-- 培训情况概览 -->
  <div class="overview">
    <div class="box header flsb">
      <div class="hfull red flc-y left">总体概览/各地概览情况</div>
      <div class="hfull red flc-y right">查询条件</div>
    </div>

    <div class="flc-y" style="height:80px;">
      <div>地区</div>
      <div>地区</div>
      <div>地区</div>
      <div>地区</div>
    </div>

    <div class="box all">
      <h4 class="f16">整体培养日程阶段展示图-北京</h4>
      <div class="all-content green">
        折线图
      </div>
    </div>

    <div class="list-main flsb flw">
      <div class="box">总人数折线图-北京</div>
      <div class="box">TS-Force日报提交情况-北京</div>
      <div class="box">TS-Force日报Review情况-北京</div>
      <div class="box">辅导员辅导记录提交情况-北京</div>
      <div class="box">一线经理月报提交情况-北京</div>
      <div class="box">地区月报提交情况-北京</div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'Overview'
}
</script>

<style lang="scss" scoped>
.overview{
    .header{ //顶部
        height: 70px;
        .left{
            padding-left: 24px;
        }
        .right{
            padding-right: 48px;
        }
    }
    .all{//整体培养日程
        height: 415px;
        padding: 40px 24px;
        h4{
            color: #303133;
            height: 22px;
            line-height: 22px;
        }
        &-content{
            height: calc(415px - 102px);
        }
    }

    .list-main{//
        margin: 16px 0;
        box-sizing: border-box;
        >div{
            width: calc(50% - 8px);
            height: 381px;
            margin-bottom: 16px;
            &:nth-child(even){  margin-left: 16px; }
        }
    }
}

</style>
