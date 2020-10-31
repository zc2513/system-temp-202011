
<template>
  <div class="comment-box">
    <div class="line" />
    <div class="plr24" style="color:#4E5C7A;"> 全部评论</div>
    <ul class="plr24">
      <li
        v-for="(item,key) of arr"
        :key="key"
        :class="{'noborder':key===arr.length-1}"
        class="flc-y"
      >
        <div class="flc-y mr15">
          <img :src="require(`@/assets/imgs/comment/${ImgType(key)}.png`)" width="56px" height="56px" alt="">
        </div>
        <div class="fl1">
          <div>
            <span style="color:#4E5C7A;">王大锤</span>
            <span class="f12 ml10" style="color:#B2BFD8;">2020-09-23 12:32:09</span>
          </div>
          <div class="f14 mt10 content" style="color:#778092;">
            在完成过程中都有阶段性，而每个阶段又有许多环节，它们之间常常是互相交错的。因此，订计划必须胸有全局，妥善安排，哪些先干，哪些后干，应合理安排。
            在完成过程中都有阶段性，而每个阶段又有许多环节，它们之间常常是互相交错的。因此，订计划必须胸有全局，妥善安排，哪些先干，哪些后干，应合理安排。
          </div>
        </div>
      </li>
    </ul>
  </div>

</template>

<script>

export default {
    name: 'MyDemo',
    props: {
        arr: {
            type: Array,
            default: _ => new Array(5)
        }
    },
    methods: {
        ImgType(type) {
            const arr = ['tutor', 'coach', 'manager', 'Mgr', 'teacher']
            return arr[type]
        }
    }
}
</script>
<style lang='scss' scoped>
.comment-box{
    background-color: #fff;
    .line{
        height: 1px;
        background: #E0E4EB;
        margin-bottom: 48px;
    }
    li{
        height: 134px;
        border-bottom: 1px solid  #E0E4EB;
        .content{
            max-height: 40px;
            line-height: 20px;
            overflow: hidden;
            // overflow-y: auto;
        }
    }
    .noborder{ border: 0; }
}
</style>
