<template>
  <div class="warningDetail">
    <p class="f12 bg-ec">检查内容：<span>{{ context }}</span></p>
    <p class="f12 redTip">预警提示： <span>{{ warnText }}</span></p>
  </div>
</template>

<script>
export default {
    data() {
        return {
            warnText: '1、未在项目所在地省级发布媒介发布；2、公示有效期少于3天',
            context: '发布规范性'
        }
    }
}
</script>
<style lang="scss" scoped>
.warningDetail{
    p{
        margin:0;
        border:1px solid #bbb7b7;
        text-indent:10px;
    }
    .bg-ec{
        background:#ececec;
        line-height:30px;
        border-bottom: 0;
    }
    .redTip{
        background:#f3b6c3;
        line-height:37px;
        color: #FF0000;
    }
}
@import '@/styles/views/listLayout.scss';
</style>
