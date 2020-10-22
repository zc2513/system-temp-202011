<template>
  <!-- 标题样式 -->
  <div class="flc-y titlebox">
    <div class="linec" />
    <span>{{ text }}</span>
    <div
      v-show="line"
      class="lineh"
    />
  </div>
</template>

<script>
export default {
    props: {
        text: {
            type: String,
            default: ''
        },
        line: {
            type: Boolean,
            default: true
        }
    }
}
</script>

<style lang="scss" scoped>
.titlebox {
    font-size: 16px;
    height: 18px;
    font-weight: 600;
    .linec {
        width: 5px;
        height: 100%;
        background: #319ef3;
        margin-right: 10px;
    }
    .lineh {
        border-top: solid 1px #a09999;
        flex: 1;
        margin-left: 20px;
    }
}
</style>
