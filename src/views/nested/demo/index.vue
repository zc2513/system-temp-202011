<template>
  <div>
    案例页面
    <div class="box tab-control flc-y c-56">
      <div class="img-box green">
        <img :src="require(`@/assets/imgs/${imgName}.png`)" alt="">
      </div>
      <div class="tab-right fl-y-sa">
        <div class="wfull green">
          <slot name="title"> {{ title }} </slot>
        </div>
        <div class="wfull green">
          <slot>
            <div class="fl">
              <div>已提交</div>
              <div class="ml80">未提交</div>
            </div>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    props: {
        imgName: {
            type: String,
            default: 'person'
        },
        title: {
            type: String,
            default: '标注说明'
        }
    }
}
</script>

<style lang="scss" scoped>
.tab-control{
    height: 136px;
    .img-box{
        width: 72px;
        height: 72px;
        margin-left: 48px;
        margin-right: 20px;
    }
    .tab-right{
        height: 72px;
    }
    .ml80{
        margin-left: 80px;
    }
}
</style>
