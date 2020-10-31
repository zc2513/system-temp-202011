<template>
  <div class="box tab-control flc-y c-56">
    <div class="img-box">
      <img :src="require(`@/assets/imgs/${imgName}.png`)" alt="">
    </div>
    <div class="tab-right fl-y-sa">
      <div class="wfull f16">
        <slot name="title"> {{ title }} </slot>
      </div>
      <div class="wfull">
        <slot>
          <div v-if="num" class="tab-num-cls" v-text="num" />
          <div v-if="type==='1'" class="fl f14">
            <div class="flc-y">
              <z-circle size="12" class="mr5" color="#A2F07B" />
              已提交人数
            </div>
            <div class="ml80 flc-y">
              <z-circle size="12" class="mr5" color="#D697FF" />
              全员提交
            </div>
          </div>
          <div v-if="type==='2'" class="fl f14">
            <div class="flc-y">
              <z-circle size="12" class="mr5" color="#A2F07B" />
              已提交
            </div>
            <div class="ml80 flc-y">
              <z-circle size="12" class="mr5" color="#FF785F" />
              未提交
            </div>
          </div>
          <div v-if="type==='3'" class="fl f14">
            <div class="flc-y">
              <z-circle size="12" class="mr5" color="#A2F07B" />
              已制定
            </div>
            <div class="ml80 flc-y">
              <z-circle size="12" class="mr5" color="#FF785F" />
              未制定
            </div>
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'HeaderTab',
    props: {
        imgName: {
            type: String,
            default: 'text'// person
        },
        title: {
            type: String,
            default: '标注说明'
        },
        num: {
            type: [Number, String],
            default: 0
        },
        type: {
            type: String,
            default: '2'
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
        color: #5F6266;
        height: 72px;
        .tab-num-cls{
            font-size: 40px;
            color: #5488F9;
        }
    }
    .ml80{
        margin-left: 80px;
    }
}
</style>
